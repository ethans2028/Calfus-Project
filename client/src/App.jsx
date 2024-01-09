import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AnomalyDetailPage from './routes/AnomalyDetailPage';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return <div>
    <Router>
      <Routes> 
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/anomalies/:id/update" element={<UpdatePage/>}/>
        <Route exact path="/anomalies/:id" element={<AnomalyDetailPage/>}/>
      </Routes>
    </Router>
  </div>
}

export default App;
