/** Selo de situação. */
import type { ReactNode } from "react";
import { cn } from "../cn";

/** O que o selo comunica. */
export type TomDeSelo =
  | "neutro"
  | "marca"
  | "sucesso"
  | "aviso"
  | "perigo"
  | "info";

/** O que o selo aceita. */
export interface BadgeProps {
  children: ReactNode;
  tom?: TomDeSelo;
  /** Preenchido em vez de contornado. Use para o estado que exige atenção. */
  solido?: boolean;
  /** Ponto colorido antes do texto. */
  comPonto?: boolean;
  className?: string;
}

const CONTORNO: Record<TomDeSelo, string> = {
  neutro: "border-line text-fg-muted",
  marca: "border-brand text-brand",
  sucesso: "border-success text-success",
  aviso: "border-warning text-warning",
  perigo: "border-danger text-danger",
  info: "border-info text-info",
};

const SOLIDO: Record<TomDeSelo, string> = {
  neutro: "bg-input text-fg",
  marca: "bg-accent text-accent-contrast",
  sucesso: "bg-success text-white",
  aviso: "bg-warning text-white",
  perigo: "bg-danger text-white",
  info: "bg-info text-white",
};

const PONTO: Record<TomDeSelo, string> = {
  neutro: "bg-fg-subtle",
  marca: "bg-brand",
  sucesso: "bg-success",
  aviso: "bg-warning",
  perigo: "bg-danger",
  info: "bg-info",
};

/**
 * Selo de situação.
 *
 * **A cor nunca é a única portadora da informação** — o selo sempre tem texto.
 * Um ponto colorido sozinho não diz nada a quem não distingue as cores, e as
 * situações destes produtos (aceita, em execução, vencida) se distinguem por
 * matiz que o daltonismo mais comum confunde.
 */
export function Badge({
  children,
  tom = "neutro",
  solido = false,
  comPonto = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-chip px-2.5 py-0.5 text-caption font-medium",
        solido ? SOLIDO[tom] : cn("border bg-transparent", CONTORNO[tom]),
        className,
      )}
    >
      {comPonto && (
        <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", PONTO[tom])} />
      )}
      {children}
    </span>
  );
}
