import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, useParams} from 'react-router-dom';
import '../global.css'; 

import  AnomalyFinder  from '../apis/AnomalyFinder';
import { AnomalyContext } from '../context/AnomalyContext';

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

    var message = "Updated ";
    var start = true;
    for (let item in itemSet){
      if (start){
        start = false;
        message = message + auditTranspositions[itemSet[item]];
      }else{
        message = message + ", " + auditTranspositions[itemSet[item]];
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

      })
      .catch((error) => {
        console.error('Error updating item', error);
      });


    AnomalyFinder.put(`/${id}/changes`, auditInfo)
      .then((response) => {
        console.log('Successfully updated audit log!');
      })
      .catch((error) => {
        console.error('Error updating item', error);
      });

    setIsLoading('submitted');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  //used to convert dates from the JSON into the format used for type date in react
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
          <tr>
            <th>Status</th>
            <td>
            <label>
              <select name="status" value={formValues.status} onChange={handleInputChange}>
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
              <select name="impact_severity" value={formValues.impact_severity} onChange={handleInputChange}>
                {['Low', 'Medium', 'High'].map((severityOption) => (
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
                  class="reason-mitigation-textbox"
                  name="issue_start_date"
                  type="date"
                  value={formValues.issue_start_date !== '' ? formValues.issue_start_date : formatDate(selectedItem['Issue Start Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>

            <th>Estimated Resolution Date</th>
            <td>
              <label>
                <input
                  class="reason-mitigation-textbox"
                  name="estimated_resolution_date"
                  type="date"
                  value={formValues.est_resolution_date !== '' ? formValues.est_resolution_date : formatDate(selectedItem['Est Resolution Date'])}
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
                  class="reason-mitigation-textbox"
                  name="last_review"
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
                  class="reason-mitigation-textbox"
                  name="last_reviewed_date"
                  type="date"
                  value={formValues.last_reviewed_date !== '' ? formValues.last_reviewed_date : formatDate(selectedItem['Last Reviewed Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>


            <th>DOB Redaction?</th>
            <td>
              <label>
                <select name="dob_redaction" value={formValues.dob_redaction} onChange={handleInputChange}>
                  {['yes', 'no'].map((redactionOption) => (
                    <option key={redactionOption} value={redactionOption}>
                      {redactionOption}
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
                  {['Delayed Time', 'Effects delivery date'].map((hitOption) => (
                    <option key={hitOption} value={hitOption}>
                      {hitOption}
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
                  class="reason-mitigation-textbox"
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
                  {['yes', 'no', 'other'].map((clearOption) => (
                    <option key={clearOption} value={clearOption}>
                      {clearOption}
                    </option>
                  ))}
                </select>
              </label>
              {formValues.clears === 'other' && (
                <>
                  <br />
                  <label>
                    <input type="text" class="reason-mitigation-textbox" name="otherResearch" value={formValues.otherResearch} onChange={handleInputChange} required/>
                  </label>
                </>
              )}
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
                
                <textarea
                  class="reason-mitigation-textbox"
                  name="reason"
                  value={formValues.reason !== '' ? formValues.reason : selectedItem.Reason}
                  onChange={handleInputChange}
                />
              </td>

              <td>
                <textarea
                  class="reason-mitigation-textbox"
                  name="mitigation_plan"
                  value={formValues.mitigation_plan !== '' ? formValues.mitigation_plan : selectedItem['Mitigation Plan']}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
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


