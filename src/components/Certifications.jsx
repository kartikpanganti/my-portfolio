import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCertificate, 
  FaAward, 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaTrophy,
  FaMedal,
  FaStar,
  FaAws,
  FaCloud,
  FaReact,
  FaCode,
  FaGraduationCap
} from 'react-icons/fa';

const Certifications = () => {
  const [filter, setFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      category: "Cloud",
      icon: <FaAws className="text-4xl text-orange-500" />,
      credentialId: "AWS-CERT-123456",
      verifyLink: "https://aws.amazon.com/verification",
      skills: ["AWS", "Cloud Architecture", "DevOps"],
      description: "Professional-level certification demonstrating expertise in designing distributed systems on AWS.",
      badge: <FaTrophy className="text-yellow-400" />
    },
    {
      id: 2,
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "January 2024",
      category: "Cloud",
      icon: <FaCloud className="text-4xl text-blue-500" />,
      credentialId: "GCP-DEV-789012",
      verifyLink: "https://cloud.google.com/certification",
      skills: ["GCP", "Cloud Development", "Kubernetes"],
      description: "Demonstrates proficiency in building scalable applications on Google Cloud Platform.",
      badge: <FaMedal className="text-blue-400" />
    },
    {
      id: 3,
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "December 2023",
      category: "Development",
      icon: <FaReact className="text-4xl text-cyan-500" />,
      credentialId: "UC-REACT-345678",
      verifyLink: "https://udemy.com/certificate",
      skills: ["React", "Redux", "Next.js"],
      description: "Comprehensive course covering React fundamentals to advanced concepts.",
      badge: <FaStar className="text-purple-400" />
    },
    {
      id: 4,
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "November 2023",
      category: "Cloud",
      icon: <FaCloud className="text-4xl text-blue-600" />,
      credentialId: "MS-AZ-900-456789",
      verifyLink: "https://microsoft.com/learn",
      skills: ["Azure", "Cloud Services", "Virtual Machines"],
      description: "Foundation-level knowledge of cloud services and Azure platform.",
      badge: <FaAward className="text-green-400" />
    },
    {
      id: 5,
      title: "Full Stack Web Development",
      issuer: "Coursera",
      date: "September 2023",
      category: "Development",
      icon: <FaGraduationCap className="text-4xl text-blue-500" />,
      credentialId: "COURSERA-FS-567890",
      verifyLink: "https://coursera.org/verify",
      skills: ["HTML", "CSS", "JavaScript", "Node.js"],
      description: "Comprehensive specialization covering front-end and back-end development.",
      badge: <FaCertificate className="text-indigo-400" />
    },
    {
      id: 6,
      title: "Advanced JavaScript Concepts",
      issuer: "Udemy",
      date: "August 2023",
      category: "Development",
      icon: <FaCode className="text-4xl text-purple-600" />,
      credentialId: "UC-JS-678901",
      verifyLink: "https://udemy.com/certificate",
      skills: ["JavaScript", "ES6+", "Async/Await"],
      description: "Deep dive into advanced JavaScript patterns and best practices.",
      badge: <FaStar className="text-yellow-400" />
    }
  ];

  const categories = ['All', 'Cloud', 'Development'];

  const filteredCertifications = filter === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
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
    <section id="certifications" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-light/5 to-transparent dark:via-secondary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Achievements</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white shadow-lg'
                  : 'backdrop-blur-md bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-light dark:hover:border-primary-dark'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard(cert.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                
                <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="p-6">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl"
                      >
                        {cert.icon}
                      </motion.div>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl"
                      >
                        {cert.badge}
                      </motion.div>
                    </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {cert.issuer}
                  </p>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <FaCalendarAlt className="mr-2" />
                    <span>{cert.date}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential ID */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="font-semibold">ID: </span>
                    {cert.credentialId}
                  </div>

                  {/* Verify Link */}
                  <motion.a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>Verify Certificate</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </motion.a>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === cert.id ? 0.05 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 pointer-events-none rounded-2xl"
                />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: "Total Certifications", value: certifications.length, icon: <FaCertificate /> },
            { label: "Cloud Certifications", value: certifications.filter(c => c.category === "Cloud").length, icon: <FaTrophy /> },
            { label: "Development Courses", value: certifications.filter(c => c.category === "Development").length, icon: <FaAward /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg"
            >
              <div className="text-4xl mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
