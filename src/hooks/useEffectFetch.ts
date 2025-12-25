import { useEffect, useState } from "react";

function useEffectFetch<T>(
  endPoint: string, 
  errorMessage: string, 
  headers?: Record<string, string>
): T[] {
  const [items, setItems] = useState<T[]>([]);
  // TODO: Tokeni võib siin siseselt võtta ka, true lihtsalt saada sisse

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "" + endPoint, { headers })
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