import { ReactNode } from 'react';
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
export declare function Campo({ rotulo, ajuda, erro, rotuloOculto, className, children, }: CampoProps): import("react").JSX.Element;
/** As classes comuns a todo controle de entrada. */
export declare const CLASSES_DE_CONTROLE: string;
/** A cor da borda, conforme haja erro. */
export declare const bordaDoControle: (erro?: string) => "border-danger" | "border-line";
