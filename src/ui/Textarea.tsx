/** Campo de texto longo. */
import type { TextareaHTMLAttributes } from "react";
import { cn } from "../cn";
import { Campo, CLASSES_DE_CONTROLE, bordaDoControle } from "./Campo";

/** O que o campo longo aceita, além dos atributos nativos. */
export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  rotulo: string;
  ajuda?: string;
  erro?: string;
  rotuloOculto?: boolean;
}

/**
 * Campo de texto longo.
 *
 * `rows` padrão 4, e não 2: um campo de duas linhas convida a respostas de duas
 * linhas, e este campo existe onde se espera um parágrafo — descrição de
 * problema, justificativa, parecer.
 */
export function Textarea({
  rotulo,
  ajuda,
  erro,
  rotuloOculto,
  className,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <Campo rotulo={rotulo} ajuda={ajuda} erro={erro} rotuloOculto={rotuloOculto}>
      {(atributos) => (
        <textarea
          {...props}
          {...atributos}
          rows={rows}
          className={cn(CLASSES_DE_CONTROLE, bordaDoControle(erro), "px-3 py-2", className)}
        />
      )}
    </Campo>
  );
}
