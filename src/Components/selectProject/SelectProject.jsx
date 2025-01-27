import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Project 1',
  'Project 2',
  'Project 3',
  'Project 4',
  'Project 5',
  'Project 6',
  'Project 7',
  'Project 8',
  'Project 9',
  'Project 10'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular
  };
}

export default function SelectProject() {
  const theme = useTheme();
  const [personName, setPersonName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProject = localStorage.getItem('selectedProject');
    if (selectedProject) {
      setPersonName(selectedProject.split(','));
    }
  }, []);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    localStorage.setItem('selectedProject', typeof value === 'string' ? value.split(',') : value);
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    navigate('/documents');
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">Project</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
