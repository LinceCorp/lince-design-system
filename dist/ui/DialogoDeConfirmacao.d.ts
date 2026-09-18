/** O que a confirmação aceita. */
export interface DialogoDeConfirmacaoProps {
    aberto: boolean;
    aoFechar: () => void;
    aoConfirmar: () => void;
    titulo: string;
    /**
     * O que vai acontecer, em uma frase.
     *
     * Diga a CONSEQUÊNCIA, não a ação: "as respostas não poderão mais ser
     * alteradas" em vez de "deseja enviar?". Quem lê já sabe o que clicou.
     */
    descricao: string;
    /** O rótulo do botão que confirma. Um VERBO, nunca "OK". */
    rotuloDeConfirmar?: string;
    /** Pinta o botão de confirmar como destrutivo. */
    destrutivo?: boolean;
    carregando?: boolean;
}
/**
 * Confirmação.
 *
 * O botão que confirma leva um verbo — "Enviar", "Excluir", "Recusar" —, nunca
 * "OK": numa caixa com dois botões, "OK" e "Cancelar" obrigam a reler o título
 * para saber qual é qual.
 */
export declare function DialogoDeConfirmacao({ aberto, aoFechar, aoConfirmar, titulo, descricao, rotuloDeConfirmar, destrutivo, carregando, }: DialogoDeConfirmacaoProps): import("react").JSX.Element;
