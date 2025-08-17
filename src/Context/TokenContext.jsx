import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
