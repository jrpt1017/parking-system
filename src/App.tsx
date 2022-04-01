import React from 'react';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import './App.css';


type ParkingSlotSize = 'SP' | 'MP' | 'LP';
interface IParkingSlot {
  entryPoint: number,
  slot: number,
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
    const { entryPoint, slot, plateNumber, parkingId, size } = props;
    return (
      <Box className='Parking-Slot-Box'>
        <p>EP: {entryPoint}</p>
        <p>SLOT: {slot}</p>
        <p>Car parked: {plateNumber}</p>
        <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
        {isDone ? (
          <p>Size: {size}</p>
        ) : (
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
    </div>
  );
}

export default App;
