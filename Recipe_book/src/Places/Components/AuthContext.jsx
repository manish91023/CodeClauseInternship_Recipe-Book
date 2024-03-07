// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState(null); // Add this line to store user details

 return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,user,setUser }}>
      {children}
    </AuthContext.Provider>
 );
};