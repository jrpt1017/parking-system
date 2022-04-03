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
      {parking.length !== 0 && (
        <Button variant="contained" onClick={() => { return setIsClicked(!isClicked) }} style={{ margin: 'auto', display: 'block', marginTop: '100px', marginBottom: '100px' }}>
          {isClicked ? 'Edit Parking Area' : 'Create Parking Area'}
        </Button>
      )}
      <Box display="flex" gap="50px" style={{ margin: '100px' }}>
        {isClicked && <ParkACar />}
        {isClicked && <UnparkACar />}
      </Box>
    </>
  )
};

export default ParkingArea;