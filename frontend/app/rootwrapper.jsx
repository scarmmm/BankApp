import React from 'react';
import { GlobalStateProvider } from '@/app/GlobalStateContext.jsx';
import RootLayout from '@/app/_layout';

export default function RootLayoutWrapper() {
  return (
    <GlobalStateProvider>
      <RootLayout />
    </GlobalStateProvider>
  );
}
