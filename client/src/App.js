import { useState } from "react";
import { TodoContext } from "./TodoContext";

import Form from "./Form";
import List from "./List";

import "./App.css";

function App() {
  const [secilenId, setSecilenId] = useState(0);

  return (
    <div className="main">
      <TodoContext.Provider value={{ secilenId, setSecilenId }}>
        <Form />
        <List />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
