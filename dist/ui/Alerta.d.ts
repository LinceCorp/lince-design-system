import { ReactNode } from 'react';
import { TomDeSelo } from './Badge';
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
/**
 * Aviso em bloco.
 *
 * `role="alert"` só no tom `perigo`: o papel interrompe o leitor de tela para
 * anunciar o conteúdo, e usá-lo num aviso informativo transforma toda visita à
 * página numa interrupção.
 */
export declare function Alerta({ children, tom, titulo, className }: AlertaProps): import("react").JSX.Element;
