export interface ParkingTransaction {
  id: string;
  parkingSpot: string;
  name: string;
  licence: string;
  duration: number;
  durationType: string;
  durationMs: number; // duration in milliseconds
  createdAt: number; // epoch timestamp
  closedAt?: null | number; // epoch timestamp
}
