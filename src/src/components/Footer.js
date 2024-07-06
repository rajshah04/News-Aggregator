import React from 'react';
import img from '../logo news.png';
import { GrTopCorner } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import './Footer.css';
import { useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {

    useEffect(() => {
        const size = 10;
        const text = document.querySelector('.text p');
        text.innerHTML = text.innerText
            .split("")
            .map((char, i) => `<span className="text-span" style="transform:rotate(${i * size}deg)">${char}</span>`)
            .join("");
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


  return (
    <div>
        <div className="flex items-center justify-center">
            <img
                src={img}
                width="60"
                height="34"
                className="cursor-pointer"
            />
        </div>
        <footer className="-mt-[400px] md:-mt-[300px] bg-black text-white">
            <div className="w-10/12 pt-[400px] pb-10 md:pt-[350px] md:my-0 md:w-11/12 max-w-[1080px] mx-auto flex flex-col space-y-6 lg:space-y-0 lg:space-x-4 lg:flex-row justify-between">
                <div className="flex flex-col md:max-w-[340px] lg:max-w-[260px]">
                    <div className="gap-2">
                        <GrTopCorner className='text-4xl text-blue-700' />
                        <h3 className='-mt-6 text-2xl font-bold text-left pl-6 uppercase'>Who we are?</h3>
                    </div>
                    <p className="text-sm text-[#888888] text-justify my-3 ">
                        News Aggregators is a multilingual news aggregation platform designed to provide accurate,
                        timely, and personalized news to users in their preferred language.
                    </p>
                    <p className="text-sm text-[#888888] text-justify my-3 ">
                        The platform addresses the fragmentation of existing news platforms by integrating various news sources into a single,
                        cohesive platform that prioritizes user experience, personalization, and credibility.
                    </p>
                    <p className="text-sm text-[#888888] text-justify my-3 ">
                        Develop a web-based platform that aggregates news articles from various sources. Provide a user-friendly interface for users to browse and read news articles.
                    </p>
                    <p className="text-[0.625rem] text-[#c1c1c1] text-justify my-3 ">
                        Disclaimer: News Aggregators is a multilingual platform designed to provide accurate, timely, and personalized news to users in their preferred language. However, we do not create or edit the news content ourselves. The articles displayed on our platform are sourced from third-party publishers, and we are not responsible for their accuracy or reliability. News Aggregators itself is not a news publisher and does not hold or claim to hold any publishing licenses.
                    </p>
                    <p className=" uppercase font-bold text-gray2 text-left">
                    Subscribe to our article
                    </p>
                    <form className="relative bg-white w-[260px] mt-2 mb-4">
                    <input
                        placeholder="Your email address"
                        className="pr-16  border-gray-300 outline-lightBlue focus:outline-blue-400 placeholder:text-sm py-2 px-4 border rounded-sm transition-all duration-200"
                    />
                    <button
                        className="h-[90%] bg-white absolute right-[1.5px] top-1/2 -translate-y-1/2 z-10  text-sm font-bold text-blue-400 flex rounded-sm items-center hover:text-blue-500 transition-all duration-200"
                    >
                        Subscribe
                        <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        className="w-[14px] h-[14px] ml-3"
                        >
                        <path
                            fill="currentColor"
                            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                        ></path>
                        </svg>
                    </button>
                    </form>
                    
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-between">
                    <div className="space-y-3">
                        <div>
                            <div className="gap-2">
                                <GrTopCorner className='text-4xl text-blue-700' />
                                <h3 className='-mt-6 text-2xl font-bold text-left pl-6'>CATEGORIES</h3>
                            </div> 
                            <ul class="space-y-2">
                                <li>
                                    <a
                                    href="#"
                                    class="font-medium  hover:text-[#888888] transition-all duration-200"
                                    >General</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Business</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Sports</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Politics</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Entertainment</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class="relative  font-medium  hover:text-[#888888] transition-all duration-200"
                                    >
                                    View Live Demo
                                    <span
                                        class="text-white  uppercase bg-green-500 rounded-sm text-xs font-bold p-1"
                                        >New</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Health</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Science</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Technology</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Travel</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >World</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Cars</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Religion</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Family</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="gap-2">
                                <GrTopCorner className='text-4xl text-blue-700' />
                                <h3 className='-mt-6 text-2xl font-bold text-left pl-6'>POPULAR POST</h3>
                            </div> 
                            <ul class="space-y-2">
                                <li>
                                    <a
                                    href="#"
                                    class="font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Achievements</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >International</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Academics</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Beyond The Campus</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Placements</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class="relative  font-medium  hover:text-[#888888] transition-all duration-200"
                                    >
                                    Cultural Events
                                    <span
                                        class="text-white  uppercase bg-green-500 rounded-sm text-xs font-bold p-1"
                                        >New</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Reviews</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Internship</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Technical Events</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Hackathon</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Startup</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Department</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Festival</a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    class=" font-medium  hover:text-[#888888] transition-all duration-200"
                                    >Help Desk</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <div className="gap-2">
                                <GrTopCorner className='text-4xl text-blue-700' />
                                <h3 className='-mt-6 text-2xl font-bold text-left pl-6'>GET IN TOUCH WITH US</h3>
                            </div>
                            <p className=" uppercase font-bold text-gray2 mb-1 mt-6"> FIND US ONLINE </p>
                            <ul className="flex space-x-4 items-center justify-center mt-4">
                                <li className="cursor-pointer">
                                    <a href='#'>
                                    <FaFacebookSquare className='w-8 h-8'/>
                                    </a>
                                </li>
                                <li className="cursor-pointer">
                                    <a href='#'>
                                    <BsTwitterX className='w-8 h-8'/>
                                    </a>
                                </li>
                                <li className="cursor-pointer">
                                    <a href='#'>
                                    <FaSquareInstagram className='w-8 h-8' />
                                    </a>
                                </li>
                                <li className="cursor-pointer">
                                    <a href='#'>
                                    <IoLogoGithub className='w-8 h-8'/>
                                    </a>
                                </li>
                                <li className="cursor-pointer">
                                    <a href='#'>
                                    <IoLogoLinkedin className='w-8 h-8'/>
                                    </a>
                                </li>
                            </ul>
                            <div>
                                <p className=" uppercase font-bold text-gray2 mb-1 mt-6">REGD. OFFICE ADDRESS</p>
                                <p className=" text-sm mt-4 whitespace-nowrap">
                                    News Aggregator Private Limited, <br />1st Floor, Parul University,
                                    <br />PIT, Waghodiya, Limda, <br />Vadodara, 560030,
                                    <br />Gujarat, India <br />CIN: U72200KA2013PTC097389
                                </p>
                                <div className=" mt-6">
                                    <p className="text-sm">© News Aggregator 2024</p>
                                    <p className="text-sm">All Rights Reserved</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="circle absolute bottom-0 right-0 mb-10 mr-10 w-24 h-24 border-white rounded-full border-solid border-[2px]">
                    <div className="relative text">
                        <p className="absolute text-sm text-[10px] font-bold">News Aggregator - News Aggregator - </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"  onClick={scrollToTop}>
                        <FaArrowUp/>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Footer;