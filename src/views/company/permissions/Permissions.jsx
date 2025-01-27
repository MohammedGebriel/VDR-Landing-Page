import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Checkbox,
  OutlinedInput,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { addGroup, getGroups, updateGroup, deleteGroup, asignMember } from 'helper/api/company/Files';
import MainCard from 'ui-component/cards/MainCard';
import GroupModal from './../../../Components/groupModal/GroupModal';
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';
import AssignMemberModal from 'Components/asignMember/AssignMemberModal';
import { IconSearch } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import axiosInstance from './../../../axiosInstance';
import NotFound from 'Components/NotFound';
import { useNavigate } from 'react-router';
import PermissionsModal from 'Components/groupModal/PermissionsModal';

export default function Permissions() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]); // Assuming you have a way to get the members
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    role: 'custom',
    access: 'custom',
    start_at: null,
    end_at: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignFormData, setAssignFormData] = useState({
    group_id: '',
    member_id: ''
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissionodal, setPermissionodal] = useState(false);
  const [groupID, setGroupID] = useState(null);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await getGroups();
        setGroups(response?.result?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'something went wrong ');
      } finally {
        setLoading(false);
      }
    }

    const fetchMembers = async () => {
      try {
        const { data } = await axiosInstance.get('/manager/members');
        setMembers(data?.result?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch member data');
      }
    };

    fetchGroups();
    fetchMembers();
  }, [refetch]);

  const handleOpen = (group = null) => {
    if (group) {
      setFormData(group);
      setIsEditing(true);
      setEditingGroupId(group.id);
    } else {
      setFormData({
        title: '',
        role: 'custom',
        access: 'custom',
        start_at: '',
        end_at: ''
      });
      setIsEditing(false);
      setEditingGroupId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    setBtnLoading(true);
    try {
      if (isEditing) {
        await updateGroup(editingGroupId, formData);
        toast.success('Group updated successfully');
      } else {
        await addGroup(formData);
        toast.success('Group added successfully');
      }
      setRefetch(!refetch);
      handleClose();
    } catch (error) {
      toast.error('Failed to save group');
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await Promise.all(selectedGroups?.map((id) => deleteGroup(id)));
      setRefetch(!refetch);
      toast.success('Group(s) deleted successfully');
      setSelectedGroups([]);
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete group(s)');
    } finally {
      setDeleting(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handlePermissionModalClose = () => {
    setPermissionodal(false);
    setGroupID(null);
  };
  const filteredGroups = groups?.filter((group) => group.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleMenuClick = (event, group) => {
    setAnchorEl({ anchor: event.currentTarget, group });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (groupId) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(groupId) ? prevSelected.filter((id) => id !== groupId) : [...prevSelected, groupId]
    );
  };

  const handleAssignOpen = () => setAssignModalOpen(true);
  const handleAssignClose = () => {
    setAssignModalOpen(false);
    setAssignFormData({
      group_id: '',
      member_id: ''
    });
  };

  const handleAssignChange = (e) => {
    const { name, value } = e.target;
    setAssignFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAssignSave = async () => {
    setBtnLoading(true);
    try {
      await asignMember(assignFormData?.group_id, assignFormData?.member_id);
      toast.success('Member assigned to group successfully');
      handleAssignClose();
    } catch (error) {
      toast.error('Failed to assign member');
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handlePermissionsClick = () => {
    setPermissionodal(true);
    handleMenuClose();
  };
  return (
    <div>
      <MainCard title="Permissions">
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
          />{' '}
          <Box>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
              Add Group
            </Button>
            <Button variant="contained" color="secondary" onClick={handleAssignOpen} sx={{ ml: 2 }}>
              Assign Member to Group
            </Button>
            {selectedGroups?.length > 0 && (
              <Button variant="outlined" color="error" onClick={handleDeleteModalOpen} sx={{ ml: 2 }}>
                Delete Selection
              </Button>
            )}
          </Box>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : !loading && groups.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: theme.palette.grey[200],
                    borderRadius: 28
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedGroups?.length === filteredGroups?.length}
                      onChange={() =>
                        setSelectedGroups(selectedGroups?.length === filteredGroups?.length ? [] : filteredGroups?.map((group) => group.id))
                      }
                    />
                  </TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Access</TableCell>
                  <TableCell>Start At</TableCell>
                  <TableCell>End At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGroups?.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>
                      <Checkbox checked={selectedGroups?.includes(group.id)} onChange={() => handleCheckboxChange(group.id)} />
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        navigate(`/group/${group?.id}`);
                      }}
                    >
                      {group.title}
                    </TableCell>
                    <TableCell>{group.role}</TableCell>
                    <TableCell>{group.access}</TableCell>
                    <TableCell>{group.start_at}</TableCell>
                    <TableCell>{group.end_at}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuClick(event, group)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl?.anchor}
                        open={Boolean(anchorEl) && anchorEl?.group?.id === group.id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            handleOpen(anchorEl?.group);
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            handleDelete(anchorEl?.group.id);
                          }}
                        >
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setGroupID(group?.id);
                            handlePermissionsClick();
                          }}
                        >
                          Manage Permissions
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="end" height="100%">
            <NotFound text="no groups found" />
          </Box>
        )}
      </MainCard>
      <GroupModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleChange={handleChange}
        handleSave={handleSave}
        isEditing={isEditing}
        isLoading={btnLoading}
      />
      <AssignMemberModal
        open={assignModalOpen}
        handleClose={handleAssignClose}
        groups={groups}
        members={members}
        assignFormData={assignFormData}
        handleAssignChange={handleAssignChange}
        handleAssignSave={handleAssignSave}
        loading={btnLoading}
      />
      <Modal open={deleteModalOpen} handleClose={handleDeleteModalClose}>
        <DeleteModal
          refetch={refetch}
          setRefetch={setRefetch}
          handleModalClose={handleDeleteModalClose}
          content="Are you sure want to trash this group(s) ?"
          title="Delete Group"
          handleTrashedFolder={handleDelete}
          folderLoading={deleting}
        />
      </Modal>
      <PermissionsModal open={permissionodal} handleClose={handlePermissionModalClose} groupID={groupID} />
    </div>
  );
}
