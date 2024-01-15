import React, {useState, createContext} from 'react';

export const AnomalyContext = createContext();

// give all components access to data being read from the server.
// Avoids constantly passing in props to all the components
export const AnomalyContextProvider = props => {
  // sets value of object based on the outcome of a function, only changing the virtual DOM
  const [anomalies, setAnamonalies] = useState([])
  
  return (
    <AnomalyContext.Provider value={{anomalies, setAnamonalies}}>
      {props.children}
    </AnomalyContext.Provider>
  )
}