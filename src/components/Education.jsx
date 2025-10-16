import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaBook } from 'react-icons/fa';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      institution: "CMR Institute of Technology",
      duration: "2021 - 2025",
      gpa: "8.7/10",
      achievements: [
        "Developed full-stack applications using React and Node.js",
        "Led team projects in software development",
        "Participated in coding competitions and hackathons",
        "Active member of the College Technical Club"
      ],
      courses: [
        "Data Structures & Algorithms",
        "Web Development",
        "Machine Learning",
        "Cloud Computing",
        "Database Systems"
      ]
    }
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
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
            Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Background</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Academic journey and achievements in computer science
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-start gap-6">
                  {/* Icon Container */}
                  <motion.div 
                    className="flex-shrink-0"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark shadow-lg">
                      <FaGraduationCap className="text-4xl text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <motion.h3 
                          className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all"
                        >
                          {edu.degree}
                        </motion.h3>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {edu.field}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {edu.duration}
                        </p>
                      </div>
                    </div>
                    
                    {/* GPA Badge */}
                    {edu.gpa && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                      >
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                          <p className="text-sm font-bold text-white flex items-center gap-2">
                            <FaAward />
                            GPA: {edu.gpa}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Key Courses */}
                      {edu.courses && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                            <FaBook className="text-primary-light dark:text-primary-dark" />
                            Key Courses
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm"
                              >
                                {course}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Achievements */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                            <FaAward className="text-secondary-light dark:text-secondary-dark" />
                            Achievements
                          </h4>
                          <ul className="space-y-3">
                            {edu.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                whileHover={{ x: 5 }}
                                className="flex items-start text-sm text-gray-700 dark:text-gray-300 group/item"
                              >
                                <span className="mr-2 mt-1 text-primary-light dark:text-primary-dark font-bold group-hover/item:scale-125 transition-transform">▹</span>
                                <span className="leading-relaxed">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;