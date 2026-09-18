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
export declare function iniciaisDe(nome: string): string;
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
export declare function Avatar({ nome, url, tamanho, className }: AvatarProps): import("react").JSX.Element;
