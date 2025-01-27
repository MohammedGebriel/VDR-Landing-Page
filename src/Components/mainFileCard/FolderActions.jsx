/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListIcon from '@mui/icons-material/List';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ShareModal from './../shareModal/ShareModal';
import SortModal from 'Components/sortModal/SortModal';
import MoveModal from 'Components/moveModal/MoveModal';

import { downloadFile, unZipFolders } from 'helper/api/company/Files';
import { toast } from 'react-toastify';

const FolderActions = ({
  favourite = true,
  onClickFavourite,
  isDisableFavourite = false,
  removeFavourite,
  onClickRemoveFavourite,
  isDisableRemoveFavourite,
  rename = true,
  onClickRename,
  isDisableRename = false,
  trash = true,
  onClickTrash,
  isDisableTrash = false,
  deleteTrash = false,
  onClickDeleteTrash,
  isDisableDeleteTrash = false,
  restoreTrash = false,
  onClickRestoreTrash,
  isDisableRestoreTrash = false,
  share,
  isDisbleShare,
  download,
  isDisableDownload,
  sort,
  isDisableSort,
  isDisableUnZip,
  unZip = true,

  isDisableMove,
  move = true,

  refetch,
  setRefetch,
  file
  // Add your folders prop here
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false); // State for Move Modal
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
    handleClose();
  };

  const handleSortClick = () => {
    setSortModalOpen(true);
    handleClose();
  };

  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };

  const handleSortModalClose = () => {
    setSortModalOpen(false);
  };

  const handleMoveClick = () => {
    setMoveModalOpen(true);
    handleClose();
  };

  const handleMoveModalClose = () => {
    setMoveModalOpen(false);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await downloadFile(file?.id);
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = file?.title;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'item not found');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleUnZipping = async () => {
    try {
      const response = await unZipFolders(file?.id);
      toast(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'item not found');
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <ListIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {favourite && (
          <MenuItem disabled={isDisableFavourite} onClick={onClickFavourite}>
            <ListItemIcon>
              <StarOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Add To Favourites'} />
          </MenuItem>
        )}
        {removeFavourite && (
          <MenuItem disabled={isDisableRemoveFavourite} onClick={onClickRemoveFavourite}>
            <ListItemIcon>
              <StarHalfIcon />
            </ListItemIcon>
            <ListItemText primary={'Remove Favourite'} />
          </MenuItem>
        )}
        {rename && (
          <MenuItem disabled={isDisableRename} onClick={onClickRename}>
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Rename'} />
          </MenuItem>
        )}
        {trash && (
          <MenuItem disabled={isDisableTrash} onClick={onClickTrash}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Move To Trash'} />
          </MenuItem>
        )}
        {restoreTrash && (
          <MenuItem disabled={isDisableRestoreTrash} onClick={onClickRestoreTrash}>
            <ListItemIcon>
              <RestoreFromTrashIcon />
            </ListItemIcon>
            <ListItemText primary={'Restore'} />
          </MenuItem>
        )}
        {deleteTrash && (
          <MenuItem disabled={isDisableDeleteTrash} onClick={onClickDeleteTrash}>
            <ListItemIcon>
              <DeleteForeverIcon color="error" />
            </ListItemIcon>
            <ListItemText primary={'Delete Forever'} />
          </MenuItem>
        )}
        {share && (
          <MenuItem disabled={isDisbleShare} onClick={handleShareClick}>
            <ListItemIcon>
              <ShareIcon />
            </ListItemIcon>
            <ListItemText primary={'Share'} />
          </MenuItem>
        )}
        {sort && (
          <MenuItem disabled={isDisableSort} onClick={handleSortClick}>
            <ListItemIcon>
              <SwapVertIcon />
            </ListItemIcon>
            <ListItemText primary={'Sort'} />
          </MenuItem>
        )}
        {download && (
          <MenuItem disabled={isDisableDownload || loading} onClick={handleDownload}>
            <ListItemIcon>{loading ? <CircularProgress size={24} /> : <DownloadIcon />}</ListItemIcon>
            <ListItemText primary={'Download'} />
          </MenuItem>
        )}

        {file?.file_type == 'zip' && unZip && (
          <MenuItem onClick={handleUnZipping}>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={'Unzip'} />
          </MenuItem>
        )}
        {move && (
          <MenuItem onClick={handleMoveClick}>
            <ListItemIcon>
              <DriveFileMoveOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Move to'} />
          </MenuItem>
        )}
      </Menu>

      <ShareModal open={shareModalOpen} handleClose={handleShareModalClose} file={file} />
      <SortModal open={sortModalOpen} handleClose={handleSortModalClose} setRefetch={setRefetch} />
      <MoveModal open={moveModalOpen} handleClose={handleMoveModalClose} moveFolder={file} />
    </div>
  );
};

export default FolderActions;
