import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userEmail: string | null;
  userName: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userEmail: null,
  userName: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("userEmail");
  });
  const [userName, setUserName] = useState<string | null>(() => {
    const email = localStorage.getItem("userEmail");
    return email ? email.split("@")[0] : null;
  });

  const login = (email: string, password: string): boolean => {
    if (email === "spaceadmin@gmail.com" && password === "admin123") {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserName(email.split("@")[0]);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    if (storedAuth === "true" && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserName(email.split("@")[0]);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userEmail, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
