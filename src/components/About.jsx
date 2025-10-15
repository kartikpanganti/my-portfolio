import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCloud, FaDatabase, FaGlobe, FaRobot, FaBolt, FaServer } from 'react-icons/fa';

const About = () => {
  const details = {
    bio: `Full-stack developer specializing in React and Node.js. Currently pursuing B.Tech in CSE at CMRIT. 
    Passionate about creating efficient, scalable solutions and exploring new technologies.`,
    focus: [
      { 
        title: 'Web Development', 
        desc: 'React, Node.js, Modern JavaScript',
        icon: <FaCode className="text-blue-500" />,
        color: "from-blue-400 to-cyan-500"
      },
      { 
        title: 'Cloud & DevOps', 
        desc: 'AWS, Docker, CI/CD',
        icon: <FaCloud className="text-purple-500" />,
        color: "from-purple-400 to-pink-500"
      },
      { 
        title: 'Data Structures', 
        desc: 'Algorithmic problem solving',
        icon: <FaDatabase className="text-green-500" />,
        color: "from-green-400 to-emerald-500"
      }

    ],
    interests:[
      { key: 'Open Source', icon: <FaGlobe className="text-blue-500" />, color: "from-blue-400 to-cyan-500" },
      { key: 'AI/ML', icon: <FaRobot className="text-purple-500" />, color: "from-purple-400 to-pink-500" },
      { key: 'System Design', icon: <FaBolt className="text-yellow-500" />, color: "from-yellow-400 to-orange-500" },
      { key: 'Cloud Computing', icon: <FaServer className="text-indigo-500" />, color: "from-indigo-400 to-blue-500" }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/5 to-transparent dark:via-primary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Developer, learner, and tech enthusiast
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Bio Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="group relative mb-12"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            
            <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                {details.bio}
              </p>
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {details.focus.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />
                
                <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                      <div className="text-3xl text-white">
                        {item.icon}
                      </div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-secondary-light dark:group-hover:from-primary-dark dark:group-hover:to-secondary-dark transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interests */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-light via-primary-light to-secondary-light dark:from-secondary-dark dark:via-primary-dark dark:to-secondary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            
            <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Areas of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Interest</span>
              </h3>
              
              <div className="flex flex-wrap gap-4 justify-center">
                {details.interests.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group/item"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-full opacity-50 group-hover/item:opacity-100 blur transition duration-300`} />
                    
                    <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <motion.div 
                        className="text-2xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {item.key}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;