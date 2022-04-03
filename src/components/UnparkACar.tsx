import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent, Typography } from '@mui/material';

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
      // Charge 5000;
      price += 5000;
      const exceedingHours = output.hours! % 24 === 0 ? 1 : output.hours! % 24;
      price = price + (pricePerHr * exceedingHours);
    } else {
      if (output.hours! > 3) {
        const exceededHours = output.hours! - 3;
        price = price + (pricePerHr * exceededHours);
      }
    }
    setTotalPrice(price);

    const parkingData = parkedCars.find((item) => {
      return item.plateNumber === output.plateNumber;
    });
    console.log(parkingData);
    if (parkingData && parkingData.parkingId) {
      dispatch(unParkACar(parkingData!.parkingId))
    }
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
          >
            {
              parkedCars.map((item) => {
                return (
                  // <React.Fragment key={item.plateNumber}>
                  <MenuItem value={item.plateNumber}>{item.plateNumber}</MenuItem>
                  // </React.Fragment>
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
        <Button variant="contained" onClick={() => { return handleCheckOutCar(); }}>Checkout Car</Button>
        <Typography textAlign="start">Total Price: Php. {totalPrice}</Typography>
      </Box>
    </Box>
  )
};

export default UnparkACar;