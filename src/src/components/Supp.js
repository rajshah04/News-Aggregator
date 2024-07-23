import React, { useRef, useContext } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import Footer from './Footer';
import Navbar from './Navbar';
import { ThemeContext } from './ThemeContext';

const Support = () => {
  const form = useRef();
  const { theme } = useContext(ThemeContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_c4fs5dj', 'template_1q1p6uq', form.current, 'bNphPVuMuzYLkPSKZ')
      .then((result) => {
        console.log(result.text);
        toast.success("Message Sent!");
      }, (error) => {
        console.log(error.text);
        toast.error("Failed to send the message. Please try again.");
      });

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className={`support-page ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} `}>
      <Navbar />
      <div className="container mx-auto px-4">
        <section id="contact" className="flex flex-col items-center text-center">
          <h1 className={`text-4xl font-bold mb-8 ${theme === 'light' ? 'text-white' : 'text-black'}`}>Support</h1>
          <form ref={form} onSubmit={sendEmail} className={`flex flex-col gap-6 w-full max-w-lg p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div className="formGroup flex flex-col">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                name="from_name"
                id="name"
                placeholder="Name"
                required
                className={`p-3 border rounded-lg w-full ${theme === 'light' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'}`}
              />
            </div>
            <div className="formGroup flex flex-col">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                name="reply_to"
                id="email"
                placeholder="Email"
                required
                className={`p-3 border rounded-lg w-full ${theme === 'light' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'}`}
              />
            </div>
            <div className="formGroup flex flex-col">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                required
                className={`p-3 border rounded-lg w-full h-32 ${theme === 'light' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'}`}
              ></textarea>
            </div>
            <input
              type="submit"
              value="Submit"
              className={`bg-blue-500 text-white font-bold p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-full ${theme === 'light' ? 'hover:bg-blue-700' : 'hover:bg-blue-400'}`}
            />
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
