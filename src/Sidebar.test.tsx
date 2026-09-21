import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FileText, Settings, Plus } from "lucide-react";
import { Sidebar } from "./Sidebar";
import type { NavModel } from "./nav";

const nav: NavModel = {
  groups: [
    { id: "trabalho", label: "Trabalho" },
    { id: "ajustes", label: "Ajustes" },
  ],
  items: [
    { group: "trabalho", to: "/inspecoes", label: "Inspeções", icon: FileText, bottom: true },
    { group: "ajustes", to: "/configuracoes", label: "Configurações", icon: Settings },
  ],
};

const perfil = { nome: "Teste Demo", email: "teste@lincehub.com.br", aoSair: vi.fn() };

function montar(extra: Record<string, unknown> = {}) {
  return render(
    <MemoryRouter>
      <Sidebar
        nav={nav}
        logo={<span>Lince</span>}
        marcaCompacta={<span>L</span>}
        perfil={perfil}
        {...extra}
      />
    </MemoryRouter>,
  );
}

describe("Sidebar", () => {
  it("expandida mostra o rótulo de cada item e o nome de cada grupo", () => {
    montar();
    expect(screen.getByText("Inspeções")).toBeVisible();
    expect(screen.getByText("Configurações")).toBeVisible();
    expect(screen.getByRole("navigation", { name: "Trabalho" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Ajustes" })).toBeInTheDocument();
  });

  // Atenção: colapsada, o rótulo sai da vista mas NÃO some da árvore de
  // acessibilidade. Esconder com `hidden` deixava os links sem nome acessível,
  // e quem usa leitor de tela ouvia uma lista de "link, link, link".
  it("colapsada mantém o nome acessível de cada link", () => {
    montar({ colapsada: true });
    expect(screen.getByRole("link", { name: "Inspeções" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Configurações" })).toBeInTheDocument();
  });

  it("o filtro do produto remove o item", () => {
    montar({ filtrarItem: (i: { to: string }) => i.to !== "/configuracoes" });
    expect(screen.queryByText("Configurações")).not.toBeInTheDocument();
  });

  // Atenção: o grupo que perde o último item não pode deixar o cabeçalho de
  // seção sozinho na barra.
  it("o grupo que fica sem item não é renderizado", () => {
    montar({ filtrarItem: (i: { to: string }) => i.to !== "/configuracoes" });
    expect(screen.queryByRole("navigation", { name: "Ajustes" })).not.toBeInTheDocument();
  });

  it("aoNavegar dispara ao clicar num item — é o que fecha a gaveta no celular", async () => {
    const aoNavegar = vi.fn();
    montar({ aoNavegar });
    await userEvent.click(screen.getByRole("link", { name: "Inspeções" }));
    expect(aoNavegar).toHaveBeenCalledOnce();
  });

  it("sem acoesRapidas, a seção inteira some — nada de título vazio", () => {
    montar();
    expect(screen.queryByText("Ações rápidas")).not.toBeInTheDocument();
  });

  it("com acoesRapidas, o botão chama o produto", async () => {
    const aoAcionar = vi.fn();
    montar({ acoesRapidas: [{ id: "nova", label: "Nova OS", icon: Plus, aoAcionar }] });
    await userEvent.click(screen.getByRole("button", { name: "Nova OS" }));
    expect(aoAcionar).toHaveBeenCalledOnce();
  });

  it("sem tema, não desenha o botão de alternar", () => {
    montar();
    expect(screen.queryByRole("button", { name: /alternar tema/i })).not.toBeInTheDocument();
  });

  it("com tema, alternar chama o produto", async () => {
    const alternar = vi.fn();
    montar({ tema: { resolvido: "dark", alternar } });
    await userEvent.click(screen.getByRole("button", { name: /alternar tema/i }));
    expect(alternar).toHaveBeenCalledOnce();
  });

  it("sair chama aoSair", async () => {
    const aoSair = vi.fn();
    montar({ perfil: { ...perfil, aoSair } });
    await userEvent.click(screen.getByRole("button", { name: "Sair" }));
    expect(aoSair).toHaveBeenCalledOnce();
  });

  // Atenção: o pin é opcional porque a gaveta do celular renderiza a mesma
  // barra e lá não existe o que fixar. Desenhá-lo dentro da gaveta oferecia um
  // controle que não fazia nada.
  it("sem aoAlternarFixada, não existe botão de fixar", () => {
    montar();
    expect(screen.queryByRole("button", { name: /fixar menu/i })).not.toBeInTheDocument();
  });

  it("colapsada mostra a marca compacta no lugar do logotipo", () => {
    montar({ colapsada: true });
    expect(screen.getByText("L")).toBeVisible();
    expect(screen.queryByText("Lince")).not.toBeInTheDocument();
  });
});

describe("Sidebar, o rodapé opcional", () => {
  // Atenção: um produto põe o sair no rodapé da barra; outro, dentro do menu do
  // avatar na barra superior. Desenhá-lo sempre dava dois botões de sair na
  // mesma tela.
  it("sem aoSair, não desenha o botão de sair", () => {
    render(
      <MemoryRouter>
        <Sidebar
          nav={nav}
          logo={<span>Lince</span>}
          marcaCompacta={<span>L</span>}
          perfil={{ nome: "Teste Demo" }}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("button", { name: "Sair" })).not.toBeInTheDocument();
  });

  it("sem tema e sem aoSair, o rodapé inteiro some", () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar
          nav={nav}
          logo={<span>Lince</span>}
          marcaCompacta={<span>L</span>}
          perfil={{ nome: "Teste Demo" }}
        />
      </MemoryRouter>,
    );
    expect(container.querySelectorAll("aside > div.border-t")).toHaveLength(0);
  });
});
