# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
versionamento [SemVer](https://semver.org/lang/pt-BR/).

Cada entrada diz o que muda de **aparência**, e não só o que muda de código:
quem atualiza a dependência precisa saber o que vai parecer diferente.

## [Não publicado]

## [0.3.0]

### Adicionado

- **As animações da marca**, em `tokens/animacoes.css`: `lince-pulse`,
  `lince-entrada`, `lince-entrada-lista`, `lince-camada` (com origem por lado),
  `lince-veu`, `lince-pressiona` e `lince-esqueleto`. Todas usam `--dur*` e
  `--ease-out`, então todas param sozinhas quando o sistema pede menos
  movimento.
- `--stage-tint`, quanto da cor do estágio tinge o fundo da coluna — mais no
  escuro que no claro, porque sobre fundo quase preto a mesma porcentagem quase
  não aparece.

## [0.2.2]

### Alterado

- **O conteúdo do `Dialogo` só existe enquanto ele está aberto.** Um `<dialog>`
  fechado continua com os filhos no DOM, e um formulário escondido ali duplica
  cada rótulo da página. O navegador esconde isso da árvore de acessibilidade,
  mas qualquer coisa que leia o DOM direto — teste, extração, leitor de tela mal
  configurado — via os dois.

## [0.2.1]

### Corrigido

- **As classes dos componentes não eram geradas no consumidor.** O Tailwind não
  varre `node_modules` na detecção automática, então a casca chegava sem estilo
  nenhum — sem largura de barra lateral, sem o `md:block` que a mostra no
  desktop. Não havia erro: é o mesmo silêncio de um token que falta. O
  `theme.css` passa a declarar `@source "./dist/index.js"`, que vale para todo
  consumidor sem nenhuma configuração do lado dele.

## [0.2.0]

O design system fica **completo**: os primitivos de interface entram, e o que
estava marcado como fora de escopo na primeira versão passa a ser o miolo.

### Adicionado

- **Vinte primitivos**, sem nenhuma biblioteca de componente por baixo:
  `Button`, `Campo`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`,
  `Card`, `Badge`, `Alerta`, `EstadoVazio`, `Separador`, `Avatar`, `Progress`,
  `Spinner`, `Skeleton`, `Tooltip`, `Tabs`, `Dialogo` e
  `DialogoDeConfirmacao`. O diálogo usa o `<dialog>` nativo, a escolha usa
  `<select>` nativo, e a dica é CSS.
- `docs/componentes.md` e `docs/tokens.md` — a referência completa, peça por
  peça, com o porquê de cada decisão.
- `--color-brand`: o roxo da marca **já adaptado ao tema**, para uso em texto e
  borda.
- Apelidos de elevação por papel: `shadow-card`, `shadow-dialog`, `shadow-nav`.
- `--color-bg`, apelido de `sunken`, para bloco rebaixado dentro de um card.

### Corrigido

- `text-brand`, `border-brand` e `bg-brand` não geravam regra nenhuma: existiam
  os nove degraus da marca, mas não o token sem degrau que essas classes pedem.
  O Tailwind não avisa — a cor simplesmente não aparece.
- A escala de elevação tinha sido renomeada para `--shadow-1..4` sem manter os
  apelidos por papel, o que apagava a sombra de todo card em silêncio.

## [0.1.2]

Nada muda de aparência.

### Adicionado

- `./package.json` nos `exports`, que várias ferramentas esperam poder ler.

### Alterado

- O repositório é público, e a instalação é por tag git — sem registro, sem
  token, sem `.npmrc`.

## [0.1.1]

Primeira versão **publicada**. Nada muda de aparência.

### Corrigido

- O pacote não era consumível: o bun não autentica dependência git de
  repositório privado do GitHub — ele roteia toda dependência `github:` pela
  API de tarball e não envia credencial, em qualquer das cinco formas testadas.
  O repositório passou a ser público, e a instalação volta a ser por tag git.

## [0.1.0]

Primeira versão. Nasce da convergência de três definições divergentes do mesmo
design system.

### Adicionado

- Camada de tokens modular: dez arquivos em `tokens/`, um por assunto, e um
  `theme.css` que só os importa.
- Casca de navegação parametrizada: `AppShell`, `Sidebar`, `Topbar`,
  `BottomNav`, `PageHeader`, `RodapeLince`.
- Portões de CI: contraste WCAG AA medido em todo par token × superfície, e
  verificação de token usado × token declarado.

### Muda de aparência, para quem vinha das definições anteriores

- **Fundo neutro.** Claro passa de `#f8f9fa` para `#ffffff`; escuro, de
  `#1e1e2e` para `#0b0b0d`. O roxo sai do fundo e continua inteiro no que é
  ação e identidade — marca em cada pixel de fundo deixa de ser identidade e
  vira tinta, e toda foto, gráfico e selo de status brigava com ela.
- **Três raios encolhem:** `chip` 20→14 px, `badge` 8→5 px, `dialog` 20→14 px.
  `card` (14) e `button` (10) não mudam.
- **Uma superfície nova:** `--bg-sunken`, para o que é rebaixado — coluna,
  trilho de aba. O que contém não pode competir com o que é contido.
