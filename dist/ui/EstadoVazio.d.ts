import { ReactNode } from 'react';
/** O que o estado vazio aceita. */
export interface EstadoVazioProps {
    titulo: string;
    descricao: string;
    /** Ícone grande acima do título. Decorativo. */
    icone?: ReactNode;
    /** O botão que resolve o vazio, quando existe um. */
    acao?: ReactNode;
    className?: string;
}
/**
 * Estado vazio.
 *
 * Existe para que "não há nada aqui" nunca seja uma tela em branco. A
 * `descricao` diz o motivo em linguagem de quem lê — e jamais insinua que
 * existe algo que a pessoa não está vendo: se a listagem é recortada, a frase
 * inteira é "nenhum X ainda", não "nenhum X disponível para você".
 */
export declare function EstadoVazio({ titulo, descricao, icone, acao, className }: EstadoVazioProps): import("react").JSX.Element;
