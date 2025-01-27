import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import InfinityFetch from 'utils/InfinityFetch';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const isAuth = async () => {
  //   try {
  //     const response = await InfinityFetch('https://api.infinityjerp.com/api/user/me', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     const { data } = await response.json();
  //     localStorage.setItem('user-info', JSON.stringify(data));
  //   } catch (error) {
  //     localStorage.removeItem('infinity_identity');
  //     navigate('/login');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   isAuth();
  // }, [location.pathname]);

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Skeleton width={50} height={50} animation="pulse" variant="circular" />
        <Skeleton width={50} height={50} animation="pulse" variant="circular" />
        <Skeleton width={50} height={50} animation="pulse" variant="circular" />
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired
};
