"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

export default function Confetti({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    if (isActive) {
      const colors = ['#22c55e', '#10b981', '#34d399', '#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6', '#f43f5e', '#06b6d4'];
      const shapes = ['circle', 'square', 'triangle'];
      
      const createParticles = (offset = 0) => Array.from({ length: 35 }, (_, i) => ({
        id: i + offset,
        x: (Math.random() - 0.5) * 800,
        y: -(Math.random() * 250 + 50),
        rotation: Math.random() * 1080 - 540,
        scale: Math.random() * 0.9 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)] as 'circle' | 'square' | 'triangle',
      }));

      setParticles(createParticles());
      
      setTimeout(() => {
        setParticles(prev => [...prev, ...createParticles(35)]);
      }, 50);

      setTimeout(() => {
        setParticles(prev => [...prev, ...createParticles(70)]);
      }, 150);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const getShapePath = (shape: 'circle' | 'square' | 'triangle') => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-sm';
      case 'triangle':
        return 'clip-path-triangle';
    }
  };

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            scale: 0,
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, particle.scale, particle.scale, particle.scale * 0.7],
            x: [0, particle.x * 0.3, particle.x * 0.6, particle.x],
            y: [0, particle.y * 0.2, particle.y * 0.4, particle.y + 400],
            rotate: [0, particle.rotation * 0.5, particle.rotation, particle.rotation * 1.5],
            opacity: [0, 1, 1, 0]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 3 + Math.random(),
            ease: [0.25, 0.85, 0.15, 1],
            times: [0, 0.2, 0.6, 1]
          }}
          className={`absolute w-[3px] h-[3px] ${getShapePath(particle.shape)}`}
          style={{ 
            backgroundColor: particle.color,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            boxShadow: '0 0 6px rgba(0,0,0,0.15)',
            clipPath: particle.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined
          }}
        />
      ))}
    </AnimatePresence>
  );
}