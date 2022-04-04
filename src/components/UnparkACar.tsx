import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent, Typography } from '@mui/material';

import { IAppState } from '../redux/store';
import { unParkACar } from '../redux/action';
import { IOutput, PSlotSize } from '../types';


const UnparkACar = () => {
  const dispatch = useDispatch();

  const parking = useSelector((state: IAppState) => { return state.parkingState.parking });
  const [totalPrice, setTotalPrice] = React.useState(0)

  // Output
  const [output, setOutput] = React.useState<IOutput>({
    plateNumber: '',
    hours: 0,
    parkingSlotSize: PSlotSize.SP,
  });

  const parkedCars = parking.filter((item) => {
    return item.isOccupied === true;
  });

  const setOutputValues = (e: SelectChangeEvent<IOutput>) => {
    const findCar = parking.find((item) => {
      return item.plateNumber === e.target.value;
    });
    const newOutput = {
      ...output,
      parkingSlotSize: findCar?.size,
      plateNumber: findCar?.plateNumber,
    } as IOutput;
    setOutput(newOutput);
  };

  const handleSetHours = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputtedHours = Math.ceil(Number(e.target.value))
    const newOutput = {
      ...output,
      hours: inputtedHours,
    } as IOutput;
    setOutput(newOutput);
  }

  const getExceedingPricePerHour = () => {
    switch (output.parkingSlotSize) {
      case 'SP':
        return 20;
      case 'MP':
        return 60;
      case 'LP':
        return 100;
      default: return 20;
    }
  };

  const handleCheckOutCar = () => {
    const flatRate = 40;
    const pricePerHr = getExceedingPricePerHour();
    let price = flatRate;
    if (output.hours! > 24) {
      const oneDayChunk = output.hours! % 24 === 0 ? 1 : output.hours! % 24;
      price = price + (oneDayChunk * 5000);
      const exceedingHoursFromDayChunk = output.hours! % (oneDayChunk * 24);
      price = price + (pricePerHr * exceedingHoursFromDayChunk);
    } else {
      if (output.hours! > 3) {
        const exceededHours = output.hours! - 3;
        price = price + (pricePerHr * exceededHours);
      }
    }
    setTotalPrice(price);
  };

  const clearValues = () => {
    const parkingData = parkedCars.find((item) => {
      return item.plateNumber === output.plateNumber;
    });

    if (parkingData && parkingData.parkingId) {
      dispatch(unParkACar(parkingData!.parkingId))
    }

    setOutput({
      plateNumber: '',
      hours: 0,
      parkingSlotSize: PSlotSize.SP,
    });
    setTotalPrice(0);
  };

  return (
    <Box className='Car-Input-Output'>
      <Typography className="InputOutputLabels" variant="h4">Unpark a Car</Typography>
      <Box display="flex" gap="10px" sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Choose Car Plate #</InputLabel>
          <Select
            value={output.plateNumber}
            onChange={(e) => { return setOutputValues(e as unknown as SelectChangeEvent<IOutput>) }}
            label="car"
            disabled={parkedCars.length === 0}
          >
            {
              parkedCars.map((item) => {
                return (
                  <MenuItem value={item.plateNumber}>{item.plateNumber}</MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" gap="15px">
        {output.plateNumber !== '' ? (
          <>
            <Typography textAlign="start">Car plate #: {output.plateNumber}</Typography>
            <TextField
              placeholder="Enter # of hours parked"
              onChange={(e) => { return handleSetHours(e) }}
              value={output.hours}
            />
          </>
        ) : ''}
        <Button
          variant="contained"
          onClick={() => { return handleCheckOutCar(); }}
          style={{ marginTop: '50px' }}
          disabled={parkedCars.length === 0 || output.hours! < 1}
        >
          Unpark Car
        </Button>
        <Typography textAlign="start">Total Price: Php. {totalPrice}</Typography>
        <Button
          variant="contained"
          style={{ width: '50%', margin: 'auto' }}
          onClick={() => { return clearValues(); }}
        >
          Clear values
        </Button>
      </Box>
    </Box>
  )
};

export default UnparkACar;