import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('infinity_identity');

  if (location.pathname.includes('login') && token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired
};
