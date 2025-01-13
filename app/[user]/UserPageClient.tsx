"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutCard from '../components/WorkoutCard';
import NutritionPlan from '../components/NutritionPlan';
import { ArrowLeft, Dumbbell, Apple } from 'lucide-react';
import Link from 'next/link';
import WorkoutExercises from '../components/WorkoutExercises';
import WorkoutSelector from '../components/WorkoutSelector';

interface UserPageClientProps {
  userData: any;
  workouts: any;
}

export default function UserPageClient({ userData, workouts }: UserPageClientProps) {
  const [selectedWorkout, setSelectedWorkout] = useState('A');
  const nutritionPlan = userData.protocolo_boneca_de_aco?.protocolo_alimentacao || userData.protocolo_ganho_peso;
  const currentWorkoutExercises = workouts?.[selectedWorkout]?.exercicios || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Plano de {userData.name}
          </h1>
        </motion.div>

        <Tabs defaultValue="treinos" className="mb-8">
          <TabsList className="w-full bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
            <TabsTrigger 
              value="treinos" 
              className="w-1/2 text-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              Treinos
            </TabsTrigger>
            <TabsTrigger 
              value="alimentacao" 
              className="w-1/2 text-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Apple className="w-4 h-4 mr-2" />
              Alimentação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="treinos">
            <div className="grid gap-6">
              <WorkoutSelector
                selectedWorkout={selectedWorkout}
                onSelectWorkout={setSelectedWorkout}
                workouts={workouts}
              />
              <WorkoutExercises
                exercises={currentWorkoutExercises}
                currentWorkout={selectedWorkout}
                workouts={workouts}
              />
            </div>
          </TabsContent>

          <TabsContent value="alimentacao">
            {nutritionPlan ? (
              <NutritionPlan
                title="Plano Alimentar"
                meals={nutritionPlan}
              />
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Plano alimentar não disponível
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}