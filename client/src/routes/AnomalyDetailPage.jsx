import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; // Import the global CSS file


const AnomalyDetailPage = () => {
  const record = sampleData.dataObject11;

  const [redirect_home, setRedirect_home] = useState(false);

  const handleButtonClick_home = () => {
    // Set redirect to true when the button is clicked
    setRedirect_home(true);
  };

  // Redirect to another page if redirect state is true
  if (redirect_home) {
    return <Navigate to="/cic"/>;
  }

  return (
    <div className='details-page'>
      <button onClick={handleButtonClick_home}  style={{
          margin: '10px',
        }}>Back</button>

      <div className='page-header'>
        <h1>Anomaly Detail Page: {record.id}</h1>
      </div>

      <div className='details-data  '>
        <table>
          <tr>
            <th>Last Edited By</th>
            <th>Last Reviewed Date</th>
          </tr>
          <tr>
            <td >{record['DAO Member']}</td>
            <td>{record['Last Reviewed Date']}</td>
          </tr>
        </table>
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

      </div>
      
      <div className='edit-btn'>
        <button>Edit</button>
      </div>
    </div>
    
  );
}

export default AnomalyDetailPage
