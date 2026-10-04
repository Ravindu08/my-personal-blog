// src/pages/Contact.jsx
import React from 'react';
const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8">Get In Touch</h1>
      <p className="text-base sm:text-lg text-light-text">
        For inquiries about article submissions, collaborations, or the IEEE IAS UWU Student Branch, please contact us.
      </p>
      <a href="mailto:ias.uwu@ieee.org" className="text-lg sm:text-xl text-ieee-blue font-bold hover:underline mt-4 inline-block break-all">
        ias.uwu@ieee.org
      </a>
    </div>
  );
};
export default Contact;