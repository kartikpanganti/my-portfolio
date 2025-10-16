import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaGit, FaDocker, FaHtml5, FaCss3Alt, FaAws } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiRedux, SiGraphql, SiPostgresql } from 'react-icons/si';

const Skills = () => {
  const skills = [
    {
      category: "Frontend Development",
      items: [
        { name: "React", icon: <FaReact className="text-cyan-400" />, level: 90, color: "from-cyan-400 to-blue-500" },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, level: 90, color: "from-yellow-400 to-yellow-600" },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-500" />, level: 85, color: "from-blue-400 to-blue-600" },
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: 95, color: "from-orange-400 to-orange-600" },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: 95, color: "from-blue-400 to-blue-600" },
        { name: "Tailwind", icon: <SiTailwindcss className="text-teal-400" />, level: 90, color: "from-teal-400 to-cyan-500" },
        { name: "Redux", icon: <SiRedux className="text-purple-500" />, level: 85, color: "from-purple-400 to-purple-600" },
      ]
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 85, color: "from-green-400 to-green-600" },
        { name: "Python", icon: <FaPython className="text-blue-400" />, level: 80, color: "from-blue-300 to-yellow-400" },
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: 80, color: "from-green-400 to-green-600" },
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" />, level: 75, color: "from-blue-400 to-blue-600" },
        { name: "GraphQL", icon: <SiGraphql className="text-pink-500" />, level: 75, color: "from-pink-400 to-purple-500" },
      ]
    },
    {
      category: "Tools & DevOps",
      items: [
        { name: "Git", icon: <FaGit className="text-orange-500" />, level: 85, color: "from-orange-400 to-red-500" },
        { name: "Docker", icon: <FaDocker className="text-blue-400" />, level: 75, color: "from-blue-400 to-blue-600" },
        { name: "AWS", icon: <FaAws className="text-orange-400" />, level: 70, color: "from-orange-300 to-yellow-500" },
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
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/5 to-transparent dark:via-primary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.22 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Technologies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {skills.map((category, index) => (
            <motion.div 
              key={index}
              variants={categoryVariants}
              className="backdrop-blur-md bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full" />
                {category.category}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((skill, skillIndex) => (
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
                      {/* Icon with glow effect */}
                      <motion.div 
                        className="text-5xl mb-3 relative"
                        transition={{ duration: 0.18 }}
                      >
                        <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity">
                          {skill.icon}
                        </div>
                        <div className="relative">
                          {skill.icon}
                        </div>
                      </motion.div>
                      
                      {/* Skill name */}
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">
                        {skill.name}
                      </span>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: skillIndex * 0.03 }}
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        />
                      </div>
                      
                      {/* Skill level badge */}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;