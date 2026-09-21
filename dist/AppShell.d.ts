import { ReactNode } from 'react';
import { FiltroDeItem, NavModel } from './nav';
import { AcaoRapida, PerfilDaCasca, SlotDaCasca, TemaDaCasca } from './tipos';
/** O que a casca inteira aceita. */
export interface AppShellProps {
    nav: NavModel;
    logo: ReactNode;
    marcaCompacta: ReactNode;
    perfil: PerfilDaCasca;
    tema?: TemaDaCasca;
    acoesRapidas?: AcaoRapida[];
    /** Apresentação, nunca controle de acesso. Vale para as DUAS barras. */
    filtrarItem?: FiltroDeItem;
    /** Barra lateral fixada. Controlado pelo produto, que o persiste. */
    fixada: boolean;
    aoAlternarFixada: () => void;
    /** Onde a pessoa está, mostrado na barra superior. */
    titulo?: string;
    /** Sino de notificações, busca — o que o produto pendurar à direita. */
    topbarExtra?: SlotDaCasca;
    /**
     * Substitui a barra superior INTEIRA.
     *
     * Recebe a função que abre a gaveta, porque o botão de menu do celular vive
     * na barra superior e precisa dela.
     *
     * Existe porque a barra superior é onde os produtos mais divergem: um tem
     * busca global, assistente e menu de avatar; outro tem um sino e mais nada.
     * Isso é CONTEÚDO, e conteúdo é do produto. O que o pacote continua sendo
     * dono é do resto — gaveta, salto para o conteúdo, barra inferior,
     * deslocamento do conteúdo pela largura da barra lateral.
     *
     * Passando este slot, `titulo` e `topbarExtra` deixam de ter efeito.
     */
    topbar?: (aoAbrirMenu: () => void) => ReactNode;
    /** O conteúdo da rota. Um `<Outlet/>` de rota de layout, ou a própria página. */
    children?: ReactNode;
}
/**
 * Casca da aplicação autenticada.
 */
export declare function AppShell({ nav, logo, marcaCompacta, perfil, tema, acoesRapidas, filtrarItem, fixada, aoAlternarFixada, titulo, topbarExtra, topbar, children, }: AppShellProps): import("react").JSX.Element;
