import React, {useState} from "react";
import {HeaderConfig, useAuth} from "../hooks/useAuth";
import {Roles} from "../components/login.component";

interface IUserProviderProps {
  children: JSX.Element
}

type UserContextProvider = {
  user: UserData,
  headerConfig: HeaderConfig | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  authenticated: boolean,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
}

export const UserContext = React.createContext<UserContextProvider>({
  user: {
    userId: "",
    setUserId: () => {},
    roles: {
      roles: [],
      setRoles: () => {}
    }
  },
  headerConfig: null,
  setToken: () => {},
  authenticated: false,
  setAuthenticated: () => {}
});

type UserData = {
  userId: string,
  setUserId: React.Dispatch<React.SetStateAction<string>>,

  roles: {
    roles: Roles[],
    setRoles: React.Dispatch<React.SetStateAction<Roles[]>>
  }
}

export const UserProvider: React.FC<IUserProviderProps> = ({children}) => {
  const {headerConfig, setToken} = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>("");
  const [roles, setRoles] = useState<Roles[]>([]);

  return (
    <UserContext.Provider value={{
      user: {
        userId: userId,
        setUserId,
        roles: {
          roles,
          setRoles
        }
      },
      headerConfig,
      setToken,
      authenticated,
      setAuthenticated
    }}>
        {children}
    </UserContext.Provider>
  );
}