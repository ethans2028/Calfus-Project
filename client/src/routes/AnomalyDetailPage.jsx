import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import sampleData from '../sampleData.json';

const AnomalyDetailPage = () => {
  const dataArray = Object.values(sampleData);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(dataArray);
  }, []);

  // const mappedData = dataArray.map((edit) => 
  //       <tr key={edit.id}>
  //           <th>{edit.uname}</th>
  //           <th>{edit.actions}</th>
  //       </tr>
  // );
  
  return (
    <div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
            dataArray.map((item) => (
               <div 
                  key={item.id}
                  style={{
                  color: 'blue',
                  textDecoration: 'none',
                  border: '1px solid lightgrey',
                  borderRadius: '5px',
                  padding: '5px',
                  margin: '5px',
                  }}
               >
                  <h1>County</h1>
                  {item.County}
                  <h1></h1>
                  {item.County}
                  
               </div>
            ))
            }
          </div>
        </div>
  );
}

export default AnomalyDetailPage