import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

export default function Navbar({ onNav }) {
  return (
    <AppBar position="static" sx={{ mb: 4, width: '100%', boxShadow: 3, zIndex: 10 }}>
      <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Button color="inherit" onClick={() => onNav('sgpa')}>SGPA</Button>
          <Button color="inherit" onClick={() => onNav('cgpa')}>CGPA</Button>
          <Button color="inherit" onClick={() => onNav('attendance')}>Attendance Calculator</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 