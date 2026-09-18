import { ReactNode } from 'react';
/** O que o diálogo aceita. */
export interface DialogoProps {
    aberto: boolean;
    aoFechar: () => void;
    titulo: string;
    /** Uma linha sob o título. */
    descricao?: string;
    children?: ReactNode;
    /** Botões no rodapé, da esquerda para a direita. */
    acoes?: ReactNode;
    /** Largura máxima. */
    largura?: "sm" | "md" | "lg";
    className?: string;
}
/**
 * Diálogo modal.
 *
 * Usa o `<dialog>` NATIVO, com `showModal()`. É o que dá de graça, e correto, o
 * que costuma ser reimplementado errado: a prisão do foco dentro do diálogo, o
 * fechamento no `Esc`, o fundo inerte, a devolução do foco a quem o abriu e a
 * camada superior acima de qualquer `z-index` da página.
 *
 * O `Esc` do navegador dispara `cancel`, e é por lá que `aoFechar` é chamado —
 * sem isso o diálogo fecharia sozinho e o estado do produto continuaria dizendo
 * que ele está aberto, deixando-o impossível de reabrir.
 *
 * O clique no fundo também fecha: o alvo do clique é o próprio `<dialog>`
 * quando se acerta a área de fora, porque o conteúdo vive num filho.
 *
 * # O conteúdo só existe enquanto aberto
 *
 * O elemento fica montado — é dele que o efeito precisa para chamar
 * `showModal` —, mas os filhos não. Um `<dialog>` fechado continua com os
 * filhos no DOM, e um formulário escondido ali duplica cada rótulo da página. O
 * navegador esconde isso da árvore de acessibilidade pelo `display: none` da
 * folha do agente, mas qualquer coisa que leia o DOM direto — teste, extração,
 * leitor de tela mal configurado — vê os dois.
 */
export declare function Dialogo({ aberto, aoFechar, titulo, descricao, children, acoes, largura, className, }: DialogoProps): import("react").JSX.Element;
