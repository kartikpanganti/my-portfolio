import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane, FaLock } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import { useRecaptcha } from '../contexts/RecaptchaContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, error: false, message: '' });
  const { recaptchaLoaded, RECAPTCHA_SITE_KEY, executeRecaptcha } = useRecaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    countryCode: '', // Store country code from phone input
  });
  const [errors, setErrors] = useState({});

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Validate environment variables
  useEffect(() => {
    const missingVars = [];
    if (!RECAPTCHA_SITE_KEY) missingVars.push('VITE_RECAPTCHA_SITE_KEY');
    if (!EMAILJS_SERVICE_ID) missingVars.push('VITE_EMAILJS_SERVICE_ID');
    if (!EMAILJS_TEMPLATE_ID) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
    if (!EMAILJS_PUBLIC_KEY) missingVars.push('VITE_EMAILJS_PUBLIC_KEY');

    // Removed debug log

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars.join(', '));
    }
  }, [RECAPTCHA_SITE_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, recaptchaLoaded]);

  // Add scroll behavior fix for country dropdown
  useEffect(() => {
    const handleWheel = (e) => {
      // Find if the target is within a country list
      const countryList = e.target.closest('.country-list');
      const scrollableArea = e.target.closest('.divider + div');
      
      if (countryList) {
        // If we're in the country list but not in the scrollable area
        if (!scrollableArea) {
          e.preventDefault();
        } else {
          // We're in the scrollable area, check if we've reached the boundary
          const { scrollTop, scrollHeight, clientHeight } = scrollableArea;
          const isAtTop = scrollTop <= 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight;
          
          // If we're at the top and scrolling up, or at the bottom and scrolling down
          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
          }
        }
      }
    };

    // Add event listener with passive: false to allow preventDefault
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Add custom styles for react-phone-input-2 dark mode
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Base input styling */
      .react-tel-input .form-control {
        width: 100% !important;
        height: 42px !important;
        background-color: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(4px) !important;
        border: 1px solid rgb(209, 213, 219) !important;
        border-radius: 0.5rem !important;
        color: inherit !important;
        transition: all 0.3s ease !important;
        padding: 0.5rem 0.75rem 0.5rem 56px !important; /* Increased padding for flag icon */
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
      }
      
      /* Dark mode input styling */
      .dark .react-tel-input .form-control {
        background-color: rgba(75, 85, 99, 0.5) !important;
        border-color: rgb(75, 85, 99) !important;
        color: white !important;
      }
      
      /* Focus state */
      .react-tel-input .form-control:focus {
        border-color: rgb(59, 130, 246) !important;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) !important;
        outline: none !important;
      }
      
      /* Flag dropdown base */
      .react-tel-input .flag-dropdown {
        background-color: transparent !important;
        border: none !important;
        border-right: none !important;
        border-radius: 0.5rem 0 0 0.5rem !important;
        transition: all 0.3s ease !important;
      }
      
      /* Dark mode flag dropdown */
      .dark .react-tel-input .flag-dropdown {
        background-color: transparent !important;
        border-color: transparent !important;
      }
      
      /* Selected flag */
      .react-tel-input .selected-flag {
        padding: 0 8px 0 12px !important;
        border-radius: 0.5rem 0 0 0.5rem !important;
        background-color: transparent !important;
        width: 45px !important; /* Fixed width for the flag area */
      }
      
      /* Fix dropdown position */
      .react-tel-input .flag-dropdown.open .selected-flag {
        border-radius: 0.5rem 0 0 0 !important;
      }
      
      /* Flag dropdown hover */
      .react-tel-input .selected-flag:hover {
        background-color: rgba(229, 231, 235, 0.3) !important;
      }
      
      /* Dark mode flag dropdown hover */
      .dark .react-tel-input .selected-flag:hover {
        background-color: rgba(75, 85, 99, 0.3) !important;
      }
      
      /* Arrow in dropdown */
      .react-tel-input .selected-flag .arrow {
        border-top: 4px solid #555 !important;
        left: 29px !important;
        top: 50% !important;
      }
      
      .dark .react-tel-input .selected-flag .arrow {
        border-top: 4px solid #ccc !important;
      }
      
      /* Flag position adjustment */
      .react-tel-input .flag {
        margin-right: 5px !important;
      }
      
      /* Fix alignment of the flag inside selected-flag */
      .react-tel-input .selected-flag .flag {
        position: absolute !important;
        top: 50% !important;
        margin-top: -7px !important;
        left: 11px !important;
      }
      
      /* Country list dropdown */
      .react-tel-input .country-list {
        background-color: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgb(209, 213, 219) !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        height: auto !important;
        width: 300px !important; /* Wider dropdown for better usability */
        margin: 2px 0 10px -1px !important;
        padding: 0 !important;
        scrollbar-width: thin !important;
        scrollbar-color: rgba(156, 163, 175, 0.5) transparent !important;
        overflow: hidden !important; /* Hide overflow except for scrollable part */
        display: flex !important;
        flex-direction: column !important;
        max-height: 300px !important;
      }
      
      /* Dark mode country list */
      .dark .react-tel-input .country-list {
        background-color: rgba(31, 41, 55, 0.98) !important;
        border-color: rgb(55, 65, 81) !important;
        color: white !important;
        scrollbar-color: rgba(75, 85, 99, 0.5) transparent !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25) !important;
      }
      
      /* Scrollbar styling for divider+div (the actual scrollable container) */
      .react-tel-input .country-list .divider + div::-webkit-scrollbar {
        width: 6px !important;
      }
      
      .react-tel-input .country-list .divider + div::-webkit-scrollbar-track {
        background: transparent !important;
      }
      
      .react-tel-input .country-list .divider + div::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5) !important;
        border-radius: 20px !important;
      }
      
      /* Fix for dropdown scrolling - prevents page scroll when dropdown is scrolled */
      .react-tel-input.react-tel-input--focus {
        position: relative !important;
        z-index: 1000 !important;
      }
      
      /* Container for phone input */
      .phone-input-container {
        position: relative !important;
        z-index: 10 !important;
      }
      
      /* Prevent scrolling propagation */
      .react-tel-input .country-list {
        overscroll-behavior: contain !important;
        touch-action: pan-y !important;
      }
      
      .dark .react-tel-input .country-list::-webkit-scrollbar-thumb {
        background-color: rgba(75, 85, 99, 0.5) !important;
      }
      
      /* Scrollable area for country list */
      .react-tel-input .country-list .divider {
        padding: 0 !important;
        margin: 0 !important;
      }
      
      /* Country list items */
      .react-tel-input .country-list .country {
        padding: 9px 10px !important;
        display: flex !important;
        align-items: center !important;
      }
      
      /* Scrollable container for countries */
      .react-tel-input .country-list .divider + div {
        max-height: 220px !important;
        overflow-y: auto !important;
        padding-top: 5px !important;
        overscroll-behavior: contain !important; /* Prevent scroll chaining */
        -webkit-overflow-scrolling: touch !important; /* Smooth scrolling on iOS */
        flex: 1 !important;
      }
      
      /* Country item hover */
      .react-tel-input .country-list .country:hover {
        background-color: rgba(59, 130, 246, 0.1) !important;
      }
      
      /* Country item highlight */
      .react-tel-input .country-list .country.highlight {
        background-color: rgba(59, 130, 246, 0.2) !important;
      }
      
      /* Country name */
      .react-tel-input .country-list .country .country-name {
        color: #333 !important;
        font-size: 14px !important;
        margin-left: 10px !important;
      }
      
      /* Dark mode country name */
      .dark .react-tel-input .country-list .country .country-name {
        color: #f3f4f6 !important;
      }
      
      /* Country dial code */
      .react-tel-input .country-list .country .dial-code {
        color: #555 !important;
        font-size: 13px !important;
        margin-left: 5px !important;
      }
      
      /* Dark mode dial code */
      .dark .react-tel-input .country-list .country .dial-code {
        color: #d1d5db !important;
      }
      
      /* Search box */
      .react-tel-input .country-list .search-box {
        background-color: rgba(249, 250, 251, 0.9) !important;
        border: 1px solid rgb(209, 213, 219) !important;
        border-radius: 0.375rem !important;
        padding: 8px 12px !important;
        margin: 0 !important;
        font-size: 14px !important;
        color: #333 !important;
        width: 100% !important;
        outline: none !important;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) !important;
      }
      
      /* Dark mode search box */
      .dark .react-tel-input .country-list .search-box {
        background-color: rgba(55, 65, 81, 0.9) !important;
        border-color: rgb(75, 85, 99) !important;
        color: white !important;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
      }
      
      /* Search box focus */
      .react-tel-input .country-list .search-box:focus {
        border-color: rgb(59, 130, 246) !important;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
      }
      
      /* Search box container */
      .react-tel-input .country-list .search {
        padding: 8px 8px !important;
        background-color: rgba(255, 255, 255, 0.98) !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 2 !important;
        border-bottom: 1px solid rgba(209, 213, 219, 0.5) !important;
        border-top-left-radius: 0.5rem !important;
        border-top-right-radius: 0.5rem !important;
        backdrop-filter: blur(10px) !important;
        flex-shrink: 0 !important;
      }
      
      /* Dark mode search container */
      .dark .react-tel-input .country-list .search {
        background-color: rgba(31, 41, 55, 0.98) !important;
        border-bottom: 1px solid rgba(75, 85, 99, 0.5) !important;
      }
      
      /* Search box placeholder */
      .react-tel-input .country-list .search-box::placeholder {
        color: #6b7280 !important;
        opacity: 0.7 !important;
      }
      
      /* Dark mode search box placeholder */
      .dark .react-tel-input .country-list .search-box::placeholder {
        color: #d1d5db !important;
        opacity: 0.7 !important;
      }
      
      /* No entries message */
      .react-tel-input .country-list .no-entries-message {
        color: #6b7280 !important;
        padding: 10px !important;
        font-size: 14px !important;
        text-align: center !important;
        margin-top: 5px !important;
      }
      
      /* Dark mode no entries message */
      .dark .react-tel-input .country-list .no-entries-message {
        color: #d1d5db !important;
      }
      
      /* Error state */
      .react-tel-input.error .form-control {
        border-color: #ef4444 !important;
      }
      
      .react-tel-input.error .flag-dropdown {
        border-color: #ef4444 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle phone input change
  const handlePhoneChange = (value, country) => {
    // value already contains the full number with country code
    // Always format value to start with +countryCode, never duplicate country code
    let local = value;
    if (country) {
      // Escape country.dialCode for RegExp
      const escapedDialCode = country.dialCode.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
      // Remove any existing country code (with or without plus) from the start
      const dialCodeRegex = new RegExp(`^\\+?${escapedDialCode}`);
      local = local.replace(dialCodeRegex, '');
      local = local.replace(/^0+/, ''); // Remove leading zeros
      // Only digits for local number
      local = local.replace(/\D/g, '');
      // Prepend correct country code
      local = local ? `+${country.dialCode}${local}` : `+${country.dialCode}`;
    }
    setFormData({
      ...formData,
      mobile: local,
      countryCode: country ? `+${country.dialCode}` : '',
    });
    
    // Basic validation as user types
    if (value) {
      const cleanNumber = value.replace(/\D/g, '');
      if (cleanNumber.length < 7) {
        setErrors({
          ...errors,
          mobile: 'Phone number is too short'
        });
      } else if (cleanNumber.length > 15) {
        setErrors({
          ...errors,
          mobile: 'Phone number is too long'
        });
      } else {
        // Clear error when valid
        if (errors.mobile) {
          setErrors({
            ...errors,
            mobile: ''
          });
        }
      }
    } else {
      // Clear error when empty (if it's optional)
      if (errors.mobile) {
        setErrors({
          ...errors,
          mobile: ''
        });
      }
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation (optional field)
    if (formData.mobile.trim()) {
      // react-phone-input-2 provides the full number with country code
      const cleanNumber = formData.mobile.replace(/\D/g, '');
      
      // Most international phone numbers are between 7 and 15 digits (excluding country code)
      // This is a simple length validation - for a more sophisticated validation,
      // you might want to use a library like libphonenumber-js
      if (cleanNumber.length < 7) {
        newErrors.mobile = 'Phone number is too short';
      } else if (cleanNumber.length > 15) {
        newErrors.mobile = 'Phone number is too long';
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showStatus = (error, message) => {
    setStatus({ show: true, error, message });
    setTimeout(() => setStatus({ show: false, error: false, message: '' }), 5000);
  };

  const formatTimestamp = () => {
    const date = new Date();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const weekday = weekdays[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    return `${weekday}, ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      showStatus(true, 'Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Validate environment variables before proceeding
      if (!RECAPTCHA_SITE_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('Configuration error. Please contact the site administrator.');
      }

      // Check if reCAPTCHA Enterprise is loaded
      if (!recaptchaLoaded) {
        throw new Error('reCAPTCHA Enterprise not loaded. Please refresh the page.');
      }

      // Execute reCAPTCHA Enterprise
      const token = await executeRecaptcha('CONTACT_FORM');

      if (!token) {
        throw new Error('reCAPTCHA verification failed');
      }

      // Collect automatic technical info
      const technicalInfo = {
        device_info: navigator.userAgent,
        locale: navigator.language,
        timestamp: formatTimestamp(),
        recaptcha_token: token
      };

      // Get current website URL
      const portfolioUrl = window.location.origin;

        // Use countryCode from phone input and extract local number
        let rawMobile = formData.mobile.trim().replace(/\s|-/g, '') || '';
        let countryCode = formData.countryCode || '';
        let localNumber = '';
        // Remove country code from start, always send only local number
        if (countryCode && rawMobile.startsWith(countryCode)) {
          localNumber = rawMobile.slice(countryCode.length);
        } else if (countryCode && rawMobile.startsWith(countryCode.replace('+', ''))) {
          localNumber = rawMobile.slice(countryCode.replace('+', '').length);
        } else {
          localNumber = rawMobile;
        }

      // Combine form data with technical info and website URL
      // Send countrycode and mobile as separate fields for email template
      const templateParams = {
        from_name: formData.name.trim(),
        reply_to: formData.email.trim(),
  countrycode: countryCode,
  mobile: localNumber,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        portfolio_url: portfolioUrl,
        contacted_via: 'Portfolio Website',
        ...technicalInfo
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      showStatus(false, '✅ Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form and errors
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      // Improved error handling for null or non-Error objects
      let errorMsg = '❌ Failed to send message. Please try again or contact me directly.';
      if (error && typeof error === 'object' && error.message) {
        if (error.message.includes('reCAPTCHA')) {
          errorMsg = '❌ Security verification failed. Please refresh and try again.';
        } else {
          errorMsg = `❌ ${error.message}`;
        }
      } else if (typeof error === 'string') {
        errorMsg = `❌ ${error}`;
      } else if (error === null) {
        errorMsg = '❌ An unknown error occurred (null). Please try again.';
      }
      console.error('Form submission error:', error);
      showStatus(true, errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = {
    email: "kartikpanganti.contact@gmail.com",
    social: {
      linkedin: "https://linkedin.com/in/kartikpanganti",
      github: "https://github.com/kartikpanganti",
      twitter: "https://x.com/kartikpanganti"
    }
  };

  return (
  <section id="contact" className="py-8 relative overflow-hidden" style={{ willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-light/5 to-transparent dark:via-secondary-dark/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            
            <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm ${
                      errors.name 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm ${
                      errors.email 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Mobile Number
                  </label>
                  <div className="phone-input-container">
                    <PhoneInput
                      country={'in'}
                      value={formData.mobile}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: 'mobile',
                        id: 'mobile',
                        required: true,
                        placeholder: "Mobile number",
                      }}
                      containerClass={`react-tel-input ${errors.mobile ? 'error' : ''}`}
                      inputClass="form-control"
                      buttonClass="flag-dropdown"
                      dropdownClass="country-list"
                      enableSearch={true}
                      searchPlaceholder="Search country..."
                      disableSearchIcon={false}
                      countryCodeEditable={false}
                      autoFormat={true}
                      enableAreaCodes={true}
                      showDropdown={false}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mobile}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm ${
                      errors.subject 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Project Inquiry"
                    required
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm resize-none ${
                      errors.message 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </motion.div>

                {status.show && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-lg ${status.error 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'}`}
                  >
                    {status.message}
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
                    ${loading 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark hover:shadow-xl'}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${contactInfo.email}`}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors group/item"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-medium group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-primary-light group-hover/item:to-secondary-light dark:group-hover/item:from-primary-dark dark:group-hover/item:to-secondary-dark">
                        {contactInfo.email}
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Social Media Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Connect With Me
                </h3>
                <div className="flex gap-4">
                  <motion.a
                    href={contactInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <FaLinkedin className="text-2xl" />
                  </motion.a>
                  <motion.a
                    href={contactInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <FaGithub className="text-2xl" />
                  </motion.a>
                  <motion.a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <FaXTwitter className="text-2xl" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
              
              <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Response Time
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  I typically respond within 24-48 hours. For urgent inquiries, please mention it in your message.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;