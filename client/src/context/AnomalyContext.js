import React, {useState, createContext} from 'react';

export const AnomalyContext = createContext();

export const AnomalyContextProvider = props => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Add this line

  const selectItem = (id) => {
    const item = items.find(item => item.id === id);
    setSelectedItem(item);
  }

  return (
    <AnomalyContext.Provider value={{items, setItems, selectedItem, selectItem}}>
      {props.children}
    </AnomalyContext.Provider>
  );
};