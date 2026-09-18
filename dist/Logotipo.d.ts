/**
 * O logotipo da Lince, em vetor.
 *
 * Este arquivo era idêntico, linha por linha, em mais de um produto. É
 * o caso mais puro do que este pacote existe para resolver: desenho de marca
 * copiado entre repositórios, que diverge na primeira vez que alguém ajusta um
 * traço num só lado.
 */
interface LogotipoProps {
    className?: string;
    decorativo?: boolean;
}
/**
 * A palavra "Lince" desenhada em `currentColor`.
 *
 * Quem controla a cor é a classe de texto de quem usa, e não o arquivo — é o
 * que permite o mesmo desenho servir de assinatura branca sobre o painel roxo
 * e de marca escura sobre fundo claro, sem manter duas cópias que divergem.
 *
 * `decorativo` some com ele para o leitor de tela. Use quando o nome da marca
 * já estiver escrito em texto ao lado; caso contrário ele se anuncia como
 * imagem chamada "Lince".
 */
export declare function Logotipo({ className, decorativo }: LogotipoProps): import("react").JSX.Element;
export {};
