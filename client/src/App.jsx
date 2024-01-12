import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Link } from 'react-router-dom';
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Login from './routes/Login';
import NewAnomalyPage from './routes/NewAnomalyPage';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';

const App = () => {
  return <div>
    <Router>
      <Routes> 
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/cic" element={<Cic/>}/>
        <Route exact path="/anomalies/:id/new" element={<NewAnomalyPage/>}/>
        <Route exact path="/anomalies/:id" element={<AnomalyDetailPage/>}/>
        <Route exact path="/anomalies/:id/changes" element={<AuditPage/>}/>
      </Routes>
    </Router>
  </div>
}

export default App;
