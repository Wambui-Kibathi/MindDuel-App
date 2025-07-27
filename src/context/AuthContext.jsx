import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mindDuelUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem('mindDuelUser');
      return null;
    }
  });

  const login = useCallback((userData) => {
    if (!userData || !userData.id) {
      console.error("Invalid user data provided");
      return;
    }
    
    const completeUserData = {
      ...userData,
      // minimum required fields
      id: userData.id,
      username: userData.username || '',
    };
    
    setUser(completeUserData);
    localStorage.setItem('mindDuelUser', JSON.stringify(completeUserData));
  }, []);

  const updateUser = useCallback((updatedData) => {
    if (!user) return;
    
    const mergedUser = {
      ...user,
      ...updatedData
    };
    
    setUser(mergedUser);
    localStorage.setItem('mindDuelUser', JSON.stringify(mergedUser));
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mindDuelUser');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}