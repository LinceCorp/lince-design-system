import { ReactNode } from 'react';
/** O que o cabeçalho de página aceita. */
export interface PageHeaderProps {
    titulo: string;
    /** Uma linha explicando a tela. */
    descricao?: string;
    /** Botões à direita do título. */
    acoes?: ReactNode;
    className?: string;
}
/** Cabeçalho de página: título, descrição e ações. */
export declare function PageHeader({ titulo, descricao, acoes, className }: PageHeaderProps): import("react").JSX.Element;
