import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultImage from '../news-notdefined.jpeg';

const apiKey = '9f14754a75274f1a893dba742f77425f';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedNews, setSelectedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [likedArticles, setLikedArticles] = useState([]);

  const clickHandler = (article) => {
    let updatedLikedArticles;
    if (likedArticles.some((a) => a.title === article.title)) {
      updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);
      toast.warning("Like Removed");
    } else {
      updatedLikedArticles = [...likedArticles, article];
      toast.success("Liked Successfully");
    }
    setLikedArticles(updatedLikedArticles);
    localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
  };
  
  useEffect(() => {
    const storedLikedArticles = localStorage.getItem('likedArticles');
    if (storedLikedArticles) {
      setLikedArticles(JSON.parse(storedLikedArticles));
    }
  }, []);
  

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData(searchQuery, currentPage);
    } else {
      fetchData(selectedCategory, currentPage);
    }
  }, [selectedCategory, currentPage, searchQuery]);

  const fetchData = async (category, page) => {
    const pageSize = 6;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setSelectedNews(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / pageSize));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedNews([]);
      setTotalPages(1);
    }
  };

  const fetchSearchData = async (query, page) => {
    const pageSize = 6;
    const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setSelectedNews(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / pageSize));
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedNews([]);
      setTotalPages(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
    setCurrentPage(1);
  };

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
    <div className="w-full h-full px-32 py-14 bg-black">
        <div className='flex justify-center items-center py-0 top-10 relative w-full'>
            <div className='absolute w-full border-[1.5px] border-white rounded-lg'></div>
        </div> 
        <h2 className="font-bold text-white text-[32px] pt-20 text-center">
            LATEST&nbsp;
            <span className="text-blue-700">NEWS</span>
        </h2>
        <h2 className="font-bold text-[#888888] text-[16px] pt-2 text-center">
            most recent news
        </h2>
      {/* Toast Container */}
      <ToastContainer />

      {/* Navigation Bar */}
      {!isSearching && (
        <div className="mt-10">
          <ul className="flex justify-center text-white space-x-4 ">
            {['general', 'business', 'sports', 'politics', 'entertainment'].map((category) => (
              <li key={category}>
                <button
                  className={`px-4 py-2 border border-gray-300 hover:bg-transparent rounded-full transition-colors ${
                    selectedCategory === category ? 'bg-blue-700 text-white' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected News Section */}
      {selectedNews.length > 0 && (
        <div id="selectedNews" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
          {renderNewsCards(selectedNews)}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button> 
          <button
            className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


// import React, { useState, useEffect, lazy } from 'react';
// import axios from 'axios';
// import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import defaultImage from '../news-notdefined.jpeg';

// const apiKey = 'b63b320651864d19809352d85179c59c';

// const Dashboard = () => {
//   const [selectedCategory, setSelectedCategory] = useState('general');
//   const [selectedNews, setSelectedNews] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [likedArticles, setLikedArticles] = useState([]);

//   const clickHandler = (article) => {
//     if (likedArticles.includes(article.title)) {
//       setLikedArticles((prev) => prev.filter((id) => id !== article.title));
//       toast.warning("Like Removed");
//     } else {
//       setLikedArticles((prev) => [...prev, article.title]);
//       toast.success("Liked Successfully");
//     }
//   };

//   useEffect(() => {
//     if (searchQuery) {
//       fetchSearchData(searchQuery, currentPage);
//     } else {
//       fetchData(selectedCategory, currentPage);
//     }
//   }, [selectedCategory, currentPage, searchQuery]);

//   const fetchData = async (category, page) => {
//     const pageSize = 6;
//     const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         setSelectedNews(response.data.articles);
//         setTotalPages(Math.ceil(response.data.totalResults / pageSize));
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setSelectedNews([]);
//       setTotalPages(1);
//     }
//   };

//   const fetchSearchData = async (query, page) => {
//     const pageSize = 6;
//     const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         setSelectedNews(response.data.articles);
//         setTotalPages(Math.ceil(response.data.totalResults / pageSize));
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setSelectedNews([]);
//       setTotalPages(1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setIsSearching(e.target.value.length > 0);
//     setCurrentPage(1);
//   };

//   const renderNewsCards = (news) => {
//     if (!news || news.length === 0) return null;

//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-black">
//         {news.map((article, index) => (
//           <div key={index} className="bg-[#212121] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
//             <div className='w-[40px] h-[40px] bg-black shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center'>
//               <button onClick={() => clickHandler(article)}>
//                 {likedArticles.includes(article.title) ? (
//                   <FcLike fontSize="1.75rem" />
//                 ) : (
//                   <FcLikePlaceholder fontSize="1.75rem" />
//                 )}
//               </button>
//             </div>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">
//             <img 
//                   src={article.urlToImage || defaultImage} 
//                   alt={article.title} 
//                   className="w-full h-48 object-cover rounded-md mb-4" 
//                 />

//               <div className="p-4">
//                 <p className="text-white font-semibold text-lg leading-6">
//                   {article.title}
//                 </p>
//                 <p className="text-[#888888] mt-2">
//                 {
//                     article.description ? (
//                       article.description.length > 100 ?
//                       `${article.description.substr(0, 100)}...` : article.description
//                     ) : 'No description available.'
//                   }
//                 </p>
//               </div>
//               <p className="text-sm text-[#888888]">{new Date(article.publishedAt).toLocaleDateString()}</p>
//             </a>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="w-full h-full px-32 py-14 bg-black">
//         <div className='flex justify-center items-center py-0 top-10 relative w-full'>
//             <div className='absolute w-full border-[1.5px] border-white rounded-lg'></div>
//         </div> 
//         <h2 className="font-bold text-white text-[32px] pt-20 text-center">
//             LATEST&nbsp;
//             <span className="text-blue-700">NEWS</span>
//         </h2>
//         <h2 className="font-bold text-[#888888] text-[16px] pt-2 text-center">
//             most recent news
//         </h2>
//       {/* Toast Container */}
//       <ToastContainer />

//       {/* Navigation Bar */}
//       {!isSearching && (
//         <div className="mt-10">
//           <ul className="flex justify-center text-white space-x-4 ">
//             {['general', 'business', 'sports', 'politics', 'entertainment'].map((category) => (
//               <li key={category}>
//                 <button
//                   className={`px-4 py-2 border border-gray-300 hover:bg-transparent rounded-full transition-colors ${
//                     selectedCategory === category ? 'bg-blue-700 text-white' : 'hover:bg-gray-200'
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(category);
//                     setCurrentPage(1);
//                   }}
//                 >
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Selected News Section */}
//       {selectedNews.length > 0 && (
//         <div id="selectedNews" className="mb-8">
//           <h2 className="text-3xl font-bold text-center mb-6">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
//           {renderNewsCards(selectedNews)}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center space-x-4">
//           <button
//             className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
//               currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
//             }`}
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button> 
//           <button
//             className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
//               currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
//             }`}
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;