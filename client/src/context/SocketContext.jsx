import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const derivedFromApi = apiUrl ? apiUrl.replace(/\/api\/?$/, "") : "";
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL ||
      (import.meta.env.DEV
        ? "http://localhost:4000"
        : derivedFromApi || window.location.origin);
    setSocket(io(socketUrl, { withCredentials: true }));
  }, []);

  useEffect(() => {
  currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
