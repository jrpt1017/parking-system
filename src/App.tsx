import React from 'react';
import { TextField, Button, Box, createStyles, Theme, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { makeStyles } from '@mui/material/styles';

import './App.css';


type ParkingSlotSize = 'SP' | 'MP' | 'LP';
interface IParkingSlot {
  entryPoint: number,
  slot: number,
}

const App = () => {
  // Row = entry point
  // Column = slot
  const [entryPoint, setEntryPoint] = React.useState(0);
  const [slot, setSlot] = React.useState(0);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleSetEntryPoint = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntryPoint(Number(e.target.value));
  };

  const handleSetSlot = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSlot(Number(e.target.value));
  };

  const ParkingSlot: React.FC<IParkingSlot> = (props: IParkingSlot) => {
    return (
      <Box className='Parking-Slot-Box'>
        <p>EP: {props.entryPoint}</p>
        <p>SLOT: {props.slot}</p>
        <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            // value={age}
            // onChange={handleChange}
            label="Size"
          >
            <MenuItem value="SP">SP</MenuItem>
            <MenuItem value="MP">MP</MenuItem>
            <MenuItem value="LP">LP</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  };

  const ParkingArea = () => {
    // TODO: add validation - entryPoint should be greater than or equal 3
    let list = [];
    for (let i = 1; i <= entryPoint; i++) {
      for (let j = 1; j <= slot; j++) {
        list.push(<ParkingSlot entryPoint={i} slot={j} />)
      }
    }
    return (
      <>
        <Box display="flex" flexWrap="wrap" justifyContent="center" style={{ gap: '80px', marginTop: '100px' }}>
          {list}
        </Box>
      </>
    );
  }

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
        >Submit</Button>
      </Box>
      {isClicked ? ParkingArea() : ''}
    </div>
  );
}

export default App;
