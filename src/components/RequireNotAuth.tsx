import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

// typing {{baseuURL}}/login (or signup) when signed in should redirect to profile.
// i.e. log-in and signup menu is 'restricted' when you're already signed in.
const RequireNotAuth = () => {
  const { loggedIn } = useContext(AuthContext);

  // If not logged in, redirect to login page
  if (loggedIn) {
    return <Navigate to="/profile" replace />;
  }

  // If logged in, render the child route elements
  return <Outlet />;
};

export default RequireNotAuth;