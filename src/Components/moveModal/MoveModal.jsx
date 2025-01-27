import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import folderImg from '../../assets/images/filesImgs/folder.png';
import { getTopLevelFiles, moveFile, showFolder } from 'helper/api/company/Files';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import NotFound from 'Components/NotFound';

const MoveModal = ({ open, handleClose, moveFolder }) => {
  const [currentFolders, setCurrentFolders] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [moving, setMoving] = useState(false);
  const theme = useTheme();
  const getTopLevelFolders = async () => {
    setLoading(true);
    try {
      const response = await getTopLevelFiles();
      setCurrentFolders(response?.result?.data?.filter((folder) => folder.id !== moveFolder?.id && folder.type === 'folder'));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Err');
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folder) => {
    setSelectedFolder(folder?.id);
    setLoading(true);
    try {
      const response = await showFolder(folder?.id);
      setHistory([...history, { folders: currentFolders, selectedFolder }]);
      setCurrentFolders(response?.result?.data?.inners);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Err');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setCurrentFolders(previousState.folders);
      setSelectedFolder(previousState.selectedFolder);
      setHistory(history);
    }
  };

  const handleMove = async () => {
    setMoving(true);
    try {
      await moveFile([moveFolder?.id], selectedFolder);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Err');
    } finally {
      setMoving(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredFolders = currentFolders?.filter((folder) => folder.title.toLowerCase().includes(searchQuery) && folder.type === 'folder');

  useEffect(() => {
    if (open) {
      getTopLevelFolders();
    }
  }, [open]);
  const onClose = () => {
    handleClose();
    setSelectedFolder(null);
    setCurrentFolders([]), setHistory([]);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', gap: 1 }} variant="h3">
        <span
          style={{
            color: theme?.palette?.primary[200]
          }}
        >
          {moveFolder?.title}
        </span>{' '}
        Move To
      </DialogTitle>
      <DialogContent style={{ minHeight: '400px', position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}
        >
          <Button
            sx={{
              width: '20%'
            }}
            onClick={handleBackClick}
            disabled={history.length === 0}
          >
            <ArrowBackIcon />
          </Button>
          <TextField
            sx={{
              width: '80%'
            }}
            placeholder="Search folders"
            value={searchQuery}
            onChange={handleSearch}
            margin="dense"
          />
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredFolders?.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="end" height="100%">
                <NotFound  />
              </Box>
            ) : (
              <Grid container justifyContent="space-between">
                {filteredFolders?.map((folder) => (
                  <Grid item xs={2} key={folder.id}>
                    <Box
                      onClick={() => handleFolderClick(folder)}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        border: selectedFolder === folder.id ? '1px solid #000' : 'none'
                      }}
                    >
                      <img src={folderImg} alt={folder.title} style={{ width: '60px', height: '60px' }} />
                      <Typography>{folder.title}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleMove} disabled={moving} color="primary" variant="contained">
          {moving ? <CircularProgress size={24} /> : 'Move'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveModal;
