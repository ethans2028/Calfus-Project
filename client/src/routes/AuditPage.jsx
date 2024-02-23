import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import '../global.css';
import LogoutButton from "./LogoutButton.jsx";
import  AnomalyFinder  from '../apis/AnomalyFinder';


const AuditPage = () => {
  const { id } = useParams();    
  const [ audits, setAudits ] = useState([]);
  const [isLoading, setIsLoading] = useState('loading'); // Add this line
  // stephen's logic
  const [unameFilter, f_u] = useState('')
  // code to read from database goes here
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("it's changing!", audits);
  }, [audits]);
  
  const fetchData = async () => {
    AnomalyFinder.get(`/${id}/changes`)
    .then((response) => {
      console.log(response)
      setAudits(response.data.data.anomalies);
      setIsLoading('loaded'); 
    })
    .catch((error) => {
      console.error('Error fetching data for anomaly', error);
    });
  }; 
  if (isLoading === 'loading') {
    return <div>Loading...</div>; 
  }


    // setting up for later - these are all the "modifiable" fields
    
    
    // filtering code (stolen partially from Charlie's code)
    
    const changeUname = event => {
        f_u(event.target.value);
    }
    

    const filtData = audits.filter(edit => {
      if (unameFilter === '') return true;
      return (edit.dao_member?.toLowerCase().includes(unameFilter.toLowerCase()));
    });

    // mapping the data into a table format
    const mappedData = filtData.map((edit, ind) => {
        const day = edit.date.substring(0, 10)
        const time = edit.date.substring(11, 19)
        return (<tr key={edit.id} style={{ backgroundColor: ind % 2 === 1 ? '#d9d9d9' : '#eeeeee' }}>
            <td>{edit.dao_member}</td>
            <td>{day}   {time}</td>
            <td>{edit.change}</td>
        </tr>)
    }
    ); 
    
    function properlyCapitalize(string){
        let toReturn = "";
        let first = true;
        for (let iter in string){
            if (first){
                toReturn += string[iter].toUpperCase();
                first = false;
            }else if (string[iter] === ' '){
                toReturn += string[iter];
                first = true;
            }else{
                toReturn += string[iter].toLowerCase();
            }
        }
        return toReturn;
    }

  // small bit of safety: if no records exist for it, it won't crash the website

  if (audits.length === 0 && isLoading === 'loaded'){
      return (
        <div className='container'>     
          <br/> <br/>
          <LogoutButton/>
          <h2> No Results Found</h2>
          <p> 
            This anomaly may not exist or audit information was not found for it.
            Navigate back to the Main Page and try again.
          </p>
          <div className='edit-btn-div'>
            <Link to="/cic" className="button audit-btn"> Home</Link>
          </div>
        </div>
      );
    
  }
  return (
    <div className='container'>     
        <br/> <br/>
        <LogoutButton/>
        <h1 className='page-header'>Audit Log: {properlyCapitalize(audits[0].county)}, {audits[0].state}</h1>
        <input type="text" placeholder="Search by Username" onChange={changeUname} size={5}/>
        <table>
            <thead>
                <tr style={{backgroundColor: '#bcbcbc'}}>
                    <th width={500}>Username</th>
                    <th width={200}>Date</th>
                    <th width={2000}>Action</th>
                </tr>
            </thead>
            <tbody>{mappedData}</tbody>
            </table>
        <br/>
        <div className='edit-btn-div'>
          <Link to={`/anomalies/${id}`} className="button">Details</Link>
          <Link to="/cic" className="button audit-btn"> Home</Link>
          
        </div>
    </div>
  )
}

export default AuditPage

/* object holding facility

*/