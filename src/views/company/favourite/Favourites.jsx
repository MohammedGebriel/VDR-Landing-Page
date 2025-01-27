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
import { GridViewOutlined as GridViewOutlinedIcon, ListOutlined as ListOutlinedIcon, StarHalf as StarHalfIcon } from '@mui/icons-material';
import { getFavourites, removeFavouriteFolder } from 'helper/api/company/Files';

const Favourites = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorElSelection, setAnchorElSelection] = useState(null);
  const [selectedIDS, setSelectedIDS] = useState([]);
  const [isGridDisplay, setIsGridDisplay] = useState(true);

  const getFiles = async () => {
    try {
      setLoading(true);
      const { result } = await getFavourites();
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

  const handleCheckboxChange = (fileID) => {
    setSelectedIDS((prevSelectedIDS) =>
      prevSelectedIDS.includes(fileID) ? prevSelectedIDS.filter((id) => id !== fileID) : [...prevSelectedIDS, fileID]
    );
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

  const handleRmoveSelection = async () => {
    try {
      const response = await removeFavouriteFolder(selectedIDS);

      toast.success(response?.message);
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
    <MainCard title="Favourites">
      <Typography variant="h2">Manage Favourites</Typography>
      <Typography variant="h6">View and manage your Favourites files and folders</Typography>
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
          <MenuItem onClick={handleRmoveSelection}>
            <ListItemIcon>
              <StarHalfIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Favourite" />
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
                    removeFavourite={true}
                    download={true}
                    sort={true}
                    share={true}
                    onClickRemoveFavourite={() => {
                      handleRemoveFile(file?.id);
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
                  share={true}
                  download={true}
                  sort={true}
                  removeFavourite={true}
                  onClickRemoveFavourite={() => {
                    handleRemoveFile(file?.id);
                  }}
                />
              ))}
            </MuiBox>
          )}
        </>
      )}
    </MainCard>
  );
};

export default Favourites;
