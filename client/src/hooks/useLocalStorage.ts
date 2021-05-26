import React, {useEffect, useState} from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (state)
      localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item !== null) setState(JSON.parse(item));
  }, []);

  return [state, setState];
}