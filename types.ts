export type ExerciseCategory = 'Machine' | 'Dumbbell' | 'Barbell' | 'Bodyweight' | 'Cable' | 'Cardio' | 'Smith Machine';
export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body' | 'Cardio';

export interface LibraryExercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  specificTarget?: string; // e.g. "Upper Chest", "Quads", "Lats"
  category: ExerciseCategory;
  defaultNotes: string;
}

export interface Exercise {
  id?: string; // Optional for backward compatibility or pure AI gen
  name: string;
  sets: number;
  reps: string;
  equipment: string;
  notes: string;
  muscleGroup?: string; // Useful for swapping
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