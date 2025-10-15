import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import RESUMEE from '../assets/RESUME.pdf';

const FloatingParticles = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 2, 5]} intensity={0.8} />
      <Sphere args={[1, 50, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0.5}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50], { 
    clamp: true // Prevents over-scrolling
  });

  // Simplified variants with reduced animation complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background-light to-gray-50 dark:from-background-dark dark:to-gray-900"
    >
      {/* Animated background - Only render 3D on desktop for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <FloatingParticles />
        </div>
      )}
      
      {/* Simple gradient background for mobile */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24 lg:py-32 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 md:gap-12"
        >
          <motion.div 
            style={{ y }}
            className="md:w-1/2 mb-6 md:mb-0"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-3 sm:mb-6"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
                Kartik Panganti
              </span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 h-12 sm:h-16 font-heading"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  1000,
                  'Web Developer',
                  1000,
                  'Problem Solver',
                  1000,
                  'Tech Enthusiast',
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg max-w-lg"
            >
              Recent CSE graduate with a foundation in web development and a growing interest in AI. I enjoy turning ideas into projects and continuously improving my skills
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Let's Connect
              </motion.a>
              <motion.a 
                href={RESUMEE} download="Kartik_Panaganti_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark rounded-full font-medium hover:bg-primary-light/5 dark:hover:bg-primary-dark/5 transition-colors duration-300"
              >
                My Resume
              </motion.a>
            </motion.div>
            

            <motion.div 
              variants={itemVariants}
              className="flex mt-6 sm:mt-12 space-x-4 sm:space-x-6"
            >
              
              {[
                { icon: FaGithub, href: "https://github.com/kartikpanaganti" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/kartikpanaganti" },
                { icon: FaXTwitter, href: "https://x.com/kartikpanaganti"}
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
                >
                  <social.icon size={24} className="sm:w-7 sm:h-7" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 relative"
            style={{ y }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[500px] lg:h-[500px]">
              {/* Profile Image Container */}
              <div className="relative w-full h-full">
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark opacity-50 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Gradient Border */}
                <div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark opacity-70"
                />

                {/* Image Wrapper */}
                <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/80 dark:ring-gray-800/80 backdrop-blur-sm">
                  <img
                    src="/profile1.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dynamic Decorative Elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-16 h-16"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 blur-lg" />
                </motion.div>

                <motion.div 
                  className="absolute -bottom-6 -left-6 w-20 h-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-secondary-light/20 to-primary-light/20 dark:from-secondary-dark/20 dark:to-primary-dark/20 blur-lg" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-0 w-full flex justify-center pb-2 sm:pb-6 md:pb-8 z-20">
        <div className="flex flex-col items-center opacity-75">
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Scroll to explore</span>
          <div className="w-4 h-6 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;