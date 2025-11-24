import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LNG_KEY = "lng"
export const LANGUAGE_MANUALLY_SET_KEY = "languageHasBeenManuallySet"
export const LANGUAGES = [
    { code: "en", label: "English", src: "/english.png" },
    { code: "et", label: "Eesti keel", src: "/estonian.png" },
];
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: {
      "nav": {
        "add": "Add",
        "cars": "Cars",
        "employees": "Employees",
        "users": "Users",
        "shops": "Shops",
        "gift-card": "Gift card",
        "calculator": "Calculator",
        "manage": "Manage",
        "webshop": "Webshop",
        "managenav": {
          "cars": "Manage Cars",
          "employees": "Manage Employees",
          "products": "Manage products",
          "shops": "Manage Shops",
          "users": "Manage Users",
        }
      }, 
      "cars": {
        "cars": "Cars"
      },
      "cart": {
        "empty-text": "Cart is empty",
        "empty-button": "Empty cart",
        "total": "Total of the cart"
      },
      "employees": {
        "employees": "Employees"
      },
      "shops": {
        "shops": "Shops"
      },
      "users": {
        "users": "Users"
      }
    }
  },
  et: {
    translation: {
      "nav": {
        "add": "Lisa",
        "cars": "Autod",
        "employees": "Töötajad",
        "users": "Kasutajad",
        "shops": "Esindused",
        "gift-card": "Kinkekaart",
        "cart": "Ostukorv",
        "calculator": "Kalkulaator",
        "manage": "Halda",
        "webshop": "Veebipood",
        "managenav": {
          "cars": "Halda autod",
          "employees": "Halda töötajad",
          "products": "Halda tooted",
          "shops": "Halda esindused",
          "users": "Halda kasutajad",
        }
      },
      "cart": {
        "empty-text": "Ostukorv on tühi",
        "empty-button": "Tühenda ostukorv",
        "total": "Ostukorvi kogusumma"
      },
      "cars": {
        "cars": "Autod"
      },
      "employees": {
        "employees": "Töötajad"
      },
      "shops": {
        "shops": "Esindused"
      },
      "users": {
        "users": "Kasutajad"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  function getLanguage() {
    const currentLngInStorage = localStorage.getItem(LNG_KEY);

    if (currentLngInStorage === null || !Object.keys(resources).includes(currentLngInStorage)) {
      localStorage.setItem(LNG_KEY, "en");
      return "en";
    }
    return currentLngInStorage;
  }

  export default i18n;
  