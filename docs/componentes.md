# Componentes

Tudo o que o pacote exporta, com o contrato de cada peça. Os tokens estão em
[`tokens.md`](tokens.md).

```tsx
import { Button, Card, Input } from "@lincecorp/design-system";
```

> **A regra que atravessa tudo:** o pacote é dono de layout, comportamento e
> aparência; o produto é dono de conteúdo e política.

---

## Casca

### `AppShell`

A moldura das telas autenticadas: barra lateral no desktop, gaveta no celular,
barra superior, barra inferior, salto para o conteúdo.

| Prop | Tipo | Obrigatória | O que faz |
|---|---|:-:|---|
| `nav` | `NavModel` | ✅ | os grupos e itens do menu |
| `logo` | `ReactNode` | ✅ | a marca por extenso, na barra expandida |
| `marcaCompacta` | `ReactNode` | ✅ | a marca reduzida, na barra colapsada |
| `perfil` | `PerfilDaCasca` | ✅ | nome, e-mail, avatar e o que fazer ao sair |
| `fixada` | `boolean` | ✅ | barra fixada — **controlado pelo produto** |
| `aoAlternarFixada` | `() => void` | ✅ | o produto persiste onde quiser |
| `tema` | `TemaDaCasca` | | ausente, não desenha o botão de tema |
| `acoesRapidas` | `AcaoRapida[]` | | ausentes, a seção não existe |
| `filtrarItem` | `(item) => boolean` | | apresentação, **nunca** controle de acesso |
| `titulo` | `string` | | onde a pessoa está, na barra superior |
| `topbarExtra` | `ReactNode` | | sino, busca, seletor — à direita |
| `children` | `ReactNode` | | o conteúdo da rota |

```tsx
<AppShell
  nav={nav}
  logo={<Logotipo className="h-5 w-auto" />}
  marcaCompacta="L"
  perfil={{ nome, email, aoSair }}
  tema={{ resolvido, alternar }}
  fixada={fixada}
  aoAlternarFixada={() => setFixada((f) => !f)}
  topbarExtra={<SinoDeNotificacoes />}
>
  <Outlet />
</AppShell>
```

**Comportamento que vem junto:** colapso com fixação e expansão no passar do
mouse; gaveta que é `role="dialog" aria-modal`, fecha no `Esc` e **devolve o
foco a quem a abriu**; salto para o conteúdo como primeiro elemento focável;
barra inferior com no máximo quatro itens mais "Mais".

### `Sidebar`, `Topbar`, `BottomNav`

Exportadas para quem precisar montar uma casca diferente. Quem usa `AppShell`
não as instancia — ele já as monta.

### `PageHeader`

| Prop | Tipo | O que faz |
|---|---|---|
| `titulo` | `string` | vira o `<h1>` da página |
| `descricao` | `string` | uma linha sob o título |
| `acoes` | `ReactNode` | botões à direita |

### `RodapeLince` e `Logotipo`

A assinatura "Desenvolvido por Lince" e a palavra em vetor. `Logotipo` pinta em
`currentColor` — a mesma peça serve de assinatura branca sobre o roxo e de marca
escura sobre fundo claro. `decorativo` some com ela para o leitor de tela,
quando o nome já estiver escrito ao lado.

### Navegação

```ts
interface NavItem {
  group: string;      // referencia NavGroupDef.id
  to: string;
  label: string;
  icon: LucideIcon;   // o COMPONENTE, não o nome
  bottom?: boolean;   // concorre a lugar na barra inferior
  end?: boolean;      // casa a rota exata, sem os filhos
}
```

`end` importa em rota com filho: sem ele, `/laudos` fica marcada como ativa em
`/laudos/:id`.

Auxiliares: `itensVisiveis`, `itensDaBarraInferior`, `gruposComItens`,
`MAX_BARRA_INFERIOR`.

---

## Ação

### `Button`

| Prop | Tipo | Padrão |
|---|---|---|
| `variante` | `primario \| secundario \| texto \| perigo \| fantasma` | `primario` |
| `tamanho` | `sm \| md \| lg \| icone` | `md` |
| `icone` | `ReactNode` | — |
| `carregando` | `boolean` | `false` |

```tsx
<Button icone={<Plus size={16} />}>Nova solicitação</Button>
<Button variante="secundario" tamanho="sm">Cancelar</Button>
<Button variante="perigo" carregando>Excluir</Button>
<Button tamanho="icone" variante="fantasma" aria-label="Fechar"><X size={18} /></Button>
```

- `type` padrão é **`button`**, não `submit`. Dentro de um formulário, o padrão
  do HTML enviava o formulário inteiro sem querer.
- `carregando` desabilita, marca `aria-busy` e troca o ícone por um giro — **o
  rótulo não muda**, porque trocá-lo muda a largura do botão no meio do clique.
- `tamanho="icone"` **exige `aria-label`**: não há rótulo visível.
- Largura não é papel do botão. Linha inteira é `className="w-full"`.

---

## Formulário

Todos usam a mesma moldura (`Campo`), que resolve de uma vez o rótulo ligado por
`htmlFor`, a ajuda e o erro em `aria-describedby`, e o `aria-invalid`.

**O `id` não é aceito de fora.** Ele nasce na moldura; aceitá-lo permitiria
trocar o do campo sem trocar o do rótulo, e a associação quebraria em silêncio.

### `Input`, `Textarea`, `Select`

