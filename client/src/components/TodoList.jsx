// src/components/TodoList.jsx
import React, { useState } from "react";
import "../styles/TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleTaskDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list-container">
      <h4>To-Do List</h4>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button onClick={handleAddTask} className="add-task-button">
          Add
        </button>
      </div>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="task-text">{task.text}</span>
            <button onClick={() => handleTaskDelete(index)} className="delete-task-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
