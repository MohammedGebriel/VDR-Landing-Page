import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { sortFile } from 'helper/api/company/Files';
import { toast } from 'react-toastify';

const SortModal = ({ refetch, setRefetch, open, handleClose, fileId }) => {
  const [sortIndex, setSortIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortError, setSortError] = useState('');

  const handleSortIndexChange = (event) => {
    const value = event.target.value;
    setSortIndex(value);
    if (sortError) {
      setSortError('');
    }
  };

  const validateSortIndex = (index) => {
    return /^\d+$/.test(index) && Number(index) >= 0;
  };

  const handleSort = async () => {
    if (!validateSortIndex(sortIndex)) {
      setSortError('Invalid sort index. Please enter a non-negative number.');
      return;
    }

    setLoading(true);
    try {
      await sortFile(fileId, sortIndex);
      toast.success('Successfully Sorted');
      setRefetch(!refetch);
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Typography mb={2} variant="h6" component="h2">
          Sort File
        </Typography>
        <TextField
          label="Sort Index"
          variant="outlined"
          fullWidth
          value={sortIndex}
          onChange={handleSortIndexChange}
          error={Boolean(sortError)}
          helperText={sortError}
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSort} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SortModal;
