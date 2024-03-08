/*
import React from 'react';
import { Navigate} from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import VariableName from "../assets/logo.jpg";
import logo from '../assets/logo.jpg';
import { useAuth0 } from "@auth0/auth0-react";
import { response } from 'express';

const LoginButton = () => {
    const login = async () => {
        const domain = "dev-o34bqen6xipaqjxs.us.auth0.com";
        const audience = "https://www.challengesAPI.com";
        const scope = "read:challenges";
        const clientId = "uXxWgDgDbCdSTepHD9IxfcI0qDzOEKId";
        const responseType = "code";
        const redirectUri = "http://localhost:3000/challenges";

        //sending response over
        const response = fetch(
            'http://${domain}/authorize?' +
            'audience=${audience}&' +
            'scope=${scope}&' +
            'response_type=${responseType}&' +
            'client_id=${clientId}&' +
            'redirect_uri=${redirectUri}', {
                redirect: "manual"
            }
        );
        window.location.replace(response.url);
    };

return (
    <button className="Login-button" onClick={() => login()}>
        Log In
    </button>
);
};

export default LoginButton;

*/