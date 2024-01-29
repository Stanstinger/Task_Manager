import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import TaskForm from "../components/TaskForm";
import Swal from "sweetalert2";
import axios from "axios";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const user_name = decoded.username;

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("category");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortByDueDate, setSortByDueDate] = useState("asc");
  const [sortingActive, setSortingActive] = useState(false);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      console.log("authTokens:", token);

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
    console.log("Component mounted: Dashboard");
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed);
  const urgentTasks = tasks.filter((task) => task.category === "urgent");

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
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSort = (criteria) => {
    if (criteria === "due_date") {
      setSortByDueDate((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      if (sortCriteria === criteria) {
        toggleSortOrder();
      } else {
        setSortCriteria(criteria);
        setSortOrder("asc");
      }
    }
    setSortingActive(true);
  };

  useEffect(() => {
    const updateSortedTasks = () => {
      const updatedTasks = tasks.slice().sort((a, b) => {
        if (sortCriteria === "due_date") {
          const dateA = parseInt(a[sortCriteria].replace(/-/g, ""), 10);
          const dateB = parseInt(b[sortCriteria].replace(/-/g, ""), 10);
          return sortByDueDate === "asc" ? dateA - dateB : dateB - dateA;
        }

        const criteriaA = String(a[sortCriteria]).toLowerCase();
        const criteriaB = String(b[sortCriteria]).toLowerCase();

        if (criteriaA < criteriaB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (criteriaA > criteriaB) {
          return sortOrder === "asc" ? 1 : -1;
        }

        return a.completed && !b.completed ? (sortOrder === "asc" ? -1 : 1) : 0;
      });

      setSortedTasks(updatedTasks);
    };

    updateSortedTasks();
  }, [tasks, sortCriteria, sortOrder, sortByDueDate]);

  const handleTaskClick = (taskId, task) => {
    setSelectedTaskId(taskId);
    setSelectedTask(task);
    setIsModalTask(true);

    console.log(selectedTaskId);
    console.log(selectedTask);
  };

  const closeModalTask = () => {
    setIsModalTask(false);
    setSelectedTask(null);
    setSelectedTaskId(null);
  };

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

  if (isLoading) return <div>Loading....</div>;

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>
            Happy Tasking ,{" "}
            {user_name.charAt(0).toUpperCase() + user_name.slice(1)}
          </h1>
        </div>
        <button onClick={openModal} className="btn-download">
          <span className="text">ADD TASK +</span>
        </button>
      </div>
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
      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check" />
          <span className="text">
            <h3> {tasks.length}</h3>
            <p>TOTAL TASKS</p>
          </span>
        </li>
        <li>
          <i class="bx bx-check-shield"></i>
          <span className="text">
            <h3>{completedTasks.length}</h3>
            <p>COMPLETED TASKS</p>
          </span>
        </li>
        <li>
          <i class="bx bxs-hot"></i>
          <span className="text">
            <h3>{urgentTasks.length}</h3>
            <p>URGENT TASKS</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recently Added Tasks</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr className="list-headers">
                  <th onClick={() => handleSort("title")}>Title</th>
                  <th onClick={() => handleSort("due_date")}>Due Date</th>
                  <th onClick={() => handleSort("category")}>Category</th>
                  <th onClick={() => handleSort("completed")}>Status</th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className={`table-body-container ${
              isModalTask ? "details-overlay" : ""
            }`}
          >
            <table>
              <tbody>
                {sortingActive
                  ? sortedTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="list-bar"
                        onClick={() => handleTaskClick(task.id, task)}
                      >
                        <td>
                          {task.title.charAt(0).toUpperCase() +
                            task.title.slice(1, 5)}
                        </td>
                        <td>{task.due_date}</td>
                        <td>
                          {task.category.charAt(0).toUpperCase() +
                            task.category.slice(1)}
                        </td>
                        <td>
                          <span
                            className={`status ${
                              task.completed ? "completed" : "pending"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  : tasks
                      .slice()
                      .reverse()
                      .map((task) => (
                        <tr
                          key={task.id}
                          className="list-bar"
                          onClick={() => handleTaskClick(task.id, task)}
                        >
                          <td>
                            {task.title.charAt(0).toUpperCase() +
                              task.title.slice(1, 5)}
                          </td>
                          <td>{task.due_date}</td>
                          <td>
                            {task.category.charAt(0).toUpperCase() +
                              task.category.slice(1)}
                          </td>
                          <td>
                            <span
                              className={`status ${
                                task.completed ? "completed" : "pending"
                              }`}
                            >
                              {task.completed ? "Completed" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="todo">
          <div className="head">
            <h3>Urgent Tasks</h3>
          </div>
          <ul className="todo-list">
            {tasks
              .filter((task) => task.category === "urgent")
              .map((task) => (
                <li
                  key={task.id}
                  className={task.completed ? "completed" : "not-completed"}
                >
                  <p>
                    {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                  </p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
              ))}
          </ul>
        </div>
      </div>

      {isModalTask && (
        <div onClick={closeModalTask} className="details-modal-overlay">
          <div className="details-modal">
            <div className="task-details-header">
              <span>TASK DETAILS</span>
              <span>x</span>
            </div>
            <div>
              <TaskItem
                key={selectedTaskId}
                task={selectedTask}
                onDelete={deleteTask}
                onComplete={markTaskAsComplete}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
