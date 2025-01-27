import React from 'react';
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  CreateNewFolderOutlined as CreateNewFolderOutlinedIcon,
  UploadFileOutlined as UploadFileOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  FolderZipOutlined as FolderZipOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  ListOutlined as ListOutlinedIcon
} from '@mui/icons-material';
import { IconSearch } from '@tabler/icons-react';

const HeaderCard = ({
  searchQuery,
  handleSearchChange,
  handleMenuOpen,
  selectedIDS,
  handleSelectionMenuOpen,
  anchorEl,
  handleMenuClose,
  handleAddFolder,
  handleOpenModal,
  anchorElSelection,
  handleSelectionMenuClose,
  handleTrashedSelection,
  handleZippingSelection,
  isGridDisplay,
  toggleDisplayMode
}) => {
  const theme = useTheme();

  return (
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
  );
};

export default HeaderCard;
