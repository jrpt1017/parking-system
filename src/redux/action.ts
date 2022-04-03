import React from 'react';
import { Actions } from '../redux/actionTypes'
import { IParking } from '../types'

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