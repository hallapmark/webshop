import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const RequireAuth = () => {
  const { loggedIn } = useContext(AuthContext);

  // If not logged in, redirect to login page
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child route elements
  return <Outlet />;
};

export default RequireAuth;