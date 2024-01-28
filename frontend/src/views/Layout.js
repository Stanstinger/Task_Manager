import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";

function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      />

      <section id="sidebar" className={isSidebarVisible ? "" : "hide"}>
        <a href="#" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
            <a
              href="/layout/dashboard"
              onClick={() => handleMenuItemClick("Dashboard")}
            >
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={activeMenuItem === "My Store" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("My Store")}>
              <i className="bx bxs-shopping-bag-alt" />
              <span className="text">My Store</span>
            </a>
          </li>
          <li className={activeMenuItem === "All Tasks" ? "active" : ""}>
            <a
              href="/layout/task"
              onClick={() => handleMenuItemClick("All Tasks")}
            >
              <i className="bx bxs-doughnut-chart" />
              <span className="text">All Tasks</span>
            </a>
          </li>
          <li className={activeMenuItem === "Message" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Message")}>
              <i className="bx bxs-message-dots" />
              <span className="text">Message</span>
            </a>
          </li>
          <li className={activeMenuItem === "Team" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Team")}>
              <i className="bx bxs-group" />
              <span className="text">Team</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li className={activeMenuItem === "Settings" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Settings")}>
              <i className="bx bxs-cog" />
              <span className="text">Settings</span>
            </a>
          </li>
          <li className={activeMenuItem === "Logout" ? "active" : ""}>
            <a
              href="#"
              className="logout"
              onClick={() => handleMenuItemClick("Logout")}
            >
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar} />
          <a href="#" className="nav-link">
            Categories
          </a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden="" />
          <label htmlFor="switch-mode" className="switch-mode" />
          <a href="#" className="notification">
            <i className="bx bxs-bell" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="img/people.png" />
          </a>
        </nav>
        <main>{<Outlet />}</main>
      </section>
    </>
  );
}

export default Layout;
