// src/Explore.js
import React, { useContext } from 'react';
import CTABg from '../ctaBg.svg';
import CTAImage from '../ctaImg.svg';
import { FaCheck } from "react-icons/fa6";
import { ThemeContext } from './ThemeContext'; // Ensure ThemeContext is imported

const Explore = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`w-full h-full ${theme === 'light' ? 'bg-black' : 'bg-gray-100'}`}>
            <section 
                className={`bg-cover bg-center w-full h-full bg-no-repeat relative min-h-[530px] ${theme === 'light' ? 'bg-black' : 'bg-white'}`}
                style={{ backgroundImage: `url(${CTABg})` }}
            >
                <div className={`flex justify-center items-center relative ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                    <div className={`absolute w-5/6 border-[1.5px] ${theme === 'light' ? 'border-white' : 'border-gray-300'} rounded-lg`}></div>
                </div>

                <div className={`w-11/12 max-w-[1080px] relative flex flex-row items-center justify-between space-x-20 mx-auto pt-16 ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                    <div className="flex flex-col gap-5 mt-12 max-w-[600px]">
                        <h2 className={`font-bold text-2xl text-left ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                            Go Beyond The Headlines: In-Depth News Aggregator
                        </h2>
                        <div className={`w-6 h-1 ${theme === 'light' ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                        <p className={`text-left ${theme === 'light' ? 'text-white' : 'text-black'}`}>
                            Sign up now to read the news on our platform and enjoy a seamless browsing experience. Stay updated with our top-notch news service.
                        </p>

                        <ul className="flex flex-row flex-wrap gap-x-12 text-white gap-y-3">
                            <li className={`text-left ${theme === 'light' ? 'text-white' : 'text-black'} flex flex-row gap-2`}>
                                <FaCheck className={`text-white mt-1 ${theme === 'light' ? 'text-white' : 'text-black'}`}/>
                                <span>Quick Access</span>
                            </li>
                            <li className={`text-left ${theme === 'light' ? 'text-white' : 'text-black'} flex flex-row gap-2`}>
                                <FaCheck className={`text-white mt-1 ${theme === 'light' ? 'text-white' : 'text-black'}`}/>
                                <span>Any time Any Way</span>
                            </li>
                            <li className={`text-left ${theme === 'light' ? 'text-white' : 'text-black'} flex flex-row gap-2`}>
                                <FaCheck className={`text-white mt-1 ${theme === 'light' ? 'text-white' : 'text-black'}`}/>
                                <span>Trusted Source</span>
                            </li>
                            <li className={`text-left ${theme === 'light' ? 'text-white' : 'text-black'} flex flex-row gap-2`}>
                                <FaCheck className={`text-white mt-1 ${theme === 'light' ? 'text-white' : 'text-black'}`}/>
                                <span>24x7 support</span>
                            </li>
                        </ul>

                        <button className={`min-w-[32px] text-sm font-bold ${theme === 'light' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'} border flex rounded-sm items-center hover:${theme === 'light' ? 'text-blue-400' : 'text-blue-400'} transition-all duration-200 py-3 px-4 place-self-start`}>
                            Sign Up
                            <svg viewBox="0 0 24 24" focusable="false" className="w-[18px] h-[18px] ml-3">
                                <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                            </svg>
                        </button>
                    </div>
                    <img src={CTAImage} alt="" width="240px" height="282px" className="mt-16 pt-6 hidden lg:block" />
                </div>
            </section>
        </div>
    );
};

export default Explore;
