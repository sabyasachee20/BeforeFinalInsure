// AppContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [suserId, setUserId] = useState(null);
  const [suserPolicyId, setUserPolicyId] = useState(null);

  return (
    <AppContext.Provider value={{ suserId, setUserId, suserPolicyId, setUserPolicyId }}>
      {children}
    </AppContext.Provider>
  );
};