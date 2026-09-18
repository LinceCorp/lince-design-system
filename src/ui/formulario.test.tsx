import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { Switch } from "./Switch";

describe("Input", () => {
  // Atenção: sem a associação rótulo↔campo o leitor de tela anuncia "campo de
  // edição" e mais nada, e o toque no rótulo não foca o campo no celular.
  it("o rótulo encontra o campo", async () => {
    render(<Input rotulo="E-mail" />);
    await userEvent.type(screen.getByLabelText("E-mail"), "a@b.c");
    expect(screen.getByLabelText("E-mail")).toHaveValue("a@b.c");
  });

  // Atenção: erro que só aparece em vermelho não existe para quem não vê a cor.
  it("o erro é anunciado e marca o campo como inválido", () => {
    render(<Input rotulo="E-mail" erro="E-mail inválido" />);
    expect(screen.getByRole("alert")).toHaveTextContent("E-mail inválido");
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("aria-invalid", "true");
  });

  it("a ajuda é ligada ao campo por aria-describedby", () => {
    render(<Input rotulo="Senha" ajuda="Ao menos 8 caracteres" />);
    const campo = screen.getByLabelText("Senha");
    const ajuda = screen.getByText("Ao menos 8 caracteres");
    expect(campo.getAttribute("aria-describedby")).toContain(ajuda.id);
  });

  it("o ícone é decorativo e não vira nome acessível", () => {
    render(<Input rotulo="Busca" icone={<span data-testid="ic" />} />);
    expect(screen.getByLabelText("Busca")).toBeInTheDocument();
    expect(screen.getByTestId("ic").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("rotuloOculto mantém o nome acessível", () => {
    render(<Input rotulo="Busca" rotuloOculto />);
    expect(screen.getByLabelText("Busca")).toBeInTheDocument();
  });
});

describe("Textarea", () => {
  it("associa rótulo e aceita texto longo", async () => {
    render(<Textarea rotulo="Descrição" />);
    await userEvent.type(screen.getByLabelText("Descrição"), "um parágrafo");
    expect(screen.getByLabelText("Descrição")).toHaveValue("um parágrafo");
  });
});

describe("Select", () => {
  it("lista as opções e respeita a vazia", () => {
    render(
      <Select
        rotulo="Situação"
        vazio="Todas"
        opcoes={[
          { valor: "a", rotulo: "Aberta" },
          { valor: "f", rotulo: "Fechada" },
        ]}
      />,
    );
    expect(screen.getByRole("option", { name: "Todas" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Aberta" })).toBeInTheDocument();
  });

  it("sem `vazio`, não existe opção em branco", () => {
    render(<Select rotulo="Situação" opcoes={[{ valor: "a", rotulo: "Aberta" }]} />);
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });
});

describe("Checkbox", () => {
  // Atenção: a área de toque é o rótulo inteiro. Doze pixels de alvo é abaixo
  // do mínimo de qualquer diretriz de toque.
  it("clicar no rótulo marca a caixa", async () => {
    const aoMudar = vi.fn();
    render(<Checkbox rotulo="Aceito os termos" onChange={aoMudar} />);
    await userEvent.click(screen.getByText("Aceito os termos"));
    expect(aoMudar).toHaveBeenCalledOnce();
  });
});

describe("Switch", () => {
  // Atenção: é `role="switch"`, não checkbox. O leitor de tela anuncia os dois
  // de formas diferentes, e usar o errado promete um "salvar" que não existe.
  it("se anuncia como interruptor, com o estado", () => {
    render(<Switch rotulo="Receber e-mail" ligado aoAlternar={vi.fn()} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("alterna devolvendo o valor oposto", async () => {
    const aoAlternar = vi.fn();
    render(<Switch rotulo="Receber e-mail" ligado={false} aoAlternar={aoAlternar} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(aoAlternar).toHaveBeenCalledWith(true);
  });
});
