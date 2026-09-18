import { ButtonHTMLAttributes, ReactNode } from 'react';
/** O papel do botão na tela. */
export type VarianteDeBotao = "primario" | "secundario" | "texto" | "perigo" | "fantasma";
/** O tamanho do botão. */
export type TamanhoDeBotao = "sm" | "md" | "lg" | "icone";
/** O que o botão aceita, além dos atributos nativos. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variante?: VarianteDeBotao;
    tamanho?: TamanhoDeBotao;
    /** Ícone à esquerda do rótulo. Decorativo. */
    icone?: ReactNode;
    /**
     * Em andamento: desabilita e troca o ícone por um giro.
     *
     * O rótulo NÃO muda. Trocá-lo por "Salvando…" muda a largura do botão no
     * meio do clique, e o ponteiro fica sobre outra coisa.
     */
    carregando?: boolean;
    children?: ReactNode;
}
/**
 * Botão.
 *
 * O raio vem do token `button` — nunca um valor solto no JSX, ou o design
 * system vira sugestão.
 *
 * `tamanho="lg"` é para o botão que é a única ação da tela; `md` é o padrão;
 * `sm` é para o botão que vive dentro de uma linha de lista; `icone` é quadrado
 * e **exige `aria-label`**, porque não tem rótulo visível.
 *
 * Largura não é papel do botão: quem precisa de linha inteira passa
 * `className="w-full"`, que não conflita com nada aqui.
 */
export declare function Button({ variante, tamanho, icone, carregando, className, disabled, children, ...props }: ButtonProps): import("react").JSX.Element;
