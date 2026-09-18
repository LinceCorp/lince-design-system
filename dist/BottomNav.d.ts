import { FiltroDeItem, NavModel } from './nav';
/** O que a barra inferior aceita. */
export interface BottomNavProps {
    nav: NavModel;
    /** O MESMO filtro da barra lateral. Ver `itensVisiveis`. */
    filtrarItem?: FiltroDeItem;
    /** Abre a gaveta com o menu inteiro. */
    aoMais: () => void;
}
/** Barra inferior, só no celular. */
export declare function BottomNav({ nav, filtrarItem, aoMais }: BottomNavProps): import("react").JSX.Element;
