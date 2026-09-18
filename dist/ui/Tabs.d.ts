/** Uma aba. */
export interface Aba {
    id: string;
    rotulo: string;
    /** Contador à direita do rótulo — quantidade de itens naquela aba. */
    contagem?: number;
}
/** O que as abas aceitam. */
export interface TabsProps {
    abas: Aba[];
    ativa: string;
    aoTrocar: (id: string) => void;
    /** Nome do conjunto, para o leitor de tela. */
    rotulo: string;
    className?: string;
}
/**
 * Abas.
 *
 * `role="tablist"` com `aria-selected` e `tabIndex` móvel: só a aba ativa entra
 * na ordem de tabulação, e as setas andam entre elas. É o padrão que o leitor
 * de tela espera — uma fileira de botões comuns obriga a tabular por todas para
 * chegar ao conteúdo.
 *
 * Quem renderiza o painel é quem chama, e precisa ligar `id` e
 * `aria-labelledby` ao `id` da aba correspondente.
 */
export declare function Tabs({ abas, ativa, aoTrocar, rotulo, className }: TabsProps): import("react").JSX.Element;
