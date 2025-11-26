'use client';

import { ContainerTextFlip } from '@/components/ui/container-text-flip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ContainerTextFlipDemo2() {
  const words = ['better', 'modern', 'beautiful', 'awesome'];
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={cn(
        'relative mb-6 max-w-2xl text-left font-heading h1 text-primary',
      )}
      layout
    >
      <div className="inline-block">
        Make your websites look 10x <ContainerTextFlip words={words} />
      </div>
    </motion.h1>
  );
}
