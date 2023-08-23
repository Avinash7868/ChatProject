// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
//     />
//   );
// };

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  // const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
