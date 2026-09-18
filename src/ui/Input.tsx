/** Campo de texto rotulado. */
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../cn";
import { Campo, CLASSES_DE_CONTROLE, bordaDoControle } from "./Campo";

/** O que o campo de texto aceita, além dos atributos nativos. */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  rotulo: string;
  ajuda?: string;
  erro?: string;
  rotuloOculto?: boolean;
  /** Decorativo, à esquerda. Some para o leitor de tela. */
  icone?: ReactNode;
  /** Controle de verdade, à direita — revelar senha, limpar. */
  sufixo?: ReactNode;
}

/**
 * Campo de texto.
 *
 * `icone` é decorativo e some para o leitor de tela: o rótulo já diz o que o
 * campo é, e "ícone de cadeado, Senha" é ruído. `sufixo` é o oposto — recebe
 * controle de verdade, então quem o passa responde pelo nome acessível dele.
 *
 * O `id` não é aceito de fora: ele nasce na moldura e liga rótulo, ajuda e erro
 * ao campo. Aceitá-lo permitiria trocar o do campo sem trocar o do rótulo, e a
 * associação quebraria em silêncio.
 */
export function Input({
  rotulo,
  ajuda,
  erro,
  rotuloOculto,
  icone,
  sufixo,
  className,
  ...props
}: InputProps) {
  return (
    <Campo rotulo={rotulo} ajuda={ajuda} erro={erro} rotuloOculto={rotuloOculto}>
      {(atributos) => (
        <div className="relative">
          {icone && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-subtle"
            >
              {icone}
            </span>
          )}
          <input
            {...props}
            {...atributos}
            className={cn(
              CLASSES_DE_CONTROLE,
              bordaDoControle(erro),
              "py-2",
              icone ? "pl-10" : "pl-3",
              sufixo ? "pr-11" : "pr-3",
              className,
            )}
          />
          {sufixo && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-1.5">{sufixo}</span>
          )}
        </div>
      )}
    </Campo>
  );
}
