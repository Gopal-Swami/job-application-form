import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const NavigationBar = () => {
  return (
    <>
      <AppBar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography variant="h5" component="h5" sx={{ p: 2 }}>
          Job Form
        </Typography>
      </AppBar>
    </>
  );
};

export default NavigationBar;
