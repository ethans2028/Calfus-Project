import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Login from './routes/Login';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';
import EditPage from './routes/EditPage';
import { AnomalyContextProvider } from './context/AnomalyContext';
import NewPage from './routes/NewAnomalyPage'; // adjust the path as needed
import { Auth0Provider } from '@auth0/auth0-react';

const App = () => {
  return (
    <AnomalyContextProvider>
      <Auth0Provider
        domain="dev-o34bqen6xipaqjxs.us.auth0.com"
        clientId="aeP5JpgwYxGAjJrWc0zLTEHXKMUcoSTo"
        redirectUri="http://localhost:3000/cic"
        audience="http://localhost:5000"
        >
      <div>
        <Router>
          <Routes> 
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/cic" element={<Cic/>}/>
            <Route exact path="/AnomalyDetailPage" element={<AnomalyDetailPage/>}/>
            <Route exact path="/NewPage" element={<NewPage/>}/>
            <Route exact path="/anomalies/:id" element={<AnomalyDetailPage/>}/>
            <Route exact path="/anomalies/:id/changes" element={<AuditPage/>}/>
            <Route exact path="/anomalies/:id/edit" element={<EditPage/>}/>
          </Routes>
        </Router>
      </div>
      </Auth0Provider>
    </AnomalyContextProvider>
  )
}

export default App;


