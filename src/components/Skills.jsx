import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaGit, FaDocker, FaHtml5, FaCss3Alt, FaAws,FaJava  } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiRedux, SiExpress,SiMysql ,SiCplusplus, SiPostgresql, SiVite, SiNextdotjs, SiPostman } from 'react-icons/si';

const Skills = () => {
  const skills = [
    {
      category: "Technical Skills",
      subcategories: [
        {
          name: "Frontend",
          items: [
            { name: "React", icon: <FaReact className="text-cyan-400" />, level: 65, color: "from-cyan-400 to-blue-500" },
            { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 75, color: "from-orange-400 to-orange-600" },
            { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: 70, color: "from-blue-400 to-blue-600" },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, level: 75, color: "from-teal-400 to-cyan-500" },
            { name: "Redux", icon: <SiRedux className="text-purple-500" />, level: 70, color: "from-purple-400 to-purple-600" },
            { name: "Next.js", icon: <SiNextdotjs className="text-gray-500" />, level: 80, color: "from-gray-400 to-gray-600" },
          ]
        },
        {
          name: "Backend",
          items: [
            { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 65, color: "from-green-400 to-green-600" },
            { name: "Express", icon: <SiExpress className="text-pink-500" />, level: 85, color: "from-pink-400 to-purple-500" },
          ]
        },
        {
          name: "Programming Languages",
          items: [
            { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 75, color: "from-yellow-400 to-yellow-600" },
            { name: "Python", icon: <FaPython className="text-blue-400" />, level: 80, color: "from-blue-300 to-yellow-400" },
            { name: "C & C++", icon: <SiCplusplus className="text-blue-500" />, level: 65, color: "from-blue-400 to-blue-600" },
            { name: "Java", icon: <FaJava className="text-red-500" />, level: 70, color: "from-red-400 to-red-600" },
          ]
        },
        {
          name: "Databases",
          items: [
            { name: "MySQL", icon: <SiMysql className="text-blue-500" />, level: 75, color: "from-blue-400 to-blue-600" },
            { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 80, color: "from-green-400 to-green-600" },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" />, level: 75, color: "from-blue-400 to-blue-600" },
          ]
        },
        {
          name: "Tools & DevOps",
          items: [
            { name: "Git & Github", icon: <FaGit className="text-orange-500" />, level: 85, color: "from-orange-400 to-red-500" },
            { name: "Docker", icon: <FaDocker className="text-blue-400" />, level: 75, color: "from-blue-400 to-blue-600" },
            { name: "Vite", icon: <SiVite className="text-orange-400" />, level: 70, color: "from-orange-300 to-yellow-500" },
            { name: "Postman", icon: <SiPostman className="text-orange-500" />, level: 75, color: "from-orange-400 to-orange-600" },
          ]
        }
      ]
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Communication", icon: <span role="img" aria-label="communication">💬</span>, level: 90, color: "from-green-400 to-blue-400" },
        { name: "Planning", icon: <span role="img" aria-label="planning">🗂️</span>, level: 85, color: "from-yellow-400 to-orange-400" },
        { name: "Teamwork", icon: <span role="img" aria-label="teamwork">🤝</span>, level: 88, color: "from-purple-400 to-pink-400" },
        { name: "Problem Solving", icon: <span role="img" aria-label="problem solving">🧠</span>, level: 87, color: "from-blue-400 to-indigo-400" },
        { name: "Adaptability", icon: <span role="img" aria-label="adaptability">🌱</span>, level: 85, color: "from-teal-400 to-green-400" },
        { name: "Quick Learner", icon: <span role="img" aria-label="quick learner">⚡</span>, level: 90, color: "from-yellow-300 to-yellow-500" },
        { name: "Attention to Detail", icon: <span role="img" aria-label="attention to detail">🔎</span>, level: 92, color: "from-pink-300 to-pink-500" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.13
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.09
      }
    }
  };

  return (
  <section id="skills" className="py-2 md:py-3 relative overflow-hidden" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/5 to-transparent dark:via-primary-dark/5" />
  <div className="container mx-auto px-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.22 }}
          className="text-center mb-2"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Technologies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-2">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto space-y-2"
        >
          {skills.map((category, index) => (
            <motion.div 
              key={index}
              variants={categoryVariants}
              className={
                category.category === 'Technical Skills'
                  ? "backdrop-blur-md bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-gray-700 shadow-2xl hover:shadow-2xl transition-shadow duration-300"
                  : "backdrop-blur-md bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 md:p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              }
            >
              <h3 className="text-lg font-bold mb-1 text-gray-800 dark:text-white flex items-center gap-1">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full" />
                {category.category}
              </h3>
              {/* If technical skills, render subcategories, else render items directly */}
              {category.subcategories ? (
                <div className="space-y-4">
                  {category.subcategories.map((subcat, subIdx) => (
                    <div
                      key={subIdx}
                     className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-cyan-100 dark:border-gray-700 rounded-xl shadow-md p-4 md:p-6"
                    >
                      <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{subcat.name}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7">
                        {subcat.items.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            variants={skillVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative"
                          >
                            {/* Card with gradient border effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl blur transition duration-300" 
                                 style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                            />
                            <div className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                              {/* Icon without colored/gradient background */}
                              <motion.div 
                                className="text-5xl mb-3 relative flex items-center justify-center"
                                transition={{ duration: 0.18 }}
                              >
                                <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                                  {skill.icon}
                                </div>
                                <div className="relative">
                                  {skill.icon}
                                </div>
                              </motion.div>
                              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">
                                {skill.name}
                              </span>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: skillIndex * 0.03 }}
                                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                />
                              </div>
                              <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {skill.level}%
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-cyan-100 dark:border-gray-700 rounded-xl shadow-md p-3 md:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7">
                    {category.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        variants={skillVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl blur transition duration-300" 
                             style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                        />
                        <div className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                          <motion.div 
                            className="text-5xl mb-3 relative flex items-center justify-center"
                            transition={{ duration: 0.18 }}
                          >
                            <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                              {skill.icon}
                            </div>
                            <div className="relative">
                              {skill.icon}
                            </div>
                          </motion.div>
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;