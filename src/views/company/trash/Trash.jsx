import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  Modal,
  Box as MuiBox,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';
import MainFileCard from 'Components/mainFileCard/MainFileCard';
import { toast } from 'react-toastify';
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';
import {
  RestoreFromTrash as RestoreFromTrashIcon,
  DeleteForever as DeleteForeverIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  ListOutlined as ListOutlinedIcon
} from '@mui/icons-material';
import { getTrash, restoreFromTrash, deleteFromTrash } from 'helper/api/company/Files';

const Trash = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorElSelection, setAnchorElSelection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [folderLoading, setFolderLoading] = useState(false);
  const [selectedIDS, setSelectedIDS] = useState([]);
  const [isGridDisplay, setIsGridDisplay] = useState(true);

  const getFiles = async () => {
    try {
      setLoading(true);
      const { result } = await getTrash();
      setData(result?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, [refetch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((file) => file?.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectionMenuOpen = (event) => {
    setAnchorElSelection(event.currentTarget);
  };

  const handleSelectionMenuClose = () => {
    setAnchorElSelection(null);
  };

  const handleTrashedFolderModal = (file) => {
    setTrashModalOpen(true);
    setSelectedItem(file?.id);
    handleSelectionMenuClose();
  };

  const handleCheckboxChange = (fileID) => {
    setSelectedIDS((prevSelectedIDS) =>
      prevSelectedIDS.includes(fileID) ? prevSelectedIDS.filter((id) => id !== fileID) : [...prevSelectedIDS, fileID]
    );
  };

  const handleModalClose = () => {
    setTrashModalOpen(false);
    setSelectedItem(null);
    handleSelectionMenuClose();
  };

  const handleTrashedFile = async () => {
    try {
      setFolderLoading(true);
      await deleteFromTrash([selectedItem]);
      setRefetch(!refetch);
      toast.success('File Deleted Successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete file');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleTrashedSelection = async () => {
    try {
      setFolderLoading(true);
      await deleteFromTrash(selectedIDS);
      setRefetch(!refetch);
      setSelectedIDS([]);
      toast.success('Files Deleted Successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete files');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleRestoreFile = async (restoreItem) => {
    try {
      await restoreFromTrash([restoreItem]);
      toast.success('File Restored Successfully');
      setRefetch(!refetch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to restore file');
    }
  };

  const handleRestoreSelection = async () => {
    try {
      await restoreFromTrash(selectedIDS);
      toast.success('Files Restored Successfully');
      setSelectedIDS([]);
      setRefetch(!refetch);
      handleSelectionMenuClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to restore files');
    }
  };

  const toggleDisplayMode = (event, newDisplayMode) => {
    if (newDisplayMode !== null) {
      setIsGridDisplay(newDisplayMode === 'grid');
    }
  };

  return (
    <MainCard title="Trash">
      <Typography variant="h2">Manage Trash</Typography>
      <Typography variant="h6">View and manage your Trash files and folders</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', my: 2, gap: 2, flexWrap: 'wrap' }}>
        <OutlinedInput
          sx={{ flex: '1 1 250px', maxWidth: '25%', pr: 1, pl: 2 }}
          id="input-search-profile"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'search'
          }}
        />

        {selectedIDS.length > 0 && (
          <Button variant="outlined" color="primary" onClick={handleSelectionMenuOpen}>
            Manage Selection
          </Button>
        )}

        <Menu anchorEl={anchorElSelection} open={Boolean(anchorElSelection)} onClose={handleSelectionMenuClose}>
          <MenuItem onClick={handleRestoreSelection}>
            <ListItemIcon>
              <RestoreFromTrashIcon />
            </ListItemIcon>
            <ListItemText primary="Restore" />
          </MenuItem>
          <MenuItem onClick={handleTrashedFolderModal}>
            <ListItemIcon>
              <DeleteForeverIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Forever" />
          </MenuItem>
        </Menu>
        <Box sx={{ marginLeft: 'auto' }}>
          <ToggleButtonGroup value={isGridDisplay ? 'grid' : 'list'} exclusive onChange={toggleDisplayMode} aria-label="display mode">
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isGridDisplay ? (
            <Grid container spacing={2} justifyContent="start" alignItems="center">
              {filteredData.map((file) => (
                <Grid item key={file.id} xs={12} sm={6} md={4} lg={3} xl={2.5}>
                  <MainFileCard
                    refetch={refetch}
                    setRefetch={setRefetch}
                    selectedIDS={selectedIDS}
                    setSelectedIDS={setSelectedIDS}
                    handleCheckboxChange={handleCheckboxChange}
                    file={file}
                    favourite={false}
                    rename={false}
                    trash={false}
                    restoreTrash={true}
                    deleteTrash={true}
                    move={false}
                    onClickRestoreTrash={() => {
                      handleRestoreFile(file?.id);
                    }}
                    onClickDeleteTrash={() => {
                      handleTrashedFolderModal(file);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <MuiBox>
              {filteredData.map((file) => (
                <MainFileCard
                  refetch={refetch}
                  setRefetch={setRefetch}
                  key={file?.id}
                  selectedIDS={selectedIDS}
                  setSelectedIDS={setSelectedIDS}
                  handleCheckboxChange={handleCheckboxChange}
                  file={file}
                  favourite={false}
                  rename={false}
                  trash={false}
                  restoreTrash={true}
                  deleteTrash={true}
                  move={false}
                  onClickRestoreTrash={() => {
                    handleRestoreFile(file?.id);
                  }}
                  onClickDeleteTrash={() => {
                    handleTrashedFolderModal(file);
                  }}
                />
              ))}
            </MuiBox>
          )}
        </>
      )}
      <Modal open={trashModalOpen} onClose={handleModalClose}>
        <DeleteModal
          content={'are you sure want to delete these items forever '}
          title="Delete Forever"
          handleModalClose={handleModalClose}
          refetch={refetch}
          setRefetch={setRefetch}
          folderLoading={folderLoading}
          handleTrashedFolder={selectedItem ? handleTrashedFile : handleTrashedSelection}
        />
      </Modal>
    </MainCard>
  );
};

export default Trash;
