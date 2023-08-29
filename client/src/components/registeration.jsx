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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(Image);
    //Below is the fakepath of the image and change it to the image name
    const img = Image.split("\\")[2];
    console.log(img);
    if (!name || !email || !password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be atleast 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    // setErrorMessage = "";
    const userData = {
      name,
      email,
      password,
      img,
    };
    dispatch(registerUser(userData));

    // navigate("/login");
  };

  return (
    <div className="registration">
      <form className="form">
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
        <div className="form-group">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Image:</label>
          <input
            type="file"
            className="input"
            placeholder="Enter your image"
            // value={Image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="error-box">
          {errorMessage && <p className="error"> {errorMessage} </p>}
        </div>
        <button className="button" onClick={handleRegister}>
          Register
        </button>
        <button className="button">
          <Link to="http://localhost:5173/login" className="link2">
            Login?
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Registration;
