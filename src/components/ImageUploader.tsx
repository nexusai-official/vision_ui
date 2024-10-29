import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
}

export function ImageUploader({ onImagesSelected }: ImageUploaderProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    onImagesSelected(files);
  }, [onImagesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onImagesSelected(files);
  }, [onImagesSelected]);

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <label className="cursor-pointer">
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Drop images here or click to upload
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Upload multiple images of the vehicle from different angles
      </p>
    </div>
  );
}