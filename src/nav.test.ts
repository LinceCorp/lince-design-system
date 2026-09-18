import { describe, expect, it } from "vitest";
import { Home, Settings } from "lucide-react";
import { itensVisiveis, itensDaBarraInferior, type NavModel } from "./nav";

const modelo: NavModel = {
  groups: [{ id: "trabalho", label: "Trabalho" }],
  items: [
    { group: "trabalho", to: "/a", label: "A", icon: Home, bottom: true },
    { group: "trabalho", to: "/b", label: "B", icon: Settings },
  ],
};

describe("itensVisiveis", () => {
  it("sem filtro devolve tudo", () => {
    expect(itensVisiveis(modelo).map((i) => i.to)).toEqual(["/a", "/b"]);
  });

  // Atenção: este teste trava a regra de que o filtro é APRESENTAÇÃO, e que há
  // um ponto único de filtragem. Filtrar na barra lateral e esquecer a inferior
  // oferecia à pessoa, no celular, um caminho que a rota ia negar.
  it("o filtro remove o item", () => {
    expect(itensVisiveis(modelo, (i) => i.to !== "/b").map((i) => i.to)).toEqual(["/a"]);
  });
});

describe("itensDaBarraInferior", () => {
  it("só os marcados com bottom", () => {
    expect(itensDaBarraInferior(modelo).map((i) => i.to)).toEqual(["/a"]);
  });

  it("respeita o mesmo filtro da barra lateral", () => {
    expect(itensDaBarraInferior(modelo, (i) => i.to !== "/a")).toEqual([]);
  });

  // Atenção: quatro é o teto porque o quinto lugar é do botão "Mais". Sem o
  // corte, um produto com seis itens `bottom` espremia todos e nenhum ficava
  // tocável no polegar.
  it("nunca passa de quatro", () => {
    const muitos: NavModel = {
      groups: modelo.groups,
      items: Array.from({ length: 6 }, (_, i) => ({
        group: "trabalho",
        to: `/${i}`,
        label: `${i}`,
        icon: Home,
        bottom: true,
      })),
    };
    expect(itensDaBarraInferior(muitos)).toHaveLength(4);
  });
});

describe("gruposComItens", () => {
  it("preserva a ordem dos grupos e leva só os itens deles", async () => {
    const { gruposComItens } = await import("./nav");
    const r = gruposComItens(modelo);
    expect(r).toHaveLength(1);
    expect(r[0]!.grupo.label).toBe("Trabalho");
    expect(r[0]!.itens.map((i) => i.to)).toEqual(["/a", "/b"]);
  });

  // Atenção: sem este corte, o filtro do produto deixava na tela um cabeçalho
  // de seção sozinho, sem nenhum item embaixo.
  it("descarta o grupo que ficou sem item", async () => {
    const { gruposComItens } = await import("./nav");
    expect(gruposComItens(modelo, () => false)).toEqual([]);
  });
});
