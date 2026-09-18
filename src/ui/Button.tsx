/** Primitivo de botão. */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../cn";

/** O papel do botão na tela. */
export type VarianteDeBotao =
  | "primario"
  | "secundario"
  | "texto"
  | "perigo"
  | "fantasma";

/** O tamanho do botão. */
export type TamanhoDeBotao = "sm" | "md" | "lg" | "icone";

/** O que o botão aceita, além dos atributos nativos. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteDeBotao;
  tamanho?: TamanhoDeBotao;
  /** Ícone à esquerda do rótulo. Decorativo. */
  icone?: ReactNode;
  /**
   * Em andamento: desabilita e troca o ícone por um giro.
   *
   * O rótulo NÃO muda. Trocá-lo por "Salvando…" muda a largura do botão no
   * meio do clique, e o ponteiro fica sobre outra coisa.
   */
  carregando?: boolean;
  children?: ReactNode;
}

const VARIANTES: Record<VarianteDeBotao, string> = {
  primario: "bg-accent text-accent-contrast hover:bg-accent-strong",
  secundario: "bg-surface text-fg border border-line hover:bg-input",
  texto: "text-accent hover:bg-input",
  perigo: "bg-danger text-white hover:opacity-90",
  fantasma: "text-fg-muted hover:bg-input hover:text-fg",
};

/*
 * O tamanho sai daqui, e não de um `className="px-5"` no chamador: sem
 * `tailwind-merge`, `px-4` e `px-5` na mesma string não se resolvem por
 * precedência de componente — se resolvem pela ordem em que o Tailwind emitiu
 * as duas regras, que ninguém controla.
 */
const TAMANHOS: Record<TamanhoDeBotao, string> = {
  sm: "h-8 px-3 text-label",
  md: "h-10 px-4 text-body",
  lg: "h-12 px-5 text-title",
  icone: "h-10 w-10",
};

/** O giro de "em andamento". */
function Giro() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Botão.
 *
 * O raio vem do token `button` — nunca um valor solto no JSX, ou o design
 * system vira sugestão.
 *
 * `tamanho="lg"` é para o botão que é a única ação da tela; `md` é o padrão;
 * `sm` é para o botão que vive dentro de uma linha de lista; `icone` é quadrado
 * e **exige `aria-label`**, porque não tem rótulo visível.
 *
 * Largura não é papel do botão: quem precisa de linha inteira passa
 * `className="w-full"`, que não conflita com nada aqui.
 */
export function Button({
  variante = "primario",
  tamanho = "md",
  icone,
  carregando = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || carregando}
      aria-busy={carregando || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-button font-medium",
        "transition-colors duration-[var(--dur-fast)]",
        "disabled:pointer-events-none disabled:opacity-50",
        TAMANHOS[tamanho],
        VARIANTES[variante],
        className,
      )}
      {...props}
    >
      {carregando ? <Giro /> : icone}
      {children}
    </button>
  );
}
