import React from "react";
import "./Task.css";
import { useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Swal from "sweetalert2";
import axios from "axios";

export default function Task() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      console.log("Started fetching");
      const response = await axios.get(`${baseUrl}/task/${user_id}/`);
      const tasks = response.data;

      console.log("Tasks:", tasks);
      if (tasks) setTasks(tasks);
    } catch (error) {
      setError(error);

      console.error("Error fetching tasks:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Component mounted: Task.JS");
    fetchTasks();
  }, []);

  if (isLoading) return <div>Loading....</div>;

  const deleteTask = async (task_id) => {
    await axios.delete(`${baseUrl}/task-detail/${user_id}/${task_id}/`);
    fetchTasks();
  };

  const markTaskAsComplete = async (task_id) => {
    await axios.patch(
      `${baseUrl}/task-mark-as-completed/${user_id}/${task_id}/`
    );
    fetchTasks();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formSubmit = async (newTask) => {
    const formdata = new FormData();

    formdata.append("user", user_id);
    formdata.append("title", newTask.title);
    formdata.append("description", newTask.description);
    formdata.append("category", newTask.category);
    formdata.append("due_date", newTask.due_date);
    formdata.append("completed", false);

    try {
      const res = await axios.post(`${baseUrl}/task/${user_id}/`, formdata);
      console.log(res.data);
      Swal.fire({
        title: "Task Created",
        icon: "success",
        toast: true,
        timer: 1000,
        position: "top-right",
        timerProgressBar: true,
      });
      fetchTasks();
      closeModal();
    } catch (error) {
      console.log(error);
      console.log("Task was not created");
    }
  };

  return (
    <div className={`tasks-container ${isModalOpen ? "modal-active" : ""}`}>
      <div className="header-content">
        <div>
          <div>ALL TASKS</div>
          <p>All your tasks are displayed here!</p>
        </div>
        <div>
          <button onClick={openModal} className="btn-add">
            <span className="text">ADD TASK +</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {isModalOpen && (
          <div
            className={`modal ${isModalOpen ? "modal-active" : ""}`}
            onClick={closeModal}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <TaskForm onSubmit={formSubmit} />
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
          </div>
        )}

        {tasks
          .slice()
          .reverse()
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onComplete={markTaskAsComplete}
            />
          ))}
      </div>
    </div>
  );
}
