import { Actions } from '../redux/actionTypes'
import { IParking, ParkingSlotSize } from '../types'

export const setParkingArea = (slot: number | undefined, entryPoint: number | undefined, parking: IParking[]) => {
  return {
    type: Actions.SET_PARKING_AREA,
    payload: {
      slot,
      entryPoint,
      parking,
    },
  }
};

export const updateParkingArea = (parking: IParking[]) => {
  return {
    type: Actions.UPDATE_PARKING_AREA,
    parking,
  }
};

export const updateParkingSize = (parkingId: number, size: ParkingSlotSize) => {
  return {
    type: Actions.UPDATE_PARKING_SIZE,
    payload: {
      parkingId,
      size,
    },
  }
};

export const parkACar = (parkingId: number, plateNumber: string) => {
  return {
    type: Actions.PARK_CAR,
    payload: {
      parkingId,
      plateNumber,
    }
  }
};

export const unParkACar = (parkingId: number) => {
  return {
    type: Actions.UNPARK_CAR,
    payload: parkingId,
  }
}