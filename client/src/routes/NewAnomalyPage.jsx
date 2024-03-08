import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import AnomalyFinder from "../apis/AnomalyFinder.js";

import LogoutButton from "./LogoutButton.jsx";  // like the Edit page, I see no reason to put this here

const AddPage = () => {
  const [redirect_home, setRedirect_home] = useState(false);
  const [redirect_DetailPage, setRedirectDetailPage] = useState(false);

  // Open text
  const [reason, setReason] = useState('');
  const [county, setCounty] = useState('');
  const [username, setUsername] = useState('');
  const [extraLinks, setExtraLinks] = useState('');
  const [mitigationPlan, setMitigationPlan] = useState('');

  //Dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [lastReview, setLastReview] = useState('');
  const [lastReviewDate, setLastReviewDate] = useState(new Date());

  // Drop down
  const [state, setState] = useState('WA');
  const [impactSeverity, setImpactSeverity] = useState('Low');
  const [clears, setClears] = useState('Yes');
  const [possibleHits, setPossibleHits] = useState('Delayed Time');
  const [researched, setResearched] = useState('');
  const [otherResearch, setOtherResearch] = useState('');

  const [dobRedaction, setDobRedaction] = useState(true);
  const [status, setStatus] = useState('Active');

  const currentUser = "John Green";

  const handleButtonClick_home = () => {
    setRedirect_home(true);
  };
 
  const handleSubmit = () => {

    const submittedItem = {act_resolution_date: null, clears: clears,
        county: county, dao_member_user: lastReview, dob_redaction: dobRedaction,
        est_resolution_date: endDate, impact_severity: impactSeverity, issue_start_date: startDate,
        last_reviewed_date: lastReviewDate, links: extraLinks, mitigation_plan: mitigationPlan,
        possible_hits: possibleHits, reason: reason, research_method: (clears === 'other' ? otherResearch : clears),
        state: state, status: status}

    var id = -1;
    // Add logic for handling the form submission (e.g., adding a new entry)
    AnomalyFinder.put(`/new`, submittedItem)
      .then((response) => {
        console.log('Successfully added item!');
        console.log(response);
        id = response.data.data.anomalies[0].id;
        console.log(id);
        const auditItem = {report_id: id, datetime: new Date(Date.now()),
          member: currentUser, change: "Added anomaly to tracker",
          county: county, state: state}

        AnomalyFinder.put(`/${id}/changes`, auditItem)
          .then((response) => {
            console.log('Successfully added item!');
          })
          .catch((error) => {
            console.error('Error updating item', error);
          });
      })
      .catch((error) => {
        console.error('Error updating item', error);
      });
      

    
    // create first entry of audit log

    
      
    setRedirectDetailPage(true);
    
  };
  

  if (redirect_DetailPage) {
    return <Navigate to="/cic" />;
  }

  if (redirect_home) {
    return <Navigate to="/cic" />;
  }

  return (
    <div className='details-page'>
      <Link to="/cic" className="button button-details">
        Home
      </Link>

      <div className='page-header details-head'>
        <h1>Add Report Page</h1>
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
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                </label>
                <br />
              </td>
            </tr>

            {/* ... (other rows) */}

            <tr>
              <th>Last Review</th>
              <td>
                <label>
                  <input
                    type="text"
                    value={lastReview}
                    onChange={(e) => setLastReview(e.target.value)}
                  />
                </label>
                <br />
              </td>
              <th>Last Reviewed Date</th>
              <td>
                <label>
                  <input
                    type="date"
                    value={lastReviewDate}
                    onChange={(e) => setLastReviewDate(e.target.value)}
                  />
                </label>
                <br />
              </td>

              <th>Issue Start Date</th>
              <td>
                <label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </label>
                <br />
              </td>

              <th>Estimated Resolution Date</th>
              <td>
                <label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </label>
                <br />
              </td>
            </tr>

            <tr>
              <th>Research Method</th>
              <td>
                <label>
                  <input
                    type="text"
                    value={researched}
                    onChange={(e) => setResearched(e.target.value)}
                  />
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
                      <input
                        type="text"
                        value={otherResearch}
                        onChange={(e) => setOtherResearch(e.target.value)}
                      />
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

export default AddPage;
