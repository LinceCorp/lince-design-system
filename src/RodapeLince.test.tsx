import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RodapeLince } from "./RodapeLince";
import { Logotipo } from "./Logotipo";

describe("RodapeLince", () => {
  it("assina o produto", () => {
    render(<RodapeLince />);
    expect(screen.getByText("Desenvolvido por")).toBeInTheDocument();
  });

  it("leva ao site institucional sem entregar a aba de origem", () => {
    render(<RodapeLince />);
    const link = screen.getByRole("link", { name: "Lince — lincehub.com.br" });
    expect(link).toHaveAttribute("href", "https://lincehub.com.br/");
    // `noopener` não é formalidade: sem ele a página aberta ganha acesso a
    // `window.opener` e pode reescrever a aba em que a pessoa estava logada.
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("anuncia a marca uma vez, pelo link", () => {
    render(<RodapeLince />);
    // O logotipo entra como decoração. Anunciado, o leitor de tela diria
    // "Lince" para o link e "Lince" de novo para a imagem dentro dele.
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

describe("Logotipo", () => {
  it("se anuncia como imagem quando não é decorativo", () => {
    render(<Logotipo />);
    expect(screen.getByRole("img", { name: "Lince" })).toBeInTheDocument();
  });

  it("decorativo some da árvore de acessibilidade", () => {
    render(<Logotipo decorativo />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
