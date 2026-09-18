import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("junta as classes presentes e descarta falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  // Atenção: sem este caso, `cn()` podia devolver " " e o className vazio
  // viraria um atributo com espaço, que suja o snapshot de todo componente.
  it("devolve string vazia quando nada sobra", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
