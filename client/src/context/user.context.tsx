import React, {useState} from "react";
import {useAuth} from "../hooks/useAuth";


interface IUserProviderProps {
  children: JSX.Element
}

type UserContextProvider = {
  config: {headers: {Authorization: string}},
  setToken: React.Dispatch<React.SetStateAction<string>>,
  authenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
}

export const UserContext = React.createContext<UserContextProvider>({
  config: {headers: {Authorization: ""}},
  setToken: () => {},
  authenticated: false,
  setAuthenticated: () => {}
});

export const UserProvider: React.FC<IUserProviderProps> = ({children}) => {
  const {config, setToken} = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  return (
    <UserContext.Provider value={{config, setToken, authenticated, setAuthenticated}}>
      {children}
    </UserContext.Provider>
  );
}