import { FiltroDeItem, NavModel } from './nav';
import { AcaoRapida, PerfilDaCasca, TemaDaCasca } from './tipos';
/** O que a barra lateral precisa receber para existir. */
export interface SidebarProps {
    nav: NavModel;
    /** O logotipo por extenso, mostrado quando a barra está expandida. */
    logo: React.ReactNode;
    /** A marca reduzida a um símbolo, para a barra colapsada. */
    marcaCompacta: React.ReactNode;
    perfil: PerfilDaCasca;
    tema?: TemaDaCasca;
    /** Ausentes, a seção inteira não é renderizada. */
    acoesRapidas?: AcaoRapida[];
    /** Apresentação, nunca controle de acesso. */
    filtrarItem?: FiltroDeItem;
    /** Só ícones. */
    colapsada?: boolean;
    /** Se está fixada. Sem `aoAlternarFixada`, o controle não é desenhado. */
    fixada?: boolean;
    aoAlternarFixada?: () => void;
    /** Chamado a cada navegação — é o que fecha a gaveta no celular. */
    aoNavegar?: () => void;
    aoEntrarComMouse?: () => void;
    aoSairComMouse?: () => void;
}
/**
 * Barra lateral.
 *
 * No desktop alterna entre fixada e colapsada; no celular é renderizada dentro
 * da gaveta, e `aoNavegar` a fecha ao navegar.
 */
export declare function Sidebar({ nav, logo, marcaCompacta, perfil, tema, acoesRapidas, filtrarItem, colapsada, fixada, aoAlternarFixada, aoNavegar, aoEntrarComMouse, aoSairComMouse, }: SidebarProps): import("react").JSX.Element;
