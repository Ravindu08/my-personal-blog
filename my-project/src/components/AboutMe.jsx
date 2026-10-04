import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaRobot } from 'react-icons/fa';

const skills = [
  { name: 'Frontend', text: 'React, Tailwind CSS, Vue', icon: <FaCode className="text-teal-400 text-2xl mb-3"/> },
  { name: 'Backend', text: 'Node.js, Python, FastAPI', icon: <FaServer className="text-indigo-400 text-2xl mb-3"/> },
  { name: 'AI & Data', text: 'TensorFlow, LangChain, Pandas', icon: <FaRobot className="text-pink-400 text-2xl mb-3"/> }
];

const AboutMe = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Hello! I'm Ravindu.</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              I am a dedicated Software Engineer based in Sri Lanka, specializing in full-stack development and artificial intelligence. My passion lies in solving complex problems and turning innovative ideas into reality through clean, efficient code.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              When I'm not coding, you can find me writing tech blogs, contributing to open-source, or exploring the latest trends in machine learning.
            </p>
            <button className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors shadow-lg">
              Download Resume
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                {skill.icon}
                <h4 className="font-bold text-slate-800 text-lg mb-2">{skill.name}</h4>
                <p className="text-slate-500 text-sm">{skill.text}</p>
              </div>
            ))}
            <div className="bg-gradient-to-br from-[#00A39C] to-indigo-600 p-6 rounded-2xl shadow-xl flex flex-col justify-center items-center text-white hover:-translate-y-2 transition-transform duration-300">
              <span className="text-4xl font-extrabold mb-2">3+</span>
              <span className="font-medium text-center">Years of Experience</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutMe;
