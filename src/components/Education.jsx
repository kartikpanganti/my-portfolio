import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaBook } from 'react-icons/fa';

import { useModal } from '../contexts/ModalContext';

const hackathonImages = [
  {
    type: 'image',
    src: '/src/assets/modal_image/Hackathon/hack1.jpg',
    alt: 'Hackathon GROUP PHOTO',
    description: 'Prize Distribution by Hackathon Sponsors IEEE Bombay Section',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Hackathon/hack2.jpg',
    alt: 'Hackathon Coding Time',
    description: 'Team Brainstorming ideas for the Project',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Hackathon/hack3.jpg',
    alt: 'Trophy and Certificate Award',
    description: 'Winning trophy and certificate for the hackathon',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Hackathon/hack4.jpg',
    alt: 'CERTIFICATE PHOTO',
    description: 'Certificate awarded for participation in the hackathon',
  }
  ,
  {
    type: 'image',
    src: '/src/assets/modal_image/Hackathon/hack5.jpg',
    alt: 'Heading From Solapur to Phandarpur SVERI College',
    description: 'Appreciation from our college media',
  },
];

const prayogImages = [
  // Add your Prayog2k25 images here, example:
  {
    type: 'image',
    src: '/src/assets/modal_image/Prayog2k25/prayog1.jpg',
    alt: 'PRAYOG 2K25 Event',
    description: 'Prayog 2K25 Team with our Team Mentor for PRAYOG 2K25 image',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Prayog2k25/prayog2.jpg',
    alt: 'PRAYOG 2K25 Event',
    description: 'Certificate of Achievement for PRAYOG 2K25',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Prayog2k25/prayog3.jpg',
    alt: 'PRAYOG 2K25 Event',
    description: 'Winning Moment at PRAYOG 2K25',
  },
  {
    type: 'image',
    src: '/src/assets/modal_image/Prayog2k25/prayog4.jpg',
    alt: 'PRAYOG 2K25 Event',
    description: 'Our Project Idea and Presentation at PRAYOG 2K25',
  }

];

const Education = () => {
  const { showModal } = useModal();

  const education = [
    {
      degree: "B.Tech",
      field: "Computer Science and Engineering",
      institution: "N B Navale Sinhgad College of Engineering, Kegaon, Solapur",
      duration: "2021 - 2025",
      gpa: "8.28/10",
      achievements: [
        "🏆 Winner in National Level Hackathon – CHAKRAVYUH 1.0, organized by SVERI’s College of Engineering, Pandharpur and sponsored by IEEE Bombay Section.",
        "🎯 Member of the Core Committee, contributing to the Technical and Decoration Teams for various College and Department events.",
        "🏅 PRAYOG 2K25 Winner - Intercollegiate Project Competition held by N B Navale Sinhgad College of Engg. ,Solapur",
        "🔥 Full Stack Java Developer Certification from Symbiosis International University.",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Web Technologies",
        "Full Stack Development",
        "Operating Systems",
        "Computer Networks",
        "Database Management Systems",
        "Data Science Fundamentals",
      ]
    }
  ];

  return (
  <section id="education" className="py-20 relative overflow-hidden" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
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
                    <div className="flex flex-col gap-2 md:gap-4 mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
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
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
                        {edu.gpa && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block w-fit"
                          >
                            <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg">
                              <p className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                                <FaAward className="text-sm md:text-base flex-shrink-0" />
                                GPA: {edu.gpa}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    {/* GPA Badge removed (now only appears once, right of the college name) */}

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
                            {edu.achievements.map((achievement, i) => {
                              // Add link to open hackathon modal for the hackathon achievement
                              const isHackathon = achievement.includes('CHAKRAVYUH 1.0');
                              const isPrayog = achievement.includes('PRAYOG 2K25');
                              return (
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
                                  <span className="leading-relaxed">
                                    {isHackathon ? (
                                      <>
                                        {achievement.replace('IEEE Bombay Section.', 'IEEE Bombay Section')}
                                        <span className="inline-flex items-center gap-2 ml-2 flex-shrink-0">
                                          <button
                                            className="px-3 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                                            onClick={() => window.open('https://www.linkedin.com/posts/om-swami-2ab165261_chakravyuh1-ieee-medicalinventorysystem-ugcPost-7318266383178350593-F9m3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6TwA4B95oRizwv7Fb72SJRH4qg8GCdTQY')}
                                          >
                                            Learn More
                                          </button>
                                          <button
                                            className="px-3 py-1 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white text-xs font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1"
                                            onClick={() => showModal({
                                              title: "National Level Hackathon CHAKRAVYUH 1.0 PHANDHARPUR by SVERI's College of Engineering",
                                              description: 'Photos and videos from the national level hackathon.',
                                              media: hackathonImages,
                                            })}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15l-5-5-4 4-6-6" /></svg>
                                            Photos
                                          </button>
                                        </span>
                                      </>
                                    ) : isPrayog ? (
                                      <>
                                        {achievement}
                                        <span className="inline-flex items-center gap-2 ml-2 flex-shrink-0">
                                          <button
                                            className="px-3 py-1 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white text-xs font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1"
                                            onClick={() => showModal({
                                              title: 'PRAYOG 2K25 - Intercollegiate Project Competition',
                                              description: 'Photos and memories from the PRAYOG 2K25 project competition where I won first place.',
                                              media: prayogImages,
                                            })}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15l-5-5-4 4-6-6" /></svg>
                                            Photos
                                          </button>
                                        </span>
                                      </>
                                    ) : (
                                      achievement
                                    )}
                                  </span>
                                </motion.li>
                              );
                            })}
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