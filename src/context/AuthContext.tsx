import { createContext } from "react";
import type { Person } from "../models/Person";

export const AuthContext = createContext({
  person: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  }, 
  token: "", 
  loggedIn: false, 
  setPerson: (person: Person) => {console.log(person)}, 
  login: (tokenFromServer: string, expiration: number) => {console.log(tokenFromServer + expiration)}, 
  logout: () => {}
});

