import React, { useState, useEffect } from 'react';
import defaultImage from '../news-notdefined.jpeg';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios' ;

const Favourite = () => {
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
        const response = await axios.get('http://localhost:4000/api/v1/getAllBookmarkedNews', {
          headers: {
            'Authorization': `Bearer ${token}` // Adjust this according to your API's requirements
          },
          withCredentials: true // Include credentials in the request
        });

        console.log("API Response:", response);
        console.log("API Response:", response.data.bookmarkedNews);

        if (Array.isArray(response.data.bookmarkedNews)) {
          setLikedArticles(response.data.bookmarkedNews);
        } else {
          console.error('Expected an array but received:', response.data.bookmarkedNews);
        }
      } catch (error) {
        console.error('Error fetching liked articles:', error);
      }
    };

    fetchLikedArticles();
    // localStorage.setItem(likedArticles, likedArticles) ;

    const storedLikedArticles = localStorage.getItem('likedArticles');
    if (storedLikedArticles) {
      setLikedArticles(JSON.parse(storedLikedArticles));
    }
  }, []);

  const renderLikedArticles = () => {
    if (likedArticles.length === 0) {
      return (
        <div>
          {/* <Navbar /> */}
          <p className="text-center text-white">No favourite articles yet.</p>
          {/* <Footer /> */}
        </div>

      ) ; 
    }

    return (
      <div>
        {/* <Navbar /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4 bg-black">
          {likedArticles.map((article, index) => (
            <div key={index} className="bg-[#212121] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={article.image || defaultImage} 
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
        {/* <Footer /> */}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-full px-32 py-14 bg-black">
        <h2 className="font-bold text-white text-[32px] pt-20 text-center">
          Favourite&nbsp;
          <span className="text-blue-700">Articles</span>
        </h2>
        <h2 className="font-bold text-[#888888] text-[16px] pt-2 text-center">
          Liked Articles
        </h2>
        {renderLikedArticles()}
      </div>
      <Footer />
    </div>
  );
};

export default Favourite;
