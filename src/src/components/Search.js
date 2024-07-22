import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import defaultImage from '../news-notdefined.jpeg';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// const apiKey = '9f14754a75274f1a893dba742f77425f';
const apiKey = '29f8e42efe874ee2be23f0d1edb6844b';
// const apiKey ='4dbc17e007ab436fb66416009dfb59a8';
const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Get URL parameters
    const category = params.get('q'); // Get the 'q' parameter from URL (category name)

    if (category) {
      setSearchQuery(category); // Set searchQuery to the category obtained from URL
      fetchSearchData(category, currentPage); // Fetch data for the specified category
    }
  }, [location.search, currentPage]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
    setCurrentPage(1);
  };

  const clickHandler = async (article) => {
    try{
      let updatedLikedArticles;
      const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

      console.log("Token from frontend : ", token) ;

      if (likedArticles.some((a) => a.title === article.title)) {
        // updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);
        // toast.success("Like Removed");

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
      } else {
        // updatedLikedArticles = [...likedArticles, article];
        // toast.success("Liked Successfully");

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

  const renderNewsCards = (news) => {
  if (!news || news.length === 0) return null;

  return (
    <div>
      {/* <Navbar /> */}
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
      {/* <Footer /> */}
    </div>
  );
};


  return (
    <div>
      <Navbar />
      <div className="w-full h-full px-32 py-14 bg-black">
      {/* Toast Container */}
      {/* <ToastContainer /> */}
      {/* <Toaster /> */}

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search news..."
          className="p-3 pl-10 w-full sm:w-2/3 lg:w-1/2 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Selected News Section */}
      {selectedNews.length > 0 && (
        <div id="selectedNews" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
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
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button> 
          <button
            className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Search;


// *********************************************************************************************

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FcLike, FcLikePlaceholder } from "react-icons/fc"; 
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from 'react-hot-toast';
// import defaultImage from '../news-notdefined.jpeg';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const apiKey = '9f14754a75274f1a893dba742f77425f';
// // const apiKey = '29f8e42efe874ee2be23f0d1edb6844b';
// // const apiKey ='4dbc17e007ab436fb66416009dfb59a8';
// const Search = () => {
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNews, setSelectedNews] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isSearching, setIsSearching] = useState(false);
//   const [likedArticles, setLikedArticles] = useState([]);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search); // Get URL parameters
//     const category = params.get('q'); // Get the 'q' parameter from URL (category name)

//     if (category) {
//       setSearchQuery(category); // Set searchQuery to the category obtained from URL
//       fetchSearchData(category, currentPage); // Fetch data for the specified category
//     }
//   }, [location.search, currentPage]);

//   useEffect(() => {
//     if (searchQuery) {
//       fetchSearchData(searchQuery, currentPage);
//     }
//   }, [searchQuery, currentPage]);

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

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setIsSearching(e.target.value.length > 0);
//     setCurrentPage(1);
//   };

//   const clickHandler = (article) => {
//     try{
//       let updatedLikedArticles;
//       const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

//       console.log("Token from frontend : ", token) ;
//       if (likedArticles.some((a) => a.title === article.title)) {
//         updatedLikedArticles = likedArticles.filter((a) => a.title !== article.title);
//         toast.success("Like Removed");

//       } else {
//         updatedLikedArticles = [...likedArticles, article];
//         toast.success("Liked Successfully");
//       }
//       setLikedArticles(updatedLikedArticles);
//       localStorage.setItem('likedArticles', JSON.stringify(updatedLikedArticles));
//     }catch(err){
//       console.error(err) ;
//       console.log(err.message) ;
//     }
//   };
  
//   useEffect(() => {
//     const storedLikedArticles = localStorage.getItem('likedArticles');
//     if (storedLikedArticles) {
//       setLikedArticles(JSON.parse(storedLikedArticles));
//     }
//   }, []);

//   const renderNewsCards = (news) => {
//   if (!news || news.length === 0) return null;

//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-black">
//         {news.map((article, index) => (
//           <div key={index} className="bg-[#212121] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 relative">
//             <div className='w-[40px] h-[40px] bg-black shadow-lg rounded-full absolute right-2 bottom-56 grid place-items-center'>
//               <button onClick={() => clickHandler(article)}>
//                 {likedArticles.some((a) => a.url === article.url) ? (
//                   <FcLike fontSize="1.75rem" />
//                 ) : (
//                   <FcLikePlaceholder fontSize="1.75rem" />
//                 )}
//               </button>
//             </div>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">
//               <img 
//                 src={article.urlToImage || defaultImage} 
//                 alt={article.title} 
//                 className="w-full h-48 object-cover rounded-md mb-4" 
//               />
//               <div className="p-4">
//                 <p className="text-white font-semibold text-lg leading-6">{article.title}</p>
//                 <p className="text-[#888888] mt-2">
//                   {article.description ? (
//                     article.description.length > 100 ?
//                     `${article.description.substr(0, 100)}...` : article.description
//                   ) : 'No description available.'}
//                 </p>
//               </div>
//               <p className="text-sm text-[#888888]">{new Date(article.publishedAt).toLocaleDateString()}</p>
//             </a>
//           </div>
//         ))}
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };


//   return (
//     <div>
//       <Navbar />
//       <div className="w-full h-full px-32 py-14 bg-black">
//       {/* Toast Container */}
//       {/* <ToastContainer /> */}
//       {/* <Toaster /> */}

//       {/* Search Bar */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search news..."
//           className="p-3 pl-10 w-full sm:w-2/3 lg:w-1/2 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>

//       {/* Selected News Section */}
//       {selectedNews.length > 0 && (
//         <div id="selectedNews" className="mb-8">
//           <h2 className="text-3xl font-bold text-center mb-6 text-white">{isSearching ? 'Search Results' : 'Top Headlines'}</h2>
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
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button> 
//           <button
//             className={`px-4 py-2 bg-blue-700 text-white rounded-full transition-opacity ${
//               currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
//             }`}
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Search;
