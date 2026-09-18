/** Retângulo que ocupa o lugar do conteúdo que ainda vem. */
import { cn } from "../cn";

/** O que o esqueleto aceita. */
export interface SkeletonProps {
  className?: string;
  /** Quantas barras empilhadas. Para simular um parágrafo. */
  linhas?: number;
}

/**
 * Esqueleto de carregamento.
 *
 * Existe para que a tela não salte quando o conteúdo chega: ele ocupa **a
 * altura aproximada do que vai substituí-lo**. Um giro centralizado no lugar
 * disso empurra tudo para baixo na hora da troca, e a pessoa perde a linha que
 * estava lendo.
 *
 * A pulsação some sozinha em `prefers-reduced-motion`, pelo corte global.
 */
export function Skeleton({ className, linhas = 1 }: SkeletonProps) {
  if (linhas === 1) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-4 animate-pulse rounded-badge bg-input", className)}
      />
    );
  }
  return (
    <div aria-hidden="true" className="flex flex-col gap-2">
      {Array.from({ length: linhas }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 animate-pulse rounded-badge bg-input",
            // A última linha é mais curta, como num parágrafo de verdade.
            i === linhas - 1 && "w-3/5",
            className,
          )}
        />
      ))}
    </div>
  );
}
