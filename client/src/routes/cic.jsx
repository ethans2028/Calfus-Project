import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import sampleData from '../sampleData.json';
import '../global.css'; 

const ActiveItemsPage = () => {
  const dataArray = Object.values(sampleData.Current);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(dataArray);
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const [sortedBy, setSortedBy] = useState('NONE');

  const sortState = () => {
      if (sortedBy !== 'STATEASC') {
        const sortedItems = [...items].sort((a, b) => {
          if (a.State < b.State) {
            return -1;
          }
          if (a.State > b.State) {
            return 1;
          }
          return 0;
        });
        setItems(sortedItems);
        setSortedBy('STATEASC');
      } else {
        const sortedItems = [...items].sort((a, b) => {
          if (a.State < b.State) {
            return 1;
          }
          if (a.State > b.State) {
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
        if (a.County < b.County) {
          return -1;
        }
        if (a.County > b.County) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('COUNTYASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.County < b.County) {
          return 1;
        }
        if (a.County > b.County) {
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
        if (a['Impact Severity'] < b['Impact Severity']) {
          return -1;
        }
        if (a['Impact Severity'] > b['Impact Severity']) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('SEVERITYASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a['Impact Severity'] < b['Impact Severity']) {
          return 1;
        }
        if (a['Impact Severity'] > b['Impact Severity']) {
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
        if (a.Reason < b.Reason) {
          return -1;
        }
        if (a.Reason > b.Reason) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('REASONASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a.Reason < b.Reason) {
          return 1;
        }
        if (a.Reason > b.Reason) {
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
        if (a['Last Reviewed Date'] < b['Last Reviewed Date']) {
          return -1;
        }
        if (a['Last Reviewed Date'] > b['Last Reviewed Date']) {
          return 1;
        }
        return 0;
      });
      setItems(sortedItems);
      setSortedBy('LASTREVIEWEDASC');
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (a['Last Reviewed Date'] < b['Last Reviewed Date']) {
          return 1;
        }
        if (a['Last Reviewed Date'] > b['Last Reviewed Date']) {
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
      return item.Status === 'Active';
    }
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item['County']?.toLowerCase().startsWith(searchTermLower) ||
      item['State']?.toLowerCase().startsWith(searchTermLower) ||
      item['Impact Severity']?.toLowerCase().startsWith(searchTermLower) ||
      item['Last Reviewed Date']?.toLowerCase().startsWith(searchTermLower)
    ) && item['Status'] === 'Active';
  });

  return (
      <div className="container">
        <h1>Current Impacted Counties</h1>
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
              filteredItems.map((item, index) => (
                <div style={{ backgroundColor: index % 2 === 1 ? '#d9d9d9' : '#eeeeee' }} className="horizontal-div">
                  <div className="xxsmall-element" style={{ paddingLeft: '10px' }}>{item['State']}</div>
                  <div className="medium-element">{item['County']}</div>
                  <div className="small-element">{item['Impact Severity']}</div> 
                  <div className="large-element">{item['Reason']}</div>
                  <div className="small-element">{item['Last Reviewed Date']}</div>
                  <Link className="xxsmall-element link" to={`/anomalies/:${item.State}${item.County}/edit`}>Edit</Link>
                  <Link className="xsmall-element link" to={`/anomalies/:${item.State}${item.County}`}>Details</Link>
                  <Link className="xsmall-element link" to={`/anomalies/:${item.State}${item.County}/changes`}>Audit</Link>
                </div>
              ))
              ) : (
              <p>No results found</p>
              )}
            </div>
          </div>
      );
    };
export default ActiveItemsPage;