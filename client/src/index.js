

import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import {createRoot} from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';


ReactDOM.render(<App/>, document.getElementById("root"));

const root = createRoot(document.getElementById('root'));
root.render(
<Auth0Provider
   domain="dev-o34bqen6xipaqjxs.us.auth0.com"
   clientId="aeP5JpgwYxGAjJrWc0zLTEHXKMUcoSTo"
   redirectUri="http://localhost:3000/cic"
   audience="http://localhost:5000"
 >
    <App />
  </Auth0Provider>,
);
