import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const TestComponent = () => {
  return (
    <Box sx={{ 
      p: 4, 
      textAlign: 'center',
      backgroundColor: 'red',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
        🚨 TEST COMPONENT - IF YOU SEE THIS, THE SERVER IS WORKING! 🚨
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        This is a test to verify the development server is running
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        sx={{ 
          backgroundColor: 'white', 
          color: 'red',
          fontSize: '1.5rem',
          px: 4,
          py: 2
        }}
      >
        TEST BUTTON
      </Button>
    </Box>
  );
};

export default TestComponent;
