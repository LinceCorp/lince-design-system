import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Alerta } from "./Alerta";
import { EstadoVazio } from "./EstadoVazio";

describe("Button", () => {
  it("aciona no clique", async () => {
    const aoClicar = vi.fn();
    render(<Button onClick={aoClicar}>Salvar</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(aoClicar).toHaveBeenCalledOnce();
  });

  // Atenção: sem isto, um duplo clique em "Enviar" mandava duas vezes — e a
  // segunda costuma dar 409.
  it("carregando desabilita e se anuncia como ocupado", () => {
    render(<Button carregando>Enviar</Button>);
    const botao = screen.getByRole("button", { name: /Enviar/ });
    expect(botao).toBeDisabled();
    expect(botao).toHaveAttribute("aria-busy", "true");
  });

  // Atenção: o rótulo NÃO muda ao carregar. Trocá-lo por "Enviando…" muda a
  // largura do botão no meio do clique, e o ponteiro fica sobre outra coisa.
  it("carregando preserva o rótulo", () => {
    render(<Button carregando>Enviar</Button>);
    expect(screen.getByRole("button", { name: /Enviar/ })).toHaveTextContent("Enviar");
  });

  // Atenção: `type` padrão de `<button>` é "submit". Dentro de um formulário,
  // um botão de ação secundária enviava o formulário inteiro sem querer.
  it("o type padrão é button, não submit", () => {
    render(<Button>Qualquer</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("aceita submit explícito", () => {
    render(<Button type="submit">Entrar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("o ícone some ao carregar", () => {
    const { rerender } = render(<Button icone={<span data-testid="ic" />}>X</Button>);
    expect(screen.getByTestId("ic")).toBeInTheDocument();
    rerender(<Button icone={<span data-testid="ic" />} carregando>X</Button>);
    expect(screen.queryByTestId("ic")).not.toBeInTheDocument();
  });
});

describe("Badge", () => {
  // Atenção: a cor nunca é a única portadora da informação. Um ponto colorido
  // sozinho não diz nada a quem não distingue as cores.
  it("sempre carrega o texto, mesmo com ponto", () => {
    render(<Badge tom="sucesso" comPonto>Entregue</Badge>);
    expect(screen.getByText("Entregue")).toBeVisible();
  });
});

describe("Card", () => {
  it("o título vira h2", () => {
    render(<Card titulo="Resumo">conteúdo</Card>);
    expect(screen.getByRole("heading", { level: 2, name: "Resumo" })).toBeInTheDocument();
  });

  it("sem título, não desenha cabeçalho nenhum", () => {
    render(<Card>conteúdo</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});

describe("Alerta", () => {
  // Atenção: `role="alert"` interrompe o leitor de tela. Usá-lo num aviso
  // informativo transforma toda visita à página numa interrupção.
  it("só o tom perigo interrompe quem ouve a página", () => {
    const { rerender } = render(<Alerta tom="info">algo</Alerta>);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    rerender(<Alerta tom="perigo">algo</Alerta>);
    expect(screen.getByRole("alert")).toHaveTextContent("algo");
  });
});

describe("EstadoVazio", () => {
  it("diz o título, o motivo e oferece a ação", () => {
    render(
      <EstadoVazio
        titulo="Nenhum formulário"
        descricao="Nada foi enviado ainda."
        acao={<Button icone={<Plus size={16} />}>Novo</Button>}
      />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Nenhum formulário");
    expect(screen.getByText("Nada foi enviado ainda.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Novo" })).toBeInTheDocument();
  });
});
