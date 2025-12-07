import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export const  AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const navigate = useNavigate();

  function login(tokenFromServer) {
    sessionStorage.setItem("token", tokenFromServer);
    setToken(tokenFromServer);
    setLoggedIn(true);
    navigate("/profile");
  }

  function logout() {
    navigate("/");
    setToken(null);
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}