// Logout.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const Logout = () => {
 const { setIsLoggedIn } = useContext(AuthContext);
 const navigate = useNavigate();

 const handleLogout = () => {
    // Clear the token from cookies or local storage
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Update the authentication state
    setIsLoggedIn(false);

    // Redirect the user to the login page or home page
    navigate('/recipe/auth');
 };

 return (
    <button onClick={handleLogout}>Logout</button>
 );
};

export default Logout;