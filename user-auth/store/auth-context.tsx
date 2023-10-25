import { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>("");

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  };

  // const contextValue = {
  //   token: authToken,
  //   isAuthenticated: !!authToken,
  //   authenticate,
  //   logout,
  // };

  const contextValue = useMemo(
    () => ({
      token: authToken,
      isAuthenticated: !!authToken,
      authenticate,
      logout,
    }),
    [authToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
