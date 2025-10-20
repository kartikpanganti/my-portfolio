import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaAws,
  FaCloud,
  FaReact,
  FaCode,
  FaGraduationCap,
  FaAward,
  FaFileAlt
} from 'react-icons/fa';

const Certifications = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const certifications = [


    {
      id: 1,
      title: "'WINNER - Nation Level Hackathon CHAKRAVYUH 1.0 PHANDHARPUR. ",
      issuer: "SVERI's College of Engineering",
      date: "March 2025",
      icon: <FaAward className="text-4xl text-yellow-500" />,
      credentialId: "",
      verifyLink: "https://www.linkedin.com/posts/om-swami-2ab165261_chakravyuh1-ieee-medicalinventorysystem-ugcPost-7318266383178350593-F9m3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6TwA4B95oRizwv7Fb72SJRH4qg8GCdTQY",
      buttonType: "achievement",
      skills: [],
      description: "Secured 2nd Place in the Nation Level Hackathon CHAKRAVYUH 1.0 organized by IEEE at SVERI's College of Engg. Phandarpur, showcasing innovative problem-solving skills and teamwork."
    },

    {
      id: 5,
      title: "Research Paper Publication - JETIR Journal (Volume 12, Issue 5)",
      issuer: "Journal of Emerging Technologies and Innovative Research (JETIR)",
      date: "May 2025",
      icon: <FaFileAlt className="text-4xl text-blue-500" />,
      credentialId: "JETIR2505434 | Registration: 561914",
      verifyLink: "https://www.jetir.org/view?paper=JETIR2505434",
      pdfLink: "https://www.jetir.org/papers/JETIR2505434.pdf",
      buttonType: "publication",
      skills: ["Research", "Technical Writing", "Academic Publishing", "Engineering"],
      description: "Published research paper in JETIR Journal (Volume 12, Issue 5, May 2025) with DOI and ISSN: 2349-5162. Research focused on Engineering domain from Solapur, Maharashtra, India."
    },
   
    {
      id: 2,
      title: "Frontend Web Development using JavaScript and React.js course.",
      issuer: "DevTown",
      date: "January 2024",
      icon: <FaReact className="text-4xl text-cyan-500" />,
      credentialId: "GCP-DEV-789012",
      verifyLink: "https://www.cert.devtown.in/verify/2cXW8F",
      buttonType: "certificate",
      skills: ["React", "JavaScript", "Tailwind CSS", "Frontend Web Development"],
      description: "In-depth course on building responsive web applications using React.js and modern JavaScript."
    },
    {
      id: 3,
      title: "Backend Web Development using Node.js and Express.js course.",
      issuer: "DevTown",
      date: "January 2024",
      icon: <FaReact className="text-4xl text-cyan-500" />,
      credentialId: "GCP-DEV-789013",
      verifyLink: "https://www.cert.devtown.in/verify/2rV5sh",
      buttonType: "certificate",
      skills: ["Node.js", "Express.js", "MongoDB", "Backend Web Development"],
      description: "In-depth course on building RESTful APIs and web applications using Node.js and Express.js."
    },
    {
      id: 4,
      title: "'Project Management for Beginners' course",
      issuer: "Simplilearn",
      date: "November 2023",
      icon: <FaGraduationCap className="text-4xl text-yellow-500" />,
      credentialId: "PMB-123456",
      verifyLink: "https://www.linkedin.com/posts/kartikpanganti_projectmanagement-careerroadmap-newbeginnings-activity-7122431654622621696-x2OZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6TwA4B95oRizwv7Fb72SJRH4qg8GCdTQY",
      buttonType: "certificate",
      skills: ["Project Management", "Agile", "Scrum", "Leadership"],
      description: "Comprehensive course covering the fundamentals of project management, methodologies, and best practices."
    },
  ];

  const filteredCertifications = certifications;

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
  <section id="certifications" className="py-20 relative overflow-hidden" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
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

        {/* Filters removed — showing all certifications */}

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
                    <div className="flex items-start justify-start mb-4">
                      <div className="text-4xl">
                        {cert.icon}
                      </div>
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
                  {cert.buttonType === 'publication' ? (
                    <div className="flex flex-col gap-2">
                      <motion.a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span>View Publication</span>
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </motion.a>
                      <motion.a
                        href={cert.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span>Download / View Paper</span>
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </motion.a>
                    </div>
                  ) : (
                    <motion.a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                        cert.buttonType === 'achievement'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      }`}
                    >
                      <span>
                        {cert.buttonType === 'achievement' ? 'Verify Achievement' : 'Verify Certificate'}
                      </span>
                      <FaExternalLinkAlt className="ml-2 text-sm" />
                    </motion.a>
                  )}
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

  {/* No stats section here. Certifications grid ends above. */}
      </div>
    </section>
  );
};

export default Certifications;
