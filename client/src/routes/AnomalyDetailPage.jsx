import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import LogoutButton from "./LogoutButton.jsx";
import  AnomalyFinder  from '../apis/AnomalyFinder';


const AnomalyDetailPage = () => {
  
  const { id } = useParams();
  const [ selectedItem, setSelectedItem ] = useState({});
  const [isLoading, setIsLoading] = useState('loading'); // Add this line

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("it's changing!", selectedItem);
  }, [selectedItem]);
  
  const fetchData = async () => {
    AnomalyFinder.get(`/${id}`)
    .then((response) => {
      setSelectedItem(response.data.data.anomalies[0]);
      setIsLoading('loaded'); 
    })
    .catch((error) => {
      console.error('Error fetching data for anomaly', error);
    });
  }; 
  if (isLoading === 'loading') {
    return <div>Loading...</div>; 
  }
  // safety - if selected item is not in the server
  if (!selectedItem){
    return (
      <div className='container'>
        <br/> <br/>
        <LogoutButton/>
        <h2> No Results Found</h2>
        <p> 
          This anomaly does not exist in the server.
          Navigate back to the Main Page and try again.
        </p>
        <div className='edit-btn-div'>
          <Link to="/cic" className="button audit-btn"> Home</Link>
        </div>
      </div>
    );
  }
  return (
    <div className='details-page'>
      <LogoutButton buttonType='button button-details'/>
      <div className='page-header details-head'>
        <h1>Anomaly Details: {selectedItem.county}, {selectedItem.state}</h1>
      </div>

      <div className='details-data'>
        <table>
          <tbody>
          <tr>
            <th>Status</th>
            <td>{selectedItem.status || 'NO DATA'}</td>
            <th>Impact Severity</th>
            <td>{selectedItem.impact_severity || 'NO DATA'}</td>
            <th>State</th>
            <td>{selectedItem.state || 'NO DATA'}</td>
            <th>County</th>
            <td>{selectedItem.county || 'NO DATA'}</td>
          </tr>
          <tr>
            <th>Last Review</th>
            <td>{selectedItem.dao_member_user || 'NO DATA'}</td>
            <th>Last Reviewed Date</th>
            <td>{selectedItem.last_reviewed_date ? selectedItem.last_reviewed_date.substring(0, 10) : 'NO DATA'}</td>
            <th>Issue Start Date</th>
            <td>{selectedItem.issue_start_date ? selectedItem.issue_start_date.substring(0, 10) : 'NO DATA'}</td>
            <th>Estimated Resolution Date</th>
            <td>{selectedItem.est_resolution_date ? selectedItem.est_resolution_date.substring(0, 10) : 'NO DATA'}</td>
          </tr>
          <tr>
            <th>Research Method</th>
            <td>{selectedItem.research_method || 'NO DATA'}</td>
            <th>Possible Hits</th>
            <td>{selectedItem.possible_hits || 'NO DATA'}</td>
            <th>Clears</th>
            <td>{selectedItem.clears || 'NO DATA'}</td>
            <th>DOB Redaction?</th>
            <td>{selectedItem.dob_redaction !== null ? selectedItem.dob_redaction.toString() : 'NO DATA'}</td>
          </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Reason</th>
              <th>Mitigation Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr className='long-data'>
              <td className='long-data'>{selectedItem.reason}</td>
              <td className='long-data'>{selectedItem.mitigation_plan}</td>
            
            </tr>

          </tbody>
          
        </table>
      </div>
      
      <div className='edit-btn-div'>
        <Link to={`/anomalies/${id}/edit`} className="button"> Edit </Link>  
        <Link to={`/anomalies/${id}/changes`} className="button audit-btn"> Audit Log </Link>  
        <Link to="/cic" className="button"> Home </Link>
      </div>
    </div>
    
  );
} 

export default AnomalyDetailPage
