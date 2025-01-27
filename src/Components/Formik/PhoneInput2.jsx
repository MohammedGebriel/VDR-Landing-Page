/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CardInfo from "../CardInfo";
import Label from "../Label";
import { FormikError } from "./FormikError";

const PhoneInput2 = ({
  label,
  required,
  showIcon,
  messageInfo,
  customClass,
}) => {
  const [phone, setPhone] = useState("");
  const { setFieldValue, errors, handleBlur, values, touched, validateField } =
    useFormikContext();

  const handlePhoneChange = (value, selectedCountry, name, number) => {
    const modifiedPhone = +number
      .slice(selectedCountry?.dialCode.length + 2)
      .trim()
      .split(" ")
      .join("");
    setPhone(value);
    setFieldValue("phone", modifiedPhone);
    setFieldValue("phone_code", "+" + selectedCountry?.dialCode);
    validateField("phone");
  };

  // const phoneInput = tv({
  //   variants: {
  //     error: {
  //       true: "border-red-500  !border rounded-md",
  //     },
  //   },
  // });
  const isError = !!touched.phone && !!errors.phone;
  const generateClassName = () => {
    const baseClasses = "your-base-classes";
    const errorClasses = "phone-input-error";
    return `${baseClasses} ${isError ? errorClasses : ""} ${customClass}`;
  };
  return (
    <div className="col-span-1 ">
      <div className="flex flex-col ">
        <Label>
          {label}
          <span className="mx-1 text-red-500">
            {required == "1" ? "*" : ""}
          </span>
        </Label>

        {showIcon && <CardInfo messageInfo={messageInfo} />}

        <PhoneInput
          country={"sa"}
          onlyCountries={["sa"]}
          value={values?.phone ? values.phone_code + values.phone : phone}
          onChange={handlePhoneChange}
          // enableSearch
          id="phone"
          placeholder="رقم الجوال"
          name="phone"
          onBlur={handleBlur}
          countryCodeEditable={false}
          masks={{ sa: ".. ... ....", at: ".. ... ...." }}
          showDropdown={false}
          disableCountryCode={false}
          inputProps={{
            name: "phone",
          }}
          disableDropdown={true}
          className={generateClassName()}
        />
        
      </div>

      <div>
        {" "}
        <FormikError name={"phone"} />{" "}
      </div>
    </div>
  );
};

export default PhoneInput2;
