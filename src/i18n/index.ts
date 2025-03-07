// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./resources";

const languageDetector = new LanguageDetector();

// Custom language detection function to normalize the language code
const getNormalizedLanguage = () => {
  let detectedLanguage = languageDetector.detect();

  // If detectedLanguage is an array, get the first item
  if (Array.isArray(detectedLanguage)) {
    detectedLanguage = detectedLanguage[0];
  }

  // If the detected language includes a region (e.g., "en-GB"), strip it down to "en"
  return detectedLanguage && detectedLanguage.includes("-")
    ? detectedLanguage.split("-")[0]
    : detectedLanguage;
};

i18n
  .use({
    type: "languageDetector",
    init: () => {},
    detect: getNormalizedLanguage,
  })
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: [
        "navigator",
        "localStorage",
        "sessionStorage",
        "querystring",
        "cookie",
      ],
      caches: ["localStorage"], // Let i18next handle caching
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
