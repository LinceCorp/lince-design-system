# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
versionamento [SemVer](https://semver.org/lang/pt-BR/).

Cada entrada diz o que muda de **aparência**, e não só o que muda de código:
quem atualiza a dependência precisa saber o que vai parecer diferente.

## [Não publicado]

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
