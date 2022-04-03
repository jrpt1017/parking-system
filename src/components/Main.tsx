import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { setParkingArea } from '../redux/action'
import { IOutput, IParking, PSlotSize, IInput } from '../types';
import '../App.css';

const Main = () => {
  const dispatch = useDispatch();
  const [slot, setSlot] = useState<number | undefined>(0)
  const [entryPoint, setEntryPoint] = useState<number | undefined>(0)

  const handleSetEntryPoint = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntryPoint(Number(e.target.value));
  };

  const handleSetSlot = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSlot(Number(e.target.value));
  };

  const handleOnClick = () => {
    let parkingObj: IParking;
    const parkingArr: IParking[] = [];
    let id = 0;
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

  return (
    <>
      <h1>Parking Systems</h1>
      <Box display="flex" justifyContent="center" style={{ gap: '10px' }}>
        <TextField
          placeholder="Enter number of entry points"
          onChange={(e) => { return handleSetEntryPoint(e) }}
          value={entryPoint}
        />
        <TextField
          placeholder="Enter number of parking slot"
          onChange={(e) => { return handleSetSlot(e) }}
          value={slot}
        />
        <Button
          variant="contained"
          className=''
          onClick={handleOnClick}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Main;