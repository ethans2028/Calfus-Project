import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Link } from 'react-router-dom';
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Login from './routes/Login';
import NewAnomalyPage from './routes/NewAnomalyPage';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';
import { AnomalyContextProvider } from './context/AnomalyContext';

const App = () => {
  return (
    <AnomalyContextProvider>
      <div>
        <Router>
          <Routes> 
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/cic" element={<Cic/>}/>
            <Route exact path="/AnomalyDetailPage" element={<AnomalyDetailPage/>}/>
            <Route exact path="/NewAnomalyPage" element={<NewAnomalyPage/>}/>
          </Routes>
        </Router>
      </div>
    </AnomalyContextProvider>
  )
}

export default App;
