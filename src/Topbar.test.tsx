import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Topbar } from "./Topbar";

describe("Topbar", () => {
  // Atenção: no desktop não existe gaveta, e desenhar o botão de menu ali
  // oferecia um controle que não abria nada.
  it("o botão de menu só existe quando há aoAbrirMenu", () => {
    const { rerender } = render(<Topbar />);
    expect(screen.queryByRole("button", { name: /abrir menu/i })).not.toBeInTheDocument();
    rerender(<Topbar aoAbrirMenu={vi.fn()} />);
    expect(screen.getByRole("button", { name: /abrir menu/i })).toBeInTheDocument();
  });

  it("aoAbrirMenu é chamado no clique", async () => {
    const aoAbrirMenu = vi.fn();
    render(<Topbar aoAbrirMenu={aoAbrirMenu} />);
    await userEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    expect(aoAbrirMenu).toHaveBeenCalledOnce();
  });

  it("renderiza o título e o slot extra", () => {
    render(<Topbar titulo="Inspeções" extra={<span>sino</span>} />);
    expect(screen.getByText("Inspeções")).toBeVisible();
    expect(screen.getByText("sino")).toBeVisible();
  });
});
