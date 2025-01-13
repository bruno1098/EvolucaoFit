"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import WorkoutCard from './WorkoutCard';
import { Exercise, Workout } from '@/types/exercises';

interface WorkoutExercisesProps {
  exercises: Exercise[];
  currentWorkout: string;
  workouts: {
    [key: string]: Workout;
  };
}

export default function WorkoutExercises({ exercises, currentWorkout, workouts }: WorkoutExercisesProps) {
  const { toast } = useToast();
  const [completedExerciseIds, setCompletedExerciseIds] = useState<Set<string>>(new Set());

  const getNextWorkout = (current: string) => {
    const sequence = ['A', 'B', 'C', 'D', 'E'];
    const currentIndex = sequence.indexOf(current);
    return sequence[(currentIndex + 1) % sequence.length];
  };

  const allExercisesCompleted = completedExerciseIds.size === exercises.length;

  useEffect(() => {
    if (allExercisesCompleted && exercises.length > 0) {
      const nextWorkout = getNextWorkout(currentWorkout);
      const nextWorkoutMuscleGroup = workouts[nextWorkout]?.grupo_muscular;

      toast({
        title: "🎉 TREINO FINALIZADO!",
        description: (
          <div className="space-y-2">
            <p>Você completou o Treino {currentWorkout} com sucesso!</p>
            <p className="font-medium mt-2">Próximo treino:</p>
            <p>
              Treino {nextWorkout} - {nextWorkoutMuscleGroup}
            </p>
            <p className="italic mt-2 text-sm">
              "A consistência é a chave do sucesso. Continue firme! 💪"
            </p>
          </div>
        ),
        duration: 5000,
        className: "bg-green-100 dark:bg-green-900 border-green-500",
      });
    }
  }, [allExercisesCompleted, exercises.length, currentWorkout, workouts, toast]);

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExerciseIds(prev => {
      const newSet = new Set(prev);
      newSet.add(exerciseId);
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <WorkoutCard
          key={`${exercise.nome}-${index}`}
          exercise={exercise}
          index={index}
          onExerciseComplete={() => handleExerciseComplete(`${exercise.nome}-${index}`)}
          isLastExercise={index === exercises.length - 1}
          totalExercises={exercises.length}
          completedExercises={completedExerciseIds.size}
          currentWorkout={currentWorkout}
          nextWorkout={getNextWorkout(currentWorkout)}
          nextWorkoutMuscleGroup={workouts[getNextWorkout(currentWorkout)]?.grupo_muscular || ''}
        />
      ))}
    </div>
  );
} 