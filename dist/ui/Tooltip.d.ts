import { ReactNode } from 'react';
/** O que a dica aceita. */
export interface TooltipProps {
    /** O texto da dica. Curto: uma dica longa é um parágrafo escondido. */
    texto: string;
    children: ReactNode;
    /** De que lado aparece. */
    lado?: "cima" | "baixo";
    className?: string;
}
/**
 * Dica.
 *
 * Aparece no `hover` **e no `focus-within`**: dica que só responde ao ponteiro
 * não existe para quem navega por teclado, e é justamente em botão só de ícone
 * que ela costuma ser a única explicação.
 *
 * Ela **não substitui** o nome acessível. Um botão de ícone continua precisando
 * de `aria-label`; esta dica é ligada por `aria-describedby`, que é descrição,
 * não nome.
 *
 * Em CSS puro, sem posicionamento calculado em JavaScript: a dica dos produtos
 * fica sempre em controle pequeno, perto do centro, e a complexidade de
 * detectar borda de tela não se paga.
 */
export declare function Tooltip({ texto, children, lado, className }: TooltipProps): import("react").JSX.Element;
