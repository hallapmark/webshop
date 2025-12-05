import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export const  AuthContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  function login(token) {
    sessionStorage.setItem("token", token);
    navigate("/profile");
    setLoggedIn(true);
  }

  function logout() {
    navigate("/");
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}