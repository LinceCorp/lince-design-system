import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialogo } from "./Dialogo";
import { DialogoDeConfirmacao } from "./DialogoDeConfirmacao";
import { Tabs } from "./Tabs";
import { Tooltip } from "./Tooltip";

describe("Dialogo", () => {
  it("fechado não aparece; aberto, sim", () => {
    const { rerender } = render(
      <Dialogo aberto={false} aoFechar={vi.fn()} titulo="Editar">corpo</Dialogo>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(<Dialogo aberto aoFechar={vi.fn()} titulo="Editar">corpo</Dialogo>);
    expect(screen.getByRole("dialog", { name: "Editar" })).toBeInTheDocument();
  });

  it("o botão de fechar chama aoFechar", async () => {
    const aoFechar = vi.fn();
    render(<Dialogo aberto aoFechar={aoFechar} titulo="Editar">corpo</Dialogo>);
    await userEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(aoFechar).toHaveBeenCalledOnce();
  });

  // Atenção: sem interceptar o `cancel`, o Esc fecha o <dialog> nativo mas o
  // estado do produto continua dizendo "aberto" — e o diálogo fica impossível
  // de reabrir.
  it("o Esc avisa o produto, em vez de fechar pelas costas dele", () => {
    const aoFechar = vi.fn();
    render(<Dialogo aberto aoFechar={aoFechar} titulo="Editar">corpo</Dialogo>);
    const dialogo = screen.getByRole("dialog");
    dialogo.dispatchEvent(new Event("cancel", { bubbles: true, cancelable: true }));
    expect(aoFechar).toHaveBeenCalledOnce();
  });
});

describe("DialogoDeConfirmacao", () => {
  // Atenção: o botão que confirma leva um VERBO, nunca "OK" — com dois botões,
  // "OK" e "Cancelar" obrigam a reler o título para saber qual é qual.
  it("usa o verbo pedido e confirma", async () => {
    const aoConfirmar = vi.fn();
    render(
      <DialogoDeConfirmacao
        aberto
        aoFechar={vi.fn()}
        aoConfirmar={aoConfirmar}
        titulo="Enviar respostas?"
        descricao="Depois de enviar, as respostas não poderão ser alteradas."
        rotuloDeConfirmar="Enviar"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(aoConfirmar).toHaveBeenCalledOnce();
  });

  it("carregando trava os dois botões", () => {
    render(
      <DialogoDeConfirmacao
        aberto
        aoFechar={vi.fn()}
        aoConfirmar={vi.fn()}
        titulo="X"
        descricao="Y"
        carregando
      />,
    );
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeDisabled();
  });
});

describe("Tabs", () => {
  const abas = [
    { id: "a", rotulo: "A responder", contagem: 3 },
    { id: "b", rotulo: "Respondidos" },
  ];

  it("marca a ativa e só ela entra na tabulação", () => {
    render(<Tabs abas={abas} ativa="a" aoTrocar={vi.fn()} rotulo="Filtro" />);
    expect(screen.getByRole("tab", { name: /A responder/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Respondidos" })).toHaveAttribute("tabindex", "-1");
  });

  // Atenção: sem as setas, o leitor de tela anuncia um tablist que não se
  // comporta como tablist — e a pessoa tabula por todas as abas para chegar ao
  // conteúdo.
  it("a seta direita avança e dá a volta", async () => {
    const aoTrocar = vi.fn();
    render(<Tabs abas={abas} ativa="b" aoTrocar={aoTrocar} rotulo="Filtro" />);
    screen.getByRole("tab", { name: "Respondidos" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(aoTrocar).toHaveBeenCalledWith("a");
  });

  it("mostra a contagem quando há", () => {
    render(<Tabs abas={abas} ativa="a" aoTrocar={vi.fn()} rotulo="Filtro" />);
    expect(screen.getByText("3")).toBeVisible();
  });
});

describe("Tooltip", () => {
  // Atenção: a dica é DESCRIÇÃO, não nome. Um botão de ícone continua
  // precisando de aria-label — trocá-lo pela dica deixa o botão sem nome.
  it("liga a dica por aria-describedby, sem virar o nome", () => {
    render(
      <Tooltip texto="Fixar menu">
        <button aria-label="Fixar">x</button>
      </Tooltip>,
    );
    const dica = screen.getByRole("tooltip");
    expect(screen.getByRole("button", { name: "Fixar" })).toBeInTheDocument();
    expect(dica).toHaveTextContent("Fixar menu");
  });
});

describe("Dialogo, o conteúdo fechado", () => {
  // Atenção: um <dialog> fechado continua com os filhos no DOM. Um formulário
  // escondido ali duplica cada rótulo da página — e qualquer coisa que leia o
  // DOM direto vê os dois.
  it("fechado, não deixa os filhos no DOM", () => {
    render(
      <Dialogo aberto={false} aoFechar={vi.fn()} titulo="Editar">
        <label htmlFor="x">Nome</label>
      </Dialogo>,
    );
    expect(screen.queryByText("Nome")).not.toBeInTheDocument();
    expect(screen.queryByText("Editar")).not.toBeInTheDocument();
  });
});
