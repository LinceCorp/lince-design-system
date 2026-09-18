/** Interruptor de ligar e desligar. */
import { useId, type ReactNode } from "react";
import { cn } from "../cn";

/** O que o interruptor aceita. */
export interface SwitchProps {
  rotulo: ReactNode;
  ajuda?: string;
  ligado: boolean;
  aoAlternar: (ligado: boolean) => void;
  desabilitado?: boolean;
  className?: string;
}

/**
 * Interruptor.
 *
 * É `<button role="switch">`, e não uma caixa de marcação estilizada: a
 * diferença não é estética. Caixa de marcação é uma escolha que só vale quando
 * o formulário é enviado; interruptor é uma ação que surte efeito na hora. O
 * leitor de tela anuncia os dois de formas diferentes, e usar o errado promete
 * à pessoa um "salvar" que não existe.
 */
export function Switch({
  rotulo,
  ajuda,
  ligado,
  aoAlternar,
  desabilitado = false,
  className,
}: SwitchProps) {
  const id = useId();
  const idAjuda = `${id}-ajuda`;
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <label htmlFor={id} className="text-body font-medium text-fg">
          {rotulo}
        </label>
        {ajuda && (
          <p id={idAjuda} className="mt-0.5 text-caption text-fg-subtle">
            {ajuda}
          </p>
        )}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={ligado}
        aria-describedby={ajuda ? idAjuda : undefined}
        disabled={desabilitado}
        onClick={() => aoAlternar(!ligado)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-[var(--dur-fast)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          ligado ? "bg-accent" : "bg-input",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-(--shadow-1)",
            "transition-[left] duration-[var(--dur-fast)]",
            ligado ? "left-5.5" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
