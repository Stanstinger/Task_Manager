import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    due_date: "",
  });

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(task);
    setTask({
      title: "",
      description: "",
      category: "",
      due_date: "",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-container ic1">
        <label className="lable">Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          required
          className="input"
        />
      </div>
      <div className="input-container ic2">
        <label className="lable">Description:</label>

        <textarea
          name="description"
          value={task.description}
          onChange={handleInputChange}
          required
          className="input"
        />
      </div>

      <div className="input-container ic2">
        <label className="lable">Category:</label>
        <select
          name="category"
          value={task.category}
          onChange={handleInputChange}
          required
          className="input"
        >
          <option value="">Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="input-container ic2">
        <label className="lable">Due Date:</label>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleInputChange}
          required
          className="input"
          placeholder="Due Date"
        />
      </div>

      <button type="submit" className="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
