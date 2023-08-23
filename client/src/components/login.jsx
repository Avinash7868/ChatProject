import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/login.css";
import { loginUserMutation } from "../store/slice/userSlice";
import { Button } from "react-bootstrap";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    // dispatch(loginUser({ email, password }));
    dispatch(loginUserMutation({ email, password }));
  };

  return (
    <div className="login">
      <h1>Login</h1>

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

      <button className="button" onClick={handleLogin}>
        Login
      </button>
      <Button variant="button">
        <Link to="http://localhost:5173/">Not a user? Register</Link>
      </Button>
    </div>
  );
};

export default Login;
