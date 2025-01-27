/* eslint-disable react/prop-types */
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../utils/axios-util";
import { notify } from "../../utils/toast";

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const queryClient = useQueryClient();
  // const LoadingOverlay = useLoadingOverlay()

  const changeLang = async (language) => {
    // LoadingOverlay.open()
    try {
      const response = await request({
        url: `/dashboard/change-language?locale=${language}`,
        method: "GET",
      });
      const newLang = response;
      const newDir = newLang == "ar" ? "rtl" : "ltr";

      await queryClient.invalidateQueries();
      i18n.changeLanguage(newLang);
      document.documentElement.dir = newDir;
      document.documentElement.lang = newLang;
    } catch (error) {
      notify("error", error.response?.data?.error);
    } finally {
      // LoadingOverlay.close()
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguageContext = () => useContext(LanguageContext);
