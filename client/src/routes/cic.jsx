import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../global.css';
//backend-imports
import  AnomalyFinder  from '../apis/AnomalyFinder';
import { AnomalyContext } from '../context/AnomalyContext';

const ActiveItemsPage = (props) => {
  const {items, setItems} = useContext(AnomalyContext)
  useEffect(() => {
    fetchData();  
  }, []);
  
  const fetchData = async () => {
    try { // gets anomalies from the base url+added path
      const response = await AnomalyFinder.get("/");
      setItems(response.data.data.anomalies);
      
    } catch (error) { // if there is an error
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  
  const [sortedBy, setSortedBy] = useState('NONE');

  const sortState = () => {
      if (sortedBy !== 'STATEASC') {
        const sortedItems = [...items].sort((a, b) => {
          if (a.state < b.state) {
            return -1;
          }
          if (a.state > b.state) {
            return 1;
          }
          return 0;
        });
        setItems(sortedItems);
        setSortedBy('STATEASC');
      } else {
        const sortedItems = [...items].sort((a, b) => {
          if (a.state < b.state) {
            return 1;
          }
          if (a.state > b.state) {
            return -1;
          }
          return 0;
        });
        setItems(sortedItems);
        setSortedBy('STATEDESC');
      }
  };

  const sortCounty = () => {
    if (sortedBy !== 'COUNTYASC') {
      const sortedItems = [...items].sort((a, b) => {
        if (a.county < b.county) {
          return -1;
        }
        if (a.county > b.county) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('COUNTYASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.county < b.county) {
          return 1;
        }
        if (a.county > b.county) {
          return -1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('COUNTYDESC');
    }
  };
  
  const sortSeverity = () => {
    if (sortedBy !== 'SEVERITYASC') {
      const sortedItems = [...items].sort((a, b) => {
        if (a.impact_severity < b.impact_severity) {
          return -1;
        }
        if (a.impact_severity > b.impact_severity) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('SEVERITYASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.impact_severity < b.impact_severity) {
          return 1;
        }
        if (a.impact_severity > b.impact_severity) {
          return -1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('SEVERITYDESC');
    }
  };

  const sortReason = () => {
    if (sortedBy !== 'REASONASC') {
      const sortedItems = [...items].sort((a, b) => {
        if (a.reason < b.reason) {
          return -1;
        }
        if (a.reason > b.reason) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('REASONASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.reason < b.reason) {
          return 1;
        }
        if (a.reason > b.reason) {
          return -1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('REASONDESC');
    }
  };

  const sortLastReviewed = () => {
    if (sortedBy !== 'LASTREVIEWEDASC') {
      const sortedItems = [...items].sort((a, b) => {
        if (a.last_reviewed_date < b.last_reviewed_date) {
          return -1;
        }
        if (a.last_reviewed_date > b.last_reviewed_date) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('LASTREVIEWEDASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.last_reviewed_date < b.last_reviewed_date) {
          return 1;
        }
        if (a.last_reviewed_date > b.last_reviewed_date) {
          return -1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('LASTREVIEWEDDESC');
    }
  }

  const filteredItems = items.filter(item => {
    if (searchTerm === '') {
      return item.status === 'Active';
    }
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.county?.toLowerCase().startsWith(searchTermLower) ||
      item.state?.toLowerCase().startsWith(searchTermLower) ||
      item.impact_severity?.toLowerCase().startsWith(searchTermLower) ||
      item.last_reviewed_date?.toLowerCase().startsWith(searchTermLower)
    ) && item.status === 'Active';
  });


  console.log(filteredItems);
  return (
    
    <div className="container">    
        <h1 className='page-header'>Current Impacted Counties</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center'}}> 
          <input type="text" placeholder="Search by State, County, Severity, or Last Review" onChange={handleSearch} style={{ marginRight: '5px' }}/>          
          <Link to="/NewPage" className="button"> + New Entry</Link>
        </div>
        <div>
          {filteredItems.length > 0 ? (
            <div className="horizontal-div" style={{ backgroundColor: "#bcbcbc"}}>
              <div className="xxsmall-header" onClick={sortState} style={{ cursor: 'pointer', paddingLeft: '10px'}}>St.⇅</div>
              <div className="medium-header" onClick={sortCounty} style={{ cursor: 'pointer' }}>County⇅</div>
              <div className="small-header" onClick={sortSeverity} style={{ cursor: 'pointer' }}>Severity⇅</div> 
              <div className="large-header" onClick={sortReason} style={{ cursor: 'pointer' }}>Reason⇅</div>
              <div className="small-header" onClick={sortLastReviewed} style={{ cursor: 'pointer' }}>Last Review⇅</div>
              <div className="xxsmall-header">Edit</div>
              <div className="xsmall-header">Details</div>
              <div className="xsmall-header">Audit</div>
            </div>  
          ) : (
            <div></div>
          )}
        </div>
        <div className="box" style={{ display: 'flex', flexDirection: 'column', }}>
        {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                return (
                  <div style={{ backgroundColor: index % 2 === 1 ? '#d9d9d9' : '#eeeeee' }} className="horizontal-div">
                  <div className="xxsmall-element" style={{ paddingLeft: '10px' }}>{item.state}</div>
                  <div className="medium-element">{item.county}</div>
                  <div className="small-element">{item.impact_severity}</div> 
                  <div className="large-element">{item.reason}</div>
                  <div className="small-element">{item.last_reviewed_date}</div>
                  <Link className="xxsmall-element link" to={`/anomalies/:${item.state}${item.county}/edit`}>Edit</Link>
                  <Link className="xsmall-element link" to={`/anomalies/:${item.state}${item.county}`}>Details</Link>
                  <Link className="xsmall-element link" to={`/anomalies/:${item.state}${item.county}/changes`}>Audit</Link>
                </div>
                )
              
            })
              ) : (
              <p>No results found</p>
              )}
            </div>
          </div>
      );
    };
export default ActiveItemsPage;