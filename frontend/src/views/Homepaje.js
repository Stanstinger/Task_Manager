import React, { useContext } from "react";
import "./Homepaje.css";
import { useState } from "react";
import AuthContext from "../context/AuthContext";

function Homepaje() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegistrationForm(!showRegistrationForm);
  };

  const { loginUser, registerUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);

    console.log(email);
    console.log(password);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    registerUser(email, username, password, password2);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />

      <header className="header">
        <nav className="nav">
          <a href="#" className="nav_logo">
            Task Manager
          </a>

          <button className="button" onClick={toggleForms}>
            Login
          </button>
        </nav>
      </header>

      <section className="home">
        <div className="form_container">
          {showLoginForm ? (
            <div className="form login_form">
              <form onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <div className="input_box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required=""
                    name="email"
                  />
                  <i className="uil uil-envelope-alt email" />
                </div>
                <div className="input_box">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required=""
                    name="password"
                  />
                  <i className="uil uil-lock password" />
                  <i className="uil uil-eye-slash pw_hide" />
                </div>
                <div className="option_field">
                  <span className="checkbox">
                    <input type="checkbox" id="check" />
                    <label htmlFor="check">Remember me</label>
                  </span>
                  <a href="#" className="forgot_pw">
                    Forgot password?
                  </a>
                </div>
                <button className="button" type="submit">
                  Login Now
                </button>
                <div className="login_signup">
                  Don't have an account?{" "}
                  <a href="#" id="signup" onClick={toggleForms}>
                    Signup
                  </a>
                </div>
              </form>
            </div>
          ) : null}
          {showRegistrationForm ? (
            <div className="form signup_form">
              <form onSubmit={handleRegistrationSubmit}>
                <h2>Signup</h2>
                <div className="input_box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required=""
                    name="email"
                  />
                  <i className="uil uil-envelope-alt email" />
                </div>
                <div className="input_box">
                  <i className="uil uil-user"></i>
                  <input
                    type="text"
                    placeholder="Enter your Username"
                    required=""
                    name="username"
                  />
                </div>
                <div className="input_box">
                  <input
                    type="password"
                    placeholder="Create password"
                    required=""
                    name="password"
                  />
                  <i className="uil uil-lock password" />
                  <i className="uil uil-eye-slash pw_hide" />
                </div>
                <div className="input_box">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required=""
                    name="password2"
                  />
                  <i className="uil uil-lock password" />
                  <i className="uil uil-eye-slash pw_hide" />
                </div>
                <button className="button">Signup Now</button>
                <div className="login_signup">
                  Already have an account?{" "}
                  <a href="#" id="login" onClick={toggleForms}>
                    Login
                  </a>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Homepaje;
