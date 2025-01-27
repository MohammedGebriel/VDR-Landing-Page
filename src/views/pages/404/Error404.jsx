import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Typography fontSize={'120px'} variant="h1" textAlign={'center'}>
          404
        </Typography>
        <Typography variant="h1" textAlign={'center'}>
          Page Not Found
        </Typography>
        <Typography variant="body1" textAlign={'center'}>
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/');
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}
