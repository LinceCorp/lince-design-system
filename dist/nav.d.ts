import { LucideIcon } from 'lucide-react';
/**
 * Um grupo do menu.
 *
 * O agrupamento é por **trabalho**, não por entidade. Uma lista plana de onze
 * itens obriga a pessoa a saber que "Organizações" fica perto de "Contatos"
 * porque os dois são cadastro — conhecimento que ela não tem e não deveria
 * precisar ter.
 */
export interface NavGroupDef {
    /** Chave que os itens referenciam em `NavItem.group`. */
    id: string;
    /** O que aparece como cabeçalho da seção na barra lateral. */
    label: string;
}
/**
 * Um item do menu.
 *
 * `icon` é o **componente** do `lucide-react`, e não um nome em string:
 * traduzir nome→componente dentro do pacote obrigaria a empacotar o conjunto
 * inteiro de ícones, e cada produto perderia o tree-shaking por causa de uma
 * indireção que não lhe serve.
 *
 * `end` existe por causa de rota com filho. Sem ele, `/inspecoes` continua
 * marcada como ativa em `/inspecoes/:id`, e a pessoa perde a noção de onde está
 * ao abrir um laudo.
 */
export interface NavItem {
    group: string;
    to: string;
    label: string;
    icon: LucideIcon;
    /** Concorre a um lugar na barra inferior do celular. */
    bottom?: boolean;
    /** Casa a rota exata, sem os filhos. */
    end?: boolean;
}
/** O menu inteiro: os grupos, na ordem em que aparecem, e os itens. */
export interface NavModel {
    groups: readonly NavGroupDef[];
    items: readonly NavItem[];
}
/**
 * Filtro de apresentação aplicado pelo produto.
 *
 * Recebe o item e devolve se ele deve aparecer.
 */
export type FiltroDeItem = (item: NavItem) => boolean;
/**
 * Quantos itens cabem na barra inferior.
 *
 * Quatro, porque o quinto lugar é do botão "Mais". Sem teto, um produto com
 * seis itens `bottom` espreme todos e nenhum fica tocável no polegar.
 */
export declare const MAX_BARRA_INFERIOR = 4;
/**
 * Aplica o filtro do produto aos itens do menu.
 *
 * **É apresentação, nunca controle de acesso.** Esconder um item não protege a
 * rota — isso é dos guards de cada produto. O filtro existe para não oferecer à
 * pessoa um caminho que ela não pode seguir.
 *
 * Ponto único de filtragem de propósito: a barra lateral e a barra inferior
 * passam as duas por aqui. Filtrar numa e esquecer a outra era como o item
 * escondido reaparecia no celular.
 */
export declare function itensVisiveis(model: NavModel, filtro?: FiltroDeItem): NavItem[];
/**
 * Os itens da barra inferior do celular: os marcados com `bottom`, já
 * filtrados, cortados em {@link MAX_BARRA_INFERIOR}.
 *
 * Deriva de {@link itensVisiveis} para que o filtro do produto valha nas duas
 * barras sem ser aplicado duas vezes.
 */
export declare function itensDaBarraInferior(model: NavModel, filtro?: FiltroDeItem): NavItem[];
/**
 * Agrupa os itens visíveis pelos grupos declarados, preservando a ordem de
 * `model.groups`.
 *
 * Grupo que fica sem item **não** é devolvido: um cabeçalho de seção sozinho,
 * sem nada embaixo, é ruído — e acontece sempre que o filtro do produto remove
 * o último item de um grupo.
 */
export declare function gruposComItens(model: NavModel, filtro?: FiltroDeItem): {
    grupo: NavGroupDef;
    itens: NavItem[];
}[];
