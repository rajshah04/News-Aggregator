import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from './ThemeContext'; // Ensure you have ThemeContext for theme management

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "हिंदी" },
  { code: "guj", lang: "ગુજરાતી" },
  { code: "mr", lang: "मराठी" },
  { code: "ur", lang: "اردو" },
  { code: "tl", lang: "தமிழ்" },
  { code: "bn", lang: "বেঙ্গোলি" },
  { code: "pb", lang: "ਪੰਜਾਬੀ" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className={`flex space-x-4 ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded-md`}>
      {languages.map((lng) => (
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-300 
            ${lng.code === i18n.language 
              ? (theme === 'light' ? 'bg-blue-400 text-black' : 'bg-blue-600 text-white') 
              : (theme === 'light' ? 'bg-gray-600 text-gray-100 hover:bg-blue-500 hover:text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-gray-800')
            }`}
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
        >
          {lng.lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
