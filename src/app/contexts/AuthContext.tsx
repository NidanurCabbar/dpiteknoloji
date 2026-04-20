import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("admin_s1234");

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    const storedPassword = localStorage.getItem("admin_password");

    if (adminSession === "true") {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }

    if (storedPassword) {
      setAdminPassword(storedPassword);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "info@dpiteknoloji.com.tr" && password === adminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem("admin_session", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("admin_session");
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword === adminPassword) {
      setAdminPassword(newPassword);
      localStorage.setItem("admin_password", newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
