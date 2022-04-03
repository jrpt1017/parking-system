import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../redux/store';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent, Typography } from '@mui/material';

import { setParkingArea, updateParkingSize } from '../redux/action';
import { IParking, ParkingSlotSize } from '../types'

interface IParkingSlot extends IParking {
  isClicked: boolean,
}


const ParkingSlot: React.FC<IParkingSlot> = (props: IParkingSlot) => {
  const dispatch = useDispatch();

  const { entryPoint, slot, plateNumber, parkingId, size, isOccupied, isClicked } = props;
  const boxClass = `Parking-Slot-Box ${isOccupied ? 'Occupied' : ''}`;

  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });


  const handleChangeParkingSize = (id: number | undefined, e: SelectChangeEvent<ParkingSlotSize>) => {
    dispatch(updateParkingSize(id!, e.target.value as ParkingSlotSize))
  }

  return (
    <Box className={boxClass}>
      <div style={{ marginBottom: '35px' }}>
        <Typography style={{ position: 'absolute', left: 0 }}>EP: {entryPoint}</Typography>
        <Typography style={{ position: 'absolute', right: 0 }}>Slot: {slot}</Typography>
      </div>
      <Typography>Car parked: {plateNumber}</Typography>
      {isClicked ? (
        <p>Size: {size}</p>
      ) : (
        <>
          <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={size}
              onChange={(e) => { return handleChangeParkingSize(parkingId, e) }}
              label="Size"
            >
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="MP">MP</MenuItem>
              <MenuItem value="LP">LP</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </Box>
  )
};

export default ParkingSlot;