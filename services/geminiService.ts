import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPlan, Exercise } from "../types";
import { EXERCISE_LIBRARY, getExerciseById } from "./exerciseLibrary";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkout = async (targetFocus: string): Promise<WorkoutPlan> => {
  const modelId = "gemini-2.5-flash";
  
  // Convert library to a simplified string for context, now including specific target info
  const libraryContext = EXERCISE_LIBRARY.map(ex => 
    `- ID: "${ex.id}" | Name: ${ex.name} | Group: ${ex.muscleGroup} | Target: ${ex.specificTarget || 'General'} | Type: ${ex.category}`
  ).join("\n");

  const systemInstruction = `
    You are an expert fitness trainer designing workouts for a father (47, beginner) and son (12, fit).
    
    You have access to a specific "Exercise Library". 
    You MUST ONLY select exercises from this library using their exact IDs.
    
    Library:
    ${libraryContext}

    Constraints:
    1. Total time: approx 45-50 minutes.
    2. Structure: 15 minutes cardio warmup, followed by ~30 minutes of resistance training (5-7 exercises).
    3. Selection: Prioritize MACHINES from the library for safety, but mix in dumbbells/bodyweight if needed.
    4. Safety: 12-year-old appropriate (strict form, 12-15 reps, moderate weight).
    
    Workout Types:
    - If "Arms, Chest, Back" -> Select Upper Body exercises. Ensure balance (e.g., Push vs Pull).
    - If "Legs & Abs" -> Select Lower Body & Core exercises. Balance Quads, Hamstrings, and Calves.
    - If "Full Body" -> Select a mix of major compound movements covering all groups.
  `;

  const prompt = `
    User Request: The user wants to perform a '${targetFocus}' workout today.

    Your Goal: Generate a workout plan by selecting specific IDs from the library provided.
    
    LOGIC:
    - If request mentions "Arms", "Chest", "Back", "Upper" -> TODAY MUST BE "Arms, Chest, Back".
    - If request mentions "Legs", "Abs", "Lower" -> TODAY MUST BE "Legs & Abs".
    - If request mentions "Full Body" -> TODAY MUST BE "Full Body".
    
    Return a JSON object with the specific plan.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          targetZone: { type: Type.STRING, description: "One of: 'Arms, Chest, Back', 'Legs & Abs', or 'Full Body'" },
          estimatedDuration: { type: Type.STRING, description: "Total estimated time" },
          cardio: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              duration: { type: Type.STRING },
              notes: { type: Type.STRING, description: "Intensity instructions" }
            }
          },
          selectedExerciseIds: {
            type: Type.ARRAY,
            description: "List of exercise IDs chosen from the library",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Exact ID from library" },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING, description: "Range like '12-15'" },
                notes: { type: Type.STRING, description: "Specific tips for this session" }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate workout");
  }

  const result = JSON.parse(response.text);

  // Map the selected IDs back to full exercise objects
  const exercises: Exercise[] = result.selectedExerciseIds.map((item: any) => {
    const libExercise = getExerciseById(item.id);
    if (!libExercise) return null;
    
    return {
      id: libExercise.id,
      name: libExercise.name,
      muscleGroup: libExercise.muscleGroup,
      equipment: libExercise.category,
      sets: item.sets,
      reps: item.reps,
      notes: item.notes || libExercise.defaultNotes // Use AI notes or fallback to default
    };
  }).filter((ex: any) => ex !== null); // Filter out any invalid IDs

  return {
    targetZone: result.targetZone,
    estimatedDuration: result.estimatedDuration,
    cardio: result.cardio,
    exercises: exercises
  };
};

export const generateExerciseImage = async (exerciseName: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Create a simple, clear, flat vector illustration of a person performing the gym exercise: ${exerciseName}. White background. Educational style. No text in image.` }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Error generating image for", exerciseName, e);
    return null;
  }
};