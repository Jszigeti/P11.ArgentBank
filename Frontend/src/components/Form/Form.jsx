import React, { useState } from "react";
import "./Form.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";
import { reconfigurePersistor } from "../../store/store";
import { NavLink } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  // Retrieve the status of the API call
  const { loginStatus, registerStatus } = useSelector((state) => state.user);
  // States creation to control the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Sending ids and RM when submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Store the state of the remember me box in the localStorage
    localStorage.setItem("rememberMe", rememberMe);

    // Reconfigure the persistor based on rememberMe state
    reconfigurePersistor(rememberMe);

    const ids = {
      email: username,
      password: password,
    };

    dispatch(login(ids));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {registerStatus === "succeeded" && (
          <p>Registration successful, log in.</p>
        )}
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Not registred yet ?{" "}
          <NavLink className="main-nav-item" to="/sign-up">
            <span>Sign Up</span>
          </NavLink>
        </p>
        {/* Display an error message if the call failed */}
        {loginStatus === "failed" && <p>Incorrect username or password.</p>}
      </section>
    </main>
  );
}

export default Form;
