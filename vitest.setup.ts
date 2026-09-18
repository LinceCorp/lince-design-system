import "@testing-library/jest-dom/vitest";

/**
 * O `<dialog>` do jsdom não tem `showModal` nem `close`.
 *
 * Todos os navegadores atuais têm — é lacuna do AMBIENTE DE TESTE, não do
 * componente. Por isso o remendo mora aqui, e não num ramo dentro do `Dialogo`:
 * código de produção não deve carregar desvio para contornar limitação de
 * ferramenta de teste, senão o desvio nunca é exercitado onde importa.
 *
 * O remendo faz o mínimo para o comportamento observável bater: abrir marca
 * `open`, fechar desmarca e dispara `close`, e o `cancel` continua sendo
 * disparado pelo teste que o exercita.
 */
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.show = function show(this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}
