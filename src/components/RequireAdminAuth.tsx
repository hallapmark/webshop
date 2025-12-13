import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import NotEnoughRights from "../pages/auth/NotEnoughRights";

const RequireAdminAuth = () => {
  const { loggedIn, person } = useContext(AuthContext);

  // If not logged in or not with right permissions, redirect to login page
  if (!loggedIn || (person.role !== "ADMIN" && person.role !== "SUPERADMIN")) {
    return <NotEnoughRights />;
  }

  // If logged in and with correct role, render the child route elements
  return <Outlet />;
};

export default RequireAdminAuth;