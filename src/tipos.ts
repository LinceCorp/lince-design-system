import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Quem está usando, e como sair.
 *
 * A casca **não conhece autenticação**. Ela recebe o que mostrar e o que chamar
 * ao sair; quem sabe o que "sair" significa é o produto — num
 * deles é encerrar a sessão no servidor, noutro é descartar o token da memória,
 * e a casca não tem por que saber a diferença.
 */
export interface PerfilDaCasca {
  nome: string;
  email?: string;
  /** Rota do perfil. Ausente, o bloco não vira link. */
  para?: string;
  /** Imagem do avatar. Ausente, a casca desenha as iniciais do nome. */
  avatarUrl?: string;
  /**
   * Encerra a sessão. **Opcional**: ausente, a barra lateral não desenha o
   * botão de sair.
   *
   * Existe assim porque nem todo produto põe o sair no mesmo lugar — num deles
   * ele vive no rodapé da barra, noutro dentro do menu do avatar na barra
   * superior. Desenhá-lo sempre produzia dois botões de sair na mesma tela.
   */
  aoSair?: () => void;
}

/**
 * O tema, **controlado pelo produto**.
 *
 * O pacote não persiste nada: um produto guarda a escolha na conta, para
 * sincronizar entre aparelhos; outro, no próprio aparelho, por decisão
 * registrada em ADR. Persistência é política, e política é do produto.
 *
 * `resolvido` é o tema em vigor depois de resolvida a preferência do sistema —
 * nunca "auto". A casca precisa saber qual ícone desenhar, não qual regra levou
 * até ele.
 */
export interface TemaDaCasca {
  resolvido: "light" | "dark";
  alternar: () => void;
}

/**
 * Ação que cria alguma coisa sem trocar de página.
 *
 * Opcional: um produto tem quatro, outro não tem nenhuma. Ausente, a seção inteira não é renderizada — e não
 * fica um título de seção vazio ocupando a barra.
 */
export interface AcaoRapida {
  id: string;
  label: string;
  icon: LucideIcon;
  aoAcionar: () => void;
}

/**
 * Slot livre da casca — sino de notificações, campo de busca, seletor de
 * contrato. É `ReactNode` porque o pacote não pode ter opinião sobre o que cada
 * produto precisa pendurar ali.
 */
export type SlotDaCasca = ReactNode;
