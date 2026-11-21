import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTodo,
  editTodo,
  removeTodo,
} from "../features/todos/todosSlice";

import TodoCard from "./TodoCard";

function Main() {
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector(
    (state) => state.todos
  );

  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Not Completed",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a todo name");
      return;
    }

    dispatch(
      addTodo({
        ...formData,
        name: formData.name.trim(),
      })
    );

    setFormData({
      name: "",
      description: "",
      status: "Not Completed",
    });

    setShowForm(false);
  };

  const handleEditTodo = (id, updatedTodo) => {
    dispatch(
      editTodo({
        id,
        todo: updatedTodo,
      })
    );
  };

  const handleDeleteTodo = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (confirmed) {
      dispatch(removeTodo(id));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      (todo.name || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (todo.description || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesFilter =
      filter === "All" || todo.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  const pendingCount = todos.filter(
    (todo) => todo.status !== "Completed"
  ).length;

  return (
    <main className="main-container">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>My Tasks</h1>
          <p className="subtitle">
            Organize your work and get things done.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add New Task"}
        </button>
      </section>

      <section className="stats-container">
        <div className="stat-card">
          <p>Total Tasks</p>
          <h2>{todos.length}</h2>
        </div>

        <div className="stat-card">
          <p>Completed</p>
          <h2>{completedCount}</h2>
        </div>

        <div className="stat-card">
          <p>Pending</p>
          <h2>{pendingCount}</h2>
        </div>
      </section>

      {showForm && (
        <form className="add-form" onSubmit={handleAddTodo}>
          <h2>Create New Task</h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit" className="add-btn">
            Save Task
          </button>
        </form>
      )}

      <section className="tasks-section">
        <div className="tasks-heading">
          <div>
            <h2>All Tasks</h2>
            <p>Manage your daily activities</p>
          </div>

          <span className="task-count">
            {filteredTodos.length} Tasks
          </span>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p className="message">Loading tasks...</p>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Add a new task to get started.</p>
          </div>
        ) : (
          <div className="todo-grid">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;