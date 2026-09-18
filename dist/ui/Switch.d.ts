import { ReactNode } from 'react';
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
export declare function Switch({ rotulo, ajuda, ligado, aoAlternar, desabilitado, className, }: SwitchProps): import("react").JSX.Element;
