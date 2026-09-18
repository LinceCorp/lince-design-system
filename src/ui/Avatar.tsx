/** Retrato de uma pessoa, ou as iniciais dela. */
import { cn } from "../cn";

/** O que o avatar aceita. */
export interface AvatarProps {
  /** Usado para as iniciais e para o texto alternativo. */
  nome: string;
  url?: string;
  /** Lado do quadrado, em pixels. */
  tamanho?: number;
  className?: string;
}

/** As iniciais do nome. No máximo duas. */
export function iniciaisDe(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? "") : "";
  return (primeira + ultima).toUpperCase();
}

/**
 * Avatar.
 *
 * Sem imagem, desenha as iniciais sobre o roxo da marca — nunca um ícone
 * genérico de pessoa: numa lista, vinte silhuetas iguais não distinguem
 * ninguém, e duas letras distinguem.
 *
 * A imagem leva `alt=""` e o nome vai no `title` do conjunto: numa lista onde o
 * nome já está escrito ao lado, repeti-lo no alt faz o leitor de tela dizer
 * tudo duas vezes.
 */
export function Avatar({ nome, url, tamanho = 40, className }: AvatarProps) {
  const estilo = { width: tamanho, height: tamanho };
  if (url) {
    return (
      <img
        src={url}
        alt=""
        title={nome}
        style={estilo}
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }
  return (
    <span
      title={nome}
      style={{ ...estilo, fontSize: Math.max(11, Math.round(tamanho * 0.36)) }}
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-brand font-semibold text-white",
        className,
      )}
    >
      {iniciaisDe(nome)}
    </span>
  );
}
