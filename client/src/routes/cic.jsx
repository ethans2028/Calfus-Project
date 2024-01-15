import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnomalyDetailPage from './cic';
import UpdatePage from './NewAnomalyPage';
import Home from './Login';
import sampleData from '../sampleData.json';
import '../global.css'; // Import the global CSS file

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

  const filteredItems = items.filter(item => {
    if (searchTerm === '') {
      return item.Status === 'Active';
    }
    if (!isNaN(searchTerm)) {
      return item.Zip && item.Zip.includes(searchTerm) && item.Status === 'Active';
    } else {
      return item.County.toLowerCase().includes(searchTerm.toLowerCase()) && item.Status === 'Active';
    }
  });

  return (
      <div className="container">
        <h1>Current Impacted Counties</h1>
        <input type="text" placeholder="Search by county name or zip"/>
        <div className="horizontal-div" style={{ backgroundColor: "white"}}>
          <div className="county-name" style={{ fontWeight: 'bold' }}>County Name</div>
          <div className="zip-code" style={{ fontWeight: 'bold' }}>ZIP code</div>
          <div className="county-id" style={{ fontWeight: 'bold' }}>ID</div>
          <div className="date-created" style={{ fontWeight: 'bold' }}>Date Created</div>
          <div className="date-updated" style={{ fontWeight: 'bold' }}>Date Updated</div>
          <div className="edit-link" style={{ fontWeight: 'bold' }}>Edit</div>
          <div className="details-link" style={{ fontWeight: 'bold' }}>Details</div>
        </div>
        <div className="box" style={{ display: 'flex', flexDirection: 'column', }}>
        {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div style={{ backgroundColor: index % 2 === 1 ? 'white' : '#f2f2f2' }} key={item.id} className="horizontal-div">
                  <div className="county-name">{item.County}</div>
                  <div className="zip-code">{item.Zip}</div>
                  <div className="county-id">{item.id}</div>
                  <div className="date-created">{item.DateOfBirth}</div>
                  <div className="date-updated">{item.LastEdited}</div>
                  <Link className="edit-link" to={`/Edit/${item.id}`}>Edit</Link>
                  <Link className= "details-link" to={`/AnomalyDetailPage/${item.id}`}>Details</Link>
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