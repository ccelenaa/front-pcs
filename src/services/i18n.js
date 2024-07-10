import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

i18n
  // .use(languageDetector)
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    lng: 'fr',
    backend: {
      loadPath: 'https://api.pcs.fr/langues/{{lng}}',
      crossDomain: true
      // allowMultiLoading: false,
    },
    debug: true,
    react: {
      useSuspense: false,
    },
    resources
  });

export default i18n;
