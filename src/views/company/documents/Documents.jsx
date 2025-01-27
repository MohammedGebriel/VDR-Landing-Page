import React, { useEffect, useState, useCallback } from 'react';
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
  ToggleButtonGroup,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';
import MainFileCard from 'Components/mainFileCard/MainFileCard';
import { toast } from 'react-toastify';
import AddRenameFolder from 'Components/company/addRenameFolder/AddRenameFolder';
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';
import {
  CreateNewFolderOutlined as CreateNewFolderOutlinedIcon,
  UploadFileOutlined as UploadFileOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  FolderZipOutlined as FolderZipOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  ListOutlined as ListOutlinedIcon,
} from '@mui/icons-material';
import {
  getTopLevelFiles,
  createFolder,
  renameFolder,
  trashFolder,
  zipFolders,
  favouriteFolder,
  removeFavouriteFolder,
  sortFile,
} from 'helper/api/company/Files';
import UploadFileModa from 'Components/uploadFileModal/UploadFileModa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Documents = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSelection, setAnchorElSelection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderLoading, setFolderLoading] = useState(false);
  const [selectedIDS, setSelectedIDS] = useState([]);
  const [isGridDisplay, setIsGridDisplay] = useState(true);
  const [uploadOpenModal, setUploadOpenModal] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Documents', link: '/documents' },
  ];

  const getFiles = async () => {
    try {
      setLoading(true);
      const { result } = await getTopLevelFiles();
      setData(result?.data);
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

  const filteredData = data ? data.filter((file) => file?.title?.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelectionMenuOpen = (event) => {
    setAnchorElSelection(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSelectionMenuClose = () => {
    setAnchorElSelection(null);
  };
  const handleAddFolder = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleRenameFolderModal = (file) => {
    setModalOpen(true);
    setSelectedItem(file?.id);
    setNewFolderName(file?.title);
    handleMenuClose();
  };

  const handleTrashedFolderModal = (file) => {
    setTrashModalOpen(true);
    setSelectedItem(file?.id);
    handleMenuClose();
  };

  const handleCheckboxChange = (fileID) => {
    setSelectedIDS((prevSelectedIDS) =>
      prevSelectedIDS.includes(fileID) ? prevSelectedIDS.filter((id) => id !== fileID) : [...prevSelectedIDS, fileID]
    );
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTrashModalOpen(false);
    setNewFolderName('');
    setSelectedItem(null);
  };

  const handleCreateFolder = async () => {
    try {
      setFolderLoading(true);
      await createFolder(newFolderName);
      setRefetch(!refetch);
      toast.success('Folder created successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleRenameFolder = async () => {
    try {
      setFolderLoading(true);
      await renameFolder(selectedItem, newFolderName);
      setRefetch(!refetch);
      toast.success('Folder renamed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to rename folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleTrashedFolder = async () => {
    try {
      setFolderLoading(true);
      await trashFolder([selectedItem]);
      setRefetch(!refetch);
      toast.success('Folder trashed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trash folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleTrashedSelection = async () => {
    try {
      setFolderLoading(true);
      await trashFolder(selectedIDS);
      setRefetch(!refetch);
      setSelectedIDS([]);
      toast.success('Folders trashed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trash folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleOpenModal = () => {
    setUploadOpenModal(true);
  };

  const handleCloseModal = () => {
    setUploadOpenModal(false);
    handleMenuClose();
  };

  const handleZippingSelection = async () => {
    try {
      const data = await zipFolders(selectedIDS);
      toast.success(data?.message);
      setSelectedIDS([]);
      setRefetch(!refetch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to zip folders');
    }
  };

  const toggleDisplayMode = (event, newDisplayMode) => {
    if (newDisplayMode !== null) {
      setIsGridDisplay(newDisplayMode === 'grid');
    }
  };

  const handleFavFolder = async (id) => {
    try {
      setFolderLoading(true);
      await favouriteFolder([id]);
      toast.success('Folder Favourited successfully');
      setRefetch(!refetch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fav folder');
    } finally {
      setFolderLoading(false);
    }
  };

  const handleRemoveFile = async (removeItem) => {
    try {
      const response = await removeFavouriteFolder([removeItem]);
      toast.success(response?.message);
      setRefetch(!refetch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to remove file');
    }
  };

  const moveCard = useCallback(
    async (dragIndex, hoverIndex) => {
      const updatedData = [...data];
      const [draggedItem] = updatedData.splice(dragIndex, 1);
      updatedData.splice(hoverIndex, 0, draggedItem);
      setData(updatedData);

      try {
        await sortFile(draggedItem.id, hoverIndex);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to sort file');
      }
    },
    [data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <MainCard breadcrumbItems={breadcrumbItems} title="Documents">
        <Typography variant="h2">Manage Documents</Typography>
        <Typography variant="h6">View and manage your Documents and folders</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', my: 2, gap: 2 }}>
          <OutlinedInput
            sx={{ width: '25%', pr: 1, pl: 2 }}
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
              'aria-label': 'weight',
            }}
          />
          <Button variant="contained" color="primary" onClick={handleMenuOpen}>
            + New
          </Button>
          {selectedIDS?.length > 0 && (
            <Button variant="outlined" color="primary" onClick={handleSelectionMenuOpen}>
              Manage Selection
            </Button>
          )}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleAddFolder}>
              <CreateNewFolderOutlinedIcon sx={{ mr: 1 }} />
              Add Folder
            </MenuItem>
            <MenuItem onClick={handleOpenModal}>
              <UploadFileOutlinedIcon sx={{ mr: 1 }} />
              Upload File
            </MenuItem>
          </Menu>
          <Menu anchorEl={anchorElSelection} open={Boolean(anchorElSelection)} onClose={handleSelectionMenuClose}>
            <MenuItem>
              <ListItemIcon>
                <StarBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Favourite Selection" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={handleTrashedSelection} primary="Trash Selection" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FolderZipOutlinedIcon />
              </ListItemIcon>
              <ListItemText onClick={handleZippingSelection} primary="Zipping Selection" />
            </MenuItem>
          </Menu>
          <Box sx={{ marginLeft: 'auto' }}>
            {' '}
            {/* This pushes ToggleButtonGroup to the end */}
            {/* <ToggleButtonGroup value={isGridDisplay ? 'grid' : 'list'} exclusive onChange={toggleDisplayMode} aria-label="display mode">
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewOutlinedIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup> */}
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {isGridDisplay ? (
              <Grid container spacing={2} justifyContent="around" alignItems="center">
                {filteredData.map((file, index) => (
                  <Grid item key={file.id} xs={12} sm={6} md={6} lg={2.4} xl={2.5}>
                    <MainFileCard
                      share={true}
                      download={true}
                      sort={true}
                      selectedIDS={selectedIDS}
                      setSelectedIDS={setSelectedIDS}
                      handleCheckboxChange={handleCheckboxChange}
                      file={file}
                      onClickFavourite={() => {
                        handleFavFolder(file?.id);
                      }}
                      onClickRename={() => {
                        handleRenameFolderModal(file);
                      }}
                      onClickTrash={() => {
                        handleTrashedFolderModal(file);
                      }}
                      onClickRemoveFavourite={() => {
                        handleRemoveFile(file?.id);
                      }}
                      favourite={!file?.is_fav}
                      removeFavourite={file?.is_fav}
                      refetch={refetch}
                      setRefetch={setRefetch}
                      index={index}
                      moveCard={moveCard}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <MuiBox>
                {filteredData.map((file, index) => (
                  <MainFileCard
                    key={file.id}
                    selectedIDS={selectedIDS}
                    setSelectedIDS={setSelectedIDS}
                    handleCheckboxChange={handleCheckboxChange}
                    file={file}
                    onClickFavourite={() => {
                      handleFavFolder(file?.id);
                    }}
                    onClickRename={() => {
                      handleRenameFolderModal(file);
                    }}
                    onClickTrash={() => {
                      handleTrashedFolderModal(file);
                    }}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    share={true}
                    download={true}
                    sort={true}
                    index={index}
                    moveCard={moveCard}
                  />
                ))}
              </MuiBox>
            )}
          </>
        )}
        <Modal open={modalOpen} onClose={handleModalClose}>
          <AddRenameFolder
            closeModal={handleModalClose}
            handleCreateFolder={selectedItem ? handleRenameFolder : handleCreateFolder}
            title={selectedItem ? 'Rename Folder' : 'Add Folder'}
            folderName={newFolderName}
            setNewFolderName={setNewFolderName}
            folderLoading={folderLoading}
          />
        </Modal>
        <Modal open={trashModalOpen} onClose={handleModalClose}>
          <DeleteModal
            content={'Are you sure want to trash this item ?'}
            title="Delete Folder"
            handleModalClose={handleModalClose}
            refetch={refetch}
            setRefetch={setRefetch}
            folderLoading={folderLoading}
            handleTrashedFolder={handleTrashedFolder}
          />
        </Modal>
        <Modal open={uploadOpenModal} onClose={handleCloseModal}>
          <UploadFileModa refetch={refetch} setRefetch={setRefetch} onClose={handleCloseModal} folderID={null} />
        </Modal>
      </MainCard>
    </DndProvider>
  );
};

export default Documents;
