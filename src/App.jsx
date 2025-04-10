import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./style.css";

function App() {
  // inisialisasi todos selalu get dari localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // save todos ke localStorage setiap kali todos berubah
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add function
  const addTodo = (e) => {
    e.preventDefault();
    const text = newTodo.trim(); // setiap ada inputan dari user, saya trim agar tidak ada whitespace
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setNewTodo("");
  };

  // edit function
  const editTodo = (id, newText) => {
    const text = newText.trim();
    if (!text) return;
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  // delete function
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggle function
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  // filter function
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          required
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
