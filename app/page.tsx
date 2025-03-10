"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { 
    ssr: false,
    loading: () => <div className="w-full h-64 bg-muted/10 rounded-lg animate-pulse" />
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Dumbbell className="w-20 h-20 mx-auto mb-6 text-blue-500 dark:text-blue-400" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            Evolução Fitness
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Acompanhe seus treinos, monitore seu progresso e alcance seus objetivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <Link href="/nayara" className="w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-3xl font-bold mb-3 text-white">Nayara</h2>
                <p className="text-lg text-gray-100">Protocolo Boneca de Aço</p>
                <div className="mt-4 bg-white/20 rounded-lg py-2 px-4 inline-block">
                  <span className="text-white text-sm">Treino Feminino</span>
                </div>
              </motion.div>
            </Link>
            <div className="mt-4">
              <Player
                autoplay
                loop
                src="https://lottie.host/23a2f9bf-edb2-42e0-a73c-ef766f3f5667/qVAFsIbG8S.json"
                style={{ height: '200px', width: '200px' }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/bruno" className="w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-3xl font-bold mb-3 text-white">Bruno</h2>
                <p className="text-lg text-gray-100">Protocolo Ganho de Peso</p>
                <div className="mt-4 bg-white/20 rounded-lg py-2 px-4 inline-block">
                  <span className="text-white text-sm">Treino Masculino</span>
                </div>
              </motion.div>
            </Link>
            <div className="mt-4">
              <Player
                autoplay
                loop
                src="https://lottie.host/8773f610-1fd6-47ab-a5c0-e6042c1ce499/ymHTuH9srI.json"
                style={{ height: '200px', width: '200px' }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}