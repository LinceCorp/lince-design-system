/** O que a barra aceita. */
export interface ProgressProps {
    /** Quanto já foi. */
    valor: number;
    /** O total. Padrão 100. */
    total?: number;
    /** O que está progredindo. Vira o nome acessível. */
    rotulo: string;
    /** Mostra "3 de 10" ao lado. */
    comContagem?: boolean;
    className?: string;
}
/**
 * Barra de progresso.
 *
 * `role="progressbar"` com os três `aria-value*`: sem eles, quem ouve a página
 * recebe uma caixa colorida e nenhuma informação. O valor é limitado ao
 * intervalo — um progresso de 120 % desenha uma barra que vaza do container, e
 * isso acontece toda vez que o total chega depois da contagem.
 */
export declare function Progress({ valor, total, rotulo, comContagem, className, }: ProgressProps): import("react").JSX.Element;
