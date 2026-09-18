import { ReactNode } from 'react';
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
export declare function Card({ children, titulo, descricao, acoes, semPreenchimento, interativo, className, }: CardProps): import("react").JSX.Element;
