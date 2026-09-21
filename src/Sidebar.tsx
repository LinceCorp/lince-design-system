/**
 * A barra lateral de navegação.
 *
 * # Por que ela não conhece nada
 *
 * A versão de onde esta nasceu importava cinco coisas direto: o contexto de
 * autenticação, o de tema, o de criação rápida, o de feature flags e a lista de
 * itens do menu. Nenhum dos cinco existe nos outros produtos — era isso, e só
 * isso, que impedia a mesma barra de servir aos três.
 *
 * Todos viraram prop. A regra que separa os lados: **o pacote é dono de layout,
 * comportamento e aparência; o produto é dono de conteúdo e política.**
 */
import { LogOut, Moon, PanelLeftClose, PanelLeftOpen, Plus, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "./cn";
import { gruposComItens, type FiltroDeItem, type NavModel } from "./nav";
import type { AcaoRapida, PerfilDaCasca, TemaDaCasca } from "./tipos";

/** O que a barra lateral precisa receber para existir. */
export interface SidebarProps {
  nav: NavModel;
  /** O logotipo por extenso, mostrado quando a barra está expandida. */
  logo: React.ReactNode;
  /** A marca reduzida a um símbolo, para a barra colapsada. */
  marcaCompacta: React.ReactNode;
  perfil: PerfilDaCasca;
  tema?: TemaDaCasca;
  /** Ausentes, a seção inteira não é renderizada. */
  acoesRapidas?: AcaoRapida[];
  /** Apresentação, nunca controle de acesso. */
  filtrarItem?: FiltroDeItem;
  /** Só ícones. */
  colapsada?: boolean;
  /** Se está fixada. Sem `aoAlternarFixada`, o controle não é desenhado. */
  fixada?: boolean;
  aoAlternarFixada?: () => void;
  /** Chamado a cada navegação — é o que fecha a gaveta no celular. */
  aoNavegar?: () => void;
  aoEntrarComMouse?: () => void;
  aoSairComMouse?: () => void;
}

/** As iniciais do nome, para quando não há avatar. No máximo duas. */
function iniciaisDe(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0]![0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1]![0] ?? "") : "";
  return (primeira + ultima).toUpperCase();
}

/**
 * Cabeçalho de seção com altura FIXA nos dois estados.
 *
 * Expandida mostra o nome do grupo; colapsada, um filete. A altura não pode
 * mudar entre os dois: se mudasse, colapsar e expandir deslocaria verticalmente
 * todos os itens abaixo, e o olho perderia a linha que estava seguindo.
 */
function CabecalhoDeSecao({ rotulo, colapsada }: { rotulo: string; colapsada: boolean }) {
  return (
    <div className="mt-3 mb-1 flex h-4 items-center px-3 first:mt-0">
      {colapsada ? (
        <div className="h-px w-full bg-line-subtle" />
      ) : (
        <span className="text-micro font-semibold tracking-wide text-fg-subtle">{rotulo}</span>
      )}
    </div>
  );
}

/**
 * Barra lateral.
 *
 * No desktop alterna entre fixada e colapsada; no celular é renderizada dentro
 * da gaveta, e `aoNavegar` a fecha ao navegar.
 */
