import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slice/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    const userData = {
      name,
      email,
      password,
    };
    dispatch(registerUser(userData));
    navigate("/login");
  };

  return (
    <div className="registration">
      <h1>Registration</h1>
      <div className="form-group">
        <label className="label">Name:</label>
        <input
          type="text"
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Email:</label>
        <input
          type="email"
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label">Password:</label>
        <input
          type="password"
          className="input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="button" onClick={handleRegister}>
        Register
      </button>
      <button className="button">
        <Link to="http://localhost:5173/login" className="link2">
          Login?
        </Link>
      </button>
    </div>
  );
};

export default Registration;
