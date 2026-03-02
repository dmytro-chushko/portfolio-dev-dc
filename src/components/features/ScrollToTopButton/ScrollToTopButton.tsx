'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ScrollToTopButtonProps = {
  label: string;
};

const ScrollToTopButton = ({ label }: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 1.5;

      setIsVisible(y > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      className={clsx(
        'fixed z-40',
        'right-4 bottom-4 md:right-8 md:bottom-8',
        'flex items-center justify-center rounded-full',
        'w-10 h-10 md:w-12 md:h-12',
        'bg-foreground text-background shadow-lg',
        'transition-opacity transition-transform duration-200 ease-out',
        'md:hover:bg-hovered md:active:bg-active',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'motion-reduce:transition-none motion-reduce:transform-none',
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
