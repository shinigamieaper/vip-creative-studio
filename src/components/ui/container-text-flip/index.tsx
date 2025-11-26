'use client';

import React, { useEffect, useId, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ContainerTextFlipProps extends HTMLMotionProps<'span'> {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Direction of entry animation for each word */
  direction?: 'top' | 'bottom';
  /** Per-letter delay seconds multiplier */
  letterDelay?: number;
  /** Extra width (px) to add around measured text for padding */
  extraWidth?: number;
  /** Render without default pill/border/padding styles */
  unstyled?: boolean;
  /** Animate container width to match text (useful for pill style). Defaults to true unless unstyled. */
  animateWidth?: boolean;
  allowWrap?: boolean;
}

export function ContainerTextFlip({
  words = ['better', 'modern', 'beautiful', 'awesome'],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  direction = 'top',
  letterDelay = 0.02,
  extraWidth = 32,
  unstyled = false,
  animateWidth,
  allowWrap = false,
  ...props
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLSpanElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Adjust width to the content plus any extra padding specified
      const textWidth = textRef.current.scrollWidth + extraWidth;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, words, extraWidth]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  const shouldAnimateWidth = allowWrap ? false : (animateWidth ?? !unstyled);

  return (
    <motion.span
      {...(shouldAnimateWidth ? { layout: true, layoutId: `words-here-${id}`, animate: { width }, transition: { duration: animationDuration / 2000 } } : {})}
      className={cn(
        'relative align-baseline',
        allowWrap ? 'inline' : 'inline-block',
        !unstyled && 'rounded-md px-4 py-2 text-center text-primary border border-standard',
        className,
      )}
      key={words[currentWordIndex]}
      {...props}
    >
      <motion.span
        initial={{
          opacity: 0,
          filter: 'blur(10px)',
          y: direction === 'top' ? -50 : 50,
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
        }}
        transition={{ duration: animationDuration / 1000, ease: 'easeOut' }}
        className={cn(
          allowWrap ? 'inline' : 'inline-block',
          allowWrap && 'wrap-break-word whitespace-normal',
          textClassName,
        )}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.span
          className={cn(
            allowWrap ? 'inline' : 'inline-block',
            allowWrap && 'wrap-break-word whitespace-normal',
            textClassName,
          )}
        >
          {words[currentWordIndex].split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(6px)', y: direction === 'top' ? -6 : 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: index * letterDelay, ease: 'easeOut' }}
              className={textClassName}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    </motion.span>
  );
}

export default ContainerTextFlip;
