import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: null
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
    const contextValue = {
    token,
    setToken
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
