import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContexto } from "../../components/Layout/Layout";
import { TaskList } from "../../components/TaskList/TaskList";
import { TarefasContext } from "../../contexts/TarefasContext";
import type { Tarefa } from "../../types/Tarefa";
import "./Tasks.css";

type VisaoTarefas =
  | "tarefas"
  | "hoje"
  | "proximas"
  | "concluidas";

type TasksProps = {
  visao: VisaoTarefas;
};

const textos = {
  tarefas: {
    identificacao: "VISÃO GERAL",
    titulo: "Todas as tarefas",
    apoio: "Visualização completa das tarefas cadastradas.",
  },
  hoje: {
    identificacao: "FOCO DO DIA",
    titulo: "Hoje",
    apoio: "Concentre-se no que precisa avançar agora.",
  },
  proximas: {
    identificacao: "PRÓXIMOS DIAS",
    titulo: "Próximas",
    apoio: "Tarefas previstas para os próximos dias.",
  },
  concluidas: {
    identificacao: "FINALIZADAS",
    titulo: "Concluídas",
    apoio: "Tarefas que já foram finalizadas.",
  },
};

// data atual no formato AAAA-MM-DD, o mesmo do input date
function obterDataAtual() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// predicados: cada um decide se a tarefa entra na visualização
const estaConcluida = (tarefa: Tarefa) => tarefa.concluida;
const naoConcluida = (tarefa: Tarefa) => !tarefa.concluida;
const ehDeHoje = (tarefa: Tarefa) =>
  !tarefa.concluida && tarefa.data === obterDataAtual();
const ehProxima = (tarefa: Tarefa) =>
  !tarefa.concluida && tarefa.data > obterDataAtual();

const criterios = {
  tarefas: naoConcluida,
  hoje: ehDeHoje,
  proximas: ehProxima,
  concluidas: estaConcluida,
};

export function Tasks({ visao }: Readonly<TasksProps>) {
  const { tarefas, carregando, erro, removerTarefa, alternarConclusao } =
    useContext(TarefasContext);
  const { abrirCriacao, abrirEdicao } = useOutletContext<LayoutContexto>();

  // estado derivado: calculado a partir de tarefas, sem novo useState
  const tarefasFiltradas = tarefas.filter(criterios[visao]);
  const texto = textos[visao];

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">{texto.identificacao}</p>
          <h1>{texto.titulo}</h1>
          <p>{texto.apoio}</p>
        </div>
        <button type="button" onClick={abrirCriacao}>
          Nova tarefa
        </button>
      </div>
      {erro && <p className="tasks-page__error">{erro}</p>}
      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : (
        <TaskList
          tarefas={tarefasFiltradas}
          aoExcluir={removerTarefa}
          aoEditar={abrirEdicao}
          aoAlternarConclusao={alternarConclusao}
        />
      )}
    </section>
  );
}
