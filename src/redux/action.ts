import React from 'react';
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