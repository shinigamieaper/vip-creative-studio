'use client';

import React, { useState, useEffect } from 'react';
import Shuffle from '@/components/Shuffle';

/**
 * Props interface for RotatingShuffleText component
 * Extends native span attributes for full attribute passthrough
 */
export interface RotatingShuffleTextProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Array of phrases to cycle through */
  phrases: string[];
  /** Duration between phrase changes in milliseconds */
  changeInterval?: number;
  /** Shuffle animation duration */
  shuffleDuration?: number;
  /** Text alignment */
  textAlign?: React.CSSProperties['textAlign'];
}

/**
 * RotatingShuffleText - Cycles through different phrases with shuffle animation
 * 
 * Features:
 * - Automatically rotates through an array of phrases
 * - Applies shuffle effect on each transition
 * - Configurable timing and animation properties
 * 
 * @example
 * ```tsx
 * <RotatingShuffleText 
 *   phrases={["fractional partner", "strategic advisor", "growth catalyst"]}
 *   changeInterval={3000}
 * />
 * ```
 */
const RotatingShuffleText: React.FC<RotatingShuffleTextProps> = ({ 
  phrases,
  changeInterval = 3000,
  shuffleDuration = 0.5,
  textAlign = 'left',
  className = '',
  ...props 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setKey((prev) => prev + 1); // Force remount of Shuffle component
    }, changeInterval);

    return () => clearInterval(interval);
  }, [phrases.length, changeInterval]);

  if (!phrases || phrases.length === 0) {
    return null;
  }

  return (
    <span className={`inline-block ${className}`} {...props}>
      <Shuffle
        key={key}
        tag="span"
        text={phrases[currentIndex]}
        shuffleDirection="right"
        duration={shuffleDuration}
        stagger={0.03}
        shuffleTimes={1}
        triggerOnce={false}
        textAlign={textAlign}
        threshold={0}
        rootMargin="0px"
      />
    </span>
  );
};

export default RotatingShuffleText;
