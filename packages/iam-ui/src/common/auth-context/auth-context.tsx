import React, { createContext, PropsWithChildren, useMemo, useReducer } from 'react';
import { authReducer } from './reducers';
export type UserType = {
  id: number;
  userName: string;
  profilePicPath?: string;
  roles: string
}
export type InitialStateType = {
  isAuthenticated: boolean,
  user: any,
  defaultPlant: string,
  defaultPlantCurrency: string,
  token: any,
  menuAccessObject: any,
  defaultPlantName: string;
  errorMessage: string | null;
}

export const initialAuthState: InitialStateType = {
  isAuthenticated: true,
  user: {
    userName: 'Admin',
    id: 1,
    profilePicPath: undefined,
    roles: ''
  },
  defaultPlant: 'SRPL',
  defaultPlantCurrency: 'USD',
  defaultPlantName: "Schemax-IAM",

  errorMessage: null,
  token: null,
  menuAccessObject: []
}

interface AuthContextType {
  authContext: InitialStateType;
  dispatch: React.Dispatch<any>;
}
interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  authContext: initialAuthState,
  dispatch: () => null
});

const AuthProvider: React.FC<PropsWithChildren<AuthContextProps>> = ({ children }: { children: React.ReactNode }) => {
  const [authContext, dispatch] = useReducer(authReducer, initialAuthState);

  const value = useMemo(
    () => ({
      authContext, dispatch
    }),
    [authContext]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthState = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, AuthContext, useAuthState };

