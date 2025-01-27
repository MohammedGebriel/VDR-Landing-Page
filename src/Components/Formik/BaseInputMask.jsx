/* eslint-disable react/display-name */
import { useTheme } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { forwardRef, useState } from "react";

const BaseInputMask = forwardRef(() => {
  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext();
  const formatIban = (value) => {
    const hasSpaces = /\s/.test(value);
    if (hasSpaces) {
      return value;
    }
    return value.replace(/(.{4})/g, "$1 ").trim();
  };
  const [inputValue, setInputValue] = useState(formatIban(values?.iban));
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleInputChange = (event) => {
    const oldValue = inputValue.replace(/ /g, "");
    const newValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");

    if (oldValue.length > newValue.length) {
      // User is deleting
      const isDeletingSpace = inputValue[inputValue.length - 1] === " ";
      if (isDeletingSpace) {
        setInputValue(formatIban(newValue));
        setFieldValue("iban", formatIban(newValue));
        return;
      }
    }

    if (newValue.length <= 24) {
      setInputValue(formatIban(newValue));
      setFieldValue("iban", formatIban(newValue));
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
        name="iban"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          handleBlur(e);
          setIsFocused(false); // Reset focus on blur
        }}
        style={{
          borderColor:
            !!touched.iban && !!errors.iban
              ? "red"
              : isFocused
              ? theme.palette.primary.main
              : "",
          // borderRadius: "9px",
          height: "59px",
        }}
        className={`
        ${isFocused ? "border" :" border border-[#cccccc]"}
        
        
        "my-3 code p-[18px] w-full focus-visible:!outline-none 
         dark:!text-white rounded-[8px] dark:!border dark:!border-solid
         border-[#cccccc] dark:border-[#555d64] " ${
            !!touched.iban && !!errors.iban && "border-red-500 "
          }  `}
      />
      {/* <div>{<FormikError name="iban" />}</div> */}
    </div>
  );
});

export default BaseInputMask;
