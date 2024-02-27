import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Login from './routes/Login';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';
import EditPage from './routes/EditPage';
import { AnomalyContextProvider } from './context/AnomalyContext';
import NewPage from './routes/NewAnomalyPage'; // adjust the path as needed
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AnomalyContextProvider>
      <div>
        <Router>
          <Routes> 
            <Route path="/" element={isAuthenticated ? <Cic /> : <Login />} />
            <Route path="/cic" element={isAuthenticated ? <Cic /> : <Navigate to="/" />} />
            <Route path="/AnomalyDetailPage" element={isAuthenticated ? <AnomalyDetailPage /> : <Navigate to="/" />} />
            <Route path="/NewPage" element={isAuthenticated ? <NewPage /> : <Navigate to="/" />} />
            <Route path="/anomalies/:id" element={isAuthenticated ? <AnomalyDetailPage /> : <Navigate to="/" />} />
            <Route path="/anomalies/:id/changes" element={isAuthenticated ? <AuditPage /> : <Navigate to="/" />} />
            <Route path="/anomalies/:id/edit" element={isAuthenticated ? <EditPage /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </AnomalyContextProvider>
  );
};

export default App;





