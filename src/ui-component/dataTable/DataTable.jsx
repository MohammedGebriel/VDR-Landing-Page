import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useTheme } from '@emotion/react';
import { Button, InputAdornment, OutlinedInput, Skeleton, TableCell, TableRow } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { Box } from '@mui/system';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
export default function DataTable({
  modalRender,
  fileName,
  buttonText,
  columnDefs,
  handleOpen,
  filteredData,
  searchValue = '',
  setSearchValue,
  loading
}) {
  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${fileName ? fileName : 'sheet'}`);
    XLSX.writeFile(wb, `${fileName ? fileName : 'sheet'}.xlsx`);
  };
  const TableRowsLoader = () => {
    return (
      <Box
        sx={{
          width: '100%'
        }}
      >
        {[...Array(6)].map((row, index) => (
          <TableRow
            sx={{
              minWidth: '100%'
            }}
            key={index}
          >
            {[...Array(8)].map((cell, cellIndex) => (
              <TableCell key={cellIndex} style={{ width: '150px' }}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Box>
    );
  };
  return (
    <Box>
      {modalRender}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <OutlinedInput
          sx={{ width: '50%', pr: 1, pl: 2, my: 2 }}
          id="input-search-profile"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'weight',
            value: searchValue,
            onChange: handleSearchChange
          }}
        />
        {buttonText && (
          <Button
            variant="contained"
            size="large"
            sx={{ height: '40px', my: 2 }} // Adjust height as needed
            onClick={handleOpen}
          >
            {buttonText ? buttonText : 'Add'}
          </Button>
        )}
      </Box>
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 2
        }}
        onClick={exportExcel}
      >
        <DescriptionOutlinedIcon />
        Export
      </Button>

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        {loading && !filteredData ? (
          <TableRowsLoader />
        ) : (
          <AgGridReact
            getRowHeight={(params) => {
              return 60;
            }}
            pagination={true}
            rowData={filteredData}
            columnDefs={columnDefs}
            defaultColDef={{
              cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'start' }
            }}
          />
        )}
      </div>
    </Box>
  );
}
DataTable.propTypes = {
  modalRender: PropTypes.node.isRequired,
  fileName: PropTypes.string,
  buttonText: PropTypes.string,
  columnDefs: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
