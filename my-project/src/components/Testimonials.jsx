import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Nimal Perera',
      role: 'Student, Computer Science',
      quote: 'The Ravindu Labs is a good place to share your work, but I wish the review process was a bit quicker. The feedback was helpful and the team was friendly.'
    },
    {
      name: 'Sajini Fernando',
      role: 'Student, Information Systems',
      quote: 'I liked how easy it was to submit my article. The platform is user-friendly, but I would love to see more topics covered in the future.'
    },
    {
      name: 'Ruwan Jayasuriya',
      role: 'Student, Electronics Engineering',
      quote: 'Getting published here helped me build my confidence. The process took some time, but the end result was worth it.'
    },
  ];

  return (
    <section className="py-24 bg-slate-50 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">What Our Authors Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Success stories from published authors on the Ravindu Labs platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                <span className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-2xl text-slate-500">
                  <FaUser />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
