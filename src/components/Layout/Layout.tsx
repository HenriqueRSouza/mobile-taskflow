import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { Tarefa } from "../../types/Tarefa";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { TaskModal } from "../TaskModal/TaskModal";
import "./Layout.css";

export type LayoutContexto = {
  abrirCriacao: () => void;
  abrirEdicao: (tarefa: Tarefa) => void;
};

export function Layout() {
  const [modalAberto, setModalAberto] = useState(false);
  // undefined = criação; uma tarefa = edição
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | undefined>();

  function abrirCriacao() {
    setTarefaEmEdicao(undefined);
    setModalAberto(true);
  }

  function abrirEdicao(tarefa: Tarefa) {
    setTarefaEmEdicao(tarefa);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setTarefaEmEdicao(undefined);
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__content">
        <Header />
        <main className="app-layout__main">
          <Outlet context={{ abrirCriacao, abrirEdicao }} />
        </main>
      </div>
      {modalAberto && (
        <TaskModal tarefa={tarefaEmEdicao} aoFechar={fecharModal} />
      )}
    </div>
  );
}
