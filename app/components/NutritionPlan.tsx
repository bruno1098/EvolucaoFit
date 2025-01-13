"use client";

import { motion } from 'framer-motion';
import { Apple, Coffee, Sun, Sunset, Moon } from 'lucide-react';

interface Meal {
  opcao: string | number;
  alimentos: string[];
}

interface NutritionPlanProps {
  meals: {
    cafe_da_manha: Meal[];
    lanche_da_manha: Meal[];
    almoco: Meal[];
    lanche_da_tarde: Meal[];
    jantar: Meal[];
    ceia?: Meal[];
  };
  title: string;
}

const getMealIcon = (mealKey: string) => {
  switch (mealKey) {
    case 'cafe_da_manha':
      return <Coffee className="w-5 h-5" />;
    case 'lanche_da_manha':
    case 'almoco':
      return <Sun className="w-5 h-5" />;
    case 'lanche_da_tarde':
      return <Sunset className="w-5 h-5" />;
    case 'jantar':
    case 'ceia':
      return <Moon className="w-5 h-5" />;
    default:
      return <Coffee className="w-5 h-5" />;
  }
};

export default function NutritionPlan({ meals, title }: NutritionPlanProps) {
  if (!meals) return null;

  const mealSections = [
    { key: 'cafe_da_manha', title: 'Café da Manhã' },
    { key: 'lanche_da_manha', title: 'Lanche da Manhã' },
    { key: 'almoco', title: 'Almoço' },
    { key: 'lanche_da_tarde', title: 'Lanche da Tarde' },
    { key: 'jantar', title: 'Jantar' },
    { key: 'ceia', title: 'Ceia' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <Apple className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div className="space-y-6">
          {mealSections.map(({ key, title: sectionTitle }) => {
            const mealOptions = meals[key as keyof typeof meals];
            if (!mealOptions) return null;

            return (
              <div key={key} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {sectionTitle}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {mealOptions.map((meal, index) => (
                    <motion.div
                      key={`${key}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            {getMealIcon(key)}
                          </div>
                        </div>
                        {typeof meal.opcao === 'number' && (
                          <span className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                            Opção {meal.opcao}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {meal.alimentos.map((alimento, i) => (
                          <li
                            key={i}
                            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span>{alimento}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}