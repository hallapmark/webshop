import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export const  AuthContextProvider = ({children}) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const [person, setPerson] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionStorage.getItem("expiration"));
    console.log(new Date().getTime());
    if (sessionStorage.getItem("token") && sessionStorage.getItem("expiration")) {
      if (sessionStorage.getItem("expiration") > new Date().getTime()) {
        fetchPerson();
    } else {
      alert("Token expired. Log in again");
      logout();
      }
    }
  }, []);

  const fetchPerson = () => {
    fetch("http://localhost:8080/person", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        setPerson(json);
        console.log(json);
        // TODO: Display alert/toast if user not found / upon error
      }
    )
  }

  function login(tokenFromServer, expiration) {
    sessionStorage.setItem("token", tokenFromServer);
    sessionStorage.setItem("expiration", expiration);
    setToken(tokenFromServer);
    fetchPerson();
    setLoggedIn(true);
    navigate("/profile");
  }

  function logout() {
    navigate("/");
    setToken(null);
    setLoggedIn(false);
    // sessionStorage.removeItem("token");
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ person, token, loggedIn, setPerson, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}