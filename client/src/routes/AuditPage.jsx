import React from 'react'
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

    
    // mapping the data into a table format (will format the table later (heh))
    const mappedData = tempData.map((edit) => 
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
    <div>
        <css></css>
        <Link to={`../anomalies/${issueID.id}`}>Back</Link>
        <div style={{fontSize: "40px"}}><b>Anomaly {issueID.id}</b></div>
        <div style={{fontSize: "36px"}}><b>Audit Log</b></div>
        
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