import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  distance = 50,
  duration = 800,
  threshold = 0.1,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -100px 0px' // Trigger earlier when element is 100px from viewport
      }
    );

    observer.observe(element);
    
    return () => observer.disconnect();
  }, [delay, threshold, hasTriggered]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-800 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
        transitionDuration: `${duration}ms`,
        willChange: 'transform, opacity'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;