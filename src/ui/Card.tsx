/** Superfície elevada que agrupa conteúdo. */
import type { ReactNode } from "react";
import { cn } from "../cn";

/** O que o card aceita. */
export interface CardProps {
  children: ReactNode;
  /** Título do card. Vira `<h2>`. */
  titulo?: string;
  /** Uma linha sob o título. */
  descricao?: string;
  /** Botões no canto superior direito. */
  acoes?: ReactNode;
  /** Remove o preenchimento interno, para card que contém tabela ou lista. */
  semPreenchimento?: boolean;
  /** Vira link ou botão: ganha realce da marca ao passar o mouse. */
  interativo?: boolean;
  className?: string;
}

/**
 * Card.
 *
 * A separação do fundo é por **linha**, não por sombra. A sombra existe e é
 * discreta (`shadow-card`), mas quem faz o recorte é a borda: com dezenas de
 * cards numa tela, sombra em todos vira sujeira cinza em volta de tudo, não
 * hierarquia.
 */
export function Card({
  children,
  titulo,
  descricao,
  acoes,
  semPreenchimento = false,
  interativo = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface shadow-card",
        !semPreenchimento && "p-4",
        interativo && "transition-colors duration-[var(--dur-fast)] hover:border-brand",
        className,
      )}
    >
      {(titulo || acoes) && (
        <div className={cn("flex items-start justify-between gap-3", !semPreenchimento && "mb-3")}>
          <div className="min-w-0">
            {titulo && <h2 className="text-title font-semibold text-fg">{titulo}</h2>}
            {descricao && <p className="mt-0.5 text-caption text-fg-muted">{descricao}</p>}
          </div>
          {acoes && <div className="flex shrink-0 items-center gap-1">{acoes}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
