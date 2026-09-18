/**
 * A moldura das telas autenticadas.
 *
 * Barra lateral fixa no desktop — colapsável, com fixação e expansão no passar
 * do mouse —, gaveta no celular, barra superior e barra inferior.
 *
 * # O que ela NÃO faz
 *
 * Não autentica, não persiste preferência, não conhece papel nem feature flag,
 * e não decide quais itens existem. Tudo isso entra por prop, e é o que permite
 * que a mesma casca sirva a produtos com navegações completamente diferentes.
 *
 * O estado de fixação é **controlado**: um produto o guarda na conta, para sincronizar entre
 * aparelhos; outro, no próprio aparelho.
 * Persistência é política, e política é do produto.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./cn";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import type { FiltroDeItem, NavModel } from "./nav";
import type { AcaoRapida, PerfilDaCasca, SlotDaCasca, TemaDaCasca } from "./tipos";

/** O que a casca inteira aceita. */
export interface AppShellProps {
  nav: NavModel;
  logo: ReactNode;
  marcaCompacta: ReactNode;
  perfil: PerfilDaCasca;
  tema?: TemaDaCasca;
  acoesRapidas?: AcaoRapida[];
  /** Apresentação, nunca controle de acesso. Vale para as DUAS barras. */
  filtrarItem?: FiltroDeItem;
  /** Barra lateral fixada. Controlado pelo produto, que o persiste. */
  fixada: boolean;
  aoAlternarFixada: () => void;
  /** Onde a pessoa está, mostrado na barra superior. */
  titulo?: string;
  /** Sino de notificações, busca — o que o produto pendurar à direita. */
  topbarExtra?: SlotDaCasca;
  /** O conteúdo da rota. Um `<Outlet/>` de rota de layout, ou a própria página. */
  children?: ReactNode;
}

/**
 * Casca da aplicação autenticada.
 */
export function AppShell({
  nav,
  logo,
  marcaCompacta,
  perfil,
  tema,
  acoesRapidas,
  filtrarItem,
  fixada,
  aoAlternarFixada,
  titulo,
  topbarExtra,
  children,
}: AppShellProps) {
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [sobrevoando, setSobrevoando] = useState(false);
  const temporizador = useRef<number | null>(null);

  /**
   * Quem abriu a gaveta, para devolver o foco ao fechar.
   *
   * Sem isso o foco vai para o `<body>`, e quem navega por teclado recomeça do
   * topo da página a cada abertura de menu.
   */
  const abridor = useRef<HTMLElement | null>(null);

  const abrirGaveta = useCallback(() => {
    abridor.current = document.activeElement as HTMLElement | null;
    setGavetaAberta(true);
  }, []);

  const fecharGaveta = useCallback(() => {
    setGavetaAberta(false);
    abridor.current?.focus();
  }, []);

  // O Esc fecha a gaveta de qualquer lugar: preso ao elemento da gaveta, ele só
  // funcionaria com o foco lá dentro — e o foco costuma estar no botão que a
  // abriu.
  useEffect(() => {
    if (!gavetaAberta) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") fecharGaveta();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [gavetaAberta, fecharGaveta]);

  const expandida = fixada || sobrevoando;

  const aoEntrarComMouse = () => {
    if (temporizador.current) window.clearTimeout(temporizador.current);
    setSobrevoando(true);
  };
  // O atraso na saída evita que a barra pisque quando o ponteiro atravessa a
  // fronteira por um instante — indo para o conteúdo, por exemplo.
  const aoSairComMouse = () => {
    temporizador.current = window.setTimeout(() => setSobrevoando(false), 80);
  };

  const comuns = {
    nav,
    logo,
    marcaCompacta,
    perfil,
    tema,
    acoesRapidas,
    filtrarItem,
  };

  return (
    <div className="h-dvh overflow-hidden bg-canvas">
      {/* Salto para o conteúdo: invisível até receber foco, e PRIMEIRO elemento
          focável da página, de propósito. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-skip)] focus:rounded-control focus:bg-elevated focus:px-4 focus:py-2 focus:text-body focus:font-medium focus:shadow-(--shadow-2)"
      >
        Pular para o conteúdo
      </a>

      {/* Barra lateral fixa — desktop. */}
      <div className="fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-dvh md:block">
        <Sidebar
          {...comuns}
          colapsada={!expandida}
          fixada={fixada}
          aoAlternarFixada={aoAlternarFixada}
          aoEntrarComMouse={aoEntrarComMouse}
          aoSairComMouse={aoSairComMouse}
        />
      </div>

      {/* Gaveta — celular. É modal de fato, então se anuncia como tal, fecha no
          Esc e devolve o foco. Antes era um scrim com `onClick`: quem navegava
          por teclado ficava preso atrás dele, sem saída além do mouse. */}
      {gavetaAberta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navegação"
          className="fixed inset-0 z-[var(--z-drawer)] md:hidden"
        >
          <div className="absolute inset-0 bg-black/60" onClick={fecharGaveta} />
          <div className="absolute top-0 left-0 h-full">
            <Sidebar {...comuns} colapsada={false} aoNavegar={fecharGaveta} />
          </div>
        </div>
      )}

      {/* Conteúdo. O deslocamento acompanha a barra por TOKEN, não por número:
          a largura é a mesma que a barra usa, e mudá-la num lugar só faria o
          conteúdo cobrir a barra ou deixar uma faixa vazia. */}
      <div
        className={cn(
          "flex h-dvh flex-col transition-[padding] duration-[var(--dur)]",
          fixada ? "md:pl-(--sidebar-w)" : "md:pl-(--sidebar-w-collapsed)",
        )}
      >
        <Topbar aoAbrirMenu={abrirGaveta} titulo={titulo} extra={topbarExtra} />
        <main
          id="conteudo"
          tabIndex={-1}
          className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 md:pb-6"
        >
          {children}
        </main>
      </div>

      <BottomNav nav={nav} filtrarItem={filtrarItem} aoMais={abrirGaveta} />
    </div>
  );
}
