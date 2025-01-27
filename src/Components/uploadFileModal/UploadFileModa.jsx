import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, CircularProgress } from '@mui/material';
import FileInput from 'Components/fileInput/FileInput';
import { uploadFile } from 'helper/api/company/Files';
import { toast } from 'react-toastify';

const UploadFileModal = ({ onClose, folderID, refetch, setRefetch }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await uploadFile(uploadedFiles[0], folderID);
      setRefetch(!refetch);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsLoading(false);
  };
  console.log(uploadedFiles);
  return (
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
      <Box
        sx={{
          alignItems: 'center',
          borderRadius: '12px',
          border: '2px dashed lightGrey',
          p: 2,
          mb: 2
        }}
      >
        <FileInput onFilesChange={handleFilesChange} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

UploadFileModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFilesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default UploadFileModal;
