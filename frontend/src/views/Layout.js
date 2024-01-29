import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Layout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const api = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_name = decoded.username;

  const { user, logoutUser } = useContext(AuthContext);

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
          <i class="bx bxl-flutter"></i>
          <span className="text">TaskManager</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === "Dashboard" ? "active" : ""}>
            <Link
              to="/layout/dashboard"
              onClick={() => handleMenuItemClick("Dashboard")}
            >
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className={activeMenuItem === "My Store" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("My Store")}>
              <i className="bx bxs-shopping-bag-alt" />
              <span className="text"></span>
            </a>
          </li>
          <li className={activeMenuItem === "All Tasks" ? "active" : ""}>
            <Link
              to="/layout/task"
              onClick={() => handleMenuItemClick("All Tasks")}
            >
              <i className="bx bxs-doughnut-chart" />
              <span className="text">All Tasks</span>
            </Link>
          </li>
          <li className={activeMenuItem === "Message" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Message")}>
              <i className="bx bxs-message-dots" />
              <span className="text">Notifications</span>
            </a>
          </li>
          <li className={activeMenuItem === "Team" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuItemClick("Team")}>
              <i class="bx bxs-user-detail"></i>
              <span className="text">Profile</span>
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
              onClick={() => {
                handleMenuItemClick("Logout");
                logoutUser();
              }}
            >
              <i class="bx bx-log-out"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar} />

          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>

          <a href="#" className="notification">
            <i className="bx bxs-bell" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            {user_name.toUpperCase()}
          </a>
        </nav>
        <main>{<Outlet />}</main>
      </section>
    </>
  );
}

export default Layout;