| Prop | Tipo | O que faz |
|---|---|---|
| `rotulo` | `string` | obrigatório — campo sem rótulo é campo sem nome |
| `ajuda` | `string` | uma linha explicando o que se espera |
| `erro` | `string` | presente, marca inválido e anuncia por `role="alert"` |
| `rotuloOculto` | `boolean` | esconde da vista, mantém para o leitor de tela |
| `icone` | `ReactNode` | só `Input` — decorativo, à esquerda |
| `sufixo` | `ReactNode` | só `Input` — controle de verdade, à direita |
| `opcoes` | `OpcaoDeSelect[]` | só `Select` |
| `vazio` | `string` | só `Select` — o texto da opção em branco |

```tsx
<Input rotulo="E-mail" type="email" erro={erros.email} />
<Textarea rotulo="Descrição" ajuda="O que foi observado no local." />
<Select rotulo="Situação" vazio="Todas" opcoes={[{ valor: "a", rotulo: "Aberta" }]} />
```

`Select` é `<select>` nativo de propósito: no celular abre a roda do sistema,
que é maior, rola melhor e já é acessível.

### `Checkbox`

Escolha que vale **quando o formulário é enviado**. A área de toque é o rótulo
inteiro.

### `Switch`

Ação que surte efeito **na hora**. É `role="switch"`, não caixa de marcação —
o leitor de tela anuncia os dois de formas diferentes, e usar o errado promete
um "salvar" que não existe.

```tsx
<Switch
  rotulo="Laudo disponível"
  ajuda="Quando uma inspeção do seu contrato é entregue."
  ligado={prefs.entrega}
  aoAlternar={(v) => salvar({ entrega: v })}
/>
```

---

## Superfície

### `Card`

| Prop | Tipo | O que faz |
|---|---|---|
| `titulo` | `string` | vira `<h2>` |
| `descricao` | `string` | uma linha sob o título |
| `acoes` | `ReactNode` | botões no canto |
| `semPreenchimento` | `boolean` | para card que contém tabela ou lista |
| `interativo` | `boolean` | realce da marca ao passar o mouse |

A separação do fundo é por **linha**, não por sombra: com dezenas de cards numa
tela, sombra em todos vira sujeira cinza em volta de tudo.

### `EstadoVazio`

Para que "não há nada aqui" nunca seja uma tela em branco. A `descricao` diz o
motivo — e jamais insinua que existe algo que a pessoa não está vendo.

### `Separador`

Linha entre blocos, com rótulo opcional no meio.

---

## Sinal

### `Badge`

| Prop | Tipo | Padrão |
|---|---|---|
| `tom` | `neutro \| marca \| sucesso \| aviso \| perigo \| info` | `neutro` |
| `solido` | `boolean` | `false` (contornado) |
| `comPonto` | `boolean` | `false` |

**A cor nunca é a única portadora da informação** — o selo sempre tem texto.

### `Alerta`

Aviso em bloco, dentro do fluxo. `role="alert"` só no tom `perigo`: o papel
interrompe o leitor de tela, e usá-lo num aviso informativo transforma toda
visita à página numa interrupção.

### `Progress`

`rotulo` é obrigatório e vira o nome acessível. O valor é limitado ao intervalo
— um progresso de 120 % desenha uma barra que vaza do container.

### `Spinner` e `Skeleton`

`Spinner` exige `rotulo`: um giro sem nome é anunciado como "imagem".
`Skeleton` é decoração (`aria-hidden`) e ocupa **a altura aproximada do que vai
substituí-lo**, para que a tela não salte quando o conteúdo chega.

### `Avatar`

Sem imagem, desenha as iniciais sobre o roxo — nunca um ícone genérico de
pessoa: numa lista, vinte silhuetas iguais não distinguem ninguém.

---

## Sobreposição

### `Dialogo`

Usa o `<dialog>` **nativo**, com `showModal()`. É o que dá de graça, e correto,
o que costuma ser reimplementado errado: prisão de foco, fechamento no `Esc`,
fundo inerte, devolução de foco e camada acima de qualquer `z-index`.

| Prop | Tipo | O que faz |
|---|---|---|
| `aberto` | `boolean` | controlado pelo produto |
| `aoFechar` | `() => void` | chamado pelo X, pelo `Esc` e pelo clique no fundo |
| `titulo` | `string` | vira o nome acessível |
| `descricao` | `string` | uma linha sob o título |
| `acoes` | `ReactNode` | rodapé |
| `largura` | `sm \| md \| lg` | `md` |

### `DialogoDeConfirmacao`

O botão que confirma leva um **verbo** — "Enviar", "Excluir" —, nunca "OK": com
dois botões, "OK" e "Cancelar" obrigam a reler o título para saber qual é qual.
A `descricao` diz a **consequência**, não a ação.

```tsx
<DialogoDeConfirmacao
  aberto={aberto}
  aoFechar={fechar}
  aoConfirmar={enviar}
  titulo="Enviar respostas?"
  descricao="Depois de enviar, as respostas não poderão ser alteradas."
  rotuloDeConfirmar="Enviar"
/>
```

### `Tooltip`

Aparece no `hover` **e no `focus-within`**. É **descrição**, não nome: um botão
de ícone continua precisando de `aria-label`.

### `Tabs`

`role="tablist"` com `aria-selected` e tabulação móvel — só a aba ativa entra na
ordem de tabulação, e as setas andam entre elas. Quem renderiza o painel liga
`aria-labelledby` ao `id` da aba.

---

## Utilitário

`cn(...classes)` junta classes descartando o que for falsy. Sem
`tailwind-merge`: duas classes do mesmo eixo (`px-4` e `px-5`) não se resolvem
por precedência, e sim pela ordem em que o Tailwind emitiu as regras. Por isso
tamanho e espaçamento saem de prop, nunca de `className` do chamador.
