/**
 * Junta classes, descartando o que for falsy.
 *
 * Existe aqui em vez de uma dependência de `clsx` porque toda dependência
 * direta deste pacote vira dependência transitiva dos três produtos — e esta
 * cabe em uma linha. O contrato é o mínimo que a casca usa: strings e
 * condicionais. Objeto e array aninhado ficam de fora de propósito; quem
 * precisar deles resolve no produto.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
