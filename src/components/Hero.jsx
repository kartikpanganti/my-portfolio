import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaShare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useRef, useState, useEffect } from 'react';
import RESUMEE from '../assets/RESUME.pdf';
import profileImage from '../assets/profile.png';

// Video background component with theme-aware overlay
const VideoBackground = () => {
  const [isDark, setIsDark] = useState(false);
  const darkVideoRef = useRef(null);
  const lightVideoRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Ensure both videos are loaded and play on mount
  useEffect(() => {
    if (darkVideoRef.current) {
      darkVideoRef.current.play().catch(() => {});
    }
    if (lightVideoRef.current) {
      lightVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark mode video (using LightBackround.mp4 - to be renamed as DarkThemeBackround.mp4) */}
      <video
        ref={darkVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ 
          filter: 'brightness(0.7) contrast(1.15) saturate(1.1)',
          opacity: isDark ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <source src="/LightBackround.mp4" type="video/mp4" />
      </video>

      {/* Light mode video (using backroundvideo.mp4 - to be renamed as LightThemeBackround.mp4) */}
      <video
        ref={lightVideoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        style={{ 
          filter: 'brightness(0.95) contrast(1.05) saturate(1.05)',
          opacity: isDark ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        <source src="/backroundvideo.mp4" type="video/mp4" />
      </video>
      
      {/* No overlays - 100% background video visibility */}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      observer.disconnect();
    };
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
        duration: 0.2 // reduced from 0.4
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15, // reduced from 0.3
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
  className="relative min-h-[110vh] sm:min-h-[100vh] md:min-h-[102vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background-light to-gray-50 dark:from-background-dark dark:to-gray-900 pb-12 md:pb-20"
      style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {/* Video background for all devices */}
      <div className="absolute inset-0">
        <VideoBackground />
      </div>
      
      {/* Bottom fade effect to separate from next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />

  <div className="max-w-6xl mx-auto px-2 sm:px-6 md:px-8 py-8 sm:py-16 md:py-24 lg:py-32 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-8 md:gap-10"
        >
          <motion.div 
            style={{ y }}
            className="md:w-1/2 mb-6 md:mb-0 w-full text-center md:text-left flex flex-col items-center md:items-start"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-3 sm:mb-6"
              style={{
                color: isDark ? '#ffffff' : '#ffffff',
                textShadow: isDark 
                  ? '0 0 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : '1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 4px rgba(0, 0, 0, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.3)',
                WebkitTextStroke: isDark ? '0' : '1px rgba(0, 0, 0, 0.3)',
                fontWeight: '900',
              }}
            >
              Hi, I'm{' '}
              <span className={isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark" : "text-black"}
                style={{
                  filter: isDark 
                    ? 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.8)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))'
                    : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))',
                  WebkitTextStroke: isDark ? '0' : '0',
                  textShadow: isDark ? 'none' : '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
                }}
              >
                Kartik Panganti
              </span>
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className="text-base xs:text-lg sm:text-xl md:text-2xl mb-3 sm:mb-6 h-10 sm:h-16 font-heading font-bold"
              style={{
                color: isDark ? '#e5e7eb' : '#ffffff',
                textShadow: isDark 
                  ? '0 0 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : '1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 4px rgba(0, 0, 0, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.3)',
                WebkitTextStroke: isDark ? '0' : '0.75px rgba(0, 0, 0, 0.3)',
                fontWeight: '800',
              }}
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
              className="mb-4 sm:mb-8 text-sm xs:text-base sm:text-lg max-w-xs xs:max-w-sm sm:max-w-lg font-semibold"
              style={{
                color: isDark ? '#d1d5db' : '#ffffff',
                textShadow: isDark 
                  ? '0 0 12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : '0.5px 0.5px 1.5px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.4), 1px 1px 4px rgba(0, 0, 0, 0.3)',
                WebkitTextStroke: isDark ? '0' : '0.5px rgba(0, 0, 0, 0.25)',
                fontWeight: '700',
              }}
            >
              I build web, mobile, and AI-driven solutions that scale, turning ideas into high-performance products.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{
                  boxShadow: isDark 
                    ? '0 4px 25px rgba(99, 102, 241, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)'
                    : '0 4px 20px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
                }}
              >
                Let's Connect
              </motion.a>
              <motion.a 
                href={RESUMEE} download="Kartik_Panganti_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base border-2 rounded-full font-bold transition-all duration-300"
                style={{
                  borderColor: isDark ? '#818CF8' : '#4F46E5',
                  color: isDark ? '#ffffff' : '#1f2937',
                  backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  boxShadow: isDark 
                    ? '0 2px 15px rgba(129, 140, 248, 0.4), 0 0 30px rgba(129, 140, 248, 0.2)'
                    : '0 2px 15px rgba(79, 70, 229, 0.4), 0 0 20px rgba(79, 70, 229, 0.2)',
                  backdropFilter: 'blur(8px)',
                  textShadow: isDark 
                    ? '0 0 10px rgba(0, 0, 0, 0.5)'
                    : 'none',
                }}
              >
                My Resume
              </motion.a>
            </motion.div>
            

            <motion.div 
              variants={itemVariants}
              className="flex mt-4 sm:mt-12 space-x-4 sm:space-x-6 justify-center md:justify-start"
            >
              
              {[
                { icon: FaGithub, href: "https://github.com/kartikpanganti" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/kartikpanganti" },
                { icon: FaXTwitter, href: "https://x.com/kartikpanganti"},
                { 
                  icon: FaShare, 
                  href: "#", 
                  isShare: true,
                  onClick: () => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Kartik Panganti - Full Stack Developer',
                        text: 'Check out my portfolio and projects!',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Portfolio link copied to clipboard!');
                    }
                  }
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.isShare ? "#" : social.href}
                  target={social.isShare ? "_self" : "_blank"}
                  rel={social.isShare ? "" : "noopener noreferrer"}
                  onClick={social.onClick || undefined}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-colors duration-300"
                  style={{
                    color: isDark ? '#d1d5db' : '#ffffff',
                    filter: isDark 
                      ? 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 15px rgba(0, 0, 0, 0.7))'
                      : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.4))',
                    textShadow: isDark ? 'none' : '0.5px 0.5px 1.5px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <social.icon size={24} className="sm:w-7 sm:h-7" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 relative flex md:justify-end"
            style={{ y }}
          >
            <div className="relative w-64 h-64 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
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
                    duration: 2, // reduced from 4
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
                    src={profileImage}
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
                    duration: 1.5, // reduced from 3
                    repeat: Infinity,
                    ease: "easeInOut"
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
                    duration: 1.5, // reduced from 3
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

      {/* Removed scroll indicator for cleaner UI */}
      
      {/* Bottom gradient blend for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-gray-900/50 dark:to-gray-900 z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;