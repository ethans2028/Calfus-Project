import React from 'react'
import {useParams} from 'react-router-dom'

const AnomalyDetailPage = () => {
  const issueID = useParams();
    // temporary data for testing - will read from database later
    const tempData = [
        {id: 1, uname: 'somename1', actions: 'edited field A'},
        {id: 2, uname: 'somename2', actions: 'edited field B'},
        {id: 3, uname: 'somename3', actions: 'edited field C'}
    ]

    // code to read from database goes here

    
    // mapping the data into a table format (will format the table later (heh))
    const mappedData = tempData.map((edit) => 
        <tr key={edit.id}>
            <th>{edit.uname}</th>
            <th>{edit.actions}</th>
        </tr>
    );
    
  return (
    <div> 
      <div>
      <h1>Issue ID {issueID.id}</h1>
        <table><tbody>{mappedData}</tbody></table>
        
    </div>


    </div>
  )
}

export default AnomalyDetailPage