import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onDelete, onComplete }) => {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div className="item-container">
        <div className="first-div">
          {task.completed.toString() === "true" ? (
            <h3 className="item-title">
              <strike>
                Title:{" "}
                {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
              </strike>
            </h3>
          ) : (
            <h3 className="item-title">
              Title: {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
            </h3>
          )}
          <div className="category-box">
            <i class="bx bxs-category"></i>
            <span>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
          </div>
        </div>
        <div>
          Description: <p className="description">{task.description}</p>
        </div>

        <div className="third-div">
          <div className="date-div">
            <span>
              Due: {""} {task.due_date}
            </span>
          </div>
          <div className="btns">
            <label className="completed-box">
              Completed
              <input
                type="checkbox"
                name="checkbox"
                onClick={() => onComplete(task.id)}
              />
            </label>
            <div className="delete-box">
              Delete
              <button className="btn-delete" onClick={() => onDelete(task.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="svg-delete"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
