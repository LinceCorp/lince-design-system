# Lince Design System

Os tokens visuais e a casca de navegação da Lince, em um lugar só, consumidos
pelos produtos web da organização:

- `lince-inspections-client` — painel do cliente final
- `lince-crm` — CRM
- `lince-inspection-manager` — painel do gestor

## Por que este repositório existe

Existiam **três definições do mesmo design system**, e elas divergiram sem que
ninguém decidisse isso: raios, escala tipográfica, sombras, camadas e até a cor
do fundo tinham valores diferentes em cada produto. A documentação canônica de
então — 1240 linhas de Markdown no painel do gestor — chegou a descrever por
meses um Tailwind v3 que já não existia.

Prosa que descreve token diverge do token. A fonte da verdade passa a ser
**código que os três importam**.

## Instalação

O pacote **não é publicado em registro**. A distribuição é por **tag git**:

```bash
bun add github:LinceCorp/lince-design-system#v0.1.0
```

Não há passo de build no consumidor: o `dist/` é versionado neste repositório,
justamente para que instalar por dependência git baste.

`react`, `react-dom`, `react-router-dom` e `lucide-react` são **peer
dependencies** — cada produto continua dono das versões, e o React não se
duplica no bundle.

## Uso

### Os tokens

No CSS de entrada do produto, uma linha:

```css
@import "@lincecorp/design-system/theme.css";
```

Ela traz o `@import "tailwindcss"`, o variant de tema escuro e os dez arquivos
de token. Para mexer em um assunto isolado, importe só ele:

```css
@import "@lincecorp/design-system/tokens/raios.css";
```

### A casca

```tsx
import { AppShell, type NavModel } from "@lincecorp/design-system";
import { FileText, Wrench } from "lucide-react";

const nav: NavModel = {
  groups: [{ id: "trabalho", label: "Trabalho" }],
  items: [
    { group: "trabalho", to: "/inspecoes", label: "Inspeções", icon: FileText, bottom: true, end: true },
    { group: "trabalho", to: "/ordens-de-servico", label: "Ordens de serviço", icon: Wrench, bottom: true },
  ],
};

<AppShell
  nav={nav}
  logo={<Logotipo />}
  marcaCompacta={<span>L</span>}
  perfil={{ nome: usuario.nome, email: usuario.email, aoSair: sair }}
  tema={{ resolvido, alternar }}
  fixada={fixada}
  aoAlternarFixada={alternarFixada}
  topbarExtra={<SinoDeNotificacoes />}
>
  <Outlet />
</AppShell>
```

A casca **não conhece contexto nenhum**. Autenticação, tema, papéis, feature
flags e persistência entram por prop, e é o produto que decide cada um. A regra
que separa os dois lados:

> O pacote é dono de **layout, comportamento e aparência**.
> O produto é dono de **conteúdo e política**.

`filtrarItem` é apresentação, nunca controle de acesso: esconder um item não
protege a rota — isso é dos guards de cada produto.

## Desenvolvimento

```bash
bun install
bun run test              # Vitest + Testing Library, jsdom
bun run tokens:contraste  # WCAG AA em todo par token × superfície
bun run tokens:usados     # token usado existe; token órfão é acusado
bun run typecheck
bun run build             # ESM + .d.ts em dist/
bun run ci                # tudo acima, na ordem
```

### Versionamento

Tag semver, aplicada depois de `bun run ci` passar:

- **minor** — token novo, ou mudança de valor de token
- **major** — remoção ou renomeação de token, mudança de assinatura de componente

O `CHANGELOG.md` nomeia o que mudou de **aparência**, não só o que mudou de
código: quem atualiza a dependência precisa saber o que vai parecer diferente.

### Como um produto sobe de versão

```bash
bun add github:LinceCorp/lince-design-system#v0.2.0
bun run ci   # no produto
```

A trava contra deriva é o `bun.lock`: um produto não fica com tokens diferentes
dos outros sem que isso apareça como diff.
