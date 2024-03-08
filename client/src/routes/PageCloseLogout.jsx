
import React, { useState, useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutOnTabClose = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    const handleBeforeUnload = () => {
      logout({ returnTo: window.location.origin });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [logout]);

  return null; // This component doesn't render anything visible to the user
};

export default LogoutOnTabClose;
