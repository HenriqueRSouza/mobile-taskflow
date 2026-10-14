import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Tasks } from "./pages/Tasks/Tasks";
import { TarefasProvider } from "./contexts/TarefasProvider";

function App() {
  return (
    <TarefasProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Tasks visao="hoje" />} />
            <Route path="/proximas" element={<Tasks visao="proximas" />} />
            <Route path="/tarefas" element={<Tasks visao="tarefas" />} />
            <Route path="/concluidas" element={<Tasks visao="concluidas" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TarefasProvider>
  );
}

export default App;
