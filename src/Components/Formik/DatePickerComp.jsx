/* eslint-disable react/prop-types */
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@mui/material/styles";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import ar from "date-fns/locale/ar-SA";
import { useFormikContext } from "formik";
import { toHijri } from "hijri-converter";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useTranslation } from "react-i18next";
import DatePickerWrapper from ".";
import { useIsRTL } from "../../../hooks/useIsRTL";
import { convertArabicToEnglish } from "../../../utils/helpers";
import CardInfo from "../CardInfo";
import Label from "../Label";
import { FormikError } from "./FormikError";

export default function DatePickerComp({
  name,
  name_hj,
  label,
  required,
  showIcon,
  setShow,
  setIndex,
  index,
  messageInfo,
  images,
}) {
  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);
  const [date, setDate] = useState(
    values[name] ? new Date(values[name]) : null
  );
  const theme = useTheme();

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = useIsRTL();
  const langObj = { ar };
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (date) {
      const hijri = toHijri(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      const formattedHijriDate = `${hijri.hy}-${hijri.hm
        .toString()
        .padStart(2, "0")}-${hijri.hd.toString().padStart(2, "0")}`;
      setFieldValue(name_hj, formattedHijriDate);
      setValueHijri(formattedHijriDate);
    }
  }, [date, setFieldValue, name_hj]);

  registerLocale(i18n.language, langObj[i18n.language]);
  const years = Array.from(
    { length: 2070 - 1940 + 1 },
    (_, index) => 1940 + index
  );
  const months = [
    t("June"),
    t("February"),
    t("March"),
    t("April"),
    t("May"),
    t("Jun"),
    t("July"),
    t("August"),
    t("September"),
    t("October"),
    t("November"),
    t("December"),
  ];
  const daysOfWeek = [
    t("Sun"),
    t("Mon"),
    t("Tue"),
    t("Wed"),
    t("Thu"),
    t("Fri"),
    t("Sat"),
  ];

  const currentLanguage = i18n.language;
  const renderDaysOfWeek = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "18px",
        }}
      >
        {daysOfWeek.map((day) => (
          <span className="text-[10px] text-black dark:text-white " key={day}>
            {day}
          </span>
        ))}
      </div>
    );
  };
  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <>
      <div
        style={{ margin: 10, display: "flex", justifyContent: "space-between" }}
      >
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
    {    isRTL ?     <ArrowRightIcon /> :  <ArrowLeftIcon />}
        </button>
        <select
          className="p-1 border border-[#cccccc] rounded-md "
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option} className="text-black dark:text-white dark:bg-darkModeColor">
              {option}
            </option>
          ))}
        </select>

        <select
          className="p-1 border border-[#cccccc] rounded-md"
          value={months[date.getMonth()]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option} className="text-black dark:text-white dark:bg-darkModeColor">
              {option}
            </option>
          ))}
        </select>

        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      {  isRTL  ?    <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
      </div>
      {renderDaysOfWeek(currentLanguage)}
    </>
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="w-full">
          <Label>
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
          </Label>
          {showIcon && (
            <CardInfo
              index={index}
              setIndex={setIndex}
              messageInfo={messageInfo}
              setShow={setShow}
              images={images}
            />
          )}
          <DatePickerWrapper>
            <DatePicker
              // className="bg-white dark:bg-dark-primary rounded-[10px] w-full p-[18px] border border-[#cccccc] dark:border-[#555d64] "
              selected={date}
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                handleBlur(e);
                setIsFocused(false); // Reset focus on blur
              }}
              style={{
                borderColor:
                  !!touched[name] && !!errors[name]
                    ? "red"
                    : isFocused
                    ? theme.palette.primary.main
                    : " ",
                // borderRadius: "9px",
                height: "59px",
              }}
              className={`  
                     ${isFocused ? "border" : " border border-[#cccccc]"}
                      "my-3 code p-[18px] w-full focus-visible:!outline-none 
                      dark:!text-white rounded-[8px] dark:!border dark:!border-solid
                      border-[#cccccc] dark:border-[#555d64] " ${
                        !!touched[name] && !!errors[name] && "!border-red-500 "
                      }  `}
              // id="month-year-dropdown"
              placeholderText="MM/DD/YYYY"
              renderCustomHeader={CustomHeader}
              locale={isRTL ? "ar" : "en"}
              sx={{
                background: "white",
                borderRadius: "10px",
                "& .MuiInputBase-input::placeholder": {
                  opacity: 1,
                },
              }}
              onChange={(newValue) => {
                if (newValue === null) {
                  // Clear the fields and set the date to null
                  setFieldValue(name, "");
                  setValueHijri(null);
                  setFieldValue(name_hj, null);

                  setDate(null);
                } else if (values[name] !== undefined) {
                  const newDate = new Date(newValue);
                  if (isNaN(newDate)) {
                    console.error("Invalid date");
                  } else {
                    const formattedDate = format(newDate, "yyyy-MM-dd");
                    setFieldValue(name, formattedDate);
                    // setValueGregorian(formattedDate);
                    setDate(newDate);
                  }
                }
                // setDate(newValue ? new Date(newValue) : null);
              }}
            />
            {/* </Box> */}
          </DatePickerWrapper>
          {valueHijri && (
            <p className="flex items-center gap-2 mt-1 dark:text-white">
              <Icon path={mdiCalendarMonthOutline} size={0.8} />
              <span className="dark:text-white date_hj">
                {convertArabicToEnglish(valueHijri)}
              </span>
              {t("H")}
            </p>
          )}
          <div>
            <FormikError name={name} />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}
