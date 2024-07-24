import React, { useState, useEffect, lazy,useContext } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import defaultImage from '../news-notdefined.jpeg';
import { ThemeContext } from './ThemeContext';

// const apiKey = '9f14754a75274f1a893dba742f77425f';
const apiKey = '29f8e42efe874ee2be23f0d1edb6844b';
// const apiKey ='4dbc17e007ab436fb66416009dfb59a8';
const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedNews, setSelectedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [likedArticles, setLikedArticles] = useState([]);

  // const clickHandler = (article) => {
  //   let updatedLikedArticles;
  //   if (likedArticles.some((a) => a.title === article.title)) {
  //     updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);
  //     toast.success("Like Removed");
  //   } else {
  //     updatedLikedArticles = [...likedArticles, article];
  //     toast.success("Liked Successfully");
  //   }
  //   setLikedArticles(updatedLikedArticles);
  //   localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
  // };

  const clickHandler = async (article) => {
    try{
      let updatedLikedArticles;
      const token = localStorage.getItem('token');

      console.log("Token from frontend : ", token) ;

      // if (!likedArticles) {
      //   console.log("likedArticles is undefined");
      //   return;
      // }
    
      if (likedArticles.some((a) => a.title === article.title)) {
        updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);

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
      } 
      else {
        updatedLikedArticles = [...likedArticles, article];
        
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
    }
    catch(err){
      console.log(err) ;
      console.log(err.message) ;
    }
  };

  // const clickHandler = async (article) => {
  //   try {
  //       let updatedLikedArticles;
  //       const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

  //       console.log("Token from frontend: ", token);
  //       if (likedArticles.some((a) => a.title === article.title)) {
  //           updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);

  //           console.log("Removing from bookmarked news");
  //           console.log("Article: ", article);
  //           console.log("Article's Title: ", article.title);
  //           const removeFromBookmark = await axios.delete('http://localhost:4000/api/v1/deleteBookmarkedNews', {
  //               headers: {
  //                   'Authorization': `Bearer ${token}` // Adjust this according to your API's requirements
  //               },
  //               data: { title: article.title }, // Send the title in the data field
  //               withCredentials: true // Include credentials in the request
  //           });

  //           console.log("Removed from Bookmark", removeFromBookmark);
  //           toast.success("Like Removed");
  //       } else {
  //           updatedLikedArticles = [...likedArticles, article];
  //           console.log("Adding to bookmarked news");
  //           console.log("Article: ", article);
  //           const addToBookmark = await axios.post('http://localhost:4000/api/v1/addToBookmarkedNews', article, {
  //               headers: {
  //                   'Authorization': `Bearer ${token}` // Adjust this according to your API's requirements
  //               },
  //               withCredentials: true // Include credentials in the request
  //           });

  //           console.log("Added to Bookmark", addToBookmark);
  //           toast.success("Liked Successfully");
  //       }
  //       setLikedArticles(updatedLikedArticles);
  //       localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
  //   } catch (err) {
  //       console.log(err);
  //       console.log(err.message);
  //   }
  // };
  
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
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ${theme === 'light' ? 'bg-black' : 'bg-[#F9F9F9]'}`}>
        {news.map((article, index) => (
          <div key={index} className={`bg-[#212121] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative ${theme === 'light' ? 'bg-[#333]' : 'bg-white'}`}>
           <div className={`w-[40px] h-[40px] shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center ${theme === 'light' ? 'bg-black' : 'bg-gray-800'}`}>
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
               <div className={`p-4 ${theme === 'light' ? 'text-white' : 'text-black'}`}>
               <p className={`font-semibold text-lg leading-6 ${theme === 'light' ? 'text-white' : 'text-black'}`}>{article.title}</p>
               <p className={`mt-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {article.description ? (
                    article.description.length > 100 ?
                    `${article.description.substr(0, 100)}...` : article.description
                  ) : 'No description available.'}
                </p>
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-700'}`}>{new Date(article.publishedAt).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className={`w-full h-full px-32 py-14 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`flex justify-center items-center py-0 top-10 relative w-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute w-full border-[1.5px] rounded-lg ${theme === 'light' ? 'border-gray-600' : 'border-gray-300'}`}></div>
        </div> 
        <h2 className={`font-bold text-[32px] pt-20 text-center ${theme === 'light' ? 'text-white' : 'text-black'}`}>
            LATEST&nbsp;
            <span className="text-blue-700">NEWS</span>
        </h2>
        <h2 className={`font-bold text-[16px] pt-2 text-center ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
            most recent news
        </h2>
      {/* Toast Container */}
      {/* <ToastContainer /> */}
      {/* <Toaster /> */}

      {/* Navigation Bar */}
      {!isSearching && (
        <div className="mt-10">
          <ul className="flex justify-center text-white space-x-4 ">
            {['general', 'business', 'sports', 'politics', 'entertainment'].map((category) => (
              <li key={category}>
                <button
                  className={`px-4 py-2 border border-gray-300 hover:bg-blue-700 rounded-full transition-colors ${
                    selectedCategory === category ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                } ${theme === 'light' ? 'text-white' : 'text-black'}`}
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
          <h2 className="text-3xl font-bold text-center my-6">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
          {renderNewsCards(selectedNews)}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center py-6 space-x-4">
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