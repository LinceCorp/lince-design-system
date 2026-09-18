/** Diálogo modal. */
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../cn";

/** O que o diálogo aceita. */
export interface DialogoProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  /** Uma linha sob o título. */
  descricao?: string;
  children?: ReactNode;
  /** Botões no rodapé, da esquerda para a direita. */
  acoes?: ReactNode;
  /** Largura máxima. */
  largura?: "sm" | "md" | "lg";
  className?: string;
}

const LARGURAS = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

/**
 * Diálogo modal.
 *
 * Usa o `<dialog>` NATIVO, com `showModal()`. É o que dá de graça, e correto, o
 * que costuma ser reimplementado errado: a prisão do foco dentro do diálogo, o
 * fechamento no `Esc`, o fundo inerte, a devolução do foco a quem o abriu e a
 * camada superior acima de qualquer `z-index` da página.
 *
 * O `Esc` do navegador dispara `cancel`, e é por lá que `aoFechar` é chamado —
 * sem isso o diálogo fecharia sozinho e o estado do produto continuaria dizendo
 * que ele está aberto, deixando-o impossível de reabrir.
 *
 * O clique no fundo também fecha: o alvo do clique é o próprio `<dialog>`
 * quando se acerta a área de fora, porque o conteúdo vive num filho.
 */
export function Dialogo({
  aberto,
  aoFechar,
  titulo,
  descricao,
  children,
  acoes,
  largura = "md",
  className,
}: DialogoProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    // `showModal` num diálogo já aberto lança; `close` num já fechado não faz
    // nada, mas a guarda deixa a intenção explícita.
    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      onClick={(e) => {
        if (e.target === ref.current) aoFechar();
      }}
      className={cn(
        "m-auto w-[calc(100vw-2rem)] rounded-dialog border border-line bg-elevated p-0",
        "text-fg shadow-dialog backdrop:bg-black/60",
        LARGURAS[largura],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line-subtle p-4">
        <div className="min-w-0">
          <h2 className="font-display text-title font-semibold">{titulo}</h2>
          {descricao && <p className="mt-0.5 text-caption text-fg-muted">{descricao}</p>}
        </div>
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      {children && <div className="p-4">{children}</div>}

      {acoes && (
        <div className="flex justify-end gap-2 border-t border-line-subtle p-4">{acoes}</div>
      )}
    </dialog>
  );
}
