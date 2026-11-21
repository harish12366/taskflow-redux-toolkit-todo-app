
import { useState } from "react";

function TodoCard({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: todo.name || "",
    description: todo.description || "",
    status: todo.status || "Not Completed",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      alert("Todo name is required");
      return;
    }

    onEdit(todo.id, {
      ...formData,
      name: formData.name.trim(),
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: todo.name || "",
      description: todo.description || "",
      status: todo.status || "Not Completed",
    });

    setIsEditing(false);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Todo name"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="card-actions">
            <button
              className="update-btn"
              onClick={handleUpdate}
            >
              Update
            </button>

            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-top">
            <span
              className={`status ${
                todo.status === "Completed"
                  ? "completed"
                  : "pending"
              }`}
            >
              {todo.status}
            </span>
          </div>

          
            
            <h3>{todo.name}</h3>
          

          <p className="description">
            {todo.description || "No description added"}
          </p>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoCard;
