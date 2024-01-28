import React from "react";
import "./Task.css";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function Task() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const api = useAxios();

  const [createTask, setCreateTask] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
    completed: "",
  });

  const handleNewTask = (event) => {
    setCreateTask({
      ...createTask,
      [event.target.name]: event.target.value,
    });
  };

  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [task, setTask] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    await api.get(baseUrl + "/task/" + user_id + "/").then((res) => {
      console.log(res.data);
      setTask(res.data);
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();

    formdata.append("user", user_id);
    formdata.append("title", createTask.title);
    formdata.append("description", createTask.description);
    formdata.append("category", createTask.category);
    formdata.append("due_date", createTask.due_date);
    formdata.append("completed", false);

    try {
      api.post(baseUrl + "/task/" + user_id + "/", formdata).then((res) => {
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
        createTask.title = "";
        createTask.description = "";
        createTask.category = "";
        createTask.due_date = "";
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (task_id) => {
    await api.delete(baseUrl + "/task-detail/" + user_id + "/" + task_id + "/");
    Swal.fire({
      title: "Task Deleted",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
    });
    fetchTasks();
  };

  const markTaskAsComplete = async (task_id) => {
    await api.patch(
      baseUrl + "/task-mark-as-completed/" + user_id + "/" + task_id + "/"
    );
    Swal.fire({
      title: "Congratulations on completing your Task!",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
    });
    fetchTasks();
  };

  return (
    <div className="tasks-container">
      <div className="header-content">
        <div>ALL TASKS</div>
        <p>All your tasks are displayed here!</p>
      </div>
      <div className="cards-container">
        <div className="one">
          <div className="px-3 pb-4">
            <div>
              <h4 className="project">Add new project + </h4>
            </div>
            <div>
              <p className="quote">
                Still not enough? Click on a tile to add a new project.
              </p>
            </div>
          </div>
        </div>

        <form className="task-form">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={createTask.title}
            onChange={handleNewTask}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={createTask.description}
            onChange={handleNewTask}
            required
          />

          <label>Category:</label>
          <select
            name="category"
            value={createTask.category}
            onChange={handleNewTask}
            required
          >
            <option value="">Select Category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="urgent">Urgent</option>
          </select>

          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={createTask.due_date}
            onChange={handleNewTask}
            required
          />

          <button type="submit" onClick={(event) => formSubmit(event)}>
            Add Task
          </button>
        </form>

        {task.map((task) => (
          <div className="two">
            <div className="d-flex justify-content-end px-3 pt-1">
              <i className="mdi mdi-star-outline pr-1 star" />
              <i className="mdi mdi-dots-horizontal dot" />
            </div>
            <div className="px-3"></div>
            <div className="px-3 pt-3">
              {task.completed.toString() === "true" && (
                <h3 className="name">
                  <strike>{task.title}</strike>
                </h3>
              )}
              {task.completed.toString() === "false" && (
                <h3 className="name">{task.title}</h3>
              )}
              <p className="quote2">{task.description}</p>
            </div>
            <div className="d-flex justify-content-start px-3 align-items-center">
              <i className="mdi mdi-view-comfy task" />
              <span className="quote2 pl-2">{task.category}</span>
            </div>
            <div className="d-flex justify-content-between  px-3 align-items-center pb-3">
              <div className="d-flex justify-content-start align-items-center">
                <i className="mdi mdi-calendar-clock date" />
                <span className="quote2 pl-2">{task.due_date}</span>
              </div>
            </div>
            <div className="btns">
              <button
                className="btn-complete"
                type="button"
                onClick={() => markTaskAsComplete(task.id)}
              >
                Mark Complete
              </button>
              <button
                className="btn-delete"
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
