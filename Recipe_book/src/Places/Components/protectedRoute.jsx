import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as necessary
import {useCookies} from 'react-cookie'

const ProtectedRoute = ({ children }) => {
 const { isLoggedIn } = useContext(AuthContext);
 const [cookies,setCookies]=useCookies(['access_token'])

 if (!cookies.access_token) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
 }

 // Render children if logged in
 return children;
};

export default ProtectedRoute;