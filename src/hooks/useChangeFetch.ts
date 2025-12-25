import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ChangeItemFunc = (id?: any) => void;

function useChangeFetch<T>(endPoint: string): [ChangeItemFunc, T[]] {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState<T[]>([]);

  const changeItem: ChangeItemFunc = (id?: any) => {
    let url = import.meta.env.VITE_BACKEND_URL + "" + endPoint;
    fetch(id ? url + "/" + id : url, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
     .then(res => {
      if (!res.ok) {
        // Parse error response regardless of status code
        return res.json().catch(() => {
          // If JSON parsing fails, throw generic error
          throw new Error("Request failed");
        });
      }
      return res.json();
    })
     .then(json => {
      // check if it is an error response
      if (json.message && json.timestamp && json.status) {
        if (json.message === "Token expired") {
          // Clear token and redirect to login
          logout()
          navigate("/login");
        } else {
          alert(json.message);
        }
      } else {
        setItems(json);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred");
    });
  }

  return (
    // nb!
    [ changeItem, items ]
  )
}
export default useChangeFetch