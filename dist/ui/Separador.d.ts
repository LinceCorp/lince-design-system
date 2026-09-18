/** O que o separador aceita. */
export interface SeparadorProps {
    /** Um rótulo no meio da linha — "ou", "mais antigos". */
    rotulo?: string;
    className?: string;
}
/**
 * Separador horizontal.
 *
 * `role="presentation"` quando não tem rótulo: uma linha decorativa anunciada
 * como "separador" a cada parágrafo é ruído para quem ouve a página.
 */
export declare function Separador({ rotulo, className }: SeparadorProps): import("react").JSX.Element;
