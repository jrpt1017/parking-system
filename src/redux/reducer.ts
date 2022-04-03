import { IParking, PSlotSize } from '../types';

const initState = {
  entryPoint: undefined,
  slot: undefined,
  parkingId: undefined,
  plateNumber: '',
  size: PSlotSize.SP,
  isOccupied: false,
}

export const parkingReducer = (state: IParking = initState, action) => {
  switch (action.type) {
    default: return initState;
  }
};