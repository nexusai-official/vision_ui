export interface Claim {
  id: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    vin: string;
  };
  claimInfo: {
    claimDate: string;
    odometer: number;
    status: 'Repairable' | 'Total Loss';
    repairCostRange: {
      min: number;
      max: number;
    };
    state: string;
    airbagStatus: string;
  };
  images: CarImage[];
  damages: Damage[];
  parts: Part[];
}

export interface CarImage {
  id: string;
  url: string;
  position: 'Front' | 'Rear' | 'Left' | 'Right' | 'Front Left' | 'Front Right' | 'Rear Left' | 'Rear Right';
}

export interface Damage {
  id: string;
  type: 'Scratch' | 'Dent' | 'Tear' | 'Other';
  severity: 'Minor' | 'Moderate' | 'Severe';
  coordinates: {
    points: [number, number][];
  };
  partId: string;
}

export interface Part {
  id: string;
  name: string;
  action: 'None' | 'Repair' | 'Replace';
  review: boolean;
  included: boolean;
  coordinates: {
    points: [number, number][];
  };
}