import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box, Typography, AppBar, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { setParkingArea } from '../redux/action'
import { IParking, PSlotSize } from '../types';
import ParkingArea from './ParkingArea';
import '../App.css';

const Main = () => {
  const dispatch = useDispatch();
  const [slot, setSlot] = useState<number | undefined>(3)
  const [entryPoint, setEntryPoint] = useState<number | undefined>(3)

  const handleSetEntryPoint = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntryPoint(Number(e.target.value));
  };

  const handleSetSlot = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSlot(Number(e.target.value));
  };

  const handleOnClick = () => {
    let parkingObj: IParking;
    const parkingArr: IParking[] = [];
    let id = 1;
    for (let i = 1; i <= entryPoint!; i++) {
      for (let j = 1; j <= slot!; j++) {
        parkingObj = {
          parkingId: id,
          entryPoint: i,
          slot: j,
          isOccupied: false,
          size: PSlotSize.SP, // set SP as default
          plateNumber: '',
        };
        parkingArr.push(parkingObj);
        id += 1;
      }
    }
    dispatch(setParkingArea(slot, entryPoint, parkingArr))
  };

  const isButtonDisabled = () => {
    if (entryPoint! < 3 || slot! < 0) {
      return true;
    }
    return false;
  }

  return (
    <>
      <AppBar position="static" color="primary" style={{ padding: '20px' }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>Parking Systems</Typography>
      </AppBar>
      <Box display="flex" justifyContent="center" style={{ gap: '10px', marginTop: '100px' }}>
        <FormControl>
          <InputLabel htmlFor="my-input">Entry points</InputLabel>
          <Input
            placeholder="Enter number of entry points"
            onChange={(e) => { return handleSetEntryPoint(e) }}
            value={entryPoint}
            type="number"
          />
          <FormHelperText id="my-helper-text">Minimum value is 3.</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Parking Slots</InputLabel>
          <Input
            placeholder="Enter number of parking slot"
            onChange={(e) => { return handleSetSlot(e) }}
            value={slot}
            type="number"
          />
        </FormControl>
        <Button
          variant="contained"
          className=''
          onClick={handleOnClick}
          disabled={isButtonDisabled()}
        >
          Submit
        </Button>
      </Box>
      <ParkingArea />
    </>
  );
};

export default Main;