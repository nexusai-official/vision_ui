import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from './ImageUploader';
import { Car } from 'lucide-react';
import { useClaims } from '../context/ClaimsContext';
import type { CarImage } from '../types';

export function ClaimForm() {
  const navigate = useNavigate();
  const { addClaim } = useClaims();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    description: ''
  });

  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert File objects to CarImage objects
    // In a real app, you would upload these files to a server
    const carImages: CarImage[] = images.map((file, index) => ({
      id: `img-${index}`,
      url: URL.createObjectURL(file),
      position: index === 0 ? 'Front' : 'Rear' // Simplified position assignment
    }));

    // Create new claim
    addClaim({
      vehicleInfo: {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        vin: formData.vin
      },
      images: carImages,
      damages: [],
      parts: []
    });

    // Navigate to claims list
    navigate('/claims');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Car className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">New Insurance Claim</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Make</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.make}
                onChange={e => setFormData({...formData, make: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">VIN</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.vin}
                onChange={e => setFormData({...formData, vin: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Damage Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Images</label>
            <ImageUploader onImagesSelected={files => setImages(prev => [...prev, ...files])} />
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}