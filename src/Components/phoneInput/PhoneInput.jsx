import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box, Grid, Avatar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const countries = [
  {
    name: 'Saudi Arabia',
    flags: {
      png: 'https://flagcdn.com/w320/sa.png',
      svg: 'https://flagcdn.com/sa.svg'
    },
    countryCallingCode: '+966'
  },
  {
    name: 'Kenya',
    flags: {
      png: 'https://flagcdn.com/w320/ke.png',
      svg: 'https://flagcdn.com/ke.svg'
    },
    countryCallingCode: '+254'
  },
  {
    name: 'San Marino',
    flags: {
      png: 'https://flagcdn.com/w320/sm.png',
      svg: 'https://flagcdn.com/sm.svg'
    },
    countryCallingCode: '+378'
  }
];

const PhoneInput = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  // Update selectedCountry and phoneValue when value changes
  useEffect(() => {
    if (value) {
      setSelectedCountry(value.countryCode);
      setPhoneValue(value.phoneNumber);
    } else {
      setSelectedCountry('');
      setPhoneValue('');
    }
  }, [value]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    onChange({ countryCode, phoneNumber: phoneValue }); // Pass updated object
  };

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setPhoneValue(phoneNumber);
    onChange({ countryCode: selectedCountry, phoneNumber }); // Pass updated object
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            fullWidth
            renderValue={(selected) => {
              const selectedCountryObj = countries.find((country) => country.countryCallingCode === selected);
              if (selectedCountryObj) {
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar alt={selectedCountryObj.name} src={selectedCountryObj.flags.png} />
                    <Typography variant="body1">{`${selectedCountryObj.name} (${selected})`}</Typography>
                  </Box>
                );
              } else {
                return <Typography variant="body1">{`${selected}`}</Typography>;
              }
            }}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.countryCallingCode}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar alt={country.name} src={country.flags.png} />
                  <Typography variant="body1">{`${country.name} (${country.countryCallingCode})`}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <TextField fullWidth id="phone-number" label="Phone Number" type="tel" value={phoneValue} onChange={handlePhoneChange} />
      </Grid>
    </Grid>
  );
};

PhoneInput.propTypes = {
  value: PropTypes.shape({
    countryCode: PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired
};

export default PhoneInput;
