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
    /** O conteúdo da rota. No CRM é `<Outlet/>`; no painel do cliente, a página. */
    children?: ReactNode;
}
/**
 * Casca da aplicação autenticada.
 */
export declare function AppShell({ nav, logo, marcaCompacta, perfil, tema, acoesRapidas, filtrarItem, fixada, aoAlternarFixada, titulo, topbarExtra, children, }: AppShellProps): import("react").JSX.Element;
