/** Explicação curta que aparece ao passar o mouse ou focar. */
import { useId, type ReactNode } from "react";
import { cn } from "../cn";

/** O que a dica aceita. */
export interface TooltipProps {
  /** O texto da dica. Curto: uma dica longa é um parágrafo escondido. */
  texto: string;
  children: ReactNode;
  /** De que lado aparece. */
  lado?: "cima" | "baixo";
  className?: string;
}

const LADOS = {
  cima: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  baixo: "top-full left-1/2 mt-1.5 -translate-x-1/2",
} as const;

/**
 * Dica.
 *
 * Aparece no `hover` **e no `focus-within`**: dica que só responde ao ponteiro
 * não existe para quem navega por teclado, e é justamente em botão só de ícone
 * que ela costuma ser a única explicação.
 *
 * Ela **não substitui** o nome acessível. Um botão de ícone continua precisando
 * de `aria-label`; esta dica é ligada por `aria-describedby`, que é descrição,
 * não nome.
 *
 * Em CSS puro, sem posicionamento calculado em JavaScript: a dica dos produtos
 * fica sempre em controle pequeno, perto do centro, e a complexidade de
 * detectar borda de tela não se paga.
 */
export function Tooltip({ texto, children, lado = "cima", className }: TooltipProps) {
  const id = useId();
  return (
    <span className={cn("group/dica relative inline-flex", className)}>
      <span aria-describedby={id} className="inline-flex">
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-[var(--z-dropdown)] whitespace-nowrap",
          "rounded-control bg-elevated px-2 py-1 text-caption text-fg shadow-(--shadow-2)",
          "border border-line-subtle",
          "opacity-0 transition-opacity duration-[var(--dur-fast)]",
          "group-hover/dica:opacity-100 group-focus-within/dica:opacity-100",
          LADOS[lado],
        )}
      >
        {texto}
      </span>
    </span>
  );
}
