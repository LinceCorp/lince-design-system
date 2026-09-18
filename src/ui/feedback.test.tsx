import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, iniciaisDe } from "./Avatar";
import { Progress } from "./Progress";
import { Separador } from "./Separador";
import { Skeleton } from "./Skeleton";
import { Spinner } from "./Spinner";

describe("Avatar", () => {
  it("sem imagem, desenha as iniciais", () => {
    render(<Avatar nome="Teste Demo" />);
    expect(screen.getByText("TD")).toBeVisible();
  });

  // Atenção: numa lista onde o nome já está escrito ao lado, repeti-lo no alt
  // faz o leitor de tela dizer tudo duas vezes.
  it("com imagem, o alt é vazio e o nome vai no title", () => {
    render(<Avatar nome="Teste Demo" url="/x.png" />);
    const img = screen.getByTitle("Teste Demo");
    expect(img).toHaveAttribute("alt", "");
  });

  it("iniciaisDe aguenta nome de uma palavra e nome vazio", () => {
    expect(iniciaisDe("Lince")).toBe("L");
    expect(iniciaisDe("  ")).toBe("?");
    expect(iniciaisDe("ana maria souza")).toBe("AS");
  });
});

describe("Progress", () => {
  it("se anuncia com os três valores", () => {
    render(<Progress valor={3} total={10} rotulo="Respostas" />);
    const barra = screen.getByRole("progressbar", { name: "Respostas" });
    expect(barra).toHaveAttribute("aria-valuenow", "3");
    expect(barra).toHaveAttribute("aria-valuemin", "0");
    expect(barra).toHaveAttribute("aria-valuemax", "10");
  });

  // Atenção: um progresso de 120 % desenha uma barra que vaza do container, e
  // isso acontece toda vez que o total chega depois da contagem.
  it("limita o valor ao intervalo", () => {
    render(<Progress valor={99} total={10} rotulo="X" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "10");
  });

  it("total zero não divide por zero", () => {
    render(<Progress valor={0} total={0} rotulo="X" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("a contagem é opcional", () => {
    const { rerender } = render(<Progress valor={3} total={10} rotulo="X" />);
    expect(screen.queryByText("3 de 10")).not.toBeInTheDocument();
    rerender(<Progress valor={3} total={10} rotulo="X" comContagem />);
    expect(screen.getByText("3 de 10")).toBeVisible();
  });
});

describe("Spinner", () => {
  // Atenção: um giro sem rótulo é anunciado como "imagem" e não diz nada a quem
  // não o vê.
  it("tem nome acessível e papel de estado", () => {
    render(<Spinner rotulo="Carregando inspeções" />);
    expect(screen.getByRole("status", { name: "Carregando inspeções" })).toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  // Atenção: o esqueleto é decoração. Anunciado, ele enche a leitura de "imagem,
  // imagem, imagem" enquanto a página carrega.
  it("some para o leitor de tela", () => {
    const { container } = render(<Skeleton linhas={3} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Separador", () => {
  it("sem rótulo, é decoração", () => {
    const { container } = render(<Separador />);
    expect(container.querySelector("hr")).toHaveAttribute("role", "presentation");
  });

  it("com rótulo, o texto aparece entre as linhas", () => {
    render(<Separador rotulo="ou" />);
    expect(screen.getByText("ou")).toBeVisible();
  });
});
