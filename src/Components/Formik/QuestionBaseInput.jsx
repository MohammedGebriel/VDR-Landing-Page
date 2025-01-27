/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import UploadDoc from "../uploadImage/UploadDoc";

export default function QuestionBaseInput({
  label,
  placeholder,
  name,
  className,
  type = "password" ||
    "select" ||
    "radio" ||
    "number" ||
    "text" ||
    "textarea" ||
    "email" ||
    "multiple_select",
  idQuestion,
  options,
  required = true,
  ...props
}) {
  const { setFieldValue, values, errors } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [valueRadio, setValueRadio] = useState("");
  const [files, setFiles] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);

  //radio
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
    setFieldValue(`answers${name}`, event.target.value);
  };
  //checkbox
  const handleChangeCheckbox = (event) => {
    const selectedValues = [...checkboxValue];
    setCheckboxValue(selectedValues);
    // Check if the checkbox is checked or unchecked
    if (event.target.checked) {
      // If checked, add the value to the array
      selectedValues.push(event.target.value);
    } else {
      // If unchecked, remove the value from the array
      const index = selectedValues.indexOf(event.target.value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    }

    setFieldValue(`answers${name}`, selectedValues);
  };
  //file

  const multiSelectOptions = options?.map((item) => ({
    value: item?.content,
    label: item?.content,
  }));
  const selectOptions = options?.map((item) => ({
    value: item?.content,
    label: item?.content,
  }));
  const handleChangeNumber = (e) => {
    let value = e.target.value;
  
    // Convert to string for length check if necessary
    const valueAsString = value.toString();
  
    // Check for numeric value and length restriction
    if (!/^[0-9]+$/.test(valueAsString) || valueAsString.length > 10) {
      // Invalid input: Reset field or set to last valid value
      setFieldValue(`answers${name}`, "");
    } else {
      // Valid input: Update the field value
      setFieldValue(`answers${name}`, value);
    }
  };
  

  return (
    <div>
      {type == "password" ? (
        <FormControl fullWidth>
          <label> {label} </label>

          <OutlinedInput
            label="Password"
            id="auth-login-v2-password"
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IconifyIcon
                    icon={
                      showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"
                    }
                  />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : type == "select" ? (
        <Select
          options={selectOptions}
          onChange={(option) => setFieldValue(`answers${name}`, option?.value)}
          // className="border rounded-md"
          placeholder={t("Choose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              // borderColor:"#555d64",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              // background:"white" ,
              color: "black",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              // ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
            },
          })}
          classNames={{
            control: () => "dark:bg-dark-primary dark:border-[#555d64]",
            option: () => "dark:bg-dark-primary dark:text-white  ",
          }}
        />
      ) : type == "radio" || type == "Yes_No" ? (
        <>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueRadio}
              onChange={handleChangeRadio}
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option?.content}
                  control={<Radio />}
                  label={option?.content}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </>
      ) : type == "number" ? (
        <div>
          <label> {label} </label>
          <TextField
            autoFocus
            {...props}
            // type="number"
            fullWidth
            value={values[name]}
            sx={{ mb: 4 }}
            name={name}
            inputProps={{
              maxLength: 10, // This is not effective for type="number", consider using 'max' for value limit
              onChange: handleChangeNumber,
            }}
            className={className}
            // onChange={(e) => handleChangeNumber(e)}
          />
        </div>
      ) : type == "text" ? (
        <div>
          <TextField
            autoFocus
            // error
            {...props}
            fullWidth
            value={values[name]}
            sx={{ mb: 4 }}
            placeholder={placeholder}
            name={name}
            className={className}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "textarea" ? (
        <div>
          <label> {label} </label>
          <TextareaAutosize
            minRows={4}
            placeholder={placeholder}
            // defaultValue="tetarea"
            className="w-full p-2 border rounded-md dark:bg-transparent dark:border-[#555d64]"
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "email" ? (
        <div>
          <label> {label} </label>
          <TextField
            autoFocus
            {...props}
            fullWidth
            type="email"
            value={values[name]}
            sx={{ mb: 4 }}
            placeholder={placeholder}
            name={name}
            className={className}
            onChange={(e) => {
              // if (values[name] !== undefined) {
              // setFieldValueState(e.target.value)
              setFieldValue(`answers${name}`, e.target.value);
              // }
            }}
          />
        </div>
      ) : type == "file" ? (
        <UploadDoc
          dynamic={true}
          name={name}
          accept={["pdf", "jpg", "png", "jpeg"]}
        />
      ) : type == "checkbox" ? (
        <FormGroup row onChange={handleChangeCheckbox}>
          {options?.map((option) => (
            <FormControlLabel
              key={option?.id}
              label={option?.content}
              control={<Checkbox value={option?.content} />}
            />
          ))}
        </FormGroup>
      ) : type == "multiple_select" ? (
        <Select
          options={multiSelectOptions}
          onChange={(options) =>
            setFieldValue(
              `answers${name}`,
              options.map((item) => item?.value)
            )
          }
          isMulti
          // className="border rounded-md"
          placeholder={t("Choose Country")}
          noOptionsMessage={() => t("Not Found Data")}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              padding: "10px 0",
              borderRadius: " 8px",
              borderWidth: "1px",
              // borderColor:"#555d64",
              background: "white",
              margin: "0",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              // background:"white" ,
              color: "black",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              // ...theme.colors,
              primary25: `#eee`,
              primary: "#eee",
            },
          })}
          classNames={{
            control: () => "dark:bg-dark-primary dark:border-[#555d64]",
            option: () => "dark:bg-dark-primary dark:text-white  ",
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
