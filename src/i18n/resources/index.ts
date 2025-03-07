import general from "./general.json";
import faceLiveness from "./faceLiveness.json";

const translations = {
  en: {
    translation: {
      ...general.en.translation,
      ...faceLiveness.en.translation,
    },
  },
  es: {
    translation: {
      ...general.es.translation,
      ...faceLiveness.es.translation,
    },
  },
  fr: {
    translation: {
      ...general.fr.translation,
      ...faceLiveness.fr.translation,
    },
  },
};

export default translations;
