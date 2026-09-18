/** Diálogo de confirmação de uma ação. */
import { Button } from "./Button";
import { Dialogo } from "./Dialogo";

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
export function DialogoDeConfirmacao({
  aberto,
  aoFechar,
  aoConfirmar,
  titulo,
  descricao,
  rotuloDeConfirmar = "Confirmar",
  destrutivo = false,
  carregando = false,
}: DialogoDeConfirmacaoProps) {
  return (
    <Dialogo
      aberto={aberto}
      aoFechar={aoFechar}
      titulo={titulo}
      largura="sm"
      acoes={
        <>
          <Button variante="secundario" onClick={aoFechar} disabled={carregando}>
            Cancelar
          </Button>
          <Button
            variante={destrutivo ? "perigo" : "primario"}
            onClick={aoConfirmar}
            carregando={carregando}
          >
            {rotuloDeConfirmar}
          </Button>
        </>
      }
    >
      <p className="text-body text-fg-muted">{descricao}</p>
    </Dialogo>
  );
}
