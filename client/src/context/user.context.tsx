import React from "react";
import {useAuth} from "../hooks/useAuth";


interface IUserProviderProps {
  children: JSX.Element
}

type UserContextProvider = {
  config: {headers: {Authorization: string}},
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = React.createContext<UserContextProvider>({
  config: {headers: {Authorization: ""}},
  setToken: () => {}
});

export const UserProvider: React.FC<IUserProviderProps> = ({children}) => {
  const {config, setToken} = useAuth();
  return (
    <UserContext.Provider value={{config, setToken}}>
      {children}
    </UserContext.Provider>
  );
}