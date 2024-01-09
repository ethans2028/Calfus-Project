import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnomalyDetailPage from './AnomalyDetailPage';
import UpdatePage from './UpdatePage';
import Home from './Home';

const ActiveItemsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO: Fetch items from PostgreSQL database where status is "active". These will eventaully be displayed as clickable objects
  }, []);

  return (
    <Router>
      <div>
        {items.map((item) => (
          <Link to={{ pathname:"/AnomalyDetailPage", state: item}}>
            {item.name}
          </Link>
        ))}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anomalies/:id/update" element={<UpdatePage />} />
        <Route path="/anomalies/:id" element={<AnomalyDetailPage />} />
      </Routes>
    </Router>
  );
};

export default ActiveItemsPage;