/* eslint-disable react/prop-types */
import { t } from "i18next";
import { useEffect, useState } from "react";

const ResendCode = ({
  available,
  timerStart,
  setAvailableResetCode,
  setTimerStarted,
}) => {
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    if (timerStart) {
      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            setAvailableResetCode(false);

            return prevTime - 1;
          } else {
            clearInterval(countdownInterval);
            setAvailableResetCode(true);
            setTimerStarted(false);

            return prevTime;
          }
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setRemainingTime(60);
    }
  }, [setAvailableResetCode, timerStart, setTimerStarted]);

  return (
    <>
      <div className="flex justify-center gap-2 ">
        <button
          disabled
          className={`font-[futuraMed,sans-serif]  ${
            !available
              ? "text-[#777] dark:text-white"
              : "text-mainColorLand dark:text-white"
          } ${
            available
              ? "cursor-pointer dark:text-white"
              : "cursor-not-allowed dark:text-white"
          }`}
        >
          <p className="dark:text-white">{t("Resend the code later")}</p>
        </button>

        <span
          className={`text-center font-bold !text-black dark:!text-white ${
            !available ? "!text-black dark:!text-white" : "text-mainColorLand"
          }`}
        >
          {`${Math.floor(remainingTime / 60)}:${
            remainingTime % 60 < 10 ? "0" : ""
          }${remainingTime % 60}`}
        </span>
      </div>
    </>
  );
};

export default ResendCode;
