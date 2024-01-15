import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Login from './routes/Login';
import Cic from './routes/cic';
import AuditPage from './routes/AuditPage';
import EditPage from './routes/EditPage';
import { AnomalyContextProvider } from './context/AnomalyContext';
import NewPage from './routes/NewAnomalyPage'; // adjust the path as needed

const App = () => {
  return (
    <AnomalyContextProvider>
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
    </AnomalyContextProvider>
  )
}

export default App;

