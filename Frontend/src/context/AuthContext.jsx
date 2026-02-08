import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthoProvider = ({ children }) => {
  const [isAuthorization, setIsAuthorization] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthorization(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthorization(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthorization(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthorization, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
