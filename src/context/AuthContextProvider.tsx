import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";
import type { Person } from "../models/Person";

export const  AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const [person, setPerson] = useState<Person>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionStorage.getItem("expiration"));
    console.log(new Date().getTime());
    if (sessionStorage.getItem("token") && sessionStorage.getItem("expiration")) {
      if (Number(sessionStorage.getItem("expiration")) > new Date().getTime()) {
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

  function login(tokenFromServer: string, expiration: number) {
    sessionStorage.setItem("token", tokenFromServer);
    sessionStorage.setItem("expiration", expiration.toString());
    setToken(tokenFromServer);
    fetchPerson();
    setLoggedIn(true);
    navigate("/profile");
  }

  function logout() {
    navigate("/");
    setToken("");
    setLoggedIn(false);
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ person, token, loggedIn, setPerson, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}