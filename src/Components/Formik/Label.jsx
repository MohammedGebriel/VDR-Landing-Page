import React from 'react';
import { useTheme } from '@mui/material/styles';

function Label({ children, className }) {
  const theme = useTheme();

  return (
    <label className={`${className} block file:flex my-[0.75rem] relative  font-bold`} style={{ color: theme.palette.primary?.main }}>
      {children}
    </label>
  );
}

export default Label;
