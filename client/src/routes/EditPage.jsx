import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, useParams} from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; 

import  AnomalyFinder  from '../apis/AnomalyFinder';
import { AnomalyContext } from '../context/AnomalyContext';

import Popup from 'reactjs-popup'
const EditPage = () => {
  const { id } = useParams();
  const [ selectedItem, setSelectedItem ] = useState({});
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState('loading'); // Add this line

  const [auditMessage, changeAuditMessage] = useState("");
  const [popupOpen, swapPopupOpen] = useState(false);
  const closeModal = () => swapPopupOpen(false);

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


  if (isLoading == 'loading') {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  if (isLoading == 'submitting') {
    return <div>Submitting...</div>; // Or any other loading indicator
  }
  if (isLoading == 'error') {
    return <div>Error...</div>; // Or any other loading indicator
  }
  if (isLoading == 'submitted') {
    return <div><h>Success!</h><br></br><Link to="/cic" className='button button-details'>back to cic</Link></div>;
  }

  const handleSubmit = () => {
    if (auditMessage.trim() == "") return;
    setIsLoading('submitting');
    AnomalyFinder.put(`/${id}`, formValues)
      .then((response) => {
        console.log('Successfully updated item!');

      })
      .catch((error) => {
        console.error('Error updating item', error);
      });

    const auditInfo = {report_id: id, datetime: new Date(),
                      member: currentUser, change: auditMessage,
                      county: selectedItem.county, state: selectedItem.state}
    console.log(auditInfo)
    console.log(auditInfo.report_id)

    /*
    !!! IMPORTANT !!!
    This is not implemented to upload the audit information into the database!
    I don't think there's an "update audit log" API call yet.

    Basically, here's the API call that's expected:
    "/:id/changes"
    that will update the given Audit Log table.

    The following code is assuming that API call exists (it does not yet)
    Once the API is set up, uncomment the code and it should insert into the table!
    
    AnomalyFinder.put(`/${id}/changes`, auditInfo)
      .then((response) => {
        console.log('Successfully updated audit log!');
      })
      .catch((error) => {
        console.error('Error updating item', error);
      });


    */

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
              <select name="impactSeverity" value={formValues.impactSeverity} onChange={handleInputChange}>
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
                  name="issueStartDate"
                  type="date"
                  value={formValues.issueStartDate !== '' ? formValues.issueStartDate : formatDate(selectedItem['Issue Start Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>

            <th>Estimated Resolution Date</th>
            <td>
              <label>
                <input
                  name="estimatedResolutionDate"
                  type="date"
                  value={formValues.estimatedResolutionDate !== '' ? formValues.estimatedResolutionDate : formatDate(selectedItem['Est Resolution Date'])}
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
                  name="lastReview"
                  type="text"
                  value={formValues.lastReview !== '' ? formValues.lastReview : selectedItem["DAO Member (User)"]}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>
            

            <th>Last Reviewed Date</th>
            <td>
              <label>
                <input
                  name="lastReviewedDate"
                  type="date"
                  value={formValues.lastReviewedDate !== '' ? formValues.lastReviewedDate : formatDate(selectedItem['Last Reviewed Date'])}
                  onChange={handleInputChange}
                />
              </label>
              <br />
            </td>


            <th>DOB Redaction?</th>
            <td>
              <label>
                <select name="dobRedaction" value={formValues.dobRedaction} onChange={handleInputChange}>
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
                <select name="possibleHits" value={formValues.possibleHits} onChange={handleInputChange}>
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
                  name="researchMethod"
                  type="text"
                  value={formValues.researchMethod !== '' ? formValues.researchMethod : selectedItem['Research Method']}
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
                    <input type="text" name="otherResearch" value={formValues.otherResearch} onChange={handleInputChange} required/>
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
                  name="reason"
                  value={formValues.reason !== '' ? formValues.reason : selectedItem.Reason}
                  onChange={handleInputChange}
                />
              </td>

              <td className='long-data'>
                <textarea
                  name="mitigationPlan"
                  value={formValues.mitigationPlan !== '' ? formValues.mitigationPlan : selectedItem['Mitigation Plan']}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </table>
        </div>
      </form>
      <Popup open={popupOpen} position='top center' onClose={closeModal}>
          <h2>Please give a brief description of what you changed</h2>
          <form>
            <textarea value={auditMessage} onChange={(e)=>changeAuditMessage(e.target.value)} required/>
            <button className="button" type="submit" onClick={handleSubmit}> Submit </button>
          </form>
      </Popup>
      <div className='edit-btn-div'>
            <button className="button" type="submit" onClick={()=>swapPopupOpen(o => !o)}>
              Submit
            </button>
      </div>
    </div> 
  );
};

export default EditPage;


