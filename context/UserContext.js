"use client";

import fetchAdapter from "@/adapter/fetchAdapter";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socketInfo, setSocketInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const socketRef = useRef(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const initSocket = (userData = user) => {
    if (!userData) return;

    if (socketRef.current) {
      console.log("Socket already exists, skipping init.");
      return;
    }

    const socket = io("https://api.evhomes.tech", {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("userConnected", {
        userId: userData._id,
        platform: "web",
      });
    });

    socket.on("callCustomer", (data) => {
      console.log("callCustomer event:", data);
      // Add UI feedback (e.g., toast) here
    });

    socket.on("onChangeUserInfo", (data) => {
      console.log("onChangeUserInfo event:", data);
      // Add UI feedback (e.g., toast) here
      setSocketInfo(data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current = socket;
  };

  const reconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    initSocket();
  };

  useEffect(() => {
    if (user) initSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchAdapter("/api/employee-login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res?.data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetchAdapter("/api/employee-logout", {
      method: "POST",
    });

    localStorage.removeItem("user");
    // Clear cookies for access and refresh tokens

    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
        getSocket: () => socketRef.current,
        reconnectSocket,
        socketInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
