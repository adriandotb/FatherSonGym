export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  equipment: string;
  notes: string;
}

export interface WorkoutPlan {
  targetZone: string;
  cardio: {
    name: string;
    duration: string;
    notes: string;
  };
  exercises: Exercise[];
  estimatedDuration: string;
}

export interface CompletedSet {
  weight: number;
  reps: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  planName: string;
  targetZone: string;
  exercises: {
    name: string;
    setsCompleted: CompletedSet[];
  }[];
}

export enum AppView {
  HOME = 'HOME',
  GENERATING = 'GENERATING',
  ACTIVE = 'ACTIVE',
  HISTORY = 'HISTORY',
}