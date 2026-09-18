/**
 * O que o design system exporta.
 *
 * Três camadas: a **casca** de navegação, os **primitivos** de interface e os
 * utilitários que os dois usam. Os tokens não passam por aqui — eles são CSS, e
 * entram por `@import "@lincecorp/design-system/theme.css"`.
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

// ----- primitivos -----
export { Alerta, type AlertaProps, type TomDeAlerta } from "./ui/Alerta";
export { Avatar, iniciaisDe, type AvatarProps } from "./ui/Avatar";
export { Badge, type BadgeProps, type TomDeSelo } from "./ui/Badge";
export {
  Button,
  type ButtonProps,
  type VarianteDeBotao,
  type TamanhoDeBotao,
} from "./ui/Button";
export {
  Campo,
  CLASSES_DE_CONTROLE,
  bordaDoControle,
  type CampoProps,
  type AtributosDoCampo,
} from "./ui/Campo";
export { Card, type CardProps } from "./ui/Card";
export { Checkbox, type CheckboxProps } from "./ui/Checkbox";
export { Dialogo, type DialogoProps } from "./ui/Dialogo";
export {
  DialogoDeConfirmacao,
  type DialogoDeConfirmacaoProps,
} from "./ui/DialogoDeConfirmacao";
export { EstadoVazio, type EstadoVazioProps } from "./ui/EstadoVazio";
export { Input, type InputProps } from "./ui/Input";
export { Progress, type ProgressProps } from "./ui/Progress";
export { Select, type SelectProps, type OpcaoDeSelect } from "./ui/Select";
export { Separador, type SeparadorProps } from "./ui/Separador";
export { Skeleton, type SkeletonProps } from "./ui/Skeleton";
export { Spinner, type SpinnerProps } from "./ui/Spinner";
export { Switch, type SwitchProps } from "./ui/Switch";
export { Tabs, type TabsProps, type Aba } from "./ui/Tabs";
export { Textarea, type TextareaProps } from "./ui/Textarea";
export { Tooltip, type TooltipProps } from "./ui/Tooltip";
