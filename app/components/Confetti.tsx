"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function Confetti({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    if (isActive) {
      const colors = ['#22c55e', '#10b981', '#34d399', '#fbbf24', '#f59e0b'];
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: -(Math.random() * 50 + 25),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            scale: 0,
            x: 0,
            y: 0,
            opacity: 1
          }}
          animate={{ 
            scale: [0, 1, 1, 0.5],
            x: particle.x,
            y: [0, particle.y, particle.y + 100],
            opacity: [1, 1, 0]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: particle.color,
            top: '50%',
            left: '50%'
          }}
        />
      ))}
    </AnimatePresence>
  );
}