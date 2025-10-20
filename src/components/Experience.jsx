import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      role: "Full Stack Java Developer Intern",
      company: "Symbiosis International University",
      duration: "Dec 2024 - Apr 2025",
      location: "On-site",
      type: "Full-time",
      color: "from-purple-500 to-pink-500",
      description: [
        "Developed RESTful APIs using Spring Boot",
        "Implemented front-end components with React",
        "Managed database schemas and queries with MySQL",
      ],
      technologies: ["Java", "Spring Boot", "React", "MySQL",]
    },
    {
      role: "Open Source Contributor",
      company: "Various Projects",
      duration: "2025 - Present",
      location: "Remote",
      type: "Software Developer",
      color: "from-green-500 to-emerald-500",
      description: [
        "Contributing open-source projects",
        "Implementing new features and fixing bugs",
        "Small business solutions",
        "Collaborating with global developer community",
      ],
      technologies: ["WebApps", "Mobile Apps", "MERN-STACK", "Django", "Flask", "APIs", "UI/UX Design"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
  <section id="experience" className="py-20 relative overflow-hidden" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-light/5 to-transparent dark:via-secondary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Experience</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional journey and key contributions in software development
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 10 }}
              className="group relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 top-8 hidden md:block">
                <motion.div 
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} shadow-lg`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                {index !== experiences.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-0.5 h-full bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600 dark:to-transparent" 
                       style={{ height: 'calc(100% + 2rem)' }} 
                  />
                )}
              </div>

              {/* Gradient border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
              
              <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 md:ml-8">
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                        <div className="flex-shrink-0">
                          <div className={`p-4 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}>
                            <FaBriefcase className="text-2xl text-white" />
                          </div>
                        </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 mb-3">
                      <div className="min-w-0 flex-1">
                        <motion.h3 
                          className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all"
                        >
                          {exp.role}
                        </motion.h3>
                        <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                          {exp.company}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FaClock className="text-primary-light dark:text-primary-dark" />
                          <span className="font-medium">{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="text-secondary-light dark:text-secondary-dark" />
                          <span>{exp.location} • {exp.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {exp.description.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-start text-sm text-gray-700 dark:text-gray-300 group/item"
                        >
                          <span className="mr-2 mt-1 text-primary-light dark:text-primary-dark font-bold group-hover/item:scale-125 transition-transform">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {exp.duration.includes('Present') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-3 -right-3"
                  >
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                      <span className="text-xs font-bold text-white">Current</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;