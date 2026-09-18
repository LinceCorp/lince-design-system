/** Barra de progresso. */
import { cn } from "../cn";

/** O que a barra aceita. */
export interface ProgressProps {
  /** Quanto já foi. */
  valor: number;
  /** O total. Padrão 100. */
  total?: number;
  /** O que está progredindo. Vira o nome acessível. */
  rotulo: string;
  /** Mostra "3 de 10" ao lado. */
  comContagem?: boolean;
  className?: string;
}

/**
 * Barra de progresso.
 *
 * `role="progressbar"` com os três `aria-value*`: sem eles, quem ouve a página
 * recebe uma caixa colorida e nenhuma informação. O valor é limitado ao
 * intervalo — um progresso de 120 % desenha uma barra que vaza do container, e
 * isso acontece toda vez que o total chega depois da contagem.
 */
export function Progress({
  valor,
  total = 100,
  rotulo,
  comContagem = false,
  className,
}: ProgressProps) {
  const limitado = Math.min(Math.max(valor, 0), total);
  const porcento = total === 0 ? 0 : (limitado / total) * 100;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        role="progressbar"
        aria-label={rotulo}
        aria-valuenow={limitado}
        aria-valuemin={0}
        aria-valuemax={total}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-input"
      >
        <div
          className="h-full bg-brand transition-[width] duration-[var(--dur)]"
          style={{ width: `${porcento}%` }}
        />
      </div>
      {comContagem && (
        <span className="shrink-0 text-caption tabular-nums text-fg-subtle">
          {limitado} de {total}
        </span>
      )}
    </div>
  );
}
