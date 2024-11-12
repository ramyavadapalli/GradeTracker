// src/components/TodoList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TodoList.css";

const apiUrl = import.meta.env.VITE_API_URL;

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${apiUrl}/user/${userId}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [userId]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = { text: newTask };
      axios
        .post(`${apiUrl}/user/${userId}/tasks`, task)
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  // Delete a task
  const handleTaskDelete = (taskId) => {
    axios
      .delete(`${apiUrl}/user/${userId}/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => console.error("Error deleting task:", error));
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
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className="task-text">{task.text}</span>
            <button
              onClick={() => handleTaskDelete(task._id)}
              className="delete-task-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
