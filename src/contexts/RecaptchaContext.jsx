import React, { createContext, useContext, useState, useEffect } from 'react';

const RecaptchaContext = createContext();

export const useRecaptcha = () => {
  const context = useContext(RecaptchaContext);
  if (!context) {
    throw new Error('useRecaptcha must be used within a RecaptchaProvider');
  }
  return context;
};

export const RecaptchaProvider = ({ children }) => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showRecaptchaBadge, setShowRecaptchaBadge] = useState(false);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const enableRecaptchaOnLocalhost = import.meta.env.VITE_ENABLE_RECAPTCHA_DEV === 'true';
  const bypassRecaptcha = import.meta.env.DEV && isLocalhost && !enableRecaptchaOnLocalhost;

  // Debug logging for environment variables (only in actual development)
  useEffect(() => {
    // Removed debug log
  }, [RECAPTCHA_SITE_KEY]);

  // Function to hide/show reCAPTCHA badge
  const toggleRecaptchaBadge = (show) => {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      badge.style.visibility = show ? 'visible' : 'hidden';
      badge.style.opacity = show ? '1' : '0';
      badge.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    setShowRecaptchaBadge(show);
  };

  useEffect(() => {
    if (bypassRecaptcha) {
      // In localhost dev, avoid loading the external reCAPTCHA script (often blocked by extensions/network).
      // We still mark as loaded so the contact form can be tested end-to-end.
      setRecaptchaLoaded(true);
      setTimeout(() => toggleRecaptchaBadge(false), 100);
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      if (import.meta.env.DEV) {
        console.warn('reCAPTCHA: Site key not found. reCAPTCHA will not be loaded.');
      }
      return;
    }

    // Removed debug log

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src^="https://www.google.com/recaptcha/enterprise.js"]`);
    if (existingScript) {
      // Removed debug log
      setRecaptchaLoaded(true);
      // Hide badge initially
      setTimeout(() => toggleRecaptchaBadge(false), 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Removed debug log
      setRecaptchaLoaded(true);
      // Hide badge initially after script loads
      setTimeout(() => toggleRecaptchaBadge(false), 100);
    };
    script.onerror = (error) => {
      // Keep this non-fatal. If the script is blocked, the contact form will show a user-friendly message.
      console.warn('reCAPTCHA: Failed to load script', error);
      setRecaptchaLoaded(false);
    };
    document.head.appendChild(script);

    // Removed debug log

    return () => {
      // Clean up script and badges on unmount
      const scripts = document.querySelectorAll(`script[src^="https://www.google.com/recaptcha"]`);
      scripts.forEach(script => script.remove());
      const badges = document.querySelectorAll('.grecaptcha-badge');
      badges.forEach(badge => badge.remove());
    };
  }, [RECAPTCHA_SITE_KEY]);

  const executeRecaptcha = async (action = 'submit') => {
    if (bypassRecaptcha) {
      return `dev-bypass-token:${action}`;
    }

    if (!recaptchaLoaded || !window.grecaptcha || !window.grecaptcha.enterprise) {
      throw new Error('reCAPTCHA Enterprise not loaded. Please refresh the page.');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const value = {
    recaptchaLoaded,
    RECAPTCHA_SITE_KEY,
    executeRecaptcha,
    bypassRecaptcha,
    showRecaptchaBadge,
    toggleRecaptchaBadge
  };

  return (
    <RecaptchaContext.Provider value={value}>
      {children}
    </RecaptchaContext.Provider>
  );
};