import React from 'react';
import { Modal, Box, Select, MenuItem, Button, FormControl, InputLabel, CircularProgress } from '@mui/material';

const AssignMemberModal = ({ open, handleClose, groups, members, assignFormData, handleAssignChange, handleAssignSave, loading }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4
        }}
      >
        <h2>Assign Member to Group</h2>
        <FormControl fullWidth margin="normal">
          <InputLabel>Group</InputLabel>
          <Select name="group_id" value={assignFormData.group_id} onChange={handleAssignChange}>
            {groups?.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Member</InputLabel>
          <Select name="member_id" value={assignFormData.member_id} onChange={handleAssignChange}>
            {members.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="end" gap={2} mt={2}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAssignSave} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Assign'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignMemberModal;
