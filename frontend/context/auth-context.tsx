"use client";

import { FetchHandler } from "@/utils/fetch";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  testsTaken: string[];
  testsCreated: string[];
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await FetchHandler.get("/api/v1/users/me");
        setUser(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    getMe();
  }, []);

  const logout = async () => {
    await FetchHandler.post("/api/v1/auth/logout", { data: null });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
