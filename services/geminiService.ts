import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkout = async (lastWorkoutFocus: string): Promise<WorkoutPlan> => {
  const modelId = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are an expert fitness trainer designing workouts for a father (47, beginner) and son (12, fit).
    
    You must strictly adhere to one of these 3 specific workout types for the output:
    1. "Arms, Chest, Back" (Upper Body Focus)
    2. "Legs & Abs" (Lower Body Focus)
    3. "Full Body" (General Conditioning)

    Constraints:
    1. Total time: approx 45-50 minutes.
    2. Structure: 15 minutes cardio warmup, followed by ~30 minutes of resistance training.
    3. Equipment: PRIMARY FOCUS on GYM MACHINES (safer/easier for beginners). Use Dumbbells only if machines aren't available for a specific movement.
    4. Safety: 12-year-old appropriate (strict form, 12-15 reps, moderate weight).
    5. Goal: Get dad fit, teach son basics.
  `;

  const prompt = `
    Context: The users performed '${lastWorkoutFocus}' in their last session.

    Your Goal: Generate TODAY's workout plan.
    
    LOGIC FOR SELECTION (Follow strictly):
    - If input mentions "Arms", "Chest", "Back", "Upper" -> TODAY MUST BE "Legs & Abs".
    - If input mentions "Legs", "Abs", "Lower" -> TODAY MUST BE "Arms, Chest, Back".
    - If input mentions "Full Body" -> TODAY MUST BE "Full Body".
    - If input is "Rest" or "Nothing" -> TODAY MUST BE "Full Body".

    The 'targetZone' field in your JSON response must be exactly one of: 
    - "Arms, Chest, Back"
    - "Legs & Abs"
    - "Full Body"
    
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
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING, description: "Range like '12-15'" },
                equipment: { type: Type.STRING },
                notes: { type: Type.STRING, description: "Form cues for beginner/youth" }
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

  return JSON.parse(response.text) as WorkoutPlan;
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