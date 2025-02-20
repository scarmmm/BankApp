import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [selectedModel, setSelectedModel] = useState('No Model Selected');
  return (
    <GlobalStateContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
