import "./styles/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";

import { motion } from "framer-motion";
function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <Todos />
        <DisplayTodos />
      </div>
    </div>
  );
}

export default App;
