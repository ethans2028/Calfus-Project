import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnomalyDetailPage from './AnomalyDetailPage';
import UpdatePage from './NewAnomalyPage';
import Home from './Login';
import sampleData from '../sampleData.json';

const ActiveItemsPage = () => {
  const dataArray = Object.values(sampleData);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(dataArray);
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.County.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search by county name" onChange={handleSearch} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
               <div 
                  key={item.id}
                  style={{
                  color: 'blue',
                  textDecoration: 'none',
                  border: '1px solid lightgrey',
                  borderRadius: '5px',
                  padding: '5px',
                  margin: '5px',
                  }}
               >
                  {item.County}
                  <Link
                  to={`/Edit/${item.id}`}
                  style={{padding: '10px', color: 'blue', textDecoration: 'none'}}
                  >
                  Edit
                  </Link>
                  <Link
                  to={`/AnomalyDetailPage/${item.id}`}
                  style={{padding: '10px', color: 'blue', textDecoration: 'none'}}
                  >
                  Details
                  </Link>
               </div>
            ))
            ) : (
            <p>No results found</p>
            )}
          </div>
        </div>
      );
    };
export default ActiveItemsPage;