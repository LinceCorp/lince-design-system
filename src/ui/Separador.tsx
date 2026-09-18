/** Linha que separa blocos. */
import { cn } from "../cn";

/** O que o separador aceita. */
export interface SeparadorProps {
  /** Um rótulo no meio da linha — "ou", "mais antigos". */
  rotulo?: string;
  className?: string;
}

/**
 * Separador horizontal.
 *
 * `role="presentation"` quando não tem rótulo: uma linha decorativa anunciada
 * como "separador" a cada parágrafo é ruído para quem ouve a página.
 */
export function Separador({ rotulo, className }: SeparadorProps) {
  if (!rotulo) {
    return <hr role="presentation" className={cn("border-t border-line-subtle", className)} />;
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <hr role="presentation" className="flex-1 border-t border-line-subtle" />
      <span className="text-caption text-fg-subtle">{rotulo}</span>
      <hr role="presentation" className="flex-1 border-t border-line-subtle" />
    </div>
  );
}
