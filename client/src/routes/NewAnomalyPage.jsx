import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../global.css'; // Import the global CSS file
import AnomalyFinder from "../apis/AnomalyFinder.js";

import States from '../util/state_county_list.json';
import Values from '../util/field_values.json'

const AddPage = () => {

  const [isLoading, setIsLoading] = useState('waiting');

  // Open text
  const [reason, setReason] = useState('');
  const [county, setCounty] = useState('');
  const [manCounty, setManCounty] = useState('');
  const [extraLinks, setExtraLinks] = useState('');
  const [mitigationPlan, setMitigationPlan] = useState('');

  //Dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [lastReview, setLastReview] = useState('');
  const [lastReviewDate, setLastReviewDate] = useState(new Date());

  // Drop down
  const [state, setState] = useState('All States');
  const [impactSeverity, setImpactSeverity] = useState('Low');
  const [clears, setClears] = useState('Yes');
  const [possibleHits, setPossibleHits] = useState('Delayed Time');
  const [researched, setResearched] = useState('');
  const [otherResearch, setOtherResearch] = useState('');

  const [dobRedaction, setDobRedaction] = useState(true);
  const [status, setStatus] = useState('Active');

  const currentUser = "John Green";


  if (isLoading === 'submitting') {
    return <div>Submitting...</div>; // Or any other loading indicator
  }
  if (isLoading === 'error') {
    return <div>Error...</div>; // Or any other loading indicator
  }
  if (isLoading === 'submitted') {
    return <div><h1>Success!</h1><br></br><Link to="/cic" className='button button-details'>back to cic</Link></div>;
  }
 
  const handleSubmit = () => {
    setIsLoading('submitting')
    const submittedItem = {act_resolution_date: null, clears: clears,
        county: (county === 'Other'? manCounty : county), dao_member_user: lastReview, dob_redaction: dobRedaction,
        est_resolution_date: endDate, impact_severity: impactSeverity, issue_start_date: startDate,
        last_reviewed_date: lastReviewDate, links: extraLinks, mitigation_plan: mitigationPlan,
        possible_hits: possibleHits, reason: reason, research_method: (clears === 'Other' ? otherResearch : clears),
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
            setIsLoading('submitted')
          })
          .catch((error) => {
            console.error('Error updating item', error);
          });
      })
      .catch((error) => {
        console.error('Error updating item', error);
      });
      

    
    // create first entry of audit log

  };

  const countyList = States.Counties[state]

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
            <tbody>
            <tr>
              <th>Status</th>
              <td>
                <label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {Values.status.map((statusOption) => (
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
                    {Values.impactSeverity.map((severityOption) => (
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
                    {
                      States.States.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))
                    }
                  </select>
                </label>
                <br />
              </td>

              <th>County</th>
              <td>
                <label>
                  <select value={county} onChange={(e) => setCounty(e.target.value)}>
                    {
                      countyList.map((county) => (
                        <option key={county} value={county}>
                          {county}
                        </option>
                      ))
                    }
                  </select>
                  {county === 'Other' && (
                  <>
                    <br />
                    <label>
                      <input required
                        className="reason-mitigation-textbox"
                        type="text"
                        value={manCounty}
                        onChange={(e) => setManCounty(e.target.value)}
                      />
                    </label>
                  </>
                )}
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
                    className="reason-mitigation-textbox"
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
                    className="reason-mitigation-textbox"
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
                    className="reason-mitigation-textbox"
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
                    className="reason-mitigation-textbox"
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
                  <input required
                    className="reason-mitigation-textbox"
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
                    {Values.possibleHits.map((hits) => (
                      <option key={hits} value={hits}>
                        {hits}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
              </td>

              <th>Clears</th>
              <td>
                <label>
                  <select value={clears} onChange={(e) => setClears(e.target.value)}>
                    {Values.clears.map((clears) => (
                      <option key={clears} value={clears}>
                        {clears}
                      </option>
                    ))}
                  </select>
                </label>
                {clears === 'Other' && (
                  <>
                    <br />
                    <label>
                      <input required
                        className="reason-mitigation-textbox"
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
                    {Values.dobRedaction.map((dob) => (
                      <option key={dob} value={dob}>
                        {dob}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
              </td>
            </tr>
            </tbody>
          </table>

          <table className="TextTable">
            <thead>
              <tr>
                <th>Reason</th>
                <th>Mitigation Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr className='long-data'>
                <td className='long-data'>
                  <textarea value={reason} className="reason-mitigation-textbox" onChange={(e) => setReason(e.target.value)} />
                </td>

                <td className='long-data'>
                  <textarea value={mitigationPlan} className="reason-mitigation-textbox" onChange={(e) => setMitigationPlan(e.target.value)} />
                </td>
              </tr>
            </tbody>
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
