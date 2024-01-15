import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; // Import the global CSS file

const EditPage = () => {
  const [redirect_home, setRedirect_home] = useState(false);
  //open text
  const [reason, setReason] = useState('');
  const [county, setCounty] = useState('');
  const [username, setUsername] = useState('');
  const [extraLinks, setExtraLinks] = useState('');
  const [mitigationPlan, setMitigationPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  //drop down
  const [state, setState] = useState('');
  const [impactSeverity, setImpactSeverity] = useState('');
  const [clears, setClears] = useState('');
  const [possibleHits, setPossibleHits] = useState('');
  const [researched, setResearched] = useState('');
  const [dobRedaction, setDobRedaction] = useState('');
  const [status, setStatus] = useState('');

  const handleButtonClick_home = () => {
    // Set redirect to true when the button is clicked
    setRedirect_home(true);
  };
 
  const handleSubmit = () => {
    // need to do more of submit logic and page switch
    console.log('Form submitted!');
  };

  useEffect(() => {
    document.title = 'Main Title'; // Set the title when the component mounts
    return () => {
      document.title = 'Default Title'; // Set the default title when the component unmounts
    };
  }, []);
  if (redirect_home) {
    return <Navigate to="/cic"/>;
  }

  return (
    <div>
        <button onClick={handleButtonClick_home}  style={{
          margin: '10px',
        }}>Back</button>
      <h2>Edit Report</h2>

      <form onSubmit={handleSubmit}>

      <label>
          State:
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="Washington">WA</option>
            <option value="Oregon">OR</option>
            {/* Add more */}
          </select>
        </label>
        <br />


        <label>
          County:
          <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
        </label>
        <br />

        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />


        
        <label>
          Impact Severity:
          <select value={impactSeverity} onChange={(e) => setImpactSeverity(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />


        <label>
          Reason:
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
        <br />

        
        <label>
          Mitigation Plan:
          <textarea value={mitigationPlan} onChange={(e) => setMitigationPlan(e.target.value)} />
        </label>
        <br />


        <label>
          Clears:
          <input type="text" value={clears} onChange={(e) => setClears(e.target.value)} />
        </label>
        <br />

        <label>
          Clears:
          <select value={clears} onChange={(e) => setClears(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />

        <label>
          PossibleHits:
          <select value={possibleHits} onChange={(e) => setPossibleHits(e.target.value)}>
            <option value="Delayed Time">Delayed Time</option>
            <option value="Effects delivery date">Delivery Date</option>
          </select>
        </label>
        <br />


        <label>
          Researched:
          <select value={researched} onChange={(e) => setResearched(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />


        <label>
          DOB Redaction:
          <select value={dobRedaction} onChange={(e) => setDobRedaction(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />


        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />

        <label>
          Start Date:
          <textarea value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <br />

        
        <label>
          End Date:
          <textarea value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <br />

        <label>
          Extra Links:
          <input type="text" value={extraLinks} onChange={(e) => setExtraLinks(e.target.value)} />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPage;




  
  
