// src/components/Support.js
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_c4fs5dj', 'template_1q1p6uq', form.current, 'bNphPVuMuzYLkPSKZ')
      .then((result) => {
        console.log(result.text);
        toast.success("Message sent successfully!");
      }, (error) => {
        console.log(error.text);
        toast.error("Failed to send the message. Please try again.");
      });

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className="support-page bg-black py-10">
      <div className="container mx-auto px-4">
        <section id="contact" className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-8 text-white">Support</h1>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 w-full max-w-lg bg-[#212121] p-8 rounded-lg shadow-lg">
            <div className="formGroup flex flex-col">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                name="from_name"
                id="name"
                placeholder="Name"
                required
                className="p-3 border rounded-lg w-full bg-gray-800 text-white placeholder-gray-400"
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
                className="p-3 border rounded-lg w-full bg-gray-800 text-white placeholder-gray-400"
              />
            </div>
            <div className="formGroup flex flex-col">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                required
                className="p-3 border rounded-lg w-full h-32 bg-gray-800 text-white placeholder-gray-400"
              ></textarea>
            </div>
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 text-white font-bold p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors w-full"
            />
          </form>
        </section>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Support;
