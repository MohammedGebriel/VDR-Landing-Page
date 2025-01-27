import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { shareFile } from 'helper/api/company/Files';
import { toast } from 'react-toastify';

const ShareModal = ({ open, handleClose, fileId, refetch, setRefetch }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleShare = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      await shareFile(fileId, [email]);
      toast.success('Sucess Shared');
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
          Share File
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleShare} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModal;
