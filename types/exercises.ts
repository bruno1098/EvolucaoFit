export interface Exercise {
  nome: string;
  series: number;
  repeticoes: string | number;
  descanso: string;
  instrucoes?: string[];
  dicas?: string[];
  musculo_alvo?: string;
}

export interface Workout {
  grupo_muscular: string;
  exercicios: Exercise[];
}

export interface WorkoutData {
  [key: string]: {
    name: string;
    treinos: {
      [key: string]: Workout;
    };
  };
} 