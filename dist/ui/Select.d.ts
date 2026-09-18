import { SelectHTMLAttributes } from 'react';
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
export declare function Select({ rotulo, ajuda, erro, rotuloOculto, opcoes, vazio, className, ...props }: SelectProps): import("react").JSX.Element;
