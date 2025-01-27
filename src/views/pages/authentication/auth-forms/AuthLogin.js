/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Radio,
  RadioGroup
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import axiosInstance from './../../../../axiosInstance';
import { useAuth } from 'Components/context/auth-and-perm/AuthProvider';

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [role, setRole] = useState('manager');
  const { login } = useAuth();
  const theme = useTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required'),
    role: Yup.string().required('Role is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'manager'
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const endpoint = values.role === 'manager' ? '/manager/login' : '/member/login';
        const { data } = await axiosInstance.post(endpoint, { email: values.email, password: values.password });
        console.log('🚀 ~ onSubmit: ~ data:', data);
        Cookies.set('token', data?.result?.data?.token, { expires: 7 });
        login(data?.result?.data);
        toast.success('Login Successful');
        setIsLoading(false);
        // navigate('/dashboard');
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <FormControl component="fieldset" error={Boolean(formik.touched.role && formik.errors.role)}>
          <RadioGroup aria-label="role" name="role" value={formik.values.role} onChange={formik.handleChange} row>
            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
            <FormControlLabel value="member" control={<Radio />} label="Member" />
          </RadioGroup>
          {formik.touched.role && formik.errors.role && (
            <FormHelperText error id="standard-weight-helper-text-role">
              {formik.errors.role}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={Boolean(formik.touched.email && formik.errors.email)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-login"
            type="email"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            label="Email Address / Username"
            inputProps={{}}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>
        {/* Password Input */}
        <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>
        {/* Remember Me Checkbox and Forgot Password Link */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Remember me"
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack>
        {/* Submit Button */}
        <Box sx={{ mt: 2 }}>
          <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="primary">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
