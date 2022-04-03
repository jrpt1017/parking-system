import { AnyAction } from 'redux';
import { IOutput, IParking, PSlotSize, IInput, ParkingSlotSize } from '../types';
import { Actions } from './actionTypes'

// const test = {
//   entryPoint: undefined,
//   slot: undefined,
//   parkingId: undefined,
//   plateNumber: '',
//   size: PSlotSize.SP,
//   isOccupied: false,
// }

export interface IParkingReducer {
  parking: IParking[],
  input: IInput | undefined,
  output: IOutput | undefined,
  slots: number | undefined,
  entryPoint: number | undefined,
}


const initState: IParkingReducer = {
  parking: [],
  slots: undefined,
  entryPoint: undefined,
  input: undefined,
  output: undefined,
}

export const parkingReducer = (state: IParkingReducer = initState, action: AnyAction) => {
  switch (action.type) {
    case Actions.SET_PARKING_AREA: {
      const { slots, entryPoint, parking } = action.payload;
      return {
        ...state,
        slots,
        entryPoint,
        parking,
      };
    }

    case Actions.UPDATE_PARKING_SIZE: {
      const { parkingId, size } = action.payload;

      // Find the parking then update the size
      const newParking = [...state.parking];
      newParking.find((item) => {
        return item.parkingId === parkingId;
      })!.size = size

      return {
        ...state,
        parking: newParking,
      }
    }

    case Actions.PARK_CAR: {
      const { parkingId, plateNumber } = action.payload;
      console.log(parkingId, plateNumber)
      const newParking = [...state.parking];
      const findParkingSlot = newParking.find((item) => {
        return parkingId === item.parkingId;
      });
      findParkingSlot!.plateNumber = plateNumber;
      findParkingSlot!.isOccupied = true;

      return {
        ...state,
        parking: newParking,
      }
    }

    case 'SET_INPUT':
      return initState;

    case 'SET_OUTPUT':
      return initState;

    default: return initState;
  }
};