'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Props interface for PrimaryCtaButton component
 * Extends native button attributes for full attribute passthrough
 */
interface PrimaryCtaButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  shimmer?: boolean;
  shimmerSpeedSeconds?: number;
  shimmerGradient?: boolean;
  variant?: 'primary' | 'inverted' | 'whiteTeal' | 'orangeTeal';
  withArrow?: boolean;
  asChild?: boolean;
}

/**
 * PrimaryCtaButton - Primary conversion component with brand-compliant styling
 * 
 * Features:
 * - Brand-compliant orange background (#FF8C00)
 * - Smooth micro-interactions on hover/active states
 * - Accessible focus states for keyboard navigation
 * - Full WCAG 2.1 AA compliance
 * 
 * @example
 * ```tsx
 * <PrimaryCtaButton onClick={handleClick}>
 *   Get Started
 * </PrimaryCtaButton>
 * ```
 */
const PrimaryCtaButton: React.FC<PrimaryCtaButtonProps> = ({
  children,
  className = '',
  shimmer = true,
  shimmerSpeedSeconds,
  shimmerGradient = false,
  variant = 'primary',
  withArrow = false,
  asChild = false,
  ...props
}) => {
  const isWhiteTeal = variant === 'whiteTeal';
  const isOrangeTeal = variant === 'orangeTeal';
  const computedClass = `
    btn btn-lift group gap-2
    ${
      shimmerGradient && variant !== 'orangeTeal'
        ? 'bg-shimmer-accent animate-shimmer text-primary-foreground'
        : variant === 'inverted'
        ? 'btn-inverted'
        : variant === 'whiteTeal'
        ? 'btn-white-teal'
        : variant === 'orangeTeal'
        ? 'btn-primary'
        : 'btn-primary'
    }
    focus-visible:outline-accent-primary
    hover:shadow-lg
    ${(shimmer || shimmerGradient) ? 'ring-2 ring-accent-primary ring-offset-2 ring-offset-background hover:ring-4' : ''}
    ${(shimmer || shimmerGradient) ? 'btn-shimmer btn-glow' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const computedStyle: React.CSSProperties = {
    ...(props.style || {}),
    ...(variant === 'inverted'
      ? ({ color: 'hsl(var(--text-primary))', borderColor: 'hsl(var(--accent-secondary))' } as React.CSSProperties)
      : {}),
    ...(((shimmer || shimmerGradient) && shimmerSpeedSeconds)
      ? ({ ['--shimmer-duration' as any]: `${shimmerSpeedSeconds}s` } as React.CSSProperties)
      : {}),
  };

  if (asChild && React.isValidElement(children)) {
    const childEl = children as React.ReactElement<any>;
    const childClass = [computedClass, childEl.props?.className].filter(Boolean).join(' ');
    const content = isWhiteTeal && withArrow ? (
      <span className="flex items-center gap-4">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shrink-0"
          style={{ backgroundColor: 'hsl(174, 72%, 56%)' }}
        >
          <ArrowRight
            aria-hidden
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
        <span className="inline-flex items-center">{childEl.props?.children}</span>
      </span>
    ) : isOrangeTeal && withArrow ? (
      <span className="flex items-center gap-4">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shrink-0"
        >
          <ArrowRight
            aria-hidden
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: 'hsl(var(--accent-primary))' }}
          />
        </span>
        <span className="inline-flex items-center text-white">{childEl.props?.children}</span>
      </span>
    ) : (
      <>
        <span className="inline-flex items-center">{childEl.props?.children}</span>
        {withArrow && (
          <ArrowRight
            aria-hidden
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </>
    );
    return React.cloneElement(childEl, { className: childClass, style: { ...(childEl.props?.style || {}), ...computedStyle } }, content);
  }

  return (
    <button className={computedClass} style={computedStyle} {...props}>
      {isWhiteTeal && withArrow ? (
        <span className="flex items-center gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shrink-0" style={{ backgroundColor: 'hsl(174, 72%, 56%)' }}>
            <ArrowRight
              aria-hidden
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
          <span className="inline-flex items-center">{children}</span>
        </span>
      ) : isOrangeTeal && withArrow ? (
        <span className="flex items-center gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shrink-0">
            <ArrowRight
              aria-hidden
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: 'hsl(var(--accent-primary))' }}
            />
          </span>
          <span className="inline-flex items-center text-white">{children}</span>
        </span>
      ) : (
        <>
          <span className="inline-flex items-center">{children}</span>
          {withArrow && (
            <ArrowRight
              aria-hidden
              className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          )}
        </>
      )}
    </button>
  );
};

export default PrimaryCtaButton;
