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
import AddRenameFolder from 'Components/company/addRenameFolder/AddRenameFolder';
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';
import {
  CreateNewFolderOutlined as CreateNewFolderOutlinedIcon,
  UploadFileOutlined as UploadFileOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  FolderZipOutlined as FolderZipOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  ListOutlined as ListOutlinedIcon
} from '@mui/icons-material';
import {
  createFolder,
  renameFolder,
  trashFolder,
  zipFolders,
  showFolder,
  favouriteFolder,
  removeFavouriteFolder
} from 'helper/api/company/Files';
import { useParams } from 'react-router';
import UploadFileModa from 'Components/uploadFileModal/UploadFileModa';
import BreadCrumbs from 'Components/breadCrumbs/BreadCrumbs';
import NotFound from 'Components/NotFound';

const FolderShow = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [openModal, setOpenModal] = useState(false);

  const getFiles = async () => {
    try {
      const { result } = await showFolder(id);
      setData(result?.data && result?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };
  const breadcrumbItems = [
    { label: 'Documents', link: '/documents' },
    data?.parent && {
      label: data?.parent?.title,
      link: `/folder/${data?.parent?.id}`
    },
    { label: data?.title, link: `/folder/${data?.id}` }
  ].filter(Boolean); // This filters out any falsy values, such as undefined or null

  useEffect(() => {
    getFiles();
  }, [refetch, id]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    handleMenuClose();
  };
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
      await createFolder(newFolderName, id);
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
  const handleFavFolder = async (id) => {
    try {
      setFolderLoading(true);
      await favouriteFolder([id]);
      setRefetch(!refetch);
      toast.success('Folder Favourited successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fav folder');
    } finally {
      setFolderLoading(false);
    }
  };
  const handleTrashedSelection = async () => {
    try {
      setFolderLoading(true);
      await trashFolder(selectedIDS);
      setRefetch(!refetch);
      handleSelectionMenuClose();
      setSelectedIDS([]);
      toast.success('Folders trashed successfully');
      handleModalClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trash folder');
    } finally {
      setFolderLoading(false);
    }
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
  const handleRemoveFile = async (removeItem) => {
    try {
      const response = await removeFavouriteFolder([removeItem]);
      toast.success(response?.message);
      setRefetch(!refetch);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to remove file');
    }
  };
  const filteredData =
    data?.inners?.length > 0 ? data?.inners?.filter((file) => file?.title?.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <MainCard title="Documents">
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
            'aria-label': 'weight'
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
      <Box sx={{ p: 2 }}>
        <BreadCrumbs items={breadcrumbItems} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isGridDisplay ? (
            <Grid container spacing={2} justifyContent="start" alignItems="center">
              {!loading && filteredData?.length > 0 ? (
                filteredData.map((file) => (
                  <Grid item key={file.id} xs={12} sm={6} md={6} lg={3} xl={2.5}>
                    <MainFileCard
                      refetch={refetch}
                      setRefetch={setRefetch}
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
                      share={true}
                      download={true}
                      sort={true}
                    />
                  </Grid>
                ))
              ) : (
                <NotFound />
              )}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px' }}>
              {!loading && filteredData?.length > 0 ? (
                filteredData.map((file) => (
                  <MainFileCard
                    key={file.id}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    selectedIDS={selectedIDS}
                    setSelectedIDS={setSelectedIDS}
                    handleCheckboxChange={handleCheckboxChange}
                    file={file}
                    onClickFavourite={() => {
                      console.log(file?.id);
                    }}
                    onClickRename={() => {
                      handleRenameFolderModal(file);
                    }}
                    onClickTrash={() => {
                      handleTrashedFolderModal(file);
                    }}
                    share={true}
                    download={true}
                    sort={true}
                  />
                ))
              ) : (
                <NotFound />
              )}
            </Box>
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <UploadFileModa refetch={refetch} setRefetch={setRefetch} open={openModal} onClose={handleCloseModal} folderID={id} />
      </Modal>
    </MainCard>
  );
};

export default FolderShow;
