/* eslint-disable react/prop-types */
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useFormikContext } from "formik";
import { useState } from "react";
import { FormikError } from "./FormikError";

const SelectComp = ({
  name,
  data,
  label,
  className,
  multi,
  idValue,
  placeholder,
}) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
    const selectedValues = event.target.value;
    const selectedItemsWithId = data.filter((item) =>
      selectedValues.includes(item.name_ar)
    );
    const selectedIds = selectedItemsWithId.map((item) => item.id);
    setFieldValue(name, selectedIds);
  };

  return (
    <>
      {multi ? (
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
          <Select
            multiple
            label={label}
            helperText={errors[name]}
            error={!!errors[name]}
            value={personName}
            placeholder={
              <div className="select-placeholder-text">{placeholder}</div>
            }
            // MenuProps={MenuProps}
            id="demo-multiple-chip"
            onChange={handleChange}
            labelId="demo-multiple-chip-label"
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} sx={{ m: 0.75 }} />
                ))}
              </Box>
            )}
          >
            {data?.map((name) => (
              <MenuItem key={name.id} value={name.name_ar}>
                {name.name_ar}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <FormControl className={className}>
          <InputLabel id="controlled-select-label">{label}</InputLabel>
          <Select
            value={values[name] || "171"}
            helperText={errors[name]}
            error={!!errors[name]}
            label={label}
            id="controlled-select"
            onChange={(event) => {
              if (values[name] !== undefined) {
                setFieldValue(name, event.target.value);
              }
            }}
            labelId="controlled-select-label"
            // placeholder={"placeholder"}
          >
            {data?.map((item) => (
              <MenuItem
                key={item.id}
                value={idValue ? item?.id : item?.name_ar}
              >
                {item?.name_ar || item?.service_name || item?.name}
              </MenuItem>
            ))}
          </Select>
          <div>
            <FormikError name={name} />
          </div>
        </FormControl>
      )}
    </>
  );
};

export default SelectComp;
