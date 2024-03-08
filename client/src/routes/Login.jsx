import React, {useEffect} from 'react';
import { useNavigate , useState} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
//import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'; // Import Axios
import AnomalyFinder from '../apis/AnomalyFinder';

const Login = () => {
  //const { loginWithRedirect } = useAuth0(); // used for Auth0 Authentication
  const navigate = useNavigate();

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>; 
  }
  /*
  const handleCallback = async () => {
    console.log("entered callback");
    try {

      console.log("entered try");
      // Extract the authorization code from the URL query parameters
      const params = new URLSearchParams(window.location.search);
      console.log("params retreived");
      const code = params.get('code');
      console.log("code retreived");
      // Make a request to your backend to exchange the authorization code for an access token
      const res = await AnomalyFinder.get('/test');
      console.log("after res");
      console.log(res);
      const response = await axios.post('http://localhost:3001/');
      console.log("response received");
      // If the exchange is successful, redirect the user to /cic
      if (response.data.success) {
        navigate('/cic');
      } else {
        console.log('Authorization code exchange failed');
      }
    } catch (error) {
      console.error('Error handling callback:', error);
    }
  };
*/

/*
  const handleLogin = () => {
    window.location.href = 'https://dev-o34bqen6xipaqjxs.us.auth0.com/authorize?client_id=aeP5JpgwYxGAjJrWc0zLTEHXKMUcoSTo&response_type=code&redirect_uri=http://localhost:3000/cic';
  }
*/

return (
  <div className='login-page'>
    <div className='login-elements'>
      <img className='logo' src={logo} alt='logo'/>
      <h2 className='login-header page-header'>Data Supply Chain <br />County Outages & Anomaly Tracker</h2>
      <br />
      <LoginButton></LoginButton>
    </div>
  </div>
);
};

export default Login;
