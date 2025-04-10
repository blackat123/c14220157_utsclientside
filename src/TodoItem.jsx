import { useState, useEffect } from "react";
import "./style.css";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // 
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  // edit handling
  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };


  // done and cancel edit handling (enter untuk done, escape untuk cancel)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit} // jika user pencet di luar input, edit akan tersave
            onKeyDown={handleKeyDown}
            autoFocus // agar input langsung fokus saat edit
            className="edit-input"
          />
        ) : (
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            className="todo-text"
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} disabled={isEditing} className="edit-button">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-button">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
