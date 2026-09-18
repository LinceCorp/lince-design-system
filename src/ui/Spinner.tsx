/** Indicador de espera. */
import { cn } from "../cn";

/** O que o giro aceita. */
export interface SpinnerProps {
  /** Lado, em pixels. */
  tamanho?: number;
  /**
   * O que se está esperando. Vira o nome acessível.
   *
   * Obrigatório: um giro sem rótulo é anunciado como "imagem" e não diz nada a
   * quem não o vê.
   */
  rotulo: string;
  className?: string;
}

/** Indicador de espera, para quando o esqueleto não couber. */
export function Spinner({ tamanho = 20, rotulo, className }: SpinnerProps) {
  return (
    <span role="status" aria-label={rotulo} className={cn("inline-flex", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={tamanho}
        height={tamanho}
        className="animate-spin"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="12" cy="12" r="9" opacity="0.25" />
        <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
      </svg>
    </span>
  );
}
