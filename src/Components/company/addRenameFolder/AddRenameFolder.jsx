import { CircularProgress, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import axiosInstance from './../../../axiosInstance';
import { toast } from 'react-toastify';

export default function AddRenameFolder({ closeModal, handleCreateFolder, title, folderName, setNewFolderName, folderLoading }) {
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
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <TextField fullWidth label="Folder Name" value={folderName} onChange={(e) => setNewFolderName(e.target.value)} sx={{ mt: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={closeModal} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button disabled={folderLoading} variant="contained" color="primary" onClick={handleCreateFolder}>
          {!folderLoading ? (
            'Save'
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
}
