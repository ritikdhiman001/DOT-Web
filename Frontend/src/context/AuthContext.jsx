import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthoProvider = ({ children }) => {
  const [isAuthorization, setIsAuthorization] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthorization(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/course", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPurchasedCourses(res.data.data);
    } catch (error) {
      console.error("Error Fetch Orders ", error.message);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthorization(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthorization(false);
    setPurchasedCourses([]);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorization, login, logout, purchasedCourses }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
