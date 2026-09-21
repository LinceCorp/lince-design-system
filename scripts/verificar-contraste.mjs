// Mede o contraste de cada cor de texto contra cada superfície, nos dois temas.
//
// # Por que é script, e não tabela
//
// Esta verificação existia como tabela escrita à mão, com o aviso de que "não é
// verificada por automação: é disciplina". A disciplina falhou — a tabela dava
// como aprovados dois tokens que reprovavam em duas das três superfícies
// escuras, e como reprovado um que passava com folga. Número escrito à mão
// envelhece; este script remede a cada CI.
//
//   bun run tokens:contraste           só o que reprova
//   bun run tokens:contraste -- --all  a tabela inteira
//
// # O piso
//
// WCAG 2.1 AA para texto normal: 4,5:1. Texto grande e elemento de interface
// aceitam 3:1, mas nenhum destes tokens é exclusivo de texto grande —
// `--text-tertiary` aparece em metadado de 11 px —, então o piso alto vale para
// todos.
//
// Cor com alfa é COMPOSTA sobre o fundo antes de medir: `rgba(…, .62)` sobre
// cinza quase preto não é o mesmo que a cor cheia a 62 %.
//
// Sai com código 1 quando alguma combinação reprova, para entrar no portão.
import { readFileSync } from "node:fs";

const PISO_AA = 4.5;
const TEMAS = ["light", "dark"];

/** Os arquivos que declaram cor. Ordem importa: `marca` define as referências. */
const ARQUIVOS = [
  "tokens/marca.css",
  "tokens/superficies.css",
  "tokens/estado.css",
  "tokens/dominio.css",
];

/**
 * Superfícies em que um texto de fato aparece.
 *
 * `--auth-canvas` entra por conta própria: ele NÃO acompanha o canvas dos
 * produtos — é o fundo comum às portas de entrada da Lince —, então precisa ser
 * medido separado. Superfície não medida é como a tinta errada entra: passando
 * no CI e reprovando na tela.
 */
const SUPERFICIES = [
  "--bg-canvas",
  "--bg-surface",
  "--bg-elevated",
  "--bg-sunken",
  "--auth-canvas",
];

/** Cores de primeiro plano que precisam passar sobre qualquer superfície. */
const PRIMEIRO_PLANO = [
  "--text-primary",
  "--text-secondary",
  "--text-tertiary",
  "--accent",
  "--accent-strong",
  "--status-success",
  "--status-warning",
  "--status-danger",
  "--status-info",
  "--sev-baixa",
  "--sev-media",
  "--sev-alta",
  "--sev-critica",
];

/**
 * As duas pontas da rampa de estágio, que também são superfície.
 *
 * O cabeçalho de uma coluna de funil pinta texto sobre a cor do estágio
 * aplicada em `--stage-tint` por cima do canvas. Como a medição só olhava as
 * superfícies nomeadas, **o CI passava e a tela reprovava**: seis combinações
 * do tema claro ficavam abaixo do piso, porque já tinham folga de décimos sobre
 * o canvas e a tinta comia o que sobrava.
 *
 * As duas pontas bastam: todo estágio intermediário é interpolação entre elas,
 * e o contraste no meio fica entre os dois extremos.
 */
const PONTAS_DA_RAMPA = ["--stage-inicio", "--stage-fim"];

/**
 * Pares medidos por conta própria, porque o fundo não é uma das superfícies.
 *
 * O texto do aviso de erro vive sobre a superfície TINGIDA, não sobre o canvas:
 * medi-lo contra o canvas foi o erro que deixou 3,9:1 passar por 7,7:1.
 */
const PARES_PROPRIOS = [
  ["--status-danger-strong", "--status-danger-surface"],
  // A coluna colorida da tela de entrada. Ela é uma SUPERFÍCIE, e ficou de
  // fora da medição por ser pintada com degradê em vez de cor de fundo — foi
  // assim que um subtítulo a 4,56:1 chegou a três produtos.
  //
  // As três paradas entram: a mais clara é a que aperta.
  ["--on-marca", "--marca-1"],
  ["--on-marca", "--marca-2"],
  ["--on-marca", "--marca-3"],
  ["--on-marca-muted", "--marca-1"],
  ["--on-marca-muted", "--marca-2"],
  ["--on-marca-muted", "--marca-3"],
];

// ----- leitura -----

/** Junta o CSS dos arquivos de token, com as quebras de linha normalizadas. */
function lerCss() {
  return ARQUIVOS.map((a) => readFileSync(a, "utf8")).join("\n").replace(/\s+/g, " ");
}

/**
 * Divide nas vírgulas de PRIMEIRO nível, ignorando as de dentro de parênteses.
 *
 * Existe porque `light-dark(rgba(24, 24, 27, .72), rgba(250, 250, 250, .74))`
 * tem cinco vírgulas e só uma separa os dois temas. Cortar na primeira
 * devolvia `rgba(24` como cor — que foi exatamente o erro que este helper
 * corrige.
 */
function dividirTopo(s) {
  const partes = [];
  let profundidade = 0;
  let atual = "";
  for (const ch of s) {
    if (ch === "(") profundidade++;
    if (ch === ")") profundidade--;
    if (ch === "," && profundidade === 0) {
      partes.push(atual.trim());
      atual = "";
      continue;
    }
    atual += ch;
  }
  if (atual.trim()) partes.push(atual.trim());
  return partes;
}

/**
 * Extrai `--nome: valor;`, resolvendo `light-dark(claro, escuro)` nos dois
 * temas. Token sem `light-dark()` vale igual nos dois — é o caso das pontas da
 * rampa e dos degraus da marca.
 */
function lerTokens(css) {
  const tokens = { light: {}, dark: {} };
  const decl = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = decl.exec(css)) !== null) {
    const nome = m[1];
    const bruto = m[2].trim();
    const par = /^light-dark\(\s*([\s\S]+)\s*\)$/i.exec(bruto);
    if (par) {
      const lados = dividirTopo(par[1]);
      if (lados.length !== 2) throw new Error(`light-dark() malformado em ${nome}: ${bruto}`);
      tokens.light[nome] = lados[0];
      tokens.dark[nome] = lados[1];
    } else {
      tokens.light[nome] = bruto;
      tokens.dark[nome] = bruto;
    }
  }
  return tokens;
}

/** Segue `var(--x)` até chegar numa cor literal. */
function resolver(valor, tabela, profundidade = 0) {
  if (profundidade > 10) throw new Error(`referência circular em ${valor}`);
  const ref = /^var\(\s*(--[a-z0-9-]+)\s*\)$/i.exec(valor.trim());
  if (!ref) return valor.trim();
  const alvo = tabela[ref[1]];
  if (alvo === undefined) throw new Error(`token não declarado: ${ref[1]}`);
  return resolver(alvo, tabela, profundidade + 1);
}

// ----- cor -----

/** Converte `#rgb`, `#rrggbb` ou `rgba(r,g,b,a)` em `[r, g, b, a]`. */
function paraRgba(cor) {
  const c = cor.trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);
  if (hex) {
    const h = hex[1];
    const largo = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
    return [
      parseInt(largo.slice(0, 2), 16),
      parseInt(largo.slice(2, 4), 16),
      parseInt(largo.slice(4, 6), 16),
      1,
    ];
  }
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(c);
  if (rgb) {
    const p = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  }
  throw new Error(`cor não reconhecida: ${cor}`);
}

/** Compõe o primeiro plano sobre o fundo, respeitando o alfa. */
function compor([r, g, b, a], [fr, fg, fb]) {
  return [r * a + fr * (1 - a), g * a + fg * (1 - a), b * a + fb * (1 - a)];
}

/** Luminância relativa do WCAG. */
function luminancia([r, g, b]) {
  const canal = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

/** Razão de contraste entre dois RGB já opacos. */
function razao(a, b) {
  const la = luminancia(a);
  const lb = luminancia(b);
  const [claro, escuro] = la > lb ? [la, lb] : [lb, la];
  return (claro + 0.05) / (escuro + 0.05);
}

// ----- execução -----

const mostrarTudo = process.argv.includes("--all");
const tokens = lerTokens(lerCss());
const reprovados = [];
const linhas = [];

for (const tema of TEMAS) {
  const tabela = tokens[tema];
  const pares = [];
  for (const fundo of SUPERFICIES) {
    for (const frente of PRIMEIRO_PLANO) pares.push([frente, fundo]);
  }
  for (const ponta of PONTAS_DA_RAMPA) {
    for (const frente of PRIMEIRO_PLANO) pares.push([frente, ponta]);
  }
  pares.push(...PARES_PROPRIOS);

  for (const [frente, fundo] of pares) {
    if (tabela[frente] === undefined || tabela[fundo] === undefined) {
      reprovados.push(`${tema}: token ausente — ${frente} sobre ${fundo}`);
      continue;
    }
    // A ponta da rampa não é cor cheia: ela entra como TINTA, na porcentagem
    // de `--stage-tint`, por cima do canvas.
    const ehRampa = PONTAS_DA_RAMPA.includes(fundo);
    const bruto = ehRampa
      ? (() => {
          const cor = paraRgba(resolver(tabela[fundo], tabela));
          const tinta = parseFloat(String(tabela["--stage-tint"] ?? "0").replace("%", "")) / 100;
          return [cor[0], cor[1], cor[2], tinta];
        })()
      : paraRgba(resolver(tabela[fundo], tabela));

    // Superfície TRANSLÚCIDA não é fundo: ela deixa passar o que está embaixo.
    // `--status-danger-surface` no escuro é vermelho a 12 % — medi-lo como se
    // fosse vermelho cheio dá 1,46:1 e acusa um token que na tela está em
    // 7,7:1. Quando há alfa, a superfície é composta sobre as bases reais, e a
    // medida tem de passar em TODAS elas.
    const bases =
      bruto[3] < 1
        ? ["--bg-canvas", "--bg-surface", "--bg-elevated"].map((b) => {
            const cb = paraRgba(resolver(tabela[b], tabela));
            return { nome: `${fundo} sobre ${b}`, cor: compor(bruto, cb) };
          })
        : [{ nome: fundo, cor: [bruto[0], bruto[1], bruto[2]] }];

    for (const base of bases) {
      const opaco = compor(paraRgba(resolver(tabela[frente], tabela)), base.cor);
      const r = razao(opaco, base.cor);
      const passa = r >= PISO_AA;
      const linha = `  ${passa ? "ok  " : "FALHA"} ${tema.padEnd(5)} ${frente.padEnd(24)} sobre ${base.nome.padEnd(42)} ${r.toFixed(2)}:1`;
      if (!passa) reprovados.push(linha);
      if (mostrarTudo || !passa) linhas.push(linha);
    }
  }
}

console.log(`Contraste — piso AA de ${PISO_AA}:1\n`);
if (linhas.length) console.log(linhas.join("\n"));

if (reprovados.length) {
  console.error(`\n${reprovados.length} combinação(ões) reprovada(s). O TOKEN muda, não o piso.`);
  process.exit(1);
}
console.log("Todas as combinações passam.");
