/** A assinatura "Desenvolvido por Lince". */
import { cn } from "./cn";
import { Logotipo } from "./Logotipo";

/** O site institucional, destino da assinatura. */
export const SITE_INSTITUCIONAL_URL = "https://lincehub.com.br/";

/**
 * Assinatura da Lince, igual em todos os produtos.
 *
 * O logotipo é vetor em `currentColor`, e não uma imagem: a assinatura aparece
 * tanto sobre fundo claro quanto sobre o roxo do painel de autenticação, e uma
 * imagem de cor fixa some num dos dois.
 *
 * O nome acessível vive no `<a>`, e o logotipo entra como decoração — do
 * contrário o leitor de tela anuncia "Lince" duas vezes, uma para o link e
 * outra para a imagem dentro dele.
 */
export function RodapeLince({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5 text-caption", className)}>
      <span>Desenvolvido por</span>
      <a
        href={SITE_INSTITUCIONAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lince — lincehub.com.br"
        className="inline-flex opacity-90 transition-opacity hover:opacity-100"
      >
        <Logotipo decorativo className="h-3 w-auto" />
      </a>
    </div>
  );
}
