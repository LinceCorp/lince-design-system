/** Caixa de marcação com rótulo ao lado. */
import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../cn";

/** O que a caixa aceita, além dos atributos nativos. */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  rotulo: ReactNode;
  /** Uma linha explicando a consequência de marcar. */
  ajuda?: string;
}

/**
 * Caixa de marcação.
 *
 * O `<input>` é nativo e continua no fluxo — nada de `sr-only` com um quadrado
 * desenhado por cima. O nativo já é acessível, já responde à barra de espaço,
 * já aparece na navegação por formulário do celular, e o desenho que o
 * substitui costuma perder pelo menos uma dessas três coisas.
 *
 * A área de toque é o rótulo INTEIRO, não só o quadradinho: doze pixels de alvo
 * é abaixo do mínimo de qualquer diretriz de toque.
 */
export function Checkbox({ rotulo, ajuda, className, ...props }: CheckboxProps) {
  const id = useId();
  const idAjuda = `${id}-ajuda`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          id={id}
          aria-describedby={ajuda ? idAjuda : undefined}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded-xs accent-accent",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        />
        <span className="text-body text-fg">{rotulo}</span>
      </label>
      {ajuda && (
        <p id={idAjuda} className="pl-6.5 text-caption text-fg-subtle">
          {ajuda}
        </p>
      )}
    </div>
  );
}
