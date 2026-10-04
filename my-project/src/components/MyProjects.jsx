import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'AI Image Generator',
    description: 'A full-stack application that uses generative AI models to create stunning visuals from text prompts.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800',
    tags: ['React', 'Python', 'FastAPI'],
    github: '#',
    live: '#'
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'A real-time analytics dashboard for e-commerce platforms with live sales tracking and predictive insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
    tags: ['Vue', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#'
  },
  {
    title: 'Personal Portfolio',
    description: 'A modern, highly responsive personal portfolio website with glassmorphism and smooth animations.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800',
    tags: ['React', 'Tailwind', 'Framer'],
    github: '#',
    live: '#'
  }
];

const MyProjects = () => {
  return (
    <section id="projects" className="py-24 bg-white px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg">
            Here are some of the things I've built. I love combining clean code with beautiful design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-semibold bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-slate-500">
                  <a href={project.github} className="hover:text-slate-800 transition-colors flex items-center gap-2 text-sm font-bold">
                    <FaGithub size={18} /> Code
                  </a>
                  <a href={project.live} className="hover:text-[#00A39C] transition-colors flex items-center gap-2 text-sm font-bold">
                    <FaExternalLinkAlt size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MyProjects;
