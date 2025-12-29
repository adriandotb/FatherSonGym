import { LibraryExercise } from "../types";

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  // --- CHEST ---
  // Pressing
  { id: 'chest-press-machine', name: 'Seated Chest Press', muscleGroup: 'Chest', specificTarget: 'Mid Chest', category: 'Machine', defaultNotes: 'Keep back flat against pad, push forward evenly.' },
  { id: 'incline-chest-press-machine', name: 'Incline Chest Press Machine', muscleGroup: 'Chest', specificTarget: 'Upper Chest', category: 'Machine', defaultNotes: 'Press upward at an angle, focus on upper pec contraction.' },
  { id: 'db-bench-press', name: 'Dumbbell Bench Press', muscleGroup: 'Chest', specificTarget: 'Mid Chest', category: 'Dumbbell', defaultNotes: 'Lower weights to chest level, press up and slightly in.' },
  { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', specificTarget: 'Upper Chest', category: 'Dumbbell', defaultNotes: 'Bench at 30-45 degrees. Press straight up from shoulders.' },
  { id: 'decline-pushups', name: 'Decline Push-ups', muscleGroup: 'Chest', specificTarget: 'Upper Chest', category: 'Bodyweight', defaultNotes: 'Feet on bench, hands on floor. Keep core tight.' },
  { id: 'pushups', name: 'Push-ups', muscleGroup: 'Chest', specificTarget: 'Mid Chest', category: 'Bodyweight', defaultNotes: 'Keep body in straight line, chest to floor.' },
  { id: 'dips-chest', name: 'Dips (Chest Focus)', muscleGroup: 'Chest', specificTarget: 'Lower Chest', category: 'Bodyweight', defaultNotes: 'Lean forward slightly to engage chest over triceps.' },
  // Flys
  { id: 'pec-deck', name: 'Pec Deck Fly', muscleGroup: 'Chest', specificTarget: 'Inner Chest', category: 'Machine', defaultNotes: 'Squeeze chest at the center, slight bend in elbows.' },
  { id: 'cable-fly-high', name: 'High-to-Low Cable Fly', muscleGroup: 'Chest', specificTarget: 'Lower Chest', category: 'Cable', defaultNotes: 'Pull handles down towards waist, keeping chest up.' },
  { id: 'cable-fly-low', name: 'Low-to-High Cable Fly', muscleGroup: 'Chest', specificTarget: 'Upper Chest', category: 'Cable', defaultNotes: 'Scoop handles up and in towards chin level.' },
  { id: 'db-fly', name: 'Dumbbell Fly', muscleGroup: 'Chest', specificTarget: 'Outer Chest', category: 'Dumbbell', defaultNotes: 'Wide arc, feel the stretch at the bottom. Hug a tree to close.' },

  // --- BACK ---
  // Vertical Pull (Lats/Width)
  { id: 'lat-pulldown', name: 'Lat Pulldown (Wide Grip)', muscleGroup: 'Back', specificTarget: 'Lats (Width)', category: 'Machine', defaultNotes: 'Pull bar to upper chest, squeeze shoulder blades down.' },
  { id: 'close-grip-pulldown', name: 'Close Grip Lat Pulldown', muscleGroup: 'Back', specificTarget: 'Lower Lats', category: 'Machine', defaultNotes: 'Use v-handle, pull to upper chest, keep elbows in.' },
  { id: 'assisted-pullup', name: 'Assisted Pull-up', muscleGroup: 'Back', specificTarget: 'Lats (Width)', category: 'Machine', defaultNotes: 'Full range of motion, control the descent.' },
  { id: 'pullups', name: 'Pull-ups', muscleGroup: 'Back', specificTarget: 'Lats (Width)', category: 'Bodyweight', defaultNotes: 'Wide grip, chin over bar.' },
  // Horizontal Pull (Thickness)
  { id: 'seated-row-machine', name: 'Seated Machine Row', muscleGroup: 'Back', specificTarget: 'Mid Back', category: 'Machine', defaultNotes: 'Keep chest up, pull handle to stomach.' },
  { id: 'cable-row', name: 'Seated Cable Row', muscleGroup: 'Back', specificTarget: 'Mid Back', category: 'Cable', defaultNotes: 'Keep back straight, pull handle to waist.' },
  { id: 'db-row', name: 'Single Arm Dumbbell Row', muscleGroup: 'Back', specificTarget: 'Lats', category: 'Dumbbell', defaultNotes: 'Flat back, support on bench, pull weight to hip.' },
  { id: 't-bar-row-machine', name: 'T-Bar Row (Chest Supported)', muscleGroup: 'Back', specificTarget: 'Mid Back', category: 'Machine', defaultNotes: 'Keep chest on pad, squeeze back at top.' },
  { id: 'face-pull', name: 'Face Pull', muscleGroup: 'Back', specificTarget: 'Upper Back/Rear Delts', category: 'Cable', defaultNotes: 'Pull rope to forehead, elbows high and wide.' },
  // Lower Back
  { id: 'back-extension', name: 'Back Extension', muscleGroup: 'Back', specificTarget: 'Lower Back', category: 'Bodyweight', defaultNotes: 'Cross arms over chest, hinge at hips, neutral spine.' },

  // --- LEGS ---
  // Quads
  { id: 'leg-press', name: 'Leg Press', muscleGroup: 'Legs', specificTarget: 'Quads', category: 'Machine', defaultNotes: 'Feet shoulder width in middle of platform. Do not lock knees.' },
  { id: 'hack-squat', name: 'Hack Squat Machine', muscleGroup: 'Legs', specificTarget: 'Quads', category: 'Machine', defaultNotes: 'Back flat against pad, go deep, drive through heels.' },
  { id: 'leg-extension', name: 'Leg Extension', muscleGroup: 'Legs', specificTarget: 'Quads', category: 'Machine', defaultNotes: 'Squeeze quads hard at the top, control the lowering.' },
  { id: 'goblet-squat', name: 'Goblet Squat', muscleGroup: 'Legs', specificTarget: 'Quads/Glutes', category: 'Dumbbell', defaultNotes: 'Hold weight at chest, sit back deep, keep chest up.' },
  { id: 'walking-lunges', name: 'Walking Lunges', muscleGroup: 'Legs', specificTarget: 'Quads/Glutes', category: 'Bodyweight', defaultNotes: 'Step forward, back knee almost touches ground. Keep torso upright.' },
  { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', muscleGroup: 'Legs', specificTarget: 'Quads/Glutes', category: 'Dumbbell', defaultNotes: 'Rear foot on bench. Drop back knee to floor.' },
  // Hamstrings & Glutes
  { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'Legs', specificTarget: 'Hamstrings', category: 'Machine', defaultNotes: 'Lock pad firmly on thighs. Curl legs fully under you.' },
  { id: 'lying-leg-curl', name: 'Lying Leg Curl', muscleGroup: 'Legs', specificTarget: 'Hamstrings', category: 'Machine', defaultNotes: 'Hips down on bench, curl heels to glutes.' },
  { id: 'rdl-db', name: 'Romanian Deadlift (DB)', muscleGroup: 'Legs', specificTarget: 'Hamstrings/Glutes', category: 'Dumbbell', defaultNotes: 'Slight knee bend, hinge at hips, flat back. Feel hamstring stretch.' },
  { id: 'glute-bridge-machine', name: 'Glute Drive / Bridge Machine', muscleGroup: 'Legs', specificTarget: 'Glutes', category: 'Machine', defaultNotes: 'Belt across hips, drive hips up, squeeze glutes at top.' },
  { id: 'cable-kickback', name: 'Cable Glute Kickback', muscleGroup: 'Legs', specificTarget: 'Glutes', category: 'Cable', defaultNotes: 'Ankle strap, kick straight back, squeeze glute.' },
  // Calves
  { id: 'calf-raise-machine', name: 'Standing Calf Raise', muscleGroup: 'Legs', specificTarget: 'Calves', category: 'Machine', defaultNotes: 'Full stretch at bottom, high on toes at top.' },
  { id: 'seated-calf-raise', name: 'Seated Calf Raise', muscleGroup: 'Legs', specificTarget: 'Calves', category: 'Machine', defaultNotes: 'Focus on soleus muscle. Controlled motion.' },

  // --- SHOULDERS ---
  // Overhead Press
  { id: 'shoulder-press-machine', name: 'Shoulder Press Machine', muscleGroup: 'Shoulders', specificTarget: 'Front/Side Delts', category: 'Machine', defaultNotes: 'Press straight up, don\'t arch back excessively.' },
  { id: 'db-shoulder-press', name: 'Seated DB Shoulder Press', muscleGroup: 'Shoulders', specificTarget: 'Front/Side Delts', category: 'Dumbbell', defaultNotes: 'Palms forward, press overhead to touch.' },
  { id: 'arnold-press', name: 'Arnold Press', muscleGroup: 'Shoulders', specificTarget: 'Front/Side Delts', category: 'Dumbbell', defaultNotes: 'Start palms facing you, rotate out as you press up.' },
  // Isolation
  { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', muscleGroup: 'Shoulders', specificTarget: 'Side Delts', category: 'Dumbbell', defaultNotes: 'Lift arms to side until parallel with floor. Pour the pitcher.' },
  { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', muscleGroup: 'Shoulders', specificTarget: 'Side Delts', category: 'Cable', defaultNotes: 'Cable passes behind back or in front. Constant tension.' },
  { id: 'machine-lateral-raise', name: 'Lateral Raise Machine', muscleGroup: 'Shoulders', specificTarget: 'Side Delts', category: 'Machine', defaultNotes: 'Elbows against pads, lift with elbows.' },
  { id: 'front-raise-db', name: 'Dumbbell Front Raise', muscleGroup: 'Shoulders', specificTarget: 'Front Delts', category: 'Dumbbell', defaultNotes: 'Lift straight in front to shoulder height.' },
  { id: 'reverse-fly-machine', name: 'Reverse Pec Deck', muscleGroup: 'Shoulders', specificTarget: 'Rear Delts', category: 'Machine', defaultNotes: 'Sit facing pad, pull arms back, squeeze rear delts.' },

  // --- ARMS ---
  // Biceps
  { id: 'bicep-curl-machine', name: 'Preacher Curl Machine', muscleGroup: 'Arms', specificTarget: 'Biceps', category: 'Machine', defaultNotes: 'Keep elbows on pad, curl fully.' },
  { id: 'db-bicep-curl', name: 'Standing Dumbbell Curl', muscleGroup: 'Arms', specificTarget: 'Biceps', category: 'Dumbbell', defaultNotes: 'Rotate palms up as you lift (supinate).' },
  { id: 'hammer-curl', name: 'Hammer Curls', muscleGroup: 'Arms', specificTarget: 'Biceps/Forearms', category: 'Dumbbell', defaultNotes: 'Palms facing each other throughout the movement.' },
  { id: 'cable-bicep-curl', name: 'Cable Bicep Curl', muscleGroup: 'Arms', specificTarget: 'Biceps', category: 'Cable', defaultNotes: 'Bar attachment, elbows at sides, curl up.' },
  { id: 'incline-db-curl', name: 'Incline Dumbbell Curl', muscleGroup: 'Arms', specificTarget: 'Biceps (Stretch)', category: 'Dumbbell', defaultNotes: 'Seated on incline bench, arms hanging back. Full stretch.' },
  // Triceps
  { id: 'tricep-press-machine', name: 'Tricep Press Machine', muscleGroup: 'Arms', specificTarget: 'Triceps', category: 'Machine', defaultNotes: 'Push down, keeping elbows close to body.' },
  { id: 'cable-rope-pushdown', name: 'Cable Rope Pushdown', muscleGroup: 'Arms', specificTarget: 'Triceps', category: 'Cable', defaultNotes: 'Spread rope at bottom, keep elbows locked at sides.' },
  { id: 'skullcrushers-db', name: 'Dumbbell Skullcrushers', muscleGroup: 'Arms', specificTarget: 'Triceps', category: 'Dumbbell', defaultNotes: 'Lying flat, bend at elbows bringing weights to ears.' },
  { id: 'overhead-tricep-db', name: 'Overhead Dumbbell Extension', muscleGroup: 'Arms', specificTarget: 'Triceps (Long Head)', category: 'Dumbbell', defaultNotes: 'Seated or standing, one heavy DB behind head.' },
  { id: 'bench-dips', name: 'Bench Dips', muscleGroup: 'Arms', specificTarget: 'Triceps', category: 'Bodyweight', defaultNotes: 'Lower hips, keep back close to bench. Legs straight for harder variation.' },

  // --- CORE ---
  { id: 'ab-crunch-machine', name: 'Ab Crunch Machine', muscleGroup: 'Core', specificTarget: 'Upper Abs', category: 'Machine', defaultNotes: 'Use abs to curl forward, not arms.' },
  { id: 'plank', name: 'Plank', muscleGroup: 'Core', specificTarget: 'Core Stability', category: 'Bodyweight', defaultNotes: 'Straight line from head to heels, core tight, hold.' },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', muscleGroup: 'Core', specificTarget: 'Lower Abs', category: 'Bodyweight', defaultNotes: 'Hang from bar, lift knees to chest.' },
  { id: 'cable-woodchopper', name: 'Cable Woodchopper', muscleGroup: 'Core', specificTarget: 'Obliques', category: 'Cable', defaultNotes: 'Rotate torso against resistance, pivot back foot.' },
  { id: 'russian-twist', name: 'Russian Twist', muscleGroup: 'Core', specificTarget: 'Obliques', category: 'Bodyweight', defaultNotes: 'Seated V-shape, rotate hands side to side.' },

  // --- CARDIO ---
  { id: 'treadmill', name: 'Treadmill', muscleGroup: 'Cardio', specificTarget: 'Endurance', category: 'Cardio', defaultNotes: 'Steady pace or incline walk.' },
  { id: 'elliptical', name: 'Elliptical', muscleGroup: 'Cardio', specificTarget: 'Low Impact', category: 'Cardio', defaultNotes: 'Use handles to engage arms.' },
  { id: 'rower', name: 'Rowing Machine', muscleGroup: 'Cardio', specificTarget: 'Full Body Cardio', category: 'Cardio', defaultNotes: 'Drive with legs, then pull with arms.' },
  { id: 'bike', name: 'Stationary Bike', muscleGroup: 'Cardio', specificTarget: 'Leg Endurance', category: 'Cardio', defaultNotes: 'Adjust seat height so leg is almost straight at bottom.' },
  { id: 'stairmaster', name: 'StairMaster', muscleGroup: 'Cardio', specificTarget: 'Glutes/Calves', category: 'Cardio', defaultNotes: 'Don\'t lean too heavily on the rails.' }
];

export const getExercisesByMuscle = (muscle: string) => {
  return EXERCISE_LIBRARY.filter(ex => ex.muscleGroup === muscle);
};

export const getExerciseById = (id: string) => {
  return EXERCISE_LIBRARY.find(ex => ex.id === id);
};