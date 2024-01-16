import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file

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
        <h1 className='page-header'>Anomaly Tracker</h1>
        <h4>Username</h4>
        <input type="text" placeholder=""/>
        <h4>Password</h4>
        <input type="password" placeholder=""/>
        <br />
        <button className= 'button' onClick={handleButtonClick} style={{
          margin: '10px',
        }}>Login</button>
      </div>
      


    </div>
  )
}

export default Login