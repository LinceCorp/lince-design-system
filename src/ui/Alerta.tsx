/** Aviso em bloco, dentro do fluxo da página. */
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "../cn";
import type { TomDeSelo } from "./Badge";

/** O tom do aviso. */
export type TomDeAlerta = Extract<TomDeSelo, "sucesso" | "aviso" | "perigo" | "info">;

/** O que o aviso aceita. */
export interface AlertaProps {
  children: ReactNode;
  tom?: TomDeAlerta;
  /** Primeira linha, em negrito. */
  titulo?: string;
  className?: string;
}

const ICONE = {
  sucesso: CheckCircle2,
  aviso: AlertTriangle,
  perigo: XCircle,
  info: Info,
} as const;

/*
 * O erro tem tokens PRÓPRIOS de superfície, linha e texto — e não um
 * `bg-danger/10`. Uma porcentagem cega da cor de texto dá tom lavado no claro e
 * sujo no escuro, e o texto por cima cai abaixo do mínimo de contraste sem que
 * nada acuse.
 */
const TONS: Record<TomDeAlerta, string> = {
  sucesso: "border-success/40 bg-success/10 text-success",
  aviso: "border-warning/40 bg-warning/10 text-warning",
  perigo: "border-danger-line bg-danger-surface text-danger-strong",
  info: "border-info/40 bg-info/10 text-info",
};

/**
 * Aviso em bloco.
 *
 * `role="alert"` só no tom `perigo`: o papel interrompe o leitor de tela para
 * anunciar o conteúdo, e usá-lo num aviso informativo transforma toda visita à
 * página numa interrupção.
 */
export function Alerta({ children, tom = "info", titulo, className }: AlertaProps) {
  const Icone = ICONE[tom];
  return (
    <div
      role={tom === "perigo" ? "alert" : undefined}
      className={cn(
        "flex items-start gap-2.5 rounded-card border px-3.5 py-3 text-body",
        TONS[tom],
        className,
      )}
    >
      <Icone size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
      <div className="min-w-0">
        {titulo && <p className="font-semibold">{titulo}</p>}
        <div className={cn(titulo && "mt-0.5")}>{children}</div>
      </div>
    </div>
  );
}
