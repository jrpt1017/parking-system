import React from 'react';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent, Typography } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import './App.css';

type ParkingSlotSize = 'SP' | 'MP' | 'LP';
type CarSize = 'S' | 'M' | 'L';
interface IParkingSlot {
  entryPoint: number,
  slot: number,
}

interface IInput {
  plateNumber: string,
  carSize: CarSize | undefined,
  entryPoint: number,
}

interface IOutput {
  plateNumber: string,
  carSize: CarSize | undefined,
  hours: number,
}

interface IParking extends IParkingSlot {
  parkingId: number,
  plateNumber: string,
  size: ParkingSlotSize,
  isOccupied?: boolean,
}

const App = () => {
  // Row = entry point
  // Column = slot
  const [entryPoint, setEntryPoint] = React.useState(0);
  const [slot, setSlot] = React.useState(0);
  const [parking, setParking] = React.useState<Array<IParking>>([]);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [nearestSlot, setNearestSlot] = React.useState<undefined | IParking>(undefined);

  // Input states
  const [input, setInput] = React.useState<IInput>({
    plateNumber: '',
    carSize: undefined,
    entryPoint: 0,
  });

  // Output
  const [output, setOutput] = React.useState<IOutput>({
    plateNumber: '',
    carSize: undefined,
    hours: 0,
  });

  const handleSetEntryPoint = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntryPoint(Number(e.target.value));
  };

  const handleSetSlot = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSlot(Number(e.target.value));
  };

  const handleChangeParkingSize = (id: number, e: SelectChangeEvent<ParkingSlotSize>) => {
    const newParking = [...parking];
    newParking.find((item) => {
      return item.parkingId === id;
    })!.size = e.target.value as ParkingSlotSize;
    setParking(newParking)
  };

  const ParkingSlot: React.FC<IParking> = (props: IParking) => {
    const { entryPoint, slot, plateNumber, parkingId, size, isOccupied } = props;
    const boxClass = `Parking-Slot-Box ${isOccupied ? 'Occupied' : ''}`
    return (
      <Box className={boxClass}>
        <div style={{ marginBottom: '35px' }}>
          <Typography style={{ position: 'absolute', left: 0 }}>EP: {entryPoint}</Typography>
          <Typography style={{ position: 'absolute', right: 0 }}>Slot: {slot}</Typography>
        </div>
        <Typography>Car parked: {plateNumber}</Typography>
        {isDone ? (
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

  const ParkingArea = () => {
    // TODO: add validation - entryPoint should be greater than or equal 3
    let list: any = [];
    parking.forEach((parkingArea: IParking) => {
      list.push(
        <React.Fragment key={parkingArea.parkingId}>
          <ParkingSlot
            entryPoint={parkingArea.entryPoint}
            slot={parkingArea.slot}
            size={parkingArea.size}
            plateNumber={parkingArea.plateNumber}
            parkingId={parkingArea.parkingId}
            isOccupied={parkingArea.isOccupied}
          />
        </React.Fragment>
      )
    });
    return (
      <>
        <Box display="flex" flexWrap="wrap" justifyContent="center" style={{ gap: '80px', marginTop: '100px', marginBottom: '100px' }}>
          {list}
        </Box>
      </>
    );
  }

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
    // 1. Filter parking slots depending on car size
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
    setParking([...newParking])
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

  const CheckInCar = () => {
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
          {nearestSlot ? (
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
            </>
          ) : ''}

          <Button variant="contained" onClick={() => { return handleParkACar(); }}>Park Car</Button>
        </Box>
      </Box>
    )
  };

  const setOutputValues = (e: SelectChangeEvent<IOutput>) => {
    const findCar = parking.find((item) => {
      return item.plateNumber === e.target.value;
    });
    const newOutput = {
      ...output,
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

  React.useEffect(() => {
    console.log(output);
  }, [output])

  const CheckOutCar = () => {
    const parkedCars = parking.filter((item) => {
      return item.isOccupied === true;
    });
    return (
      <Box className='Car-Input-Output'>
        <Typography className="InputOutputLabels" variant="h4">Checkout a Car</Typography>
        <Box display="flex" gap="10px" sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Choose Car</InputLabel>
            <Select
              value={input.carSize}
              onChange={(e) => { return setOutputValues(e as unknown as SelectChangeEvent<IOutput>) }}
              label="car"
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
          <Button variant="contained" onClick={() => { return handleParkACar(); }}>Checkout Car</Button>
        </Box>
      </Box>
    )
  };

  React.useEffect(() => {
    // Init parking
    let parkingObj: IParking;
    const parkingArr: IParking[] = [];
    let id = 0;
    for (let i = 1; i <= entryPoint; i++) {
      for (let j = 1; j <= slot; j++) {
        parkingObj = {
          parkingId: id,
          isOccupied: false,
          entryPoint: i,
          slot: j,
          size: 'SP', // set SP as default
          plateNumber: '',
        };
        parkingArr.push(parkingObj);
        id += 1;
      }
    }
    setParking(parkingArr);
  }, [entryPoint, slot]);

  React.useEffect(() => {
    ParkingArea();
  }, [parking]);

  return (
    <div className="App">
      <h1>Parking System</h1>
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
          onClick={() => { return setIsClicked(true); }}
        >
          Submit
        </Button>
      </Box>
      {isClicked ? ParkingArea() : ''}
      <Button
        variant="contained"
        className=''
        onClick={() => { return setIsDone(!isDone); }}
      >
        {isDone ? 'Edit Parking Map' : 'Create Parking Map'}
      </Button>
      <Box display="flex" justifyContent="space-evenly" style={{ marginTop: '100px' }}>
        {isDone ? (
          <>
            <CheckInCar />
            <CheckOutCar />
          </>
        ) : ''}
      </Box>
    </div>
  );
}

export default App;
