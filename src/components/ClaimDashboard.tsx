import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { DamageOverlay } from './DamageOverlay';
import { Maximize2, Car, ArrowLeft, Plus } from 'lucide-react';
import { useClaims } from '../context/ClaimsContext';

const POSITIONS = [
  'Front',
  'Rear',
  'Left',
  'Right',
  'Front Left',
  'Front Right',
  'Rear Left',
  'Rear Right'
] as const;

export function ClaimDashboard() {
  const { id } = useParams();
  const { getClaim } = useClaims();
  const claim = getClaim(id!);

  const [activePosition, setActivePosition] = useState<typeof POSITIONS[number]>('Front');
  const [isZoomed, setIsZoomed] = useState(false);

  if (!claim) {
    return <Navigate to="/claims" replace />;
  }

  const activeImages = claim.images.filter(img => img.position === activePosition);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Car className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {claim.vehicleInfo.year} {claim.vehicleInfo.make} {claim.vehicleInfo.model}
                </h1>
                <p className="text-sm text-gray-500">Claim #{claim.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                {claim.claimInfo.status}
              </span>
              <span className="text-sm text-gray-500">
                Repair Cost: ${claim.claimInfo.repairCostRange.min} - ${claim.claimInfo.repairCostRange.max}
              </span>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <Link
              to="/claims"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Claims</span>
            </Link>
            <Link
              to="/claims/new"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span>New Claim</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Panel - Image Viewer */}
          <div className="col-span-2 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex space-x-2">
                {POSITIONS.map(position => (
                  <button
                    key={position}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      activePosition === position
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    onClick={() => setActivePosition(position)}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              {activeImages.map(image => (
                <div key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt={`Vehicle ${image.position}`}
                    className="w-full h-auto"
                  />
                  <DamageOverlay
                    damages={claim.damages}
                    parts={claim.parts}
                    imageWidth={800}
                    imageHeight={600}
                  />
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
                  >
                    <Maximize2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ))}
              {activeImages.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No images available for this position
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Parts & Damages */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Damage Assessment</h2>
              <div className="space-y-4">
                {claim.parts.length === 0 ? (
                  <p className="text-gray-500 text-center">No damage assessment available</p>
                ) : (
                  claim.parts.map(part => (
                    <div key={part.id} className="flex items-center justify-between p-2 border rounded">
                      <span>{part.name}</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        part.action === 'Replace' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {part.action}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Vehicle Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">VIN</span>
                  <span>{claim.vehicleInfo.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Odometer</span>
                  <span>{claim.claimInfo.odometer} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Airbag Status</span>
                  <span>{claim.claimInfo.airbagStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-screen overflow-auto">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
            >
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
            {activeImages.map(image => (
              <div key={image.id} className="relative">
                <img
                  src={image.url}
                  alt={`Vehicle ${image.position}`}
                  className="w-full h-auto"
                />
                <DamageOverlay
                  damages={claim.damages}
                  parts={claim.parts}
                  imageWidth={1600}
                  imageHeight={1200}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}