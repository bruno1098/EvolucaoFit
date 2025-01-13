"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Minus, Clock, Pause, Play, RotateCcw, CheckCircle2, Info, ChevronDown, ChevronUp, Dumbbell } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; // Corrigido o caminho da importação
import Confetti from './Confetti';

interface Exercise {
  nome: string;
  series: number;
  repeticoes: string | number;
  descanso?: string;
  musculo_alvo?: string;
  instrucoes?: string[];
  dicas?: string[];
}

interface WorkoutCardProps {
  exercise: Exercise;
  index: number;
  currentWorkout: string;
  nextWorkout: string;
  nextWorkoutMuscleGroup: string;
  isLastExercise: boolean;
  totalExercises: number;
  completedExercises: number;
  onExerciseComplete: () => void;
}

export default function WorkoutCard({ exercise, index, currentWorkout, nextWorkout, nextWorkoutMuscleGroup, isLastExercise, totalExercises, completedExercises, onExerciseComplete }: WorkoutCardProps) {
  const { toast } = useToast();
  const [completedSets, setCompletedSets] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const isCompleted = completedSets === exercise.series;

  const defaultInstructions = [
    "Mantenha a postura correta durante todo o movimento",
    "Respire de forma controlada: inspire na fase excêntrica, expire na concêntrica",
    "Mantenha a tensão muscular durante todo o exercício"
  ];

  const defaultDicas = [
    "Foque na contração do músculo alvo",
    "Mantenha o core sempre ativado",
    "Evite movimentos bruscos ou muito rápidos"
  ];

  const instructions = exercise.instrucoes || defaultInstructions;
  const tips = exercise.dicas || defaultDicas;

  const getRestTimeInSeconds = (restTime: string) => {
    if (!restTime || restTime === "000000") return 0;
    const match = restTime.match(/(\d+)\s*(?:segs|min)/);
    if (!match) return 0;
    const value = parseInt(match[1]);
    return restTime.includes("min") ? value * 60 : value;
  };

  const startTimer = () => {
    const restSeconds = getRestTimeInSeconds(exercise.descanso || "");
    if (restSeconds > 0) {
      setTimeLeft(restSeconds);
      setIsResting(true);
      setIsPaused(false);
    }
  };

  const resetTimer = () => {
    setIsResting(false);
    setTimeLeft(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isResting && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsResting(false);
            toast({
              title: "Descanso finalizado! 💪",
              description: "Hora de fazer mais uma série!",
              duration: 4000,
              className: "bg-green-100 dark:bg-green-900 border-green-500",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting, isPaused, timeLeft, toast]);

  useEffect(() => {
    if (completedSets === exercise.series) {
      setShowCelebration(true);
      onExerciseComplete();

      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [completedSets, exercise.series, onExerciseComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        backgroundColor: isCompleted ? 'rgb(22 163 74 / 0.1)' : 'transparent'
      }}
      transition={{ 
        delay: index * 0.1,
        backgroundColor: { duration: 0.3 }
      }}
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
        ${isCompleted ? 'dark:bg-gray-800/50 border-2 border-green-500/20' : 'border border-gray-200 dark:border-gray-700'}`}
    >
      <Confetti isActive={showCelebration} />
     
      <div className="p-6">
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700/30'}`}>
              <Dumbbell className={`w-6 h-6 ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{exercise.nome}</h3>
              {exercise.musculo_alvo && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exercise.musculo_alvo}
                </p>
              )}
            </div>
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500"
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
          )}
        </div>

        {/* Informações e Controles */}
        <div className="flex flex-col space-y-4">
          {/* Badges de informação */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
              <span className="text-sm font-medium">
                {completedSets}/{exercise.series} séries
              </span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
              <span className="text-sm font-medium">
                {exercise.repeticoes} reps
              </span>
            </div>
            {exercise.descanso && (
              <div className="bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{exercise.descanso}</span>
              </div>
            )}
          </div>

          {/* Controles de séries */}
          <div className="flex flex-col bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
            <div className="text-xl font-semibold text-center mb-4">
              Séries completadas: {completedSets}/{exercise.series}
            </div>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => {
                  setCompletedSets(Math.max(0, completedSets - 1));
                  resetTimer();
                }}
                className="p-6 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
                disabled={completedSets === 0}
              >
                <Minus className="w-8 h-8" />
              </button>
              <button
                onClick={() => {
                  if (completedSets < exercise.series) {
                    setCompletedSets(completedSets + 1);
                    startTimer();
                  }
                }}
                className="p-6 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50"
                disabled={isCompleted}
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Barra de progresso */}
          <motion.div
            className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(completedSets / exercise.series) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Botão de instruções */}
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="mt-6 w-full flex items-center justify-between px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="flex items-center">
            <Info className="w-4 h-4 mr-2" />
            {showInstructions ? "Ocultar instruções" : "Ver instruções"}
          </span>
          {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Instruções expandíveis */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">Como fazer:</h4>
                  <ul className="space-y-2">
                    {instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 mt-0.5">
                          {i + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">Dicas importantes:</h4>
                  <ul className="space-y-2">
                    {tips.map((tip, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2 mt-0.5">
                          ✓
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timer flutuante */}
      <AnimatePresence>
        {isResting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-2xl shadow-lg backdrop-blur-sm z-50"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={togglePause}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}