import React, { useState } from 'react';
import { Modal, Box, TextField, Select, MenuItem, Button, CircularProgress, InputLabel } from '@mui/material';
import moment from 'moment';

const GroupModal = ({ open, handleClose, formData, handleChange, handleSave, isEditing, isLoading }) => {
  const [error, setError] = useState('');

  const validateForm = () => {
    if (formData.title.trim() === '') {
      setError('Title is required.');
      return false;
    }

    if (formData.role.trim() === '') {
      setError('Role is required.');
      return false;
    }

    if (formData.access.trim() === '') {
      setError('Access is required.');
      return false;
    }

    if (formData.access === 'custom' && !formData.start_at) {
      setError('Start-date required ');
      return false;
    }
    if (formData.access === 'custom' && !formData.end_at) {
      setError('End-date required ');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  const today = moment().format('YYYY-MM-DD');

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4
        }}
      >
        <h6>{isEditing ? 'Edit Group' : 'Add Group'}</h6>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={error && error.includes('Title')}
          helperText={error && error.includes('Title') && error}
        />
        <InputLabel htmlFor="role-select">Role</InputLabel>
        <Select
          id="role-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          sx={{ marginY: 1 }}
          inputProps={{ 'aria-label': 'Role' }}
          error={error && error.includes('Role')}
        >
          <MenuItem value="custom">Custom</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
        <InputLabel htmlFor="access-select">Access</InputLabel>
        <Select
          id="access-select"
          name="access"
          value={formData.access}
          onChange={handleChange}
          fullWidth
          sx={{ marginY: 1 }}
          inputProps={{ 'aria-label': 'Access' }}
          error={error && error.includes('Access')}
        >
          <MenuItem value="custom">Custom</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="disactive">Disactive</MenuItem>
        </Select>
        {formData.access === 'custom' && (
          <>
            <TextField
              label="Start-date"
              name="start_at"
              value={formData.start_at}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              error={error && error.includes('Start-date')}
              helperText={error && error.includes('Start-date') && error}
            />
            <TextField
              label="End-date"
              name="end_at"
              value={formData.end_at}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: formData.start_at || today }}
              error={error && error.includes('End-date')}
              helperText={error && error.includes('End-date') && error}
            />
          </>
        )}
        <Box display="flex" justifyContent="end" gap={2} mt={2}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GroupModal;
