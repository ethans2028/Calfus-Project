import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import '../global.css';
import sampleData from "../sampleData.json";

const AuditPage = () => {
    const issueID = useParams();    
    
    // code to read from database goes here
    const state = issueID.id.substring(1, 3);
    const county = issueID.id.substring(3);
    const dataArray = Object.values(sampleData['Change Log'])
    const [thisData, modThisData] = useState([])
    useEffect(() =>{
        modThisData(dataArray);
    }, []);

    const simpleFilter = thisData.filter((data) => 
        county.toLowerCase().includes(data.County.toLowerCase()) && 
        data.State.toLowerCase() === state.toLowerCase()
    );

    // setting up for later - these are all the "modifiable" fields
    
    
    // filtering code (stolen partially from Charlie's code)
    const [unameFilter, f_u] = useState('')
    const changeUname = event => {
        f_u(event.target.value);
    }


    
    // all of the checkbox code (could use some help with cleaning up)
    
    /* const Checkbox = ({ label, value, onChange})=>{
        return (<label><input type="checkbox" checked={value} onChange={onChange}/>{label}</label>)
    }
    const possibleFields = ['Severity', 
        'Reason', 'Mitigation Plan', 'Clears', 'Possible Hits',
        'Research Method', 'DOB Redaction', 'Status',
        'Estimated Resolution Date', 'Links']

    const [severity, modSeverity] = useState({key: 'severity', state: true})
    const [reason, modReason] = useState({key: 'reason', state: true})
    const [mitigation, modMitigation] = useState({key: 'mitigation', state: true})
    const [clears, modClears] = useState({key: 'clears', state: true})
    const [hits, modHits] = useState({key: 'hits', state: 'true'})
    const [method, modMethod] = useState({key: 'method', state: 'true'})
    const [dob, modDob] = useState({key: 'dob', state: true})
    const [status, modStatus] = useState({key: 'status', state: true})
    const [resolution, modResolution] = useState({key: 'resolution', state: true})
    const [links, modLinks] = useState({key: 'links', state: true})
    */

    // determining how the items are filtered
    const filteredItems = simpleFilter.filter(item =>{
        const left = item['DAO Member'].toLowerCase().includes(unameFilter.toLowerCase());
        return left;
    }
    )
    
    // could not get the checkbox code to work in a way I liked
    // so it's temporarily commented out - will be updated (somehow) in a later version

    // if it fits any of the criteria, it's in
    /*function containsAny(dataPoint, list){
        let b = true;
        for (let item in list){
            if (list[item] === true){
                if (dataPoint['Change'].toLowerCase().includes(item.toLowerCase())) {
                    console.log('contains ' + item);
                    return true;
                }
            }else{
                b = false;
            }
            console.log(item, b);
        }
        console.log(b);
        return b;
    }*/

    // mapping the data into a table format
    const mappedData = filteredItems.map((edit, ind) => {
        return (<tr key={edit.Date} style={{ backgroundColor: ind % 2 === 1 ? '#d9d9d9' : '#eeeeee' }}>
            <td>{edit['DAO Member']}</td>
            <td>{edit['Date']}</td>
            <td>{edit['Change']}</td>
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
  return (
    /*
        all of the stuff that's changed:
        - updated style to match Charles' - centering, margins, color palette 
          (used the "container" architecture)
        - temporarily removed the "filter by field" buttons (was having trouble getting them to work)
        - slightly modified table code
        - adjusted global.css again to change the table code (again)
        - changed around the buttons - there is a "home" button up top that leads to cic,
        "back" button on bottom goes to Anomaly Detail Page
        - page now reads and updates from .json file
        - modified a bit of spacing (you can use <br> to make line break spacing)

        some things I thought of, but will not be here:
        - sorting items by date/time - that doesn't seem necessary yet
        - the table changes temporarily have key set to "date" - probably "name + date" is a good key
          but don't want to deal with that right now, it's kind of complicated to do two-value keys for that
        
    */
    <div className='container'>        
        <br/>      
        <h1>Anomalies: {properlyCapitalize(county)}, {state}</h1>
        <h2>Audit Log</h2>
        <input type="text" placeholder="Filter by username" onChange={changeUname} size={5}/>
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
          <Link to={`/anomalies/${issueID.id}`} className="button">Details</Link>
          <Link to="/cic" className="button audit-btn"> Home</Link>
        </div>
    </div>
  )
  //
}

export default AuditPage