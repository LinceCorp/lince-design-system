import { InputHTMLAttributes, ReactNode } from 'react';
/** O que o campo de texto aceita, além dos atributos nativos. */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
    rotulo: string;
    ajuda?: string;
    erro?: string;
    rotuloOculto?: boolean;
    /** Decorativo, à esquerda. Some para o leitor de tela. */
    icone?: ReactNode;
    /** Controle de verdade, à direita — revelar senha, limpar. */
    sufixo?: ReactNode;
}
/**
 * Campo de texto.
 *
 * `icone` é decorativo e some para o leitor de tela: o rótulo já diz o que o
 * campo é, e "ícone de cadeado, Senha" é ruído. `sufixo` é o oposto — recebe
 * controle de verdade, então quem o passa responde pelo nome acessível dele.
 *
 * O `id` não é aceito de fora: ele nasce na moldura e liga rótulo, ajuda e erro
 * ao campo. Aceitá-lo permitiria trocar o do campo sem trocar o do rótulo, e a
 * associação quebraria em silêncio.
 */
export declare function Input({ rotulo, ajuda, erro, rotuloOculto, icone, sufixo, className, ...props }: InputProps): import("react").JSX.Element;
