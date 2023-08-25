import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtecteLogin = () => {
  if (localStorage.getItem("token") != null) {
    // alert("Already Logged In");
    return <Navigate to="/Chathome" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtecteLogin;
