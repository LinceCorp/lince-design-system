/** O que o giro aceita. */
export interface SpinnerProps {
    /** Lado, em pixels. */
    tamanho?: number;
    /**
     * O que se está esperando. Vira o nome acessível.
     *
     * Obrigatório: um giro sem rótulo é anunciado como "imagem" e não diz nada a
     * quem não o vê.
     */
    rotulo: string;
    className?: string;
}
/** Indicador de espera, para quando o esqueleto não couber. */
export declare function Spinner({ tamanho, rotulo, className }: SpinnerProps): import("react").JSX.Element;
