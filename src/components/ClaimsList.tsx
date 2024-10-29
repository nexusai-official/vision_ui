import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ChevronRight } from 'lucide-react';
import { useClaims } from '../context/ClaimsContext';

export function ClaimsList() {
  const { claims } = useClaims();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Claims</h1>
          <Link
            to="/claims/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            New Claim
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {claims.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No claims found. Create a new claim to get started.
            </div>
          ) : (
            claims.map((claim) => (
              <Link
                key={claim.id}
                to={`/claims/${claim.id}`}
                className="block border-b last:border-b-0 hover:bg-gray-50"
              >
                <div className="p-6 flex items-center space-x-6">
                  <div className="flex-shrink-0 w-24 h-24">
                    <img
                      src={claim.images[0]?.url || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d'}
                      alt={`${claim.vehicleInfo.year} ${claim.vehicleInfo.make} ${claim.vehicleInfo.model}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-gray-400" />
                      <h2 className="text-lg font-semibold text-gray-900">
                        {claim.vehicleInfo.year} {claim.vehicleInfo.make} {claim.vehicleInfo.model}
                      </h2>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>Claim #{claim.id}</span>
                      <span>•</span>
                      <span>{claim.claimInfo.claimDate}</span>
                      <span>•</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {claim.claimInfo.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Repair Cost: ${claim.claimInfo.repairCostRange.min} - ${claim.claimInfo.repairCostRange.max}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}