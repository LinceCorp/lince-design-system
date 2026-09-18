# Tokens

Dez arquivos em `tokens/`, um por assunto, importados por `theme.css`. Editar um
assunto é abrir um arquivo, não caçar dentro de trezentas linhas.

```css
@import "@lincecorp/design-system/theme.css";
```

Cada par claro/escuro é declarado **uma vez**, com `light-dark()`. Duas listas
mantidas em paralelo divergem no primeiro token que alguém esquece — foi
exatamente assim que três definições do mesmo design system se separaram.

---

## Marca — `marca.css`

| Token | Valor | Uso |
|---|---|---|
| `--color-brand-50` … `-800` | nove degraus, âncora `#6F4B99` no 500 | pigmento |
| `--color-brand` | `var(--accent)` | **o roxo já adaptado ao tema** |
| `--marca-1/2/3` | paradas da lavagem | tela de entrada |
| `--auth-canvas` | `#f8f9fa` / `#1e1e2e` | coluna do formulário de entrada |

> `brand-500` é o pigmento; **`brand` é o pigmento que se pode pôr em texto**.
> Sem o token sem degrau, `text-brand` não gera regra nenhuma e a cor
> simplesmente não aparece — em silêncio.

`--auth-canvas` **não** acompanha o canvas de cada produto: a porta de entrada é
comum, e era ela herdar o canvas que fazia cada uma abrir com um fundo diferente.

Utilitários: `fundo-marca` (a lavagem em degradê) e `fundo-auth`.

## Tipografia — `tipografia.css`

Sete degraus nomeados pelo **papel**, não pelo tamanho.

| Token | Tamanho | Para |
|---|---|---|
| `text-micro` | 11px | contadores, selos |
| `text-caption` | 12px | metadado sob o título |
| `text-label` | 13px | rótulo de campo |
| `text-body` | 14px | corpo padrão |
| `text-title` | 18px | título de card |
| `text-display` | 24px | título de página |
| `text-hero` | 34px | número grande |

A escala é apertada de propósito: são produtos de trabalho, e alguém passa o dia
lendo tabela. Salto grande desperdiça altura de tela.

Famílias: `--font-sans` (Inter) no corpo, `--font-display` (Bricolage Grotesque)
nos títulos.

## Raios — `raios.css`

| Escala | Valor | | Apelido por papel | Aponta para |
|---|---|---|---|---|
| `xs` | 3px | | `card` | `xl` (14px) |
| `sm` | 5px | | `button` | `lg` (10px) |
| `md` | 7px | | `control` | `md` (7px) |
| `lg` | 10px | | `chip` | `xl` (14px) |
| `xl` | 14px | | `badge` | `sm` (5px) |
| | | | `dialog` | `xl` (14px) |

A escala anterior (6/10/14/20/28) arredondava tudo o tempo todo, e num produto
com tabela densa isso vira ruído — o olho perde a linha reta que separa uma
célula da outra. Esta é metade.

Os apelidos existem para que o JSX leia `rounded-card`: o papel é estável, o
valor é que se ajusta.

## Superfícies — `superficies.css`

| Token | Claro | Escuro |
|---|---|---|
| `--bg-canvas` | `#ffffff` | `#0b0b0d` |
| `--bg-surface` | `#ffffff` | `#151517` |
| `--bg-elevated` | `#ffffff` | `#1e1e21` |
| `--bg-sunken` | `#f4f4f5` | `#070708` |

O fundo é **neutro**. Marca em cada pixel de fundo deixa de ser identidade e
vira tinta: toda foto, gráfico e selo de status brigava com ela. O que separa
card de fundo é a **linha**.

`sunken` é o painel **rebaixado** — coluna, trilho de aba, bloco de citação:
mais fundo que o canvas em vez de mais alto, porque o que contém não pode
competir com o que é contido. `bg-bg` é apelido dele.

Utilitários: `bg-canvas`, `bg-surface`, `bg-elevated`, `bg-sunken`, `bg-input`,
`text-fg`, `text-fg-muted`, `text-fg-subtle`, `border-line`,
`border-line-subtle`, `text-accent`, `text-accent-strong`, `text-brand`.

## Estado — `estado.css`

`success`, `warning`, `danger`, `info` — cada um com valor **medido por tema**.
Os quatro já tiveram o mesmo valor nos dois, e esse era o defeito: os tons do
escuro reprovavam em AA sobre branco.

O erro tem três tokens, não um: `--status-danger` (texto sobre a tela),
`--status-danger-surface` (o fundo tingido do aviso) e `--status-danger-strong`
(o texto **dentro** do aviso). Uma porcentagem cega da cor de texto dá tom
lavado no claro e sujo no escuro.

## Elevação — `sombras.css`

`shadow-1` a `shadow-4`, mais os apelidos `shadow-card`, `shadow-dialog` e
`shadow-nav`.

> Sombra significa **uma** coisa: isto flutua sobre o resto e vai embora. O que
> está no fluxo — card, cabeçalho, coluna — separa-se por **linha**.

## Movimento — `movimento.css`

`--dur-fast` (120ms), `--dur` (180ms), `--dur-slow` (280ms), `--ease-out`.

As durações **zeram no token** em `prefers-reduced-motion`. Zerar ali é o que
faz a preferência valer para tudo, inclusive para a transição que alguém
escrever amanhã.

## Camadas — `camadas.css`

`--z-drag` (10) · `sticky` (20) · `dropdown` (30) · `sidebar` (40) · `drawer`
(50) · `assistant` (60) · `modal` (70) · `palette` (80) · `skip` (90) · `toast`
(100).

Antes eram literais conflitantes: `z-30` servia ao mesmo tempo para menu
suspenso e para o fundo da gaveta, e o empilhamento dependia da ordem no DOM.

Aqui também: `--sidebar-w` (229px) e `--sidebar-w-collapsed` (64px).

## Domínio — `dominio.css`

Cor que significa um **dado**, não um estado de interface — e por isso atravessa
produtos.

- Severidade: `sev-baixa`, `sev-media`, `sev-alta`, `sev-critica`
- Séries de gráfico: `serie-1`, `serie-2`, `serie-3` — atribuídas em ordem fixa
  e nunca recicladas; uma quarta série vira "Outros"
- Rampa de estágio: `--stage-inicio`, `--stage-fim`

As cores de status são reservadas e **não** entram em gráfico: verde de sucesso
num gráfico faz a categoria parecer um julgamento.

## Base — `base.css`

`body`, títulos em `--font-display`, `:focus-visible` com contorno de 2px, a
correção do autofill do Chrome (que pinta o campo de amarelo por cima de
qualquer `background-color`) e o corte global de movimento.

---

## Tema escuro

Um variant só, que cobre os dois gatilhos:

```css
@custom-variant dark {
  &:where([data-theme="dark"], [data-theme="dark"] *) { @slot; }
  @media (prefers-color-scheme: dark) {
    &:where(:root:not([data-theme="light"]), …) { @slot; }
  }
}
```

A trava manual só troca o `color-scheme` — todo token responde por
`light-dark()`, então não há segunda paleta para manter em sincronia.

## Os dois portões

```bash
bun run tokens:contraste   # WCAG AA em todo par token × superfície
bun run tokens:usados      # token referenciado que não existe
```

O contraste é **medido**, nunca conferido a olho: alfa é composto sobre o fundo
antes de medir, e superfície translúcida é composta sobre as bases reais antes
de virar fundo. Reprovou, **o token muda — não o piso**.
