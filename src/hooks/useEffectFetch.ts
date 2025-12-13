import { useEffect, useState } from "react";

function useEffectFetch(endPoint: string, errorMessage: string) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080" + endPoint)
      .then(res => {
        if (!res.ok) throw new Error(errorMessage);
        return res.json();
      })
      .then(json => {
        if (json.content) {
          setItems(json.content);
        } else {
          setItems(json);
        }
      })
      .catch(error => {
        console.error(errorMessage + ": ", error);
      });
  }, []);

  return (
    items
  )
}
export default useEffectFetch