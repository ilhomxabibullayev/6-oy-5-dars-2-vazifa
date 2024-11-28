import React, { useState, useEffect } from 'react';
import { LinearProgress, Box, Button, TextField } from '@mui/material';

function Countdown() {
  const [number, setNumber] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isStarted && number !== '') {
      const total = parseInt(inputValue);
      setTotalTime(total);

      interval = setInterval(() => {
        setNumber((prev) => {
          const newNumber = parseInt(prev) - 1;
          if (newNumber <= 0) {
            clearInterval(interval);
            setIsStarted(false);
            setInputValue('');
            return 0;
          }
          return newNumber;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted, number, inputValue]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input) && input !== '') {
      setInputValue(input);
    }
  };

  const handleStartClick = () => {
    if (inputValue !== '') {
      setNumber(inputValue);
      setIsStarted(true);
      setInputValue('');
    }
  };

  const progress = totalTime ? ((totalTime - number) / totalTime) * 100 : 0;

  return (
    <div>
      <TextField
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleStartClick} disabled={isStarted} variant="contained" color="primary">
        Start
      </Button>

      <Box mt={2}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <div style={{ marginTop: '20px' }}>Remaining: {number}</div>
    </div>
  );
}

export default Countdown;
