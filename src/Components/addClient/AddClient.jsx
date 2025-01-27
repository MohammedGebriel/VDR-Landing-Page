import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import axiosInstance from './../../axiosInstance';

const AddClient = ({ showModal, handleClose, edittedUser, setRefetch }) => {
  const [loading, setLoading] = useState(false);

  const addUserSchema = Yup.object().shape({
    name: Yup.string().required('User Name is required'),
    phone: Yup.string().required('Phone is required'),
    dialing_code: Yup.string().required('Dialing Code is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().required('Password is required')
  });

  const editUserSchema = Yup.object().shape({
    name: Yup.string().required('User Name is required'),
    phone: Yup.string().required('Phone is required'),
    dialing_code: Yup.string().required('Dialing Code is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required')
  });

  const initialValues = useMemo(
    () => ({
      name: edittedUser ? edittedUser.name : '',
      phone: edittedUser ? edittedUser.phone : '',
      dialing_code: edittedUser ? edittedUser.dialing_code : '',
      email: edittedUser ? edittedUser.email : '',
      gender: edittedUser ? edittedUser.gender : '',
      password: ''
    }),
    [edittedUser]
  );

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      if (edittedUser) {
        await axiosInstance.put(`/manager/members/${edittedUser.id}`, {
          name: values.name,
          phone: values.phone,
          dialing_code: values.dialing_code,
          email: values.email,
          gender: values.gender,
          is_active: edittedUser?.is_active
        });
        toast.success('User updated successfully');
      } else {
        await axiosInstance.post('/manager/members', {
          name: values.name,
          phone: values.phone,
          dialing_code: values.dialing_code,
          email: values.email,
          password: values.password,
          is_active: 1,
          gender: values.gender
        });
        toast.success('User added successfully');
      }
      setRefetch((prev) => !prev);
      handleClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        const { data } = error.response.data;
        if (data.dialing_code) {
          toast.error(data.dialing_code[0]);
        } else {
          toast.error('Failed to add/update user');
        }
      } else {
        toast.error(error?.response?.data?.message || 'Failed to add/update user');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={showModal} onClose={handleClose}>
      <Box
        sx={{
          borderRadius: '12px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography marginBottom={2} variant="h2">
          {edittedUser ? 'Edit Member' : 'Add Member'}
        </Typography>
        <Formik initialValues={initialValues} validationSchema={edittedUser ? editUserSchema : addUserSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="User Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  fullWidth
                  id="dialing_code"
                  name="dialing_code"
                  label="Dialing Code"
                  type="text"
                  value={formik.values.dialing_code}
                  onChange={formik.handleChange}
                  error={formik.touched.dialing_code && Boolean(formik.errors.dialing_code)}
                  helperText={formik.touched.dialing_code && formik.errors.dialing_code}
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && <Typography color="error">{formik.errors.gender}</Typography>}
                </FormControl>
                {!edittedUser && (
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                )}
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

AddClient.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edittedUser: PropTypes.object,
  refetch: PropTypes.bool.isRequired,
  setRefetch: PropTypes.func.isRequired,
  setRowData: PropTypes.func.isRequired,
  rowData: PropTypes.array.isRequired
};

export default AddClient;
