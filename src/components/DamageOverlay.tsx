import React from 'react';
import { Damage, Part } from '../types';

interface DamageOverlayProps {
  damages: Damage[];
  parts: Part[];
  imageWidth: number;
  imageHeight: number;
}

export function DamageOverlay({ damages, parts, imageWidth, imageHeight }: DamageOverlayProps) {
  const getColor = (type: string) => {
    switch (type) {
      case 'Scratch': return 'rgba(255, 255, 0, 0.5)';
      case 'Dent': return 'rgba(255, 0, 0, 0.5)';
      case 'Tear': return 'rgba(255, 0, 255, 0.5)';
      default: return 'rgba(128, 128, 128, 0.5)';
    }
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
      preserveAspectRatio="none"
    >
      {parts.map((part) => (
        <polygon
          key={part.id}
          points={part.coordinates.points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="rgba(0, 255, 0, 0.5)"
          strokeWidth="2"
        />
      ))}
      
      {damages.map((damage) => (
        <polygon
          key={damage.id}
          points={damage.coordinates.points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill={getColor(damage.type)}
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}