import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import LogoutButton from "./LogoutButton.jsx";

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lastReview, setLastReview] = useState('');
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

  const handleButtonClick_home = () => {
    setRedirect_home(true);
  };

  const handleSubmit = () => {
    setRedirectDetailPage(true);
    console.log('Form submitted!');
    // Add logic for handling the form submission (e.g., adding a new entry)
  };

  if (redirect_DetailPage) {
    return <Navigate to="/anomalies/:CASACRAMENTO" />;
  }

  if (redirect_home) {
    return <Navigate to="/cic" />;
  }

  return (
    <div className='details-page'>
      <Link to="/cic" className="button">
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
