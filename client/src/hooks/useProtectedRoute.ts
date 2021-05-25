import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../context/user.context";

export const useProtectedRoute = () => {
  const {config, setToken, setAuthenticated} = useContext(UserContext)

  const get = <T>(url: string) => {
    return new Promise<T>((async (resolve) => {
      try {
        const response = await axios.get<T>(url, config);
        setAuthenticated(true);
        resolve(response.data);
      } catch (error) {
        if (error.response.status === 401)
          setAuthenticated(false);
      }
    }));
  }

  const post = <T>(url: string, data?: any) => {
    return new Promise<T>((async (resolve) => {
      try {
        const response = await axios.post<T>(url, data, config);
        setAuthenticated(true);
        resolve(response.data);
      } catch (error) {
        if (error.response.status === 401)
          setAuthenticated(false);
      }
    }));
  }

  const patch = <T>(url: string, data?: any) => {
    return new Promise<T>((async (resolve) => {
      try {
        const response = await axios.patch<T>(url, data, config);
        setAuthenticated(true);
        resolve(response.data);
      } catch (error) {
        if (error.response.status === 401)
          setAuthenticated(false);
      }
    }));
  }


  return {
    get,
    post,
    patch
  };
}