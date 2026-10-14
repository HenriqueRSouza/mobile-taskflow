import { createContext } from "react";
import type { Tarefa } from "../types/Tarefa";

type TarefasContextValor = {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string;
  adicionarTarefa: (novaTarefa: Omit<Tarefa, "_id">) => Promise<void>;
  atualizarTarefa: (tarefa: Tarefa) => Promise<void>;
  removerTarefa: (id: string) => Promise<void>;
  alternarConclusao: (tarefa: Tarefa) => Promise<void>;
};

export const TarefasContext = createContext<TarefasContextValor>(
  {} as TarefasContextValor,
);
