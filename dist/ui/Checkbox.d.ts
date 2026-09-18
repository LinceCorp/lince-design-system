import { InputHTMLAttributes, ReactNode } from 'react';
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
export declare function Checkbox({ rotulo, ajuda, className, ...props }: CheckboxProps): import("react").JSX.Element;
