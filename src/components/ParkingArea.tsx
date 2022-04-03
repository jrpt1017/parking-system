import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { IAppState } from '../redux/store'
import { IParking } from '../types'
import ParkingSlot from './ParkingSlot'

const ParkingArea = () => {
  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });

  const handleCreateParkingArea = () => {

  }
  return (
    <>
      <Box display="flex" gap="100px" flexWrap="wrap" justifyContent="center" style={{ marginTop: '50px' }}>
        {
          parking.map((parkingArea: IParking) => {
            return (
              <React.Fragment key={parkingArea.parkingId}>
                <ParkingSlot
                  {...parkingArea}
                />
              </React.Fragment>
            );
          })
        }
      </Box>
      <Button variant="contained" onClick={handleCreateParkingArea}>Create Parking Area</Button>
    </>
  )
};

export default ParkingArea;