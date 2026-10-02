import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/authApi.ts';
import { getStoredToken } from '../api/client.ts';
import { UserProfileResponse, UserRole } from '../../shared/types/index.ts';

interface AuthContextType {
  user: UserProfileResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    full_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    grade?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authApi.getMe();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        // Token invalid
        authApi.logout();
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    if (res.success && res.data) {
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || 'Login amalga oshmadi' };
  };

  const register = async (data: {
    full_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    grade?: string;
  }) => {
    const res = await authApi.register(data);
    if (res.success && res.data) {
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || 'Ro‘yxatdan o‘tishda xatolik' };
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const role: UserRole = user?.role || 'student';
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher' || isAdmin;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        isTeacher,
        login,
        register,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
