/**
 * O cabeçalho de uma página.
 *
 * Existe para que o título de página seja o mesmo elemento, com o mesmo degrau
 * tipográfico e o mesmo espaçamento, em todas as telas dos três produtos — e
 * para garantir que ele seja o `<h1>`. Cada tela escrevendo o seu produzia
 * quatro tamanhos diferentes de título e, em algumas, nenhum `<h1>`.
 */
import type { ReactNode } from "react";
import { cn } from "./cn";

/** O que o cabeçalho de página aceita. */
export interface PageHeaderProps {
  titulo: string;
  /** Uma linha explicando a tela. */
  descricao?: string;
  /** Botões à direita do título. */
  acoes?: ReactNode;
  className?: string;
}

/** Cabeçalho de página: título, descrição e ações. */
export function PageHeader({ titulo, descricao, acoes, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h1 className="font-display text-display font-semibold text-fg">{titulo}</h1>
        {descricao && <p className="mt-1 text-body text-fg-muted">{descricao}</p>}
      </div>
      {acoes && <div className="flex shrink-0 items-center gap-2">{acoes}</div>}
    </div>
  );
}
