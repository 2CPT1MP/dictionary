import {useEffect, useState} from "react";
import {useLocalStorage} from "./useLocalStorage";


export type HeaderConfig = {
  headers: {
    Authorization: string
  }
}

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string | null>('access_token', null);
  const [headerConfig, setConfig] = useState<HeaderConfig | null>(null);

  useEffect(() => {
    if (token)
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