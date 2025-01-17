import React, { createContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        "https://test-api-y04b.onrender.com/signIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: username, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        setUser(data.name);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
