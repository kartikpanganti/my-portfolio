import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-slow-spin opacity-30 dark:opacity-10"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="from-color" style={{ stopColor: '#4F46E5' }} />
            <stop offset="50%" className="mid-color" style={{ stopColor: '#7C3AED' }} />
            <stop offset="100%" className="to-color" style={{ stopColor: '#2563EB' }} />
          </linearGradient>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle
            cx="500"
            cy="500"
            r="200"
            fill="url(#blob-gradient)"
            className="animate-blob1"
          >
            <animate
              attributeName="r"
              values="200;250;200"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="500;600;500"
              dur="13s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="500;400;500"
              dur="11s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="500"
            cy="500"
            r="180"
            fill="url(#blob-gradient)"
            className="animate-blob2"
          >
            <animate
              attributeName="r"
              values="180;220;180"
              dur="12s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="500;400;500"
              dur="14s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="500;600;500"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="500"
            cy="500"
            r="160"
            fill="url(#blob-gradient)"
            className="animate-blob3"
          >
            <animate
              attributeName="r"
              values="160;200;160"
              dur="11s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="500;550;500"
              dur="15s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="500;450;500"
              dur="13s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
