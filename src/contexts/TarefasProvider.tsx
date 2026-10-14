import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  alterarTarefa,
  criarTarefa,
  excluirTarefa,
  listarTarefas,
} from "../services/tarefaService";
import type { Tarefa } from "../types/Tarefa";
import { TarefasContext } from "./TarefasContext";

type TarefasProviderProps = { children: ReactNode };

export function TarefasProvider({ children }: Readonly<TarefasProviderProps>) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarTarefas();
        setTarefas(dados);
      } catch {
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  async function adicionarTarefa(novaTarefa: Omit<Tarefa, "_id">) {
    try {
      setErro("");
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((tarefasAtuais) => [tarefaCriada, ...tarefasAtuais]);
    } catch {
      setErro("Não foi possível criar a tarefa.");
    }
  }

  async function atualizarTarefa(tarefa: Tarefa) {
    // o _id vai no endereço do recurso, não nos dados enviados
    const { _id, ...dados } = tarefa;
    if (!_id) {
      return;
    }
    try {
      setErro("");
      const tarefaAtualizada = await alterarTarefa(_id, dados);
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefaAtual) =>
          tarefaAtual._id === tarefaAtualizada._id
            ? tarefaAtualizada
            : tarefaAtual,
        ),
      );
    } catch {
      setErro("Não foi possível alterar a tarefa.");
    }
  }

  async function removerTarefa(id: string) {
    try {
      setErro("");
      await excluirTarefa(id);
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa._id !== id),
      );
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  async function alternarConclusao(tarefa: Tarefa) {
    await atualizarTarefa({
      ...tarefa,
      concluida: !tarefa.concluida,
    });
  }

  return (
    <TarefasContext.Provider
      value={{
        tarefas,
        carregando,
        erro,
        adicionarTarefa,
        atualizarTarefa,
        removerTarefa,
        alternarConclusao,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
}
