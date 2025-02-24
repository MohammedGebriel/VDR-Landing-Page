import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import AudioIcon from 'Components/icons/AudioIcon';
const CardWrapper = styled(MainCard)(({ theme }) => ({
  color: theme.palette.secondary[800],
  overflow: 'hidden',
  position: 'relative'
  // '&:after': {
  //   content: '""',
  //   position: 'absolute',
  //   width: 210,
  //   height: 210,
  //   background: theme.palette.secondary.dark,
  //   borderRadius: '50%',
  //   top: -85,
  //   right: -95,
  //   [theme.breakpoints.down('sm')]: {
  //     top: -105,
  //     right: -140
  //   }
  // },
  // '&:before': {
  //   content: '""',
  //   position: 'absolute',
  //   width: 210,
  //   height: 210,
  //   background: theme.palette.secondary.dark,
  //   borderRadius: '50%',
  //   top: -125,
  //   right: -15,
  //   opacity: 0.5,
  //   [theme.breakpoints.down('sm')]: {
  //     top: -155,
  //     right: -70
  //   }
  // }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalOrderLineChartCard = ({ isLoading, audio }) => {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={true} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {/* <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.dark,
                        mt: 1
                      }}
                    >
                      <AudiotrackOutlinedIcon htmlColor="white" />{' '}
                    </Avatar> */}
                    <AudioIcon />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      {audio?.audio_files_size}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  Total Audio Space
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
