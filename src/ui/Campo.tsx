/**
 * A moldura de um campo de formulário: rótulo, ajuda e erro.
 *
 * Existe separada do campo em si porque `Input`, `Textarea` e `Select` têm
 * exatamente a mesma moldura e exatamente os mesmos erros de acessibilidade
 * quando cada um a escreve por conta própria — rótulo sem `htmlFor`, mensagem
 * de erro que o leitor de tela nunca anuncia, `aria-invalid` esquecido.
 *
 * Aqui isso é resolvido uma vez e vale para os três.
 */
import { useId, type ReactNode } from "react";
import { cn } from "../cn";

/** O que toda moldura de campo aceita. */
export interface CampoProps {
  /** O rótulo. Obrigatório: campo sem rótulo é campo sem nome acessível. */
  rotulo: string;
  /** Uma linha explicando o que se espera. */
  ajuda?: string;
  /** A mensagem de erro. Presente, marca o campo como inválido. */
  erro?: string;
  /** Esconde o rótulo da vista, mantendo-o para o leitor de tela. */
  rotuloOculto?: boolean;
  className?: string;
  /**
   * Recebe os atributos já calculados e devolve o controle.
   *
   * É função, e não `children` solto, porque o `id` e os `aria-*` precisam
   * chegar ao `<input>` de verdade — passá-los por fora é o que quebra a
   * associação sem que nada acuse.
   */
  children: (atributos: AtributosDoCampo) => ReactNode;
}

/** O que a moldura entrega ao controle. */
export interface AtributosDoCampo {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
}

/**
 * Moldura de campo.
 *
 * O `id` é gerado por `useId` e ligado ao `<label>`: sem essa associação o
 * leitor de tela anuncia "campo de edição" e mais nada, e o toque no rótulo não
 * foca o campo no celular.
 *
 * A mensagem de erro entra em `aria-describedby` e leva `role="alert"`: erro
 * que só aparece em vermelho não existe para quem não enxerga a cor.
 */
export function Campo({
  rotulo,
  ajuda,
  erro,
  rotuloOculto = false,
  className,
  children,
}: CampoProps) {
  const id = useId();
  const idAjuda = `${id}-ajuda`;
  const idErro = `${id}-erro`;

  const descritores = [ajuda ? idAjuda : null, erro ? idErro : null].filter(Boolean).join(" ");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-label font-medium text-fg-muted",
          rotuloOculto && "sr-only",
        )}
      >
        {rotulo}
      </label>

      {children({
        id,
        ...(descritores ? { "aria-describedby": descritores } : {}),
        ...(erro ? { "aria-invalid": true as const } : {}),
      })}

      {ajuda && (
        <p id={idAjuda} className="text-caption text-fg-subtle">
          {ajuda}
        </p>
      )}
      {erro && (
        <p id={idErro} role="alert" className="text-caption font-medium text-danger">
          {erro}
        </p>
      )}
    </div>
  );
}

/** As classes comuns a todo controle de entrada. */
export const CLASSES_DE_CONTROLE = [
  "w-full rounded-button border bg-surface text-body text-fg",
  "placeholder:text-fg-subtle",
  "transition-colors",
  "disabled:cursor-not-allowed disabled:opacity-60",
  // O contorno de foco é o global de 2px. Um campo que só engrossa a borda em
  // 1px é indicador fraco demais para quem navega por teclado.
  "focus:border-accent",
].join(" ");

/** A cor da borda, conforme haja erro. */
export const bordaDoControle = (erro?: string) =>
  erro ? "border-danger" : "border-line";
