import React, { useState, useEffect } from 'react';
import { IAppState } from '../redux/store'
import { IParking } from '../types'
import ParkingSlot from './ParkingSlot'
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';

const ParkingArea = () => {
  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });

  return (
    <>
      {
        parking.forEach((parkingArea: IParking) => {
          return (
            <React.Fragment key={parkingArea.parkingId}>
              <ParkingSlot
                {...parkingArea}
              />
            </React.Fragment>
          )
        })
      }
    </>
  )
};

export default ParkingArea;

// const ParkingArea = () => {
//   // TODO: add validation - entryPoint should be greater than or equal 3
//   let list: any = [];
//   parking.forEach((parkingArea: IParking) => {
//     list.push(
//       <React.Fragment key={parkingArea.parkingId}>
//         <ParkingSlot
//           entryPoint={parkingArea.entryPoint}
//           slot={parkingArea.slot}
//           size={parkingArea.size}
//           plateNumber={parkingArea.plateNumber}
//           parkingId={parkingArea.parkingId}
//           isOccupied={parkingArea.isOccupied}
//         />
//       </React.Fragment>
//     )
//   });
//   return (
//     <>
//       <Box display="flex" flexWrap="wrap" justifyContent="center" style={{ gap: '80px', marginTop: '100px', marginBottom: '100px' }}>
//         {list}
//       </Box>
//     </>
//   );
// }