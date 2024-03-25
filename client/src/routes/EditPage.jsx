import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, useParams} from 'react-router-dom';
import '../global.css'; 
import Values from '../util/field_values.json'

import  AnomalyFinder  from '../apis/AnomalyFinder';


const auditTranspositions = {"act_resolution_date": "Actual Resolution Date", "clears": "Clears", "county": "County",
                              "dao_member_user": "Last Review", "dob_redaction": "DOB Redaction", "est_resolution_date": "Estimated Resolution Date",
                              "id": "ID", "impact_severity": "Impact Severity", "issue_start_date": "Issue Start Date",
                              "last_reviewed_date": "Last Reviewed Date", "links": "Links", "mitigation_plan": "Mitigation Plan",
                              "possible_hits": "Possible Hits", "reason": "Reason", "research_method": "Research Method",
                              "state": "State", "status": "Status"}

const EditPage = () => {
  const { id } = useParams();
  const [ selectedItem, setSelectedItem ] = useState({});
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState('loading'); // Add this line

  // temporary variable for current user
  const currentUser = "John Green";

  useEffect(() => {
    fetchData();  
  }, []);

  useEffect(() => {
    console.log("it's changing!", selectedItem);
  }, [selectedItem]);
  
  //used to convert dates from the JSON into the format used for type date in react
  const formatDate = (inputDate) => {
    if (!inputDate) return '';
    const regex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/
    const result = inputDate.match(regex)
    if (!result) return inputDate;
    const year = result[1];
    const month = result[2].padStart(2, '0');
    const day = result[3].padStart(2, '0');
    return `${year}-${month}-${day}`;
    };

  const fetchData = async () => {
    AnomalyFinder.get(`/${id}`)
    .then((response) => {
      setSelectedItem(response.data.data.anomalies[0]);
      setFormValues(response.data.data.anomalies[0]);
      setIsLoading('loaded'); 
    })
    .catch((error) => {
      console.error('Error fetching data for anomaly', error);
    });
  }; 

  if (isLoading === 'loading') {
    return <div>Loading...</div>; // Or any other loading indicator
  }
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

    // check what fields were changed
    var itemSet = []

    for (let item in formValues){
      if (formValues[item] !== selectedItem[item]){
          itemSet.push(item)
      }
    }

    // shortcut if no changes are detected - don't write to database
    if (itemSet.length === 0){
      console.log("no changes")
      setIsLoading('submitted')
      return;
    }


    // "Updated [field] from [previous] to [new], Updated..."
    var message = "";
    var start = true;
    for (let item in itemSet){
      const auditMessage = "Updated " + auditTranspositions[itemSet[item]] + " from \"" + formatDate(selectedItem[itemSet[item]]) + "\" to \"" + formValues[itemSet[item]] + "\"";
      if (start){
        start = false;
        message = message + auditMessage;
      }else{
        message = message + ", " + auditMessage;
      }

    }

    const auditInfo = {report_id: id, datetime: new Date(Date.now()),
                      member: currentUser, change: message,
                      county: selectedItem.county, state: selectedItem.state}
    console.log(auditInfo)

    setIsLoading('submitting');
    AnomalyFinder.put(`/${id}`, formValues)
      .then((response) => {
        console.log('Successfully updated item!');
        AnomalyFinder.put(`/${id}/changes`, auditInfo)
        .then((response) => {
          console.log('Successfully updated audit log!');
          setIsLoading('submitted');
        })
        .catch((error) => {
          console.error('Error updating audit log', error);
          setIsLoading('error')
        });
        
      })
      .catch((error) => {
        console.error('Error updating item', error);
        setIsLoading('error');
      });
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  

  return (
    <div className='details-page'>
      <Link to="/cic" className='button button-details'>
        Home
      </Link>
      <div className='page-header details-head'>
        <h1>Edit Report Page for {selectedItem.county}, {selectedItem.state}</h1>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
      <div className='details-data'>
        <table>
          <tbody>
          <tr>
            <th>Status</th>
            <td>
            <label>
              <select name="status" value={formValues.status} onChange={handleInputChange}>
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
              <select name="impact_severity" value={formValues.impact_severity} onChange={handleInputChange}>
                {Values.impactSeverity.map((severityOption) => (
                      <option key={severityOption} value={severityOption}>
                        {severityOption}
                      </option>
                    ))}
              </select>
            </label>
            <br />
            </td>
            <th>Issue Start Date</th>
            <td>
              <label>
                <input
                  className="reason-mitigation-textbox"
                  name="issue_start_date"
                  type="date"
                  value={formValues.issue_start_date !== '' ? formatDate(formValues.issue_start_date) : formatDate(selectedItem['Issue Start Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>

            <th>Estimated Resolution Date</th>
            <td>
              <label>
                <input
                  className="reason-mitigation-textbox"
                  name="estimated_resolution_date"
                  type="date"
                  value={formValues.est_resolution_date !== '' ? formatDate(formValues.est_resolution_date) : formatDate(selectedItem['Est Resolution Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>
            
            </tr>
            <tr>
            

            <th>Last Review</th>
            <td>
              <label>
                <input
                  className="reason-mitigation-textbox"
                  name="dao_member_user"
                  type="text"
                  value={formValues.dao_member_user !== '' ? formValues.dao_member_user : selectedItem["DAO Member (User)"]}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>
            

            <th>Last Reviewed Date</th>
            <td>
              <label>
                <input
                  className="reason-mitigation-textbox"
                  name="last_reviewed_date"
                  type="date"
                  value={formValues.last_reviewed_date !== '' ? formatDate(formValues.last_reviewed_date) : formatDate(selectedItem['Last Reviewed Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>


            <th>DOB Redaction?</th>
            <td>
              <label>
                <select name="dob_redaction" value={formValues.dob_redaction} onChange={handleInputChange}>
                  {Values.dobRedaction.map((dob) => (
                      <option key={dob} value={dob}>
                        {dob}
                      </option>
                    ))}
                </select>
              </label>
              <br />
            </td>

            <th>Possible Hits</th>
            <td>
              <label>
                <select name="possible_hits" value={formValues.possible_hits} onChange={handleInputChange}>
                  {Values.possibleHits.map((hits) => (
                      <option key={hits} value={hits}>
                        {hits}
                      </option>
                    ))}
                </select>
              </label>
              <br />
            </td>
            </tr>

          

          <tr>
            <th>Research Method</th>
            <td>
              <label>
                <input
                  className="reason-mitigation-textbox"
                  name="research_method"
                  type="text"
                  value={formValues.research_method !== '' ? formValues.research_method : selectedItem['Research Method']}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>

            
            
            
            <th>Clears</th>
            <td>
              <label>
                <select name="clears" value={formValues.clears} onChange={handleInputChange}>
                  {Values.clears.map((clears) => (
                      <option key={clears} value={clears}>
                        {clears}
                      </option>
                    ))}
                </select>
              </label>
              {formValues.clears === 'Other' && (
                  <label>
                    <input type="text" className="reason-mitigation-textbox" name="otherResearch" value={formValues.otherResearch} onChange={handleInputChange} required/>
                  </label>
              )}
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
                
                <textarea
                  className="reason-mitigation-textbox"
                  name="reason"
                  value={formValues.reason !== '' ? formValues.reason : selectedItem.Reason}
                  onChange={handleInputChange}
                />
              </td>

              <td>
                <textarea
                  className="reason-mitigation-textbox"
                  name="mitigation_plan"
                  value={formValues.mitigation_plan !== '' ? formValues.mitigation_plan : selectedItem['Mitigation Plan']}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='edit-btn-div'>
          <button className="button" type="submit" onClick={handleSubmit}> Submit </button>
        </div>
      </form>
    </div> 
  );
};

export default EditPage;


