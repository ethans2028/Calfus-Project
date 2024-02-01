import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, useParams} from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; // Import the global CSS file
import LogoutButton from "./LogoutButton.jsx"; // this is not needed on Edit page - why would you log out from here?

const EditPage = () => {
  
  const [redirect_home, setRedirect_home] = useState(false);
  const [redirect_DetailPage, setRedirectDetailPage] = useState(false);

  // Open text
  const [reason, setReason] = useState('');
  const [county, setCounty] = useState('');
  const [username, setUsername] = useState('');
  const [extraLinks, setExtraLinks] = useState('');
  const [mitigationPlan, setMitigationPlan] = useState('');

  //Dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lastReview, setLastReview] = useState('');
  //setLastReview(record['DAO Member(User)']);
  const [lastReviewDate, setLastReviewDate] = useState('');

  // Drop down
  const [state, setState] = useState('');
  const [impactSeverity, setImpactSeverity] = useState('');
  const [clears, setClears] = useState('');
  const [possibleHits, setPossibleHits] = useState('');
  const [researched, setResearched] = useState('');
  const [otherResearch, setOtherResearch] = useState('');

  const [dobRedaction, setDobRedaction] = useState('');
  const [status, setStatus] = useState('');



  const params = useParams();
  //const searchParams = new URLSearchParams(window.location.search);
  // Stringify to JSON 
  const json = JSON.stringify(params); 

  // Parse back to object
  const parsed = JSON.parse(json);

  //const params = useParams();
  const { id } = params;
  const stateFromParams = id.substring(1, 3);
  const countyFromParams = id.substring(3);
  const record = sampleData.Current.find(obj => {
    return obj.State === stateFromParams && obj.County === countyFromParams;
  });

  const handleButtonClick_home = () => {
    // Set redirect to true when the button is clicked
    setRedirect_home(true);
  };

  const handleSubmit = () => {
    //e.preventDefault();
    // Need to implement more submit logic and page switch
    setRedirectDetailPage(true);
    console.log('Form submitted!');
  };

  //used to convert dates from the JSON into the format used for type date in react
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    };


  useEffect(() => {
    document.title = 'Main Title'; // Set the title when the component mounts
    return () => {
      document.title = 'Default Title'; // Set the default title when the component unmounts
    };
  }, []);

  if (redirect_DetailPage) {
    return <Navigate to="/anomalies/:CASACRAMENTO" />;
  }

  if (redirect_home) {
    return <Navigate to="/cic" />;
  }

  return (
    <div className='details-page'>
      <Link to="/cic" className='button button-details'>
        Home
      </Link>
      <div className='page-header details-head'>
        <h1>Edit Report Page</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='details-data'>
          <table className="ReportTable">
            <tr>
              <th>Status</th>
              <td>
              <label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {['Active', 'Not Active'].map((statusOption) => (
              <option key={statusOption} value={statusOption}>
              {statusOption}
              </option>
              ))}
              </select>
              </label>
              <br />  
              </td>


              <th>Impact Severity</th>
              <td>
              <label>
              <select value={impactSeverity} onChange={(e) => setImpactSeverity(e.target.value)}>
              {['Low', 'Medium', 'High'].map((severityOption) => (
              <option key={severityOption} value={severityOption}>
              {severityOption}
              </option>
              ))}
              </select>
              </label>
              <br />
              </td>
              
              <th>State</th>
              <td>
              <label>
              <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="Washington">WA</option>
              <option value="Oregon">OR</option>
              </select>
              </label>
              <br />
              </td>
              
              
              <th>County</th>
              <td>
              <label>
              <input
              type="text"
              value={county !== '' ? county : record.County}
              onChange={(e) => setCounty(e.target.value)}/>
              </label>
              <br />
              </td>
            </tr>
            {/* ... (other rows) */}
            <tr>


            <th>Last Review</th>
            <td >
            <label>
            <input
            type="text"
            value={lastReview !== '' ? lastReview : record["DAO Member (User)"]}
            onChange={(e) => setLastReview(e.target.value)}/>
            </label>
            <br />
            </td>
            <th>Last Reviewed Date</th>
            <td>
            <label>
            <input
            type="date"
            value={lastReviewDate !== '' ? lastReviewDate : formatDate(record['Last Reviewed Date'])}
            onChange={(e) => setLastReviewDate(e.target.value)}/>
            </label>
            <br />
            {console.log('lastReviewDate:', lastReviewDate)}
            {console.log('record[\'Last Reviewed Date\']:', record['Last Reviewed Date'])}
            </td>
            

            <th>Issue Start Date</th>
            <td>
            <label>
            <input
            type="date"
            value={startDate !== '' ? startDate : formatDate(record['Issue Start Date'])}
            onChange={(e) => setStartDate(e.target.value)}/>
            </label>
            <br />
            {console.log('startDate:', startDate)}
            {console.log('record[\'Issue Start Date\']:', record['Issue Start Date'])}  
            </td>
           
            
            <th>Estimated Resolution Date</th>
            <td>
            <label>
            <input
            type="date"
            value={endDate !== '' ? endDate : formatDate(record['Est Resolution Date'])}
            onChange={(e) => setEndDate(e.target.value)}/>
            </label>
            <br />
            {console.log('endDate:', endDate)}
            {console.log('record[\'Est Resolution Date\']:', record['Est Resolution Date'])} 
            </td>
          </tr>


          <tr>
            <th>Research Method</th>
            <td>
            <label>
            <input
            type="text"
            value={researched !== '' ? researched : record['Research Method']}
            onChange={(e) => setResearched(e.target.value)}/>
            </label>
            <br />
            </td>
            
            
            <th>Possible Hits</th>
            <td>
            <label>
            <select value={possibleHits} onChange={(e) => setPossibleHits(e.target.value)}>
            <option value="Delayed Time">Delayed Time</option>
            <option value="Effects delivery date">Delivery Date</option>
            </select>
            </label>
            <br />
            </td>
            
            
            <th>Clears</th>
            <td>
            <label>
            <select value={clears} onChange={(e) => setClears(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="other">Other</option>
            </select>
            </label>
            {clears === 'other' && (
            <>
            <br />
            <label>
            <input type="text" value={otherResearch} onChange={(e) => setOtherResearch(e.target.value)}/>
            </label>
            </>
            )}
            <br />
            </td>
            
            
            <th>DOB Redaction?</th>
            <td>
            <label>
            <select value={dobRedaction} onChange={(e) => setDobRedaction(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            </select>
            </label>
            <br />
            </td>
          </tr>
          </table>


          <table className="TextTable">
            <tr>
              <th>Reason</th>
              <th>Mitigation Plan</th>
            </tr>
            <tr className='long-data'>
              <td className='long-data'>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
              </td>


              <td className='long-data'>
                <textarea value={mitigationPlan} onChange={(e) => setMitigationPlan(e.target.value)} />
              </td>
            </tr>
          </table>
        </div>

        <div className='edit-btn-div'>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;


