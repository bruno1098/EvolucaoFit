interface BaseWorkout {
  grupo_muscular: string;
  exercicios: Array<{
    nome: string;
    series: number;
    repeticoes: string | number;
    descanso?: string;
    musculo_alvo?: string;
    instrucoes?: string[];
    dicas?: string[];
  }>;
}

interface Workouts {
  A: BaseWorkout;
  B: BaseWorkout;
  C: BaseWorkout;
  D: BaseWorkout;
  E: BaseWorkout;
}

interface NutricaoPlanType {
  cafe_da_manha: Array<{
    opcao: number;
    alimentos: string[];
  }>;
  // Adicione outros campos de nutrição se necessário
}

interface NayaraData {
  name: string;
  protocolo_boneca_de_aco: {
    treinos: Workouts;
    protocolo_alimentacao: NutricaoPlanType;
  };
}

interface BrunoData {
  name: string;
  treinos: Workouts;
  protocolo_ganho_peso: NutricaoPlanType;
}

export type UserData = {
  nayara: NayaraData;
  bruno: BrunoData;
}; 