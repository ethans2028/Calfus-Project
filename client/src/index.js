import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import {createRoot} from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';

ReactDOM.render(<App/>, document.getElementById("root"));

const root = createRoot(document.getElementById('root'));
root.render(
<Auth0Provider
    domain="dev-8ivdzh8akwy7yl6q.us.auth0.com"
    clientId="HcTKqTx6DwOSGqaDnTd92ih0SPjjhsij"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000/cic'
    }}
  >
    <App />
  </Auth0Provider>,
);