import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';

const Login = () => {

  const [redirect, setRedirect] = useState(false);

  const handleButtonClick = () => {
    // Set redirect to true when the button is clicked
    setRedirect(true);
  };

  // Redirect to another page if redirect state is true
  if (redirect) {
    return <Navigate to="/cic" />;
  }

  return (
    <div className='login-page'>
      <div className='login-elements'>
        <img className='logo' src={logo} alt='logo'/>
        <h2 className='login-header page-header'>Data Supply Chain <br />County Outages & Anomaly Tracker</h2>
        <h4>Username</h4>
        <input type="text" placeholder=""/>
        <h4>Password</h4>
        <input type="password" placeholder=""/>
        <br />
          <button className= 'login-btn' onClick={handleButtonClick} >Login</button>
        
      </div>
      


    </div>
  )
}

export default Login