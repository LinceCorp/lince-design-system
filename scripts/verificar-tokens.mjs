// Confere que todo token referenciado pela casca existe na camada de tokens.
//
// # O que este portão pega
//
// Um componente escreve `z-[var(--z-sidebar)]` ou `w-(--sidebar-w)`. Se o token
// não existir, o CSS resolve para VAZIO — sem erro, sem aviso, sem build
// quebrado. A barra lateral simplesmente fica com largura zero, ou empilhada
// atrás do conteúdo, e o defeito só aparece no navegador de alguém.
//
// Renomear um token na camada de CSS sem atualizar quem o usa produz o mesmo
// silêncio. É por isso que a verificação é automática, e não revisão.
//
// # O que este portão NÃO pega, de propósito
//
// Token declarado e não usado AQUI não é erro: a maior parte deles existe para
// os produtos, não para a casca. `--sev-critica` e `--serie-3` não aparecem em
// nenhum componente deste pacote, e é assim que tem de ser.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PASTA_TOKENS = "tokens";
const PASTA_FONTE = "src";

/** Lê todos os `--nome:` declarados na camada de tokens. */
function declarados() {
  const nomes = new Set();
  for (const arquivo of readdirSync(PASTA_TOKENS)) {
    if (!arquivo.endsWith(".css")) continue;
    const css = readFileSync(join(PASTA_TOKENS, arquivo), "utf8");
    for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:/gi)) nomes.add(m[1]);
  }
  return nomes;
}

/**
 * Lê todo `--nome` referenciado no fonte.
 *
 * Duas formas aparecem no JSX, e as duas contam: `var(--x)`, dentro de
 * `z-[…]`, e a abreviação do Tailwind 4, `w-(--x)`.
 */
function referenciados() {
  const usos = new Map();
  const arquivos = readdirSync(PASTA_FONTE).filter(
    (a) => (a.endsWith(".tsx") || a.endsWith(".ts")) && !a.includes(".test."),
  );
  for (const arquivo of arquivos) {
    const fonte = readFileSync(join(PASTA_FONTE, arquivo), "utf8");
    for (const m of fonte.matchAll(/var\(\s*(--[a-z0-9-]+)|[a-z-]+\((--[a-z0-9-]+)\)/gi)) {
      const nome = m[1] ?? m[2];
      if (!nome) continue;
      if (!usos.has(nome)) usos.set(nome, new Set());
      usos.get(nome).add(arquivo);
    }
  }
  return usos;
}

const tokens = declarados();
const usos = referenciados();
const ausentes = [];

for (const [nome, arquivos] of usos) {
  if (!tokens.has(nome)) ausentes.push(`  ${nome} — usado em ${[...arquivos].join(", ")}`);
}

console.log(`Tokens: ${tokens.size} declarados, ${usos.size} referenciados pela casca.\n`);

if (ausentes.length) {
  console.error("Token referenciado que NÃO existe na camada de tokens:\n");
  console.error(ausentes.join("\n"));
  console.error("\nO CSS resolveria isso para vazio, em silêncio.");
  process.exit(1);
}
console.log("Todo token referenciado existe.");
