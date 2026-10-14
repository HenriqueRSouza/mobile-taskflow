import { useContext } from "react";
import { TarefasContext } from "../../contexts/TarefasContext";
import type { Tarefa } from "../../types/Tarefa";
import { TaskForm } from "../TaskForm/TaskForm";
import "./TaskModal.css";

type TaskModalProps = {
  tarefa?: Tarefa;
  aoFechar: () => void;
};

export function TaskModal({ tarefa, aoFechar }: Readonly<TaskModalProps>) {
  const { adicionarTarefa, atualizarTarefa } = useContext(TarefasContext);

  async function salvar(dados: Omit<Tarefa, "_id">) {
    if (tarefa) {
      // edição: mesmo _id, registro existente
      await atualizarTarefa({ ...dados, _id: tarefa._id });
    } else {
      // criação: novo registro
      await adicionarTarefa(dados);
    }
    aoFechar();
  }

  return (
    <div className="task-modal">
      <div className="task-modal__content">
        <TaskForm tarefa={tarefa} aoSalvar={salvar} aoCancelar={aoFechar} />
      </div>
    </div>
  );
}
