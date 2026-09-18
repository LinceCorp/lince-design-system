/** O site institucional, destino da assinatura. */
export declare const SITE_INSTITUCIONAL_URL = "https://lincehub.com.br/";
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
export declare function RodapeLince({ className }: {
    className?: string;
}): import("react").JSX.Element;
