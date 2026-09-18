import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FileText, Settings } from "lucide-react";
import { BottomNav } from "./BottomNav";
import type { NavModel } from "./nav";

const nav: NavModel = {
  groups: [{ id: "trabalho", label: "Trabalho" }],
  items: [
    { group: "trabalho", to: "/inspecoes", label: "Inspeções", icon: FileText, bottom: true },
    { group: "trabalho", to: "/configuracoes", label: "Configurações", icon: Settings },
  ],
};

describe("BottomNav", () => {
  it("mostra só os itens marcados com bottom", () => {
    render(<MemoryRouter><BottomNav nav={nav} aoMais={vi.fn()} /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Inspeções" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Configurações" })).not.toBeInTheDocument();
  });

  // Atenção: este é o teste que trava o ponto ÚNICO de filtragem. O item some
  // das duas barras, não só da lateral — filtrar numa e esquecer a outra fazia
  // o item escondido reaparecer no celular.
  it("respeita o mesmo filtro da barra lateral", () => {
    render(
      <MemoryRouter>
        <BottomNav nav={nav} filtrarItem={(i) => i.to !== "/inspecoes"} aoMais={vi.fn()} />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("link", { name: "Inspeções" })).not.toBeInTheDocument();
  });

  it("o botão Mais abre a gaveta", async () => {
    const aoMais = vi.fn();
    render(<MemoryRouter><BottomNav nav={nav} aoMais={aoMais} /></MemoryRouter>);
    await userEvent.click(screen.getByRole("button", { name: "Mais" }));
    expect(aoMais).toHaveBeenCalledOnce();
  });
});
