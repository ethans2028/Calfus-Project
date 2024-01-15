import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';


const AuditPage = () => {
    const issueID = useParams();
    // temporary data for testing - will read from database later
    const tempData = [
        {id: 1, uname: 'somename1 name2', modified: new Date(2000, 3, 3, 4, 23, 18, 298103), actions: 'edited field A'},
        {id: 2, uname: 'somename2 name3', modified: new Date(2000, 3, 3, 4, 23, 17, 298103), actions: 'edited field B'},
        {id: 3, uname: 'somename3 name4', modified: new Date(2000, 3, 3, 4, 23, 16, 298103), actions: 'edited field C'}
    ]
    

    // temporary css styling - will adjust once global.css file is fully set up
    const styleSet = {color: "purple", border: "1px solid black"};
    
    // code to read from database goes here

    // setting up for later - these are all the "modifiable" fields
    const possibleFields = ['County', 'State', 'Severity',
        'Reason', 'Mitigation Plan', 'Clears', 'Possible Hits',
        'Research Method', 'DOB Redaction', 'Status',
        'Estimated Resolution Date', 'Links']

    
    // filtering code (stolen partially from Charlie's code)
    const [unameFilter, f_u] = useState('')
    const changeUname = event => {
        f_u(event.target.value);
    }

    // all of the checkbox code (could use some help with cleaning up)
    const [tempRecheck, tempReadjust] = useState({ 'A': true, 'B': true, 'C': true, 'D': true})
    const Checkbox = ({ label, value, onChange})=>{
        return (
            <label><input type="checkbox" checked={value} onChange={onChange}/>
        {label}</label>
        )
    }
    // very messy code, probably a better way to do this
    // essentially, trying to update tempRecheck in terms of itself throws an error
    // so has to have some kind of middle man variable to display (which is checkValueA-C)
    // there's probably some way to cut out these middle men, but I'm not sure (it would help clean this out a lot)
    const [checkValueA, setA] = useState(tempRecheck['A'])
    const [checkValueB, setB] = useState(tempRecheck['B'])
    const [checkValueC, setC] = useState(tempRecheck['C'])
    const tempChangeA = () => {
        let x = tempRecheck;
        setA(!checkValueA);
        x['A'] = !checkValueA;
        tempReadjust(x);
    }
    const tempChangeB = () => {
        let x = tempRecheck;
        setB(!checkValueB);
        x['B'] = !checkValueB;
        tempReadjust(x);
    }
    const tempChangeC = () => {
        let x = tempRecheck;
        setC(!checkValueC);
        x['C'] = !checkValueC;
        tempReadjust(x);
    }

    // determining how the items are filtered
    const filteredItems = tempData.filter(item =>
        item.uname.includes(unameFilter) && containsAny(item, tempRecheck)
        
    )
    // if it fits any of the criteria, it's in
    function containsAny(dataPoint, list){
        for (let item in list){
            if (list[item] === true){
                if (dataPoint.actions.includes(item)) return true;
            }
        }
        return false;
    }

    // mapping the data into a table format
    const mappedData = filteredItems.map((edit) => 
        <tr key={edit.id}>
            <td style={styleSet}>{edit.uname}</td>
            <td style={styleSet}>{edit.modified.getFullYear()}-{edit.modified.getMonth()}-{edit.modified.getDate()} {edit.modified.getHours()}:{edit.modified.getMinutes()}:{edit.modified.getSeconds()}</td>
            <td style={styleSet}>{edit.actions}</td>
        </tr>
    );
  return (
    // changes from last time:
    // - added some temporary styling to the table
    // - added simple table headers
    // - added "date + time" field to the table
    // - added a simple header to the page with "Audit Log" and "Anomaly [id]" 
    //   (again, will change once we start to read from database)
    // - adjusted the table width to make it look better on the page
    // - cleaned up table code a bit
    // - added a "back" button (currently goes back to "data viewing" page)
    // - added a (very messy) filtering system using both username and check boxes for "fields modified"
    //   (this will need to be cleaned up later, might need help with this)
    <div>
        <css></css>
        <Link to={`../anomalies/${issueID.id}`}>Back</Link>
        <div style={{fontSize: "40px"}}><b>Anomaly {issueID.id}</b></div>
        <div style={{fontSize: "36px"}}><b>Audit Log</b></div>
        <input type="text" placeholder="Filter by username" onChange={changeUname}></input>
        <div>Filter by fields modified</div>
        <Checkbox label='A' value={checkValueA} onChange={tempChangeA}/>
        <Checkbox label='B' value={checkValueB} onChange={tempChangeB}/>
        <Checkbox label='C' value={checkValueC} onChange={tempChangeC}/>
        <table style={styleSet}>
            <thead style={styleSet}>
                <th style={styleSet} width={500}>Username</th>
                <th style={styleSet} width={200}>Date/Time</th>
                <th style={styleSet} width={1000}>Action</th>
            </thead>
            <tbody style={styleSet}>{mappedData}</tbody>
            </table>
        
    </div>
  )
}

export default AuditPage