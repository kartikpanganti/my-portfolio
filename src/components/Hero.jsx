import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaShare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import RESUMEE from '../assets/RESUME.pdf';
import profileImage from '../assets/profile.png';

// Dynamic animated background compatible with light/dark modes
const DynamicBackground = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkMobile();
    checkTheme();
    
    window.addEventListener('resize', checkMobile);
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  // Animated particle ring system
  const ParticleRing = ({ radius, count, color, speed, direction = 1 }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * direction;
        meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      }
    });

    const particles = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 3) * 0.2; // Add vertical wave
      return { x, y, z };
    });

    return (
      <group ref={meshRef}>
        {particles.map((pos, i) => (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
            <Sphere args={[0.08, 16, 16]} position={[pos.x, pos.y, pos.z]}>
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isDark ? 0.6 : 0.8}
                metalness={isDark ? 0.8 : 0.9}
                roughness={isDark ? 0.2 : 0.1}
                transparent
                opacity={isDark ? 0.9 : 1.0}
              />
            </Sphere>
          </Float>
        ))}
      </group>
    );
  };

  // Pulsating energy core
  const EnergyCore = () => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 1;
        meshRef.current.scale.setScalar(pulse);
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      }
    });

    return (
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
        <group ref={meshRef}>
          <Sphere args={[0.8, 64, 64]}>
            <MeshDistortMaterial
              color={isDark ? "#8B5CF6" : "#6366F1"}
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.9}
              emissive={isDark ? "#8B5CF6" : "#6366F1"}
              emissiveIntensity={isDark ? 0.4 : 0.3}
              transparent
              opacity={isDark ? 0.8 : 0.7}
            />
          </Sphere>
        </group>
      </Float>
    );
  };

  // Orbiting elements with trails
  const OrbitingElement = ({ distance, speed, color, size, angle = 0 }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
      if (meshRef.current) {
        const time = state.clock.getElapsedTime() * speed + angle;
        meshRef.current.position.x = Math.cos(time) * distance;
        meshRef.current.position.z = Math.sin(time) * distance;
        meshRef.current.position.y = Math.sin(time * 2) * 0.5;
        meshRef.current.rotation.x = time;
        meshRef.current.rotation.y = time * 1.5;
      }
    });

    return (
      <mesh ref={meshRef}>
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDark ? 0.7 : 0.5}
            metalness={1}
            roughness={0}
            transparent
            opacity={isDark ? 0.9 : 0.8}
          />
        </Sphere>
      </mesh>
    );
  };

  return (
    <Canvas 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, isMobileDevice ? 1.5 : 2]}
    >
      {/* Dynamic starfield */}
      <Stars 
        radius={150} 
        depth={80} 
        count={isMobileDevice ? 1500 : 2500} 
        factor={isDark ? 6 : 4} 
        saturation={0} 
        fade 
        speed={isDark ? 1 : 0.5}
      />
      
      {/* Adaptive lighting */}
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDark ? 0.6 : 0.8} 
        color={isDark ? "#E5E7EB" : "#F9FAFB"}
      />
      <pointLight 
        position={[-8, -8, -8]} 
        color={isDark ? "#8B5CF6" : "#6366F1"} 
        intensity={isDark ? 0.6 : 0.4} 
      />
      <pointLight 
        position={[8, -8, -8]} 
        color={isDark ? "#EC4899" : "#F472B6"} 
        intensity={isDark ? 0.6 : 0.4} 
      />
      
      {/* Central energy core */}
      <EnergyCore />
      
      {/* Multiple particle rings with different speeds and directions */}
      {!isMobileDevice && (
        <>
          <ParticleRing 
            radius={2.5} 
            count={20} 
            color={isDark ? "#8B5CF6" : "#4F46E5"} 
            speed={0.2} 
            direction={1} 
          />
          <ParticleRing 
            radius={3.5} 
            count={16} 
            color={isDark ? "#EC4899" : "#E11D48"} 
            speed={0.15} 
            direction={-1} 
          />
          <ParticleRing 
            radius={4.2} 
            count={12} 
            color={isDark ? "#3B82F6" : "#2563EB"} 
            speed={0.1} 
            direction={1} 
          />
        </>
      )}
      
      {/* Mobile simplified rings */}
      {isMobileDevice && (
        <>
          <ParticleRing 
            radius={3} 
            count={12} 
            color={isDark ? "#8B5CF6" : "#4F46E5"} 
            speed={0.2} 
            direction={1} 
          />
          <ParticleRing 
            radius={4} 
            count={8} 
            color={isDark ? "#EC4899" : "#F472B6"} 
            speed={0.15} 
            direction={-1} 
          />
        </>
      )}
      
      {/* Orbiting elements */}
      <OrbitingElement 
        distance={5} 
        speed={0.3} 
        color={isDark ? "#EC4899" : "#F472B6"} 
        size={0.15} 
        angle={0} 
      />
      <OrbitingElement 
        distance={6} 
        speed={0.25} 
        color={isDark ? "#3B82F6" : "#60A5FA"} 
        size={0.12} 
        angle={Math.PI} 
      />
      <OrbitingElement 
        distance={4.5} 
        speed={0.35} 
        color={isDark ? "#10B981" : "#34D399"} 
        size={0.1} 
        angle={Math.PI / 2} 
      />
      
      {/* Floating accent elements */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[-6, 2, -3]}>
          <meshStandardMaterial
            color={isDark ? "#F59E0B" : "#FCD34D"}
            emissive={isDark ? "#F59E0B" : "#FCD34D"}
            emissiveIntensity={isDark ? 0.5 : 0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.8}>
        <Sphere args={[0.25, 32, 32]} position={[5, -2.5, -2]}>
          <meshStandardMaterial
            color={isDark ? "#EF4444" : "#F87171"}
            emissive={isDark ? "#EF4444" : "#F87171"}
            emissiveIntensity={isDark ? 0.5 : 0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={isDark ? 0.4 : 0.2}
        enablePan={false}
      />
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
      {/* Dynamic 3D background for all devices */}
      <div className="absolute inset-0 opacity-50 dark:opacity-40">
        <DynamicBackground />
      </div>
      
      {/* Enhanced gradient background with theme awareness */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-pink-500/10 dark:from-indigo-500/15 dark:via-purple-500/12 dark:to-pink-500/15" />

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
                { icon: FaXTwitter, href: "https://x.com/kartikpanaganti"},
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
      
      {/* Bottom gradient blend for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-gray-900/50 dark:to-gray-900 z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;