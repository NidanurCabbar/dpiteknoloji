import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseReady } from "../lib/supabase";

/**
 * Auth — Supabase Auth üzerinden gerçek kimlik doğrulama.
 *
 * Supabase env tanımsızsa (eski deploy, local dev vs.) geriye dönük uyum için
 * localStorage tabanlı admin_s1234 girişi fallback olarak korunur. Üretimde
 * VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY tanımlı → Supabase yolu aktif.
 */

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Legacy fallback (Supabase kapalıyken)
const LEGACY_ADMIN_EMAIL = "info@dpiteknoloji.com.tr";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  /* ─── Supabase Auth akışı ─── */
  useEffect(() => {
    if (!isSupabaseReady() || !supabase) {
      // Legacy fallback: localStorage session kontrolü
      const adminSession = localStorage.getItem("admin_session");
      if (adminSession === "true") {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUserEmail(LEGACY_ADMIN_EMAIL);
      }
      return;
    }

    // İlk session'ı yükle
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (session?.user) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUserEmail(session.user.email ?? null);
      }
    });

    // Session değişimlerini dinle
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUserEmail(session.user.email ?? null);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserEmail(null);
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isSupabaseReady() || !supabase) {
      // Legacy fallback
      const storedPassword = localStorage.getItem("admin_password") || "admin_s1234";
      if (email === LEGACY_ADMIN_EMAIL && password === storedPassword) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUserEmail(email);
        localStorage.setItem("admin_session", "true");
        return true;
      }
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) {
      return false;
    }
    // onAuthStateChange state'i güncelleyecek ama gecikme olmasın diye elle setle
    setIsAuthenticated(true);
    setIsAdmin(true);
    setUserEmail(data.user?.email ?? null);
    return true;
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseReady() && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail(null);
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    if (!isSupabaseReady() || !supabase) {
      // Legacy fallback
      const storedPassword = localStorage.getItem("admin_password") || "admin_s1234";
      if (currentPassword !== storedPassword) return false;
      localStorage.setItem("admin_password", newPassword);
      return true;
    }

    if (!userEmail) return false;
    // Mevcut şifreyi reauth ile doğrula
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });
    if (reauthError) return false;

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return !error;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, userEmail, login, logout, changePassword }}
    >
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
