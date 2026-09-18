/** Bloco de estado vazio — a listagem sem resultado, e por quê. */
import type { ReactNode } from "react";
import { cn } from "../cn";

/** O que o estado vazio aceita. */
export interface EstadoVazioProps {
  titulo: string;
  descricao: string;
  /** Ícone grande acima do título. Decorativo. */
  icone?: ReactNode;
  /** O botão que resolve o vazio, quando existe um. */
  acao?: ReactNode;
  className?: string;
}

/**
 * Estado vazio.
 *
 * Existe para que "não há nada aqui" nunca seja uma tela em branco. A
 * `descricao` diz o motivo em linguagem de quem lê — e jamais insinua que
 * existe algo que a pessoa não está vendo: se a listagem é recortada, a frase
 * inteira é "nenhum X ainda", não "nenhum X disponível para você".
 */
export function EstadoVazio({ titulo, descricao, icone, acao, className }: EstadoVazioProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-card border border-dashed border-line",
        "bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      {icone && <div className="mb-1 text-fg-subtle">{icone}</div>}
      <h2 className="text-title font-semibold text-fg">{titulo}</h2>
      <p className="max-w-prose text-body text-fg-muted">{descricao}</p>
      {acao && <div className="mt-2">{acao}</div>}
    </div>
  );
}
