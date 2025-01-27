/* eslint-disable react/prop-types */
import { FormControl, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import BaseInputMask from './BaseInputMask';
import { FormikError } from './FormikError';
import Label from './Label';

export default function BaseInputField({ label, placeholder, name, type = 'text', password, maxNum, required, ...props }) {
  const { setFieldValue, values, touched, errors, handleBlur, handleChange } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleChangeNumber = (e) => {
    let value = e.target.value;
    if (type === 'custom') {
      const numericRegex = /^[0-9]+$/;
      value = value.replace(/^0+/, '');
      if (!numericRegex.test(value) || value === '') {
        setFieldValue(name, '');
        return;
      }
    }
    if (maxNum && value.length > maxNum) {
      value = value.slice(0, maxNum);
    }
    setFieldValue(name, value);
  };
  const theme = useTheme();

  return (
    <div>
      {password ? (
        <FormControl fullWidth className="m-0">
          <label> {label} </label>

          <OutlinedInput
            label="Password"
            id="auth-login-v2-password"
            type={showPassword ? 'text' : 'password'}
            className="mt-3"
            name={name}
            helperText={touched[name] && errors[name]}
            error={!!errors[name]}
            onChange={(e) => {
              if (props.value === undefined) {
                setFieldValue(name, e.target.value);
              }
            }}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton edge="end" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
            //       <IconifyIcon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
            //     </IconButton>
            //   </InputAdornment>
            // }
          />
          {/* <FormikError name={name} /> */}
        </FormControl>
      ) : (
        <>
          <Label>
            {label}
            <span className="mx-1 text-red-500">{required == '1' ? '*' : ''}</span>
          </Label>
          {/* </label> */}

          {type == 'IBAN' ? (
            <BaseInputMask />
          ) : (
            <input
              type="text"
              value={values[name]}
              onChange={type === 'custom' ? handleChangeNumber : handleChange}
              inputMode={type == 'custom' ? 'numeric' : 'text'}
              placeholder={placeholder}
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                handleBlur(e);
                setIsFocused(false); // Reset focus on blur
              }}
              style={{
                borderColor: !!touched[name] && !!errors[name] ? 'red' : isFocused ? theme.palette.primary.main : ' ',
                // borderRadius: "9px",
                height: '59px'
              }}
              className={`  
        ${isFocused ? 'border' : ' border border-[#cccccc]'}
        
        
        "my-3 code p-[18px] w-full focus-visible:!outline-none 
        dark:!text-white rounded-[8px] dark:!border dark:!border-solid
        border-[#cccccc] dark:border-[#555d64] " ${!!touched[name] && !!errors[name] && 'border-red-500 '}  `}
            />
          )}
          <div>{<FormikError name={name} />}</div>
        </>
      )}
    </div>
  );
}
