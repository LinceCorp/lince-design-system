/**
 * O logotipo da Lince, em vetor.
 *
 * Este arquivo era idêntico, linha por linha, no CRM e no painel do cliente. É
 * o caso mais puro do que este pacote existe para resolver: desenho de marca
 * copiado entre repositórios, que diverge na primeira vez que alguém ajusta um
 * traço num só lado.
 */

interface LogotipoProps {
  className?: string;
  decorativo?: boolean;
}

/* Os quatro traços da palavra "Lince", no mesmo desenho que o painel do gestor
   publica em `public/logo.svg`. Ficam aqui, e não num arquivo servido, porque
   `<img>` não herda cor: este logotipo precisa ser branco sobre o roxo da marca
   e `text-fg` em qualquer outro lugar. */
const TRACOS = [
  "M0 0H14.98V38.45H37.4V51.18H0V0Z",
  "M55.75 10.23V51.18H41.58V10.23H55.75Z",
  "M175.24 40.8C170.13 40.58 167.37 38.79 165.95 36.18L191.31 27.1C190.36 20.64 187.46 8.50999 171.2 8.50999C162.7 8.50999 152.72 12.29 149.81 23.99C149.19 26.47 148.8 30.08 147.29 32.14C144.17 36.43 138.23 40.33 131.4 40.33C122.79 40.33 120.72 35.13 120.72 29.43C120.72 24.17 123.36 20.5 128.24 20.5C134.84 20.5 136.01 28.09 136.01 28.12L146.61 22.52C146.61 22.52 144.67 8.48999 127.36 8.48999C119.1 8.48999 105.17 13.1 105.17 30.16C105.17 45.2 115.67 51.97 129.54 51.97C143.4 51.97 150.05 44.08 151.62 41.89C155.57 49.08 163.64 52.42 173.37 52.42C181.87 52.42 190.63 48.71 194.53 45.14L189.45 35.34C187.32 38.61 180.65 41.01 175.24 40.78V40.8ZM179.46 23.29L163.6 28.88C162.9 24.54 163.58 20.54 167.57 18.69C174.28 15.57 178.15 20.68 179.46 23.29Z",
  "M89.26 9.94999C81.78 9.48999 77.39 12.7 74.83 15.55L73.6 10.21H60.62V51.17H74.98V30.33C74.98 29.07 75.01 21.98 81.85 21.98C89.54 21.98 89.45 30.35 89.45 38.9V51.17H103.35V35.12C103.35 17.73 97.85 10.48 89.27 9.94999H89.26Z",
];

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
export function Logotipo({ className, decorativo = false }: LogotipoProps) {
  const rotulo = decorativo
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": "Lince" };

  return (
    <svg viewBox="0 0 195 53" fill="none" className={className} {...rotulo}>
      {TRACOS.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
