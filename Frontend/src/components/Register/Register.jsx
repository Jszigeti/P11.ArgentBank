import React, { useState } from "react";
import "./Register.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Retrieve the status of the API call
  const { registerStatus } = useSelector((state) => state.user);
  // States creation to control the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  // Sending ids and RM when submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const ids = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    };

    dispatch(register(ids));
    if (registerStatus === "succeeded") {
      navigate("/sign-in");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserPlus} />
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">First name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Last name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button type="submit" className="sign-in-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account ?{" "}
          <NavLink className="main-nav-item" to="/sign-in">
            <span>Sign In</span>
          </NavLink>
        </p>
        {/* Display an error message if the call failed */}
        {registerStatus === "failed" && <p>Error during registration.</p>}
      </section>
    </main>
  );
}

export default Register;
