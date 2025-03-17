// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// UserContextProvider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optionally, you can export useContext directly here as well (this is more flexible)
export const useUserContext = () => useContext(UserContext);
