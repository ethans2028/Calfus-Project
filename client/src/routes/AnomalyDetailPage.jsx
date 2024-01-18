import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; // Import the global CSS file


const AnomalyDetailPage = () => {
  
  const params = useParams();
  //const searchParams = new URLSearchParams(window.location.search);
  // Stringify to JSON 
  const json = JSON.stringify(params); 

  // Parse back to object
  const parsed = JSON.parse(json);

  // Destructure id property 
  const {id} = parsed; 
  const state = id.substring(1,3);
  const county = id.substring(3);
  const record = sampleData.Current.find(obj => {
    return obj.State === state && obj.County === county; 
  });



  return (
    <div className='details-page'>
      <Link to="/cic" className="button details-back-btn"> Back </Link>        

      <div className='page-header details-head'>
        <h1>Anomaly Detail Page: {county}, {state}</h1>
      </div>

      <div className='details-data'>
        <table>
          <tr>
            <th>Status</th>
            <td>{record.Status}</td>
            <th>Impact Severity</th>
            <td>{record['Impact Severity']}</td>
            <th>State</th>
            <td>{record.State}</td>
            <th>County</th>
            <td>{record.County}</td>
          </tr>
          <tr>
            <th>Last Review</th>
            <td >{record['DAO Member (User)']}</td>
            <th>Last Reviewed Date</th>
            <td>{record['Last Reviewed Date']}</td>
            <th>Issue Start Date</th>
            <td>{record['Issue Start Date']}</td>
            <th>Estimated Resolution Date</th>
            <td>{record['Est Resolution Date']}</td>
          </tr>
          <tr>
            <th>Research Method</th>
            <td>{record['Research Method']}</td>
            <th>Possible Hits</th>
            <td>{record['Possible Hits']}</td>
            <th>Clears</th>
            <td>{record.Clears}</td>
            <th>DOB Redaction?</th>
            <td>{record['DOB Redaction?']}</td>
          </tr>
        </table>

        <table>
          <tr>
            <th>Reason</th>
            <th>Mitigation Plan</th>
          </tr>
          <tr className='long-data'>
            <td className='long-data'>{record.Reason}</td>
            <td className='long-data'>{record['Mitigation Plan']}</td>
            
          </tr>
        </table>
      </div>
      
      <div className='edit-btn-div'>
        <Link to={`/anomalies/${id}/edit`} className="button"> Edit </Link>  
        <Link to={`/anomalies/${id}/changes`} className="button audit-btn"> Audit Log </Link>  
      </div>
      

      
    </div>
    
  );
} 

export default AnomalyDetailPage
