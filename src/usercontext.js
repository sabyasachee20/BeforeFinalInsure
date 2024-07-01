import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [suserId, setUserId] = useState('');
    const [suserPolicyId, setUserPolicyId] = useState('');

    return (
      <UserContext.Provider value={{ suserId, setUserId, suserPolicyId, setUserPolicyId }}>
            {children}
        </UserContext.Provider>
    );
};