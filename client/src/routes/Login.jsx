import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0(); // used for Auth0 Authentication
  
  /*
  
  deprecated due to shifting to Auth0 authentication
  
  const [redirect, setRedirect] = useState(false);

  const handleButtonClick = () => {
    // Set redirect to true when the button is clicked
    setRedirect(true);
  };

  // Redirect to another page if redirect state is true
  if (redirect) {
    return <Navigate to="/cic" />;
  }
  */

  /*
    temporarily changed login page to work with ONLY Auth0 authentication for now
  */
  return (
    <div className='login-page'>
      <div className='login-elements'>
        <img className='logo' src={logo} alt='logo'/>
        <h2 className='login-header page-header'>Data Supply Chain <br />County Outages & Anomaly Tracker</h2>
        <br />
        <button className= 'login-btn' onClick={() => loginWithRedirect()} >Login through Auth0</button>
      </div>
      


    </div>
  )
}

export default Login

/* object holding facility


        <h4>Username</h4>
        <input type="text" placeholder=""/>
        <h4>Password</h4>
        <input type="password" placeholder=""/>

          <button className= 'login-btn' onClick={handleButtonClick} >Login</button>
        
        <br />

*/