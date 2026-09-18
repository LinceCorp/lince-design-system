/**
 * A barra superior.
 *
 * Deliberadamente magra: ela existe para abrir a gaveta no celular, dizer onde
 * a pessoa está e hospedar o que cada produto precisa pendurar à direita. Tudo
 * o que é navegação mora na barra lateral — duplicar ali os itens gastaria a
 * única faixa horizontal da tela com um segundo caminho para o mesmo lugar.
 */
import { Menu } from "lucide-react";
import type { SlotDaCasca } from "./tipos";

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
export function Topbar({ aoAbrirMenu, titulo, extra }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line-subtle bg-surface px-3 sm:px-4">
      {aoAbrirMenu && (
        <button
          type="button"
          onClick={aoAbrirMenu}
          aria-label="Abrir menu"
          className="grid h-10 w-10 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg md:hidden"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      )}
      {titulo && (
        <h1 className="truncate font-display text-title font-semibold text-fg">{titulo}</h1>
      )}
      {extra && <div className="ml-auto flex items-center gap-1 sm:gap-2">{extra}</div>}
    </header>
  );
}
