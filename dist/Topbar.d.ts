import { SlotDaCasca } from './tipos';
/** O que a barra superior aceita. */
export interface TopbarProps {
    /**
     * Abre a gaveta. Ausente, o botão de menu não é desenhado — no desktop não
     * existe gaveta, e um controle que não abre nada é pior que nenhum.
     */
    aoAbrirMenu?: () => void;
    /** Onde a pessoa está. */
    titulo?: string;
    /** Sino de notificações, busca, seletor de contrato — o que o produto quiser. */
    extra?: SlotDaCasca;
}
/** Barra superior da casca. */
export declare function Topbar({ aoAbrirMenu, titulo, extra }: TopbarProps): import("react").JSX.Element;
