import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const  AuthContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token"));

  function login() {
    setLoggedIn(true);
    sessionStorage.setItem("token", "blabla123");
  }

  function logout() {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}