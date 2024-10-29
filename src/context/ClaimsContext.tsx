import React, { createContext, useContext, useState, useCallback } from 'react';
import { Claim } from '../types';

// Initial dummy data
const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'CMU9F2GD',
    vehicleInfo: {
      make: 'Chevrolet',
      model: 'Avalanche',
      year: 2005,
      vin: 'Not Available'
    },
    claimInfo: {
      claimDate: '9/26/2024',
      odometer: 10020,
      status: 'Repairable',
      repairCostRange: {
        min: 673,
        max: 912
      },
      state: 'AL',
      airbagStatus: 'Not Deployed'
    },
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
        position: 'Front'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
        position: 'Rear'
      }
    ],
    damages: [],
    parts: []
  },
  {
    id: 'CMU9F3HD',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      vin: '1HGCM82633A123456'
    },
    claimInfo: {
      claimDate: '9/25/2024',
      odometer: 15000,
      status: 'Repairable',
      repairCostRange: {
        min: 890,
        max: 1200
      },
      state: 'CA',
      airbagStatus: 'Not Deployed'
    },
    images: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027',
        position: 'Front'
      }
    ],
    damages: [],
    parts: []
  }
];

interface ClaimsContextType {
  claims: Claim[];
  addClaim: (claim: Omit<Claim, 'id' | 'claimInfo'>) => void;
  getClaim: (id: string) => Claim | undefined;
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

export function ClaimsProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);

  const addClaim = useCallback((newClaim: Omit<Claim, 'id' | 'claimInfo'>) => {
    const claim: Claim = {
      ...newClaim,
      id: `CMU${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      claimInfo: {
        claimDate: new Date().toLocaleDateString(),
        odometer: 0,
        status: 'Repairable',
        repairCostRange: {
          min: 0,
          max: 0
        },
        state: 'Unknown',
        airbagStatus: 'Not Deployed'
      }
    };
    setClaims(prev => [claim, ...prev]);
  }, []);

  const getClaim = useCallback((id: string) => {
    return claims.find(claim => claim.id === id);
  }, [claims]);

  return (
    <ClaimsContext.Provider value={{ claims, addClaim, getClaim }}>
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaims() {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error('useClaims must be used within a ClaimsProvider');
  }
  return context;
}