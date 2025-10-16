import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaHeart, FaArrowUp, FaShieldAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useRecaptcha } from '../contexts/RecaptchaContext';

const Footer = () => {
  const { RECAPTCHA_SITE_KEY, toggleRecaptchaBadge } = useRecaptcha();
  const footerRef = useRef(null);

  // Intersection Observer to show reCAPTCHA badge when footer is visible
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Footer is visible, show reCAPTCHA badge
            toggleRecaptchaBadge(true);
          } else {
            // Footer is not visible, hide reCAPTCHA badge
            toggleRecaptchaBadge(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: '50px 0px', // Add some margin for smoother transition
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      // Hide badge when component unmounts
      toggleRecaptchaBadge(false);
    };
  }, [toggleRecaptchaBadge]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/kartikpanganti",
      icon: <FaLinkedin />,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "GitHub",
      href: "https://github.com/kartikpanganti",
      icon: <FaGithub />,
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "X",
      href: "https://x.com/kartikpanganti",
      icon: <FaXTwitter />,
      color: "from-gray-700 to-gray-900"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-light rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Kartik Panganti
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-stack developer passionate about creating beautiful and functional web experiences. Let's build something amazing together!
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                  aria-label={link.name}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${link.color} rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300`}></div>
                  <div className="relative p-3 bg-gray-800 dark:bg-gray-900 rounded-lg text-xl text-gray-400 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:kartikpanaganti.contact@gmail.com"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                kartikpanaganti.contact@gmail.com
              </a>
              <p className="text-gray-400 text-sm">
               Open to freelance projects, collaborations, and full-time roles. Let’s build something remarkable together! For urgent matters, please include “URGENT” in your subject line.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col space-y-4"
        >
          {/* reCAPTCHA Notice */}
          {RECAPTCHA_SITE_KEY && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <FaShieldAlt className="text-green-500" />
              <span>
                This site is protected by reCAPTCHA Enterprise and the Google{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a 
                  href="https://policies.google.com/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </span>
            </motion.div>
          )}

          {/* Copyright and Back to Top */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span>© 2025 Kartik Panganti. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaHeart className="text-red-500" />
                </motion.span>
              </span>
            </p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-light to-secondary-light rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <span>Back to Top</span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowUp />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;