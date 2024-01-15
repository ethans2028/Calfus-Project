import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import sampleData from '../sampleData.json';

const AnomalyDetailPage = () => {
  const dataArray = Object.values(sampleData);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const record = sampleData.dataObject11;
  useEffect(() => {
    setItems(dataArray);
  }, []);

  // const mappedData = dataArray.map((edit) => 
  //       <tr key={edit.id}>
  //           <th>{edit.uname}</th>
  //           <th>{edit.actions}</th>
  //       </tr>
  // );
  
  return (
    <div style={{textAlign: 'center'}}>
      
      <div >
        <h1>Anomaly Detail Page: {record.id}</h1>
        
        <Link to="/">Home</Link>
      </div>
      
      <table style={{margin: "50px"}}>
        <tr>
          <th>Last Edited By</th>
          <th>Last Reviewed Date</th>
        </tr>
        <tr>
          <td>{record['DAO Member']}</td>
          <td>{record['Last Reviewed Date']}</td>
        </tr>
      </table>
      <table style={{margin: "50px"}}>
        <tr>
          <th>State</th>
          <th>County</th>
          <th>Impact Severity</th>
          <th>Issue Start Date</th>
          <th>Estimated Resolve Date</th>
        </tr>
        <tr style={{margin: "50px"}}>
          
          <td>{record.State}</td>
          <td>{record.County}</td>
          <td>{record['Impact Severity']}</td>
          <td>{record['Issue Start Date']}</td>
          <td>{record['Issue Resolve Date']}</td>
        </tr>
      </table>


      <table style={{margin: "50px"}}>
        <tr>
          <th>Clears</th>
          <th>Possible Hits</th>
          
        </tr>
        <tr>
          <td>{record.Clears}</td>
          <td>{record['Possible Hits']}</td>
        </tr>
      </table>

      <table style={{margin: "50px"}}>
        <tr>
          <th>Reason</th>
          <th>Mitigation Plan</th>
          <th>Automation Status</th>
          <th>DOB Redactions</th>
        </tr>
        <tr>
          <td>{record.Reason}</td>
          <td>{record['Mitigation Plan']}</td>
          <td>{record['Automation Status']}</td>
          <td>{record['DOB Redactions']}</td>
        </tr>
      </table>
      <button style={{
        margin: '10px',
      }}>Edit</button>
    </div>
    
  );
}

export default AnomalyDetailPage

{/* <div style={{ display: 'flex', flexDirection: 'column' }}>
       {
        record.map((item) => (
            
            
            <div 
              key={item}
              style={{
              color: 'blue',
              textDecoration: 'none',
              border: '1px solid lightgrey',
              borderRadius: '5px',
              padding: '5px',
              margin: '5px',
              }}
            >
              <h1></h1>
              {item}
              
            </div>
          
        ))
      }
      </div> */}