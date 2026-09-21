import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FileText, Wrench } from "lucide-react";
import { AppShell } from "./AppShell";
import type { NavModel } from "./nav";

const nav: NavModel = {
  groups: [{ id: "trabalho", label: "Trabalho" }],
  items: [
    { group: "trabalho", to: "/inspecoes", label: "Inspeções", icon: FileText, bottom: true },
    { group: "trabalho", to: "/ordens", label: "Ordens", icon: Wrench },
  ],
};

const perfil = { nome: "Teste Demo", aoSair: vi.fn() };

function montar(extra: Record<string, unknown> = {}) {
  return render(
    <MemoryRouter>
      <AppShell
        nav={nav}
        logo={<span>Lince</span>}
        marcaCompacta={<span>L</span>}
        perfil={perfil}
        fixada
        aoAlternarFixada={vi.fn()}
        {...extra}
      >
        <p>conteúdo da página</p>
      </AppShell>
    </MemoryRouter>,
  );
}

describe("AppShell", () => {
  it("renderiza o conteúdo da rota", () => {
    montar();
    expect(screen.getByText("conteúdo da página")).toBeVisible();
  });

  // Atenção: sem o salto, navegar por teclado obrigava a tabular por todos os
  // itens da barra lateral em TODA troca de tela.
  it("o salto para o conteúdo é o primeiro elemento focável", async () => {
    montar();
    await userEvent.tab();
    expect(screen.getByRole("link", { name: /pular para o conteúdo/i })).toHaveFocus();
  });

  it("o salto aponta para o main, e o main é alvo de foco", () => {
    montar();
    expect(screen.getByRole("link", { name: /pular para o conteúdo/i })).toHaveAttribute(
      "href",
      "#conteudo",
    );
    // `tabIndex={-1}` torna o <main> alvo do salto sem entrar na ordem normal
    // de tabulação. Sem ele, o link só rola a página e o foco fica para trás.
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
  });

  it("a gaveta é um diálogo modal de verdade", async () => {
    montar();
    await userEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    const gaveta = screen.getByRole("dialog", { name: /navegação/i });
    expect(gaveta).toHaveAttribute("aria-modal", "true");
  });

  it("a gaveta fecha no Esc", async () => {
    montar();
    await userEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /navegação/i })).not.toBeInTheDocument();
  });

  // Atenção: sem isto, fechar a gaveta jogava o foco no <body>, e quem navega
  // por teclado recomeçava do topo da página a cada abertura de menu.
  it("ao fechar, a gaveta devolve o foco a quem a abriu", async () => {
    montar();
    const botao = screen.getByRole("button", { name: /abrir menu/i });
    await userEvent.click(botao);
    await userEvent.keyboard("{Escape}");
    expect(botao).toHaveFocus();
  });

  it("clicar num item da gaveta a fecha", async () => {
    montar();
    await userEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    const gaveta = screen.getByRole("dialog", { name: /navegação/i });
    // A consulta é DENTRO da gaveta: no jsdom nenhuma media query se aplica,
    // então a barra do desktop e a da gaveta coexistem no DOM, e uma busca
    // global acharia o link da barra errada.
    const link = within(gaveta).getByRole("link", { name: "Ordens" });
    await userEvent.click(link);
    expect(screen.queryByRole("dialog", { name: /navegação/i })).not.toBeInTheDocument();
  });

  it("repassa o slot da barra superior", () => {
    montar({ topbarExtra: <span>sino</span> });
    expect(screen.getByText("sino")).toBeVisible();
  });

  it("repassa o filtro às duas barras de uma vez", () => {
    montar({ filtrarItem: (i: { to: string }) => i.to !== "/inspecoes" });
    expect(screen.queryByRole("link", { name: "Inspeções" })).not.toBeInTheDocument();
  });
});

describe("AppShell, a barra superior substituída", () => {
  // Atenção: a barra superior é onde os produtos mais divergem — um tem busca
  // global, assistente e menu de avatar; outro tem um sino e mais nada. Isso é
  // conteúdo, e conteúdo é do produto.
  it("topbar substitui a barra padrão e recebe o abridor da gaveta", async () => {
    render(
      <MemoryRouter>
        <AppShell
          nav={nav}
          logo={<span>Lince</span>}
          marcaCompacta={<span>L</span>}
          perfil={perfil}
          fixada
          aoAlternarFixada={vi.fn()}
          titulo="Ignorado"
          topbar={(abrir) => (
            <header>
              <button onClick={abrir}>meu menu</button>
              <span>minha barra</span>
            </header>
          )}
        >
          <p>conteúdo</p>
        </AppShell>
      </MemoryRouter>,
    );
    expect(screen.getByText("minha barra")).toBeVisible();
    expect(screen.queryByText("Ignorado")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "meu menu" }));
    expect(screen.getByRole("dialog", { name: /navegação/i })).toBeInTheDocument();
  });
});
