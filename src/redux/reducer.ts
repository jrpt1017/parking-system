import { AnyAction } from 'redux';
import { IOutput, IParking, PSlotSize, IInput } from '../types';
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
    case Actions.SET_PARKING_AREA:
      return {
        ...state,
        slots: action.payload.slot,
        entryPoint: action.payload.entryPoint,
        parking: action.payload
      };

    case 'SET_INPUT':
      return initState;

    case 'SET_OUTPUT':
      return initState;

    default: return initState;
  }
};