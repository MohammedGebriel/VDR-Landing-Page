import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  IconButton,
  Checkbox,
  ListItemText,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getTopLevelFiles, showFolder, addPermission, deletePermission, showGroup } from 'helper/api/company/Files';
import { toast } from 'react-toastify';
import NotFound from 'Components/NotFound';
import folderImg from '../../assets/images/filesImgs/folder.png';
import fileImg from '../../assets/images/filesImgs/file.png';
import pdfImg from '../../assets/images/filesImgs/pdf.png';
import docxImg from '../../assets/images/filesImgs/docx.png';
import musicImg from '../../assets/images/filesImgs/music.png';
import imageImg from '../../assets/images/filesImgs/image.png';
import jsonImg from '../../assets/images/filesImgs/json.png';
import txtImg from '../../assets/images/filesImgs/txt.png';

const fileTypeToImg = {
  folder: folderImg,
  file: fileImg,
  documents: pdfImg,
  docx: docxImg,
  audios: musicImg,
  images: imageImg,
  json: jsonImg,
  txt: txtImg
};

const PermissionsModal = ({ open, handleClose, groupID }) => {
  const [currentFolders, setCurrentFolders] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [permissionsMap, setPermissionsMap] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const getTopLevelFolders = async () => {
    setLoading(true);
    try {
      const response = await getTopLevelFiles();
      setCurrentFolders(response?.result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error fetching folders');
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupPermissions = async () => {
    setLoading(true);
    try {
      const response = await showGroup(groupID);
      const permissions = response?.result?.data.permissions.reduce((acc, perm) => {
        acc[perm.file.id] = perm.permission;
        return acc;
      }, {});
      setPermissionsMap(permissions);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error fetching permissions');
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folder) => {
    if (folder.type === 'folder') {
      setSelectedFolder(folder?.id);
      setLoading(true);
      try {
        const response = await showFolder(folder?.id);
        setHistory([...history, { folders: currentFolders, selectedFolder }]);
        setCurrentFolders(response?.result?.data?.inners);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error fetching folder contents');
      } finally {
        setLoading(false);
      }
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlePermissionChange = async (fileId, permission, isChecked) => {
    setLoading(true);
    try {
      if (isChecked) {
        await addPermission({ group_id: groupID, file_id: fileId, permission });
        setPermissionsMap((prev) => ({ ...prev, [fileId]: [...(prev[fileId] || []), permission] }));
      } else {
        await deletePermission({ group_id: groupID, file_id: fileId, permission });
        setPermissionsMap((prev) => ({
          ...prev,
          [fileId]: prev[fileId].filter((perm) => perm !== permission)
        }));
      }
      toast.success('Permission updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating permission');
    } finally {
      setLoading(false);
    }
  };

  const filteredFolders = currentFolders?.filter((folder) => folder.title.toLowerCase().includes(searchQuery));

  useEffect(() => {
    if (open) {
      getTopLevelFolders();
      fetchGroupPermissions();
    }
  }, [open]);

  const onClose = () => {
    handleClose();
    setSelectedFolder(null);
    setCurrentFolders([]);
    setHistory([]);
  };

  const handleClick = (event, fileId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileId(fileId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedFileId(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', gap: 1 }} variant="h3">
        Manage Permissions
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
          <Button sx={{ width: '20%' }} onClick={handleBackClick} disabled={history.length === 0}>
            <ArrowBackIcon />
          </Button>
          <TextField sx={{ width: '80%' }} placeholder="Search folders" value={searchQuery} onChange={handleSearch} margin="dense" />
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredFolders?.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="end" height="100%">
                <NotFound />
              </Box>
            ) : (
              <Grid container justifyContent="start" alignItems="start">
                {filteredFolders?.map((folder) => (
                  <Grid item xs={3} key={folder.id} padding={1}>
                    <Box
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        border: selectedFolder === folder.id ? '1px solid #000' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'start',
                          justifyContent: 'center'
                        }}
                      >
                        <Box onClick={() => handleFolderClick(folder)}>
                          <img
                            src={folder.type === 'folder' ? folderImg : fileTypeToImg[folder?.file_type] || fileImg}
                            alt={folder.title}
                            style={{ width: '60px' }}
                          />
                        </Box>
                        <Box>
                          <IconButton onClick={(e) => handleClick(e, folder.id)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                            {['upload', 'download_original', 'download_encryption', 'view'].map((perm) => (
                              <MenuItem key={perm}>
                                <Checkbox
                                  checked={permissionsMap[selectedFileId]?.includes(perm)}
                                  onChange={(e) => handlePermissionChange(selectedFileId, perm, e.target.checked)}
                                  disabled={loading}
                                />
                                <ListItemText primary={perm} />
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      </Box>
                      <Typography mt={1} noWrap maxWidth={80}>
                        {folder.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionsModal;
