import {useEffect, useState} from "react";
import {useLocalStorage} from "./useLocalStorage";

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string>('access_token', "");
  const [headerConfig, setConfig] = useState({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  useEffect(() => {
    setConfig({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }, [token]);

  return {
    headerConfig,
    setToken
  }
}