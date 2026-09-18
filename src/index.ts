/**
 * O que o design system exporta.
 *
 * Só a casca e o contrato dela. Primitivos de interface — botão, campo, card,
 * selo — ficam de fora nesta versão: os três produtos têm versões divergentes
 * deles, e unificá-los é trabalho maior que a casca inteira. O pacote já estará
 * de pé para recebê-los quando a duplicação doer.
 */
export { AppShell, type AppShellProps } from "./AppShell";
export { Sidebar, type SidebarProps } from "./Sidebar";
export { Topbar, type TopbarProps } from "./Topbar";
export { BottomNav, type BottomNavProps } from "./BottomNav";
export { PageHeader, type PageHeaderProps } from "./PageHeader";
export { RodapeLince, SITE_INSTITUCIONAL_URL } from "./RodapeLince";
export { Logotipo } from "./Logotipo";

export { cn } from "./cn";
export {
  itensVisiveis,
  itensDaBarraInferior,
  gruposComItens,
  MAX_BARRA_INFERIOR,
} from "./nav";
export type { NavItem, NavGroupDef, NavModel, FiltroDeItem } from "./nav";
export type { PerfilDaCasca, TemaDaCasca, AcaoRapida, SlotDaCasca } from "./tipos";
