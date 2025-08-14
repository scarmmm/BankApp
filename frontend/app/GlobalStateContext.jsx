import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [selectedModel, setSelectedModel] = useState('Logistic Regression');
  const [selectedParameters, setSelectedParameters] = useState({});
  const [modelID, setModelID] = useState(1);

  return (
    <GlobalStateContext.Provider value={{ 
      selectedModel, setSelectedModel,
      selectedParameters, setSelectedParameters,
      modelID, setModelID}}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
