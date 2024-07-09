import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../news-notdefined.jpeg';
import { FaAngleLeft } from "react-icons/fa6";

const apiKey = '9f14754a75274f1a893dba742f77425f';

const Main = () => {
    const [heroImages, setHeroImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchHeroImages();
    }, []);

    const fetchHeroImages = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
    
        try {
          const response = await axios.get(url);
          if (response.status === 200 && response.data.articles.length > 0) {
            const images = response.data.articles.map(article => article.urlToImage || defaultImage);
            setHeroImages(images);
          } else {
            throw new Error('Failed to fetch images');
          }
        } catch (error) {
          console.error('Error fetching images:', error);
          setHeroImages([defaultImage]);
        }
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>
            <section
                className="relative bg-blue-900"
                style={{
                    backgroundImage: `url(${heroImages[currentImageIndex]})`,    
                    // backgroundImage: `url("https://assets.playgroundai.com/652187bb-b434-4561-8ae7-403fce4e1353.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black from-2% via-transparent to-black to-1%"></div>
                <div className="w-10/12 max-w-[1080px] h-[550px] flex flex-col lg:flex-row justify-between items-center mx-auto relative">
                    {/* <div className="space-y-8">
                        <h1 className="font-serif font-bold text-[40px] leading-[1.2] text-white">Power your finance, grow your business</h1>
                        <div className="w-6 h-1 bg-green-500"></div>
                        <p className="font-serif text-[18px] leading-7 text-white opacity-70">Accept payments from customers. Automate payouts to vendors & employees. Never run out of working capital.</p>
                    </div> */}
                    <button onClick={handlePrevImage} className="absolute left-[-100px] top-1/2 transform -translate-y-1/2 border-solid border-[4px] border-white bg-transparent hover:bg-blue-700 hover:opacity-85 w-14 h-14 rounded-full" >
                        <FaAngleLeft className='stroke-[5px] w-6 h-6 md:w-10 md:h-10 text-blue-700 hover:text-white transform translate-x-1 translate-y-0' />
                    </button>
                    <button onClick={handleNextImage} className="absolute right-[-100px] top-1/2 transform -translate-y-1/2 border-solid border-[4px] border-white bg-transparent hover:bg-blue-700 hover:opacity-85 font-extrabold text-2xl w-14 h-14 rounded-full" >
                        <FaAngleLeft className='stroke-[5px] w-6 h-6 md:w-10 md:h-10 text-blue-700 hover:text-white transform translate-x-[6px] translate-y-0 rotate-180' />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Main;
