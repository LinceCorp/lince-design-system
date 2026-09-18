/** Abas. */
import { cn } from "../cn";

/** Uma aba. */
export interface Aba {
  id: string;
  rotulo: string;
  /** Contador à direita do rótulo — quantidade de itens naquela aba. */
  contagem?: number;
}

/** O que as abas aceitam. */
export interface TabsProps {
  abas: Aba[];
  ativa: string;
  aoTrocar: (id: string) => void;
  /** Nome do conjunto, para o leitor de tela. */
  rotulo: string;
  className?: string;
}

/**
 * Abas.
 *
 * `role="tablist"` com `aria-selected` e `tabIndex` móvel: só a aba ativa entra
 * na ordem de tabulação, e as setas andam entre elas. É o padrão que o leitor
 * de tela espera — uma fileira de botões comuns obriga a tabular por todas para
 * chegar ao conteúdo.
 *
 * Quem renderiza o painel é quem chama, e precisa ligar `id` e
 * `aria-labelledby` ao `id` da aba correspondente.
 */
export function Tabs({ abas, ativa, aoTrocar, rotulo, className }: TabsProps) {
  const indice = abas.findIndex((a) => a.id === ativa);

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const passo = e.key === "ArrowRight" ? 1 : -1;
    const proxima = abas[(indice + passo + abas.length) % abas.length];
    if (proxima) aoTrocar(proxima.id);
  };

  return (
    <div
      role="tablist"
      aria-label={rotulo}
      onKeyDown={aoTeclar}
      className={cn("flex gap-1 overflow-x-auto border-b border-line", className)}
    >
      {abas.map((aba) => {
        const ativaAgora = aba.id === ativa;
        return (
          <button
            key={aba.id}
            type="button"
            role="tab"
            id={aba.id}
            aria-selected={ativaAgora}
            tabIndex={ativaAgora ? 0 : -1}
            onClick={() => aoTrocar(aba.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5",
              "text-body transition-colors duration-[var(--dur-fast)]",
              ativaAgora
                ? "border-brand font-medium text-fg"
                : "border-transparent text-fg-muted hover:text-fg",
            )}
          >
            {aba.rotulo}
            {aba.contagem !== undefined && (
              <span className="rounded-full bg-input px-1.5 text-micro tabular-nums text-fg-muted">
                {aba.contagem}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