export function Sidebar({
  nav,
  logo,
  marcaCompacta,
  perfil,
  tema,
  acoesRapidas,
  filtrarItem,
  colapsada = false,
  fixada = true,
  aoAlternarFixada,
  aoNavegar,
  aoEntrarComMouse,
  aoSairComMouse,
}: SidebarProps) {
  const grupos = gruposComItens(nav, filtrarItem);
  const ConteudoDoPerfil = (
    <>
      <div className="relative shrink-0">
        {perfil.avatarUrl ? (
          <img
            src={perfil.avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-surface"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white ring-2 ring-surface">
            {iniciaisDe(perfil.nome)}
          </span>
        )}
      </div>
      {!colapsada && (
        <div className="min-w-0 leading-tight">
          <div className="truncate text-body font-semibold">{perfil.nome}</div>
          {perfil.email && (
            <div className="truncate text-micro text-fg-subtle">{perfil.email}</div>
          )}
        </div>
      )}
    </>
  );

  return (
    <aside
      onMouseEnter={aoEntrarComMouse}
      onMouseLeave={aoSairComMouse}
      className={cn(
        "flex h-full flex-col border-r border-line-subtle bg-surface transition-[width] duration-[var(--dur)]",
        colapsada ? "w-(--sidebar-w-collapsed)" : "w-(--sidebar-w)",
      )}
    >
      {/* Cabeçalho: marca e o controle de fixar. */}
      <div className="flex h-16 shrink-0 items-center border-b border-line-subtle px-3">
        {colapsada ? (
          <span className="mx-auto grid h-9 w-9 place-items-center rounded-md bg-brand-500 font-display text-title font-extrabold text-white">
            {marcaCompacta}
          </span>
        ) : (
          <>
            {logo}
            {aoAlternarFixada && (
              <button
                type="button"
                onClick={aoAlternarFixada}
                aria-label={fixada ? "Desafixar menu" : "Fixar menu"}
                title={fixada ? "Desafixar menu" : "Fixar menu"}
                className="ml-auto grid h-8 w-8 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg"
              >
                {fixada ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
              </button>
            )}
          </>
        )}
      </div>

      {/* Perfil. Altura fixa nos dois estados, pelo mesmo motivo do cabeçalho
          de seção: colapsar não pode empurrar o menu para cima ou para baixo. */}
      {perfil.para ? (
        <NavLink
          to={perfil.para}
          onClick={aoNavegar}
          className={cn(
            "flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3 hover:bg-input",
            colapsada && "justify-center",
          )}
        >
          {ConteudoDoPerfil}
        </NavLink>
      ) : (
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3",
            colapsada && "justify-center",
          )}
        >
          {ConteudoDoPerfil}
        </div>
      )}

      {/* Navegação, agrupada por trabalho. Cada grupo é uma `nav` própria e
          rotulada, para o leitor de tela pular de uma seção a outra em vez de
          atravessar todos os links seguidos. */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
        {grupos.map(({ grupo, itens }) => (
          <nav key={grupo.id} aria-label={grupo.label} className="flex flex-col gap-1">
            <CabecalhoDeSecao rotulo={grupo.label} colapsada={colapsada} />
            {itens.map((item) => {
              const Icone = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={aoNavegar}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium transition-all",
                      colapsada && "justify-center px-0",
                      isActive
                        ? "bg-linear-to-r from-brand-500 to-brand-700 text-white shadow-(--shadow-2)"
                        : "text-fg-muted hover:bg-input hover:text-fg",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icone
                        size={20}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 transition-transform group-hover:scale-110",
                          !isActive && "text-accent",
                        )}
                      />
                      {/* O rótulo existe nos DOIS estados. Colapsado ele fica só
                          para o leitor de tela — depender de `title` deixava o
                          link sem nome acessível. */}
                      <span className={colapsada ? "sr-only" : "truncate"}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        ))}

        {acoesRapidas && acoesRapidas.length > 0 && (
          <>
            <CabecalhoDeSecao rotulo="Ações rápidas" colapsada={colapsada} />
            {acoesRapidas.map((acao) => {
              const Icone = acao.icon;
              return (
                <button
                  key={acao.id}
                  type="button"
                  onClick={() => {
                    aoNavegar?.();
                    acao.aoAcionar();
                  }}
                  className={cn(
                    "group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium text-fg-muted transition-all hover:bg-input hover:text-fg",
                    colapsada && "justify-center px-0",
                  )}
                >
                  {/* Ícone com selo "+": é o que distingue criar de navegar. Sem
                      ele, uma ação rápida parece mais um item do menu. */}
                  <span className="relative shrink-0 transition-transform group-hover:scale-110">
                    <Icone size={20} aria-hidden="true" className="text-accent" />
                    <span className="absolute -right-1 -bottom-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-white ring-2 ring-surface">
                      <Plus size={9} aria-hidden="true" />
                    </span>
                  </span>
                  <span className={colapsada ? "sr-only" : "truncate"}>{acao.label}</span>
                </button>
              );
            })}
          </>
        )}
      </div>

      {/* Rodapé: tema e sair. Some por inteiro quando o produto não põe
          nenhum dos dois aqui — uma faixa vazia com borda é pior que nada. */}
      {(tema || perfil.aoSair) && (
      <div
        className={cn(
          "flex items-center gap-1 border-t border-line-subtle p-2",
          colapsada && "flex-col",
        )}
      >
        {tema && (
          <button
            type="button"
            onClick={tema.alternar}
            aria-label="Alternar tema"
            title="Alternar tema"
            className="grid h-10 flex-1 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg"
          >
            {tema.resolvido === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
        )}
        {perfil.aoSair && (
          <button
            type="button"
            onClick={() => {
              aoNavegar?.();
              perfil.aoSair?.();
            }}
            aria-label="Sair"
            title="Sair"
            className="grid h-10 flex-1 place-items-center rounded-control text-danger transition hover:bg-input"
          >
            <LogOut size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      )}
    </aside>
  );
}
