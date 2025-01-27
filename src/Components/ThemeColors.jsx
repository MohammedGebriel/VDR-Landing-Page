import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';

const ThemeColors = () => {
  const theme = useTheme();
  const colors = [
    { name: 'Primary Light', color: theme.palette.primary.light || '#ffffff' },
    { name: 'Primary Main', color: theme.palette.primary.main || '#715ace' },
    { name: 'Primary Dark', color: theme.palette.primary.dark || '#fa002a' },
    { name: 'Primary 200', color: theme.palette.primary[200] || '#715ace' },
    { name: 'Primary 800', color: theme.palette.primary[800] || '#1a1333' },
    { name: 'Secondary Light', color: theme.palette.secondary.light || '#ffffff' },
    { name: 'Secondary Main', color: theme.palette.secondary.main || '#1a1333' },
    { name: 'Secondary Dark', color: theme.palette.secondary.dark || '#715ace' },
    { name: 'Secondary 200', color: theme.palette.secondary[200] || '#bfbfe0' },
    { name: 'Secondary 800', color: theme.palette.secondary[800] || '#1a1333' },
    { name: 'Success Light', color: theme.palette.success.light || '#b9f6ca' },
    { name: 'Success Main', color: theme.palette.success.main || '#00e676' },
    { name: 'Success Dark', color: theme.palette.success.dark || '#00c853' },
    { name: 'Error Light', color: theme.palette.error.light || '#ef9a9a' },
    { name: 'Error Main', color: theme.palette.error.main || '#f44336' },
    { name: 'Error Dark', color: theme.palette.error.dark || '#c62828' },
    { name: 'Orange Light', color: theme.palette.warning.light || '#fbe9e7' },
    { name: 'Orange Main', color: theme.palette.warning.main || '#ffab91' },
    { name: 'Orange Dark', color: theme.palette.warning.dark || '#d84315' },
    { name: 'Warning Light', color: theme.palette.warning.light || '#fff8e1' },
    { name: 'Warning Main', color: theme.palette.warning.main || '#ffe57f' },
    { name: 'Warning Dark', color: theme.palette.warning.dark || '#ffc107' },
    { name: 'Grey 50', color: theme.palette.grey[50] || '#f8fafc' },
    { name: 'Grey 100', color: theme.palette.grey[100] || '#eef2f6' },
    { name: 'Grey 200', color: theme.palette.grey[200] || '#e3e8ef' },
    { name: 'Grey 300', color: theme.palette.grey[300] || '#cdd5df' },
    { name: 'Grey 500', color: theme.palette.grey[500] || '#697586' },
    { name: 'Grey 600', color: theme.palette.grey[600] || '#4b5565' },
    { name: 'Grey 700', color: theme.palette.grey[700] || '#364152' },
    { name: 'Grey 900', color: theme.palette.grey[900] || '#121926' },
    { name: 'Dark Paper', color: theme.palette.background.paper || '#111936' },
    { name: 'Dark Background', color: theme.palette.background.default || '#1a223f' },
    { name: 'Dark Level 1', color: theme.palette.grey[800] || '#29314f' },
    { name: 'Dark Level 2', color: theme.palette.grey[900] || '#212946' },
    { name: 'Dark Text Title', color: theme.palette.text.primary || '#d7dcec' },
    { name: 'Dark Text Primary', color: theme.palette.text.secondary || '#bdc8f0' },
    { name: 'Dark Text Secondary', color: theme.palette.text.disabled || '#8492c4' },
    { name: 'Dark Primary Light', color: theme.palette.primary.light || '#eef2f6' },
    { name: 'Dark Primary Main', color: theme.palette.primary.main || '#2196f3' },
    { name: 'Dark Primary Dark', color: theme.palette.primary.dark || '#1e88e5' },
    { name: 'Dark Primary 200', color: theme.palette.primary[200] || '#90caf9' },
    { name: 'Dark Primary 800', color: theme.palette.primary[800] || '#1565c0' },
    { name: 'Dark Secondary Light', color: theme.palette.secondary.light || '#ffffff' },
    { name: 'Dark Secondary Main', color: theme.palette.secondary.main || '#fa002a' },
    { name: 'Dark Secondary Dark', color: theme.palette.secondary.dark || '#715ace' },
    { name: 'Dark Secondary 200', color: theme.palette.secondary[200] || '#1a1333' },
    { name: 'Dark Secondary 800', color: theme.palette.secondary[800] || '#bfbfe0' }
  ];

  return (
    <Grid container spacing={2}>
      {colors.map((colorItem, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              backgroundColor: colorItem.color,
              color: theme.palette.getContrastText(colorItem.color),
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
              mb: 2
            }}
          >
            <Typography variant="h6">{colorItem.name}</Typography>
            <Typography variant="body2">{colorItem.color}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ThemeColors;
