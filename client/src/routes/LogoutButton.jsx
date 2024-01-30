import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';
import { useAuth0 } from "@auth0/auth0-react";

// This is a Logout Button object
// This will eventually be put on every page except (obviously) the login page
// It's temporarily borrowing the button styling, but might be changed later

export default function LogoutButton(){
    const {logout} = useAuth0();
    return (
      <button className='button' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    );
  }
