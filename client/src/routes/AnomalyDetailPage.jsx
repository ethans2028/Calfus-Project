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
      <Link to="/cic" className="button"> Back </Link>        

      <div className='page-header'>
        <h1>Anomaly Detail Page: {county}, {state}</h1>
      </div>

      <div className='details-data  '>
        <table>
          <tr>
            <th>State</th>
            <th>County</th>
            <th>Impact Severity</th>
            <th>Issue Start Date</th>
            <th>Estimated Resolve Date</th>
          </tr>
          <tr>
            
            <td>{record.State}</td>
            <td>{record.County}</td>
            <td>{record['Impact Severity']}</td>
            <td>{record['Issue Sart Date']}</td>
            <td>{record['Issue Resolve Date']}</td>
          </tr>
        </table>

        <table>
          <tr>
            <th>Reason</th>
            <th>Mitigation Plan</th>
          </tr>
          <tr>
            <td className='long-data'>{record['Mitigation Plan']}</td>
            <td className='long-data'>{record.Clears}</td>
          </tr>
        </table>

        <table>
          <tr>
            <th>Clears</th>
            <th>Possible Hits</th>
            <th>Automation Status</th>
            <th>DOB Redaction?</th>
          </tr>
          <tr>
            <td>{record.Reason}</td>
            <td>{record['Possible Hits']}</td>
            <td>{record['Automation Status']}</td>
            <td>{record['DOB Redaction?']}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Last Edited By</th>
            <th>Last Reviewed Date</th>
          </tr>
          <tr>
            <td >{record['DAO Member (User)']}</td>
            <td>{record['Last Reviewed Date']}</td>
          </tr>
        </table>
      </div>
      
      <Link to={`/anomalies/${id}/edit`} className="button edit-btn"> Edit </Link>  
      <Link to={`/anomalies/${id}/changes`} className="button edit-btn"> Audit Log </Link>  

      
    </div>
    
  );
}

export default AnomalyDetailPage
