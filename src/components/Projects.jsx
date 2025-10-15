import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Texlaire from '../assets/project_cover/texlaire.png';
import Portfolio from '../assets/project_cover/portfolio.png';
import { te } from 'date-fns/locale';

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Modern portfolio built with React, featuring dark mode, animations, and responsive design",
      image: Portfolio,
      technologies: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
      github: "https://github.com/kartikpanganti/portfolio",
      demo: "https://kartikpanganti.com",
      category: "Web Development"
    },
    {
      title: "texlaire",
      description: "texlaire is an AI-powered writing assistant that helps users generate high-quality content quickly and efficiently.",
      image: Texlaire,
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/kartikpanganti/ecommerce",
      demo: "https://ecommerce-demo.kartikpanganti.com",
      category: "Full Stack"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-light/5 to-transparent dark:via-secondary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={projectVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                
                <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="aspect-video relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Overlay on hover */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
                    >
                      <div className="flex gap-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                          title="View Source Code"
                        >
                          <FaGithub className="text-xl" />
                          <span className="text-sm font-medium">Code</span>
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-lg text-white hover:shadow-lg transition-all"
                          title="View Live Demo"
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          <span className="text-sm font-medium">Live Demo</span>
                        </motion.a>
                      </div>
                    </motion.div>
                    
                    {/* Category Badge */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute top-4 right-4"
                    >
                      <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white rounded-full shadow-lg backdrop-blur-sm">
                        {project.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all duration-300"
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;