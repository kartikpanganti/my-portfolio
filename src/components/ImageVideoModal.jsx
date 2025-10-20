import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// media: array of { type: 'image'|'video', src: string, alt?: string, description?: string }
// title: string, description: string, open: bool, onClose: fn
const ImageVideoModal = ({ open, onClose, title, description, media = [], initialIndex = 0 }) => {
  const [current, setCurrent] = useState(initialIndex);
  const modalRef = useRef(null);
  const mediaRef = useRef(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setCurrent(initialIndex);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, media.length, onClose]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (modalRef.current && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Swipe handlers
  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;
    if (offset.x > swipeThreshold || velocity.x > 500) {
      setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    } else if (offset.x < -swipeThreshold || velocity.x < -500) {
      setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }
  };

  if (!open || media.length === 0) return null;

  const currentMedia = media[current];

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleOverlayClick}
      >
        <motion.div
          className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2 text-white hover:text-red-400 transition-colors text-xl"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          {/* Media Container */}
          <div className="w-full h-full flex items-center justify-center relative pt-16 pb-16">
            {media.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 hover:scale-110"
                  onClick={() => setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1))}
                  aria-label="Previous"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 hover:scale-110"
                  onClick={() => setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1))}
                  aria-label="Next"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}

            <motion.div
              ref={mediaRef}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              drag={media.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentMedia?.type === 'image' ? (
                    <img
                      src={currentMedia.src}
                      alt={currentMedia.alt || title}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      onLoad={(e) => {
                        // Ensure image maintains aspect ratio and fits properly
                        const img = e.target;
                        img.style.maxWidth = '100%';
                        img.style.maxHeight = '100%';
                        img.style.width = 'auto';
                        img.style.height = 'auto';
                      }}
                    />
                  ) : currentMedia?.type === 'video' ? (
                    <video
                      src={currentMedia.src}
                      controls
                      autoPlay
                      className="w-auto h-auto max-w-full max-h-full object-contain bg-black rounded-lg"
                      style={{
                        userSelect: 'none',
                        minWidth: 'auto',
                        minHeight: 'auto'
                      }}
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-center">
              <p className="text-white text-sm md:text-base drop-shadow-lg mb-2">
                {currentMedia?.description || description}
              </p>
              {media.length > 1 && (
                <div className="flex justify-center gap-2">
                  {media.map((_, i) => (
                    <button
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        i === current
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageVideoModal;
