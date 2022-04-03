import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { IAppState } from '../redux/store'
import { IParking } from '../types'
import ParkingSlot from './ParkingSlot'
import ParkACar from './ParkACar'
import UnparkACar from './UnparkACar';

const ParkingArea = () => {
  const [isClicked, setIsClicked] = useState(false);

  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });

  const isParkingOccupied = parking.some((item) => {
    return item.isOccupied === true;
  });

  return (
    <>
      <Box display="flex" gap="100px" flexWrap="wrap" justifyContent="center" style={{ marginTop: '50px' }}>
        {
          parking.map((parkingArea: IParking) => {
            return (
              <React.Fragment key={parkingArea.parkingId}>
                <ParkingSlot
                  {...parkingArea}
                  isClicked={isClicked}
                />
              </React.Fragment>
            );
          })
        }
      </Box>
      <Button variant="contained" onClick={() => { return setIsClicked(!isClicked) }}>
        {isClicked ? 'Edit Parking Area' : 'Create Parking Area'}
      </Button>
      {isClicked && <ParkACar />}
      {isClicked && isParkingOccupied && <UnparkACar />}
    </>
  )
};

export default ParkingArea;