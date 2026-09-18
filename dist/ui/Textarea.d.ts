import { TextareaHTMLAttributes } from 'react';
/** O que o campo longo aceita, além dos atributos nativos. */
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
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
export declare function Textarea({ rotulo, ajuda, erro, rotuloOculto, className, rows, ...props }: TextareaProps): import("react").JSX.Element;
