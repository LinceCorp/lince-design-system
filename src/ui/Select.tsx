/** Campo de escolha única. */
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../cn";
import { Campo, CLASSES_DE_CONTROLE, bordaDoControle } from "./Campo";

/** Uma opção da lista. */
export interface OpcaoDeSelect {
  valor: string;
  rotulo: string;
  desabilitada?: boolean;
}

/** O que o campo de escolha aceita, além dos atributos nativos. */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  rotulo: string;
  ajuda?: string;
  erro?: string;
  rotuloOculto?: boolean;
  opcoes: OpcaoDeSelect[];
  /** Texto da opção vazia. Ausente, não há opção vazia. */
  vazio?: string;
}

/**
 * Campo de escolha única.
 *
 * `<select>` nativo, e não uma lista desenhada: no celular o nativo abre a roda
 * do sistema, que é maior, rola melhor e já é acessível — e é assim que a maior
 * parte das pessoas usa estes produtos. Combobox com busca é outro componente,
 * para quando a lista for longa demais para rolar.
 */
export function Select({
  rotulo,
  ajuda,
  erro,
  rotuloOculto,
  opcoes,
  vazio,
  className,
  ...props
}: SelectProps) {
  return (
    <Campo rotulo={rotulo} ajuda={ajuda} erro={erro} rotuloOculto={rotuloOculto}>
      {(atributos) => (
        <div className="relative">
          <select
            {...props}
            {...atributos}
            className={cn(
              CLASSES_DE_CONTROLE,
              bordaDoControle(erro),
              "appearance-none py-2 pr-9 pl-3",
              className,
            )}
          >
            {vazio !== undefined && <option value="">{vazio}</option>}
            {opcoes.map((o) => (
              <option key={o.valor} value={o.valor} disabled={o.desabilitada}>
                {o.rotulo}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 my-auto text-fg-subtle"
          />
        </div>
      )}
    </Campo>
  );
}
