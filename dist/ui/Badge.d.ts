import { ReactNode } from 'react';
/** O que o selo comunica. */
export type TomDeSelo = "neutro" | "marca" | "sucesso" | "aviso" | "perigo" | "info";
/** O que o selo aceita. */
export interface BadgeProps {
    children: ReactNode;
    tom?: TomDeSelo;
    /** Preenchido em vez de contornado. Use para o estado que exige atenção. */
    solido?: boolean;
    /** Ponto colorido antes do texto. */
    comPonto?: boolean;
    className?: string;
}
/**
 * Selo de situação.
 *
 * **A cor nunca é a única portadora da informação** — o selo sempre tem texto.
 * Um ponto colorido sozinho não diz nada a quem não distingue as cores, e as
 * situações destes produtos (aceita, em execução, vencida) se distinguem por
 * matiz que o daltonismo mais comum confunde.
 */
export declare function Badge({ children, tom, solido, comPonto, className, }: BadgeProps): import("react").JSX.Element;
