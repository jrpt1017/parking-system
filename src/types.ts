export type ParkingSlotSize = 'SP' | 'MP' | 'LP';
export type CarSize = 'S' | 'M' | 'L';

export interface IInput {
  plateNumber: string,
  carSize: CarSize | undefined,
  entryPoint: number,
}

export interface IOutput {
  plateNumber: string,
  carSize: CarSize | undefined,
  hours: number | undefined,
  parkingSlotSize: ParkingSlotSize | undefined,
}

export interface IParking {
  entryPoint: number | undefined,
  slot: number | undefined,
  parkingId: number | undefined,
  plateNumber: string,
  size: ParkingSlotSize,
  isOccupied?: boolean,
}

export enum PSlotSize {
  SP = 'SP',
  MP = 'MP',
  LP = 'LP'
}