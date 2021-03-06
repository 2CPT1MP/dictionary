import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../context/user.context";

export const useProtectedRoute = () => {
  const {headerConfig, setToken, setAuthenticated} = useContext(UserContext)

  const get = <T>(url: string) => {
    return new Promise<T>((async (resolve, reject) => {
      try {
        if (headerConfig) {
          const response = await axios.get<T>(url, headerConfig);
          setAuthenticated(true);
          resolve(response.data);
        }
      } catch (error) {
        if (error.response.status && error.response.status === 401) {
          setToken("");
          setAuthenticated(false);
        }
      }
    }));
  }

  const post = <T>(url: string, data?: any) => {
    return new Promise<T>((async (resolve) => {
      try {
        if (headerConfig) {
          const response = await axios.post<T>(url, data, headerConfig);
          setAuthenticated(true);
          resolve(response.data);
        }
      } catch (error) {
        if (error.response.status && error.response.status === 401)
          setAuthenticated(false);
      }
    }));
  }

  const patch = <T>(url: string, data?: any) => {
    return new Promise<T>((async (resolve) => {
      try {
        if (headerConfig) {
          const response = await axios.patch<T>(url, data, headerConfig);
          setAuthenticated(true);
          resolve(response.data);
        }
      } catch (error) {
        if (error.response.status && error.response.status === 401)
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