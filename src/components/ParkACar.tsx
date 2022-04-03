import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../redux/store';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent, Typography } from '@mui/material';

import { IInput, ParkingSlotSize, IParking } from '../types';

const ParkACar = () => {
  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });

  // Input states
  const [input, setInput] = useState<IInput>({
    plateNumber: '',
    carSize: undefined,
    entryPoint: 0,
  });
  const [nearestSlot, setNearestSlot] = useState<undefined | IParking>(undefined)

  const getAvailableParking = () => {
    switch (input.carSize) {
      case 'S':
        return ['SP', 'MP', 'LP'];
      case 'M':
        return ['MP', 'LP'];
      case 'L':
        return ['LP']
      default:
        return ['SP', 'MP', 'LP'];
    }
  };


  const handleFindNearestSlot = () => {
    /*
      S - SP|MP|LP
      M - MP|LP
      L - LP
    */
    const filteredParkingSlots = parking.filter((item) => {
      return getAvailableParking().includes(item.size);
    });
    const firstIndex = filteredParkingSlots.findIndex((item) => {
      return item.entryPoint === Number(input.entryPoint);
    });
    const parkingCopy = [...filteredParkingSlots];
    const emptySlot = parkingCopy.slice(firstIndex).find((item) => {
      return item.isOccupied === false;
    });
    setNearestSlot(emptySlot);
  };


  const handleParkACar = () => {
    // Update values of parking variable. Set parking.
    const newParking = [...parking];
    const findParkingSlot = newParking.find((item) => {
      return nearestSlot!.parkingId === item.parkingId;
    });
    findParkingSlot!.plateNumber = input.plateNumber;
    findParkingSlot!.isOccupied = true;
    // setParking([...newParking])
    setInput({
      plateNumber: '',
      carSize: undefined,
      entryPoint: 0,
    });
  };


  const setInputValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<ParkingSlotSize>) => {
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newInput);
  };

  return (
    <Box className='Car-Input-Output'>
      <Typography className="InputOutputLabels" variant="h4">Park a Car</Typography>
      <Box display="flex" flexDirection="column" gap="10px">
        <Box display="flex" flexDirection="row" gap="10px">
          <TextField
            name="entryPoint"
            label="Entry point"
            variant="outlined"
            onChange={(e) => { return setInputValues(e) }}
            value={input.entryPoint}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Car Size</InputLabel>
              <Select
                name="carSize"
                value={input.carSize}
                onChange={(e) => { return setInputValues(e as unknown as SelectChangeEvent<ParkingSlotSize>) }}
                label="Size"
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="outlined" onClick={() => { return handleFindNearestSlot(); }}>Find Nearest Slot</Button>
        </Box>
        {nearestSlot && (
          <>
            <Typography>Parking EP: {nearestSlot?.entryPoint}</Typography>
            <Typography>Parking Slot: {nearestSlot?.slot}</Typography>
            <TextField
              name="plateNumber"
              value={input.plateNumber}
              id="outlined-basic"
              label="Car Plate #"
              variant="outlined"
              onChange={(e) => { return setInputValues(e) }}
            />
            <Button variant="contained" onClick={() => { return handleParkACar(); }}>Park Car</Button>
          </>
        )}
      </Box>
    </Box>
  )
};

export default ParkACar;