/** O que o esqueleto aceita. */
export interface SkeletonProps {
    className?: string;
    /** Quantas barras empilhadas. Para simular um parágrafo. */
    linhas?: number;
}
/**
 * Esqueleto de carregamento.
 *
 * Existe para que a tela não salte quando o conteúdo chega: ele ocupa **a
 * altura aproximada do que vai substituí-lo**. Um giro centralizado no lugar
 * disso empurra tudo para baixo na hora da troca, e a pessoa perde a linha que
 * estava lendo.
 *
 * A pulsação some sozinha em `prefers-reduced-motion`, pelo corte global.
 */
export declare function Skeleton({ className, linhas }: SkeletonProps): import("react").JSX.Element;
