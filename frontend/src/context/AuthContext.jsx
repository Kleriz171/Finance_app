import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Auth check failed:", err);
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success("Registered successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
