import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user từ localStorage khi app khởi động
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Phân quyền dựa trên email
    let role: 'user' | 'owner' | 'admin' = 'user';
    
    if (email.includes('admin@') || email === 'admin@footballpro.com') {
      role = 'admin';
    } else if (email.includes('owner@')) {
      role = 'owner';
    }

    const mockUser: User = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      phone: '0123456789',
      role
    };
    
    setUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = user?.role === 'admin';
  const isOwner = user?.role === 'owner';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin,
      isOwner
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
