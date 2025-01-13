"use client";

import { motion } from 'framer-motion';
import { Workout } from '@/types/exercises';

interface WorkoutSelectorProps {
  selectedWorkout: string;
  onSelectWorkout: (workout: string) => void;
  workouts: {
    [key: string]: Workout;
  };
}

export default function WorkoutSelector({
  selectedWorkout,
  onSelectWorkout,
  workouts,
}: WorkoutSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Object.entries(workouts).map(([key, workout]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectWorkout(key)}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            selectedWorkout === key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Treino {key}
          <span className="block text-sm font-normal">
            {workout.grupo_muscular}
          </span>
        </motion.button>
      ))}
    </div>
  );
} 