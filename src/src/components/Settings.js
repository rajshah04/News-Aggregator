import React, { useState, useEffect } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import defaultImage from '../news-notdefined.jpeg';
import LanguageSelector from './language-selector';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const Settings = () => {
  const { t } = useTranslation();
  const [selectedNews, setSelectedNews] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);

  const clickHandler = async (article) => {
    try{
      let updatedLikedArticles;

      const token = localStorage.getItem('token'); 

      console.log("Token from frontend : ", token) ;

      const articleIndex = likedArticles.findIndex((a) => a.title === article.title); // Adjust this comparison as per your article's unique identifier
    
      if (articleIndex !== -1) {
        updatedLikedArticles = [...likedArticles];
        updatedLikedArticles.splice(articleIndex, 1);
        // toast.success("Like Removed");

        
        console.log("Removing from bookmarked news") ;
        console.log("Article : ", article) ;
        console.log("Article's Title : ", article.title) ;
        console.log("Token for removing the like", token) ;
        // const removeFromBookmark = await axios.delete('http://localhost:4000/api/v1/deleteBookmarkedNews',
        //   article.title,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${token}` // Adjust this according to your API's requirements
        //     },
        //     token: token,
        //     withCredentials: true // Include credentials in the request
        //   }
        // ) ;

        const removeFromBookmark = await axios.delete('http://localhost:4000/api/v1/deleteBookmarkedNews', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            title: article.title,
          }
        });

        console.log("Removed from Bookmark", removeFromBookmark) ;
        // toast.success("Like Removed");
        toast.success("Removed from Favourites");
      } else {
        updatedLikedArticles = [...likedArticles, article];
        // toast.success("Liked Successfully");

        console.log("Adding to bookmarked news") ;
        console.log("Article : ", article) ;
        const addToBookmark = await axios.post('http://localhost:4000/api/v1/addToBookmarkedNews', 
          article, {
          headers: {
            'Authorization': `Bearer ${token}` // Adjust this according to your API's requirements
          },
          withCredentials: true // Include credentials in the request
        }) ;

        console.log("Add to Bookmark", addToBookmark) ;
        // toast.success("Liked Successfully");
        toast.success("Added to Favourites");
      }
    
      setLikedArticles(updatedLikedArticles);
      localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
    }catch(err){
      console.error(err) ;
      console.log(err.message) ;
    }
  };
  
  useEffect(() => {
    const storedLikedArticles = localStorage.getItem('likedArticles');
    if (storedLikedArticles) {
      setLikedArticles(JSON.parse(storedLikedArticles));
    }
  }, []);

  useEffect(() => {
    // Simulate fetching translated articles
    const translatedArticles = t("articles", { returnObjects: true });
    setSelectedNews(translatedArticles);
  }, [t]);

  const renderNewsCards = (news) => {
    if (!news || news.length === 0) return null;
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-black">
        {news.map((article, index) => (
          <div key={index} className="bg-[#212121] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
            <div className='w-[40px] h-[40px] bg-black shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center'>
              <button onClick={() => clickHandler(article)}>
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
              <div className="p-4">
                <p className="text-white font-semibold text-lg leading-6">{article.title}</p>
                <p className="text-[#888888] mt-2">
                  {article.description ? (
                    article.description.length > 100 ?
                    `${article.description.substr(0, 100)}...` : article.description
                  ) : 'No description available.'}
                </p>
              </div>
              <p className="text-sm text-[#888888]">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-full px-32 py-14 bg-black">
          <h2 className="font-bold text-white text-[32px] pt-20 text-center uppercase">
              multilanguage&nbsp;
              <span className="text-blue-700 uppercase">support</span>
          </h2>
          <h2 className="font-bold text-[#888888] text-[16px] pt-2 text-center">
              most recent news
          </h2>
        {/* Toast Container */}
        {/* <ToastContainer /> */}
        {/* <Toaster /> */}

        {/* Language Selector */}
        <div className="mt-10 flex justify-center text-white space-x-4">
          <LanguageSelector className="border-2 border-solid border-blue-700" />
        </div>

        {/* Selected News Section */}
        <div id="selectedNews" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">{t("topHeadlines")}</h2>
          {renderNewsCards(selectedNews)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
