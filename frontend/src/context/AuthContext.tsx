import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

export interface CurrentUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AuthContextValue {
  user: CurrentUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadCurrentUser() {
    const token = localStorage.getItem("ve_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await api.get<CurrentUser>("/api/users/me");
      setUser(me);
    } catch {
      localStorage.removeItem("ve_token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email: string, password: string) {
    const form = new URLSearchParams();
    form.set("username", email);
    form.set("password", password);
    const token = await api.postForm<{ access_token: string }>("/api/auth/login", form);
    localStorage.setItem("ve_token", token.access_token);
    const me = await api.get<CurrentUser>("/api/users/me");
    setUser(me);
  }

  async function register(fullName: string, email: string, password: string) {
    await api.post("/api/auth/register", { full_name: fullName, email, password });
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("ve_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
