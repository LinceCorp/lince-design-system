import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("o título é o h1 da página", () => {
    render(<PageHeader titulo="Formulários" />);
    expect(screen.getByRole("heading", { level: 1, name: "Formulários" })).toBeInTheDocument();
  });

  it("descrição e ações são opcionais", () => {
    const { rerender } = render(<PageHeader titulo="X" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(<PageHeader titulo="X" descricao="explica" acoes={<button>Nova</button>} />);
    expect(screen.getByText("explica")).toBeVisible();
    expect(screen.getByRole("button", { name: "Nova" })).toBeInTheDocument();
  });
});
