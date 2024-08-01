import React, { useState, useEffect, useContext } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import toast from 'react-hot-toast';
import defaultImage from '../news-notdefined.jpeg';
import LanguageSelector from './language-selector';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';

const Settings = () => {
  const { t } = useTranslation();
  const [selectedNews, setSelectedNews] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const { theme } = useContext(ThemeContext);

  const clickHandler = async (article) => {
    try {
      let updatedLikedArticles;
      const token = localStorage.getItem('token');
      const articleIndex = likedArticles.findIndex((a) => a.title === article.title);

      if (articleIndex !== -1) {
        updatedLikedArticles = [...likedArticles];
        updatedLikedArticles.splice(articleIndex, 1);

        // Remove from bookmark
        await axios.delete(`${process.env.REACT_APP_BASE_URL}` + "/deleteBookmarkedNews", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            title: article.title,
          }
        });

        toast.success("Removed from Favourites");
      } else {
        updatedLikedArticles = [...likedArticles, article];

        // Add to bookmark
        await axios.post(`${process.env.REACT_APP_BASE_URL}` + "/addToBookmarkedNews", article, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });

        toast.success("Added to Favourites");
      }

      setLikedArticles(updatedLikedArticles);
      localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    const storedLikedArticles = localStorage.getItem('likedArticles');
    if (storedLikedArticles) {
      setLikedArticles(JSON.parse(storedLikedArticles));
    }
  }, []);

  useEffect(() => {
    const translatedArticles = t("articles", { returnObjects: true });
    setSelectedNews(translatedArticles);
  }, [t]);

  const renderNewsCards = (news) => {
    if (!news || news.length === 0) return null;

    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {news.map((article, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative ${theme === 'light' ? 'bg-[#333] text-white' : 'bg-white text-black'}`}
          >
            <div className={`w-[40px] h-[40px] ${theme === 'light' ? 'bg-black' : 'bg-white'} shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center`}>
              <button onClick={() => clickHandler(article)} className={`p-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}>
                {likedArticles.some((a) => a.url === article.url) ? (
                  <FcLike fontSize="1.75rem" />
                ) : (
                  <FcLikePlaceholder fontSize="1.75rem" />
                )}
              </button>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={article.urlToImage || defaultImage} 
                alt={article.title} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <div className={`p-4`}>
                <p className="font-semibold text-lg leading-6">{article.title}</p>
                <p className="mt-2">
                  {article.description ? (
                    article.description.length > 100 ?
                    `${article.description.substr(0, 100)}...` : article.description
                  ) : 'No description available.'}
                </p>
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-800'}`}>{new Date(article.publishedAt).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <div className="px-32 py-4">
        <h2 className="font-bold text-3xl py-4 text-center uppercase">
          multilanguage&nbsp;
          <span className="text-blue-700 uppercase">support</span>
        </h2>
        <h2 className="font-bold text-gray-500 text-lg py-2 text-center">
          most recent news
        </h2>

        {/* Language Selector */}
        <div className="my-4 flex justify-center space-x-4">
          <LanguageSelector className="border-2 border-solid border-blue-700" />
        </div>

        {/* Selected News Section */}
        <div id="selectedNews" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">{t("Top Headlines")}</h2>
          {renderNewsCards(selectedNews)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
