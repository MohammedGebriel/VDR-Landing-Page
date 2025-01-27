import { CircularProgress, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function DeleteModal({ title, handleModalClose, folderLoading, handleTrashedFolder, content }) {
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
      <Typography variant="h4" component="h2">
        {content}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" color="dark" onClick={handleModalClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button disabled={folderLoading} variant="contained" color="error" onClick={handleTrashedFolder}>
          {!folderLoading ? (
            'Save'
          ) : (
            <>
              <CircularProgress color="error" size={28} />
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
}
