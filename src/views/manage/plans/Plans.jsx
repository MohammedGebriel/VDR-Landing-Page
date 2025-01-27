import React from 'react';
import { Button, Grid, InputAdornment, OutlinedInput, Typography, Card, CardContent, CardActions } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';

const Plans = () => {
  const theme = useTheme();

  // Generate an array of 12 sample cards
  const cards = Array.from({ length: 12 }, (_, index) => (
    <Grid item xs={12} sm={6} md={2} key={index}>
      <Card
        sx={{
          border: '1px lightGray solid',
          borderRadius: '12px'
        }}
      >
        <CardContent>
          <Typography variant="h5">Favourited Item {index + 1}</Typography>
          <Typography variant="body2" color="textSecondary">
            This is a sample Favourited item card.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              color: 'red'
            }}
            size="small"
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <MainCard title="Favourites">
      <Typography variant="h2">Manage Favourites</Typography>
      <Typography variant="h6">View and manage your files and folders from your Favourites</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <OutlinedInput
          sx={{ width: '50%', pr: 1, pl: 2, my: 2 }}
          id="input-search-profile"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'weight'
          }}
        />
        <Button>Add</Button>
      </Box>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </MainCard>
  );
};

export default Plans;
