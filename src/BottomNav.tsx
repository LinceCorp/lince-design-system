/**
 * A barra de navegação inferior do celular.
 *
 * Existe porque a barra lateral vira gaveta no celular, e gaveta custa um toque
 * a mais em toda navegação. Os destinos mais usados ficam a um polegar de
 * distância; o resto continua na gaveta, atrás do botão "Mais".
 */
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "./cn";
import { itensDaBarraInferior, type FiltroDeItem, type NavModel } from "./nav";

/** O que a barra inferior aceita. */
export interface BottomNavProps {
  nav: NavModel;
  /** O MESMO filtro da barra lateral. Ver `itensVisiveis`. */
  filtrarItem?: FiltroDeItem;
  /** Abre a gaveta com o menu inteiro. */
  aoMais: () => void;
}

/** Barra inferior, só no celular. */
export function BottomNav({ nav, filtrarItem, aoMais }: BottomNavProps) {
  const itens = itensDaBarraInferior(nav, filtrarItem);

  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-[var(--z-sticky)] flex border-t border-line-subtle bg-surface md:hidden"
    >
      {itens.map((item) => {
        const Icone = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-micro transition",
                isActive ? "text-accent" : "text-fg-subtle",
              )
            }
          >
            <Icone size={20} aria-hidden="true" />
            <span className="truncate px-1">{item.label}</span>
          </NavLink>
        );
      })}
      <button
        type="button"
        onClick={aoMais}
        className="flex flex-1 flex-col items-center gap-1 py-2 text-micro text-fg-subtle transition hover:text-fg"
      >
        <MoreHorizontal size={20} aria-hidden="true" />
        <span>Mais</span>
      </button>
    </nav>
  );
}
