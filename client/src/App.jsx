import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Link } from 'react-router-dom';
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';
import EditPage from './routes/EditPage';


const App = () => {
  return <div>
    <Router>
      <Routes> 
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cic" element={<Cic/>}/>
        <Route exact path="/anomalies/:id/update" element={<UpdatePage/>}/>
        <Route exact path="/anomalies/:id" element={<AnomalyDetailPage/>}/>
        <Route exact path="/anomalies/:id/changes" element={<AuditPage/>}/>
        <Route exact path="/anomalies/:id/edit" element={<EditPage/>}/>
      </Routes>
    </Router>
  </div>
}

export default App;

