import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'customer' | 'shopkeeper';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  language: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isDark: boolean;
  toggleDark: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [language, setLang] = useState('en');

  const login = useCallback((email: string, _password: string) => {
    // Demo: determine role from email
    const role: UserRole = email.includes('shop') ? 'shopkeeper' : 'customer';
    setUser({
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      role,
      language: 'en',
    });
  }, []);

  const register = useCallback((name: string, email: string, _password: string, role: UserRole) => {
    setUser({ id: crypto.randomUUID(), name, email, role, language: 'en' });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark(p => {
      document.documentElement.classList.toggle('dark', !p);
      return !p;
    });
  }, []);

  const setLanguage = useCallback((lang: string) => {
    setLang(lang);
    if (user) setUser(prev => prev ? { ...prev, language: lang } : null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile, isDark, toggleDark, language, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};
