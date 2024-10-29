import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClaimForm } from './components/ClaimForm';
import { ClaimsList } from './components/ClaimsList';
import { ClaimDashboard } from './components/ClaimDashboard';
import { ClaimsProvider } from './context/ClaimsContext';

function App() {
  return (
    <ClaimsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/claims" replace />} />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="/claims/new" element={<ClaimForm />} />
          <Route path="/claims/:id" element={<ClaimDashboard />} />
        </Routes>
      </BrowserRouter>
    </ClaimsProvider>
  );
}

export default App;