import React, { useEffect, useState, useMemo } from 'react';
import DataTable from 'ui-component/dataTable/DataTable';
import MainCard from 'ui-component/cards/MainCard';
import { toast } from 'react-toastify';
import AddClient from 'Components/addClient/AddClient';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import { useTheme } from '@mui/material/styles';
import { useSavedState } from 'hooks';
import axiosInstance from './../../../axiosInstance';
import PropTypes from 'prop-types';
import { Button, IconButton, Modal } from '@mui/material'; // Import IconButton
import DeleteModal from 'Components/company/deleteConfirmationModal/DeleteModal';

const Members = () => {
  const theme = useTheme();
  const [edittedUser, setEdittedUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [memberData, setMemberData, clearMemberData] = useSavedState([], 'memberData');

  const getMembers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('/manager/members');
      setMemberData(data?.result?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch member data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, [refetch]);

  const handleActivation = async (member) => {
    try {
      const { data } = await axiosInstance.put(`/manager/members/${member.id}`, {
        name: member.name,
        phone: member.phone,
        dialing_code: member.dialing_code,
        email: member.email,
        gender: member.gender,
        is_active: member?.is_active === 1 ? 0 : 1
      });
      setRefetch(!refetch);
      toast.success('Status Updated');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleEditUser = (user) => {
    setEdittedUser(user);
    setOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedMember) return;
    try {
      await axiosInstance.delete(`/manager/members/${selectedMember.id}`);
      setRefetch(!refetch);
      toast.success('Member deleted successfully');
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete member');
    }
  };

  const handleClose = () => {
    setEdittedUser(null);
    setOpen(false);
  };

  const handleOpenDeleteModal = (member) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedMember(null);
    setDeleteModalOpen(false);
  };

  const columnDefs = useMemo(
    () => [
      { headerName: 'ID', field: 'id', flex: 0.5 },
      { headerName: 'Phone', field: 'phone', flex: 1 },
      { headerName: 'Dialing Code', field: 'dialing_code', flex: 0.5 },
      { headerName: 'Email', field: 'email', flex: 1 },
      { headerName: 'Gender', field: 'gender', flex: 1 },
      {
        headerName: 'Active',
        field: 'is_active',
        width: 140,
        cellRenderer: (params) => (
          <Button onClick={() => handleActivation(params?.data)} variant={params.data.is_active ? 'contained' : 'outlined'}>
            {params.data.is_active ? 'Deactivate' : 'Activate'}
          </Button>
        )
      },
      {
        headerName: 'Edit',
        width: 100,
        cellRenderer: (params) => (
          <EditIcon
            sx={{
              mt: '8px',
              cursor: 'pointer'
            }}
            htmlColor={theme?.palette?.secondary['800']}
            onClick={() => handleEditUser(params.data)}
          />
        )
      },
      {
        headerName: 'Delete', // Add delete column
        width: 100,
        cellRenderer: (params) => (
          <IconButton
            sx={{
              mt: '8px',
              cursor: 'pointer'
            }}
            onClick={() => handleOpenDeleteModal(params.data)}
          >
            <DeleteIcon htmlColor={theme?.palette?.error.main} />
          </IconButton>
        )
      }
    ],
    [theme, memberData]
  );

  const filteredData = useMemo(
    () => memberData.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())),
    [memberData, searchValue]
  );

  return (
    <MainCard title="Members">
      <DataTable
        buttonText="+ Add Member"
        filteredData={filteredData}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fileName="Members"
        columnDefs={columnDefs}
        handleOpen={() => setOpen(true)}
        loading={loading}
        modalRender={
          <AddClient
            edittedUser={edittedUser}
            setEdittedUser={setEdittedUser}
            memberData={memberData}
            setMemberData={setMemberData}
            showModal={open}
            handleClose={handleClose}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        }
        handleClose={handleClose}
      />
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DeleteModal
          content={'Are you sure want to trash this Member ?'}
          title="Delete Member"
          handleModalClose={handleCloseDeleteModal}
          refetch={refetch}
          setRefetch={setRefetch}
          handleTrashedFolder={handleDeleteUser}
        />
      </Modal>
    </MainCard>
  );
};

Members.propTypes = {
  theme: PropTypes.object
};

export default Members;
