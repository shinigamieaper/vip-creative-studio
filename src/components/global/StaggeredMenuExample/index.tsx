'use client';
import React from 'react';
import StaggeredMenu from '@/components/global/StaggeredMenu';

interface StaggeredMenuExampleProps extends React.ComponentPropsWithoutRef<'div'> {}

const StaggeredMenuExample: React.FC<StaggeredMenuExampleProps> = (props) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Partnership Model', ariaLabel: 'View our partnership model', link: '/our-partnership-model' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  if (!mounted) return null;

  return (
    <div
      {...props}
      className={`h-screen bg-linear-to-br from-[hsl(var(--accent-primary)/0.15)] to-[hsl(var(--accent-secondary)/0.15)] ${
        props.className || ''
      }`}
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={'hsl(var(--text-primary))'}
        openMenuButtonColor={'hsl(var(--text-primary))'}
        changeMenuColorOnOpen={true}
        colors={['hsl(var(--accent-secondary))', 'hsl(var(--accent-primary))']}
        logoUrl="/path-to-your-logo.svg"
        accentColor={'hsl(var(--accent-primary))'}
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        isFixed={false}
      />
    </div>
  );
};

export default StaggeredMenuExample;