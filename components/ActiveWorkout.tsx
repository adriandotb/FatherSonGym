import React, { useState, useEffect } from 'react';
import { WorkoutPlan, WorkoutLog, CompletedSet } from '../types';
import { CheckCircle2, Circle, Clock, Info, Save, ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { generateExerciseImage } from '../services/geminiService';

interface ActiveWorkoutProps {
  plan: WorkoutPlan;
  onComplete: (log: WorkoutLog) => void;
  onCancel: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ plan, onComplete, onCancel }) => {
  // State to track completed sets for each exercise
  // Structure: { [exerciseIndex]: [ {weight: 0, reps: 0}, ... ] }
  const [tracker, setTracker] = useState<Record<number, CompletedSet[]>>({});
  const [completedCardio, setCompletedCardio] = useState(false);
  
  // State for generated images
  const [exerciseImages, setExerciseImages] = useState<Record<number, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Trigger image generation for each exercise
    plan.exercises.forEach(async (ex, index) => {
      if (exerciseImages[index] || loadingImages[index]) return;

      setLoadingImages(prev => ({ ...prev, [index]: true }));
      try {
        const base64Image = await generateExerciseImage(ex.name);
        if (base64Image) {
          setExerciseImages(prev => ({ ...prev, [index]: base64Image }));
        }
      } catch (err) {
        console.error(`Failed to load image for ${ex.name}`, err);
      } finally {
        setLoadingImages(prev => ({ ...prev, [index]: false }));
      }
    });
  }, [plan]);

  const toggleSet = (exerciseIdx: number, setIdx: number, targetReps: string) => {
    setTracker(prev => {
      const currentSets = prev[exerciseIdx] || [];
      const newSets = [...currentSets];
      
      // Basic logic: If it exists, remove it (toggle off), else add it (toggle on)
      // For a simple app, we just mark it done.
      if (newSets[setIdx]) {
        // Remove if clicking again (undo)
        newSets.splice(setIdx, 1);
      } else {
        // Add "done" state. extracting number from range like "10-12" -> 10 for default
        const repVal = parseInt(targetReps.split('-')[0]) || 10; 
        newSets[setIdx] = { weight: 0, reps: repVal }; // Defaulting weight to 0 for simplicity now
      }
      
      return { ...prev, [exerciseIdx]: newSets };
    });
  };

  const isSetCompleted = (exerciseIdx: number, setIdx: number) => {
    return !!tracker[exerciseIdx]?.[setIdx];
  };

  const handleFinish = () => {
    const log: WorkoutLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      planName: "Daily Workout",
      targetZone: plan.targetZone,
      exercises: plan.exercises.map((ex, idx) => ({
        name: ex.name,
        setsCompleted: tracker[idx] || []
      }))
    };
    onComplete(log);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <button onClick={onCancel} className="text-slate-500 p-1">
          <ChevronLeft />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-lg text-slate-800">{plan.targetZone}</h2>
          <p className="text-xs text-slate-500">{plan.estimatedDuration}</p>
        </div>
        <button 
          onClick={handleFinish}
          className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-indigo-700 flex items-center"
        >
          <Save size={14} className="mr-1" />
          Finish
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        
        {/* Cardio Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center text-indigo-600 font-semibold uppercase tracking-wider text-sm">
              <Clock size={16} className="mr-2" />
              Warm Up
            </div>
            <button onClick={() => setCompletedCardio(!completedCardio)}>
              {completedCardio ? <CheckCircle2 className="text-green-500" /> : <Circle className="text-slate-300" />}
            </button>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.cardio.name}</h3>
          <p className="text-slate-600 font-medium mb-2">{plan.cardio.duration}</p>
          <div className="bg-indigo-50 p-3 rounded-lg text-sm text-indigo-800">
            {plan.cardio.notes}
          </div>
        </div>

        {/* Weights Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 px-1 uppercase text-sm tracking-wider">Resistance Training</h3>
          
          {plan.exercises.map((ex, exIdx) => (
            <div key={exIdx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-slate-800">{ex.name}</h4>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md uppercase font-bold">
                  {ex.equipment}
                </span>
              </div>
              
              {/* Image Generation Section */}
              <div className="mt-2 mb-4 w-full h-48 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                  {loadingImages[exIdx] ? (
                      <div className="flex flex-col items-center text-slate-400">
                          <Loader2 className="animate-spin mb-2" />
                          <span className="text-xs font-medium">Creating visual...</span>
                      </div>
                  ) : exerciseImages[exIdx] ? (
                      <img src={exerciseImages[exIdx]} alt={ex.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                  ) : (
                      <div className="flex flex-col items-center text-slate-300">
                           <ImageIcon size={32} />
                           <span className="text-xs mt-1">No visual available</span>
                      </div>
                  )}
              </div>

              <p className="text-sm text-slate-500 mb-4 flex items-center">
                <Info size={14} className="mr-1 inline" /> {ex.notes}
              </p>

              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: ex.sets }).map((_, setIdx) => {
                  const completed = isSetCompleted(exIdx, setIdx);
                  return (
                    <button
                      key={setIdx}
                      onClick={() => toggleSet(exIdx, setIdx, ex.reps)}
                      className={`
                        flex flex-col items-center justify-center p-2 rounded-xl border transition-all
                        ${completed 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300'}
                      `}
                    >
                      <span className="text-xs font-bold uppercase mb-1">Set {setIdx + 1}</span>
                      {completed ? <CheckCircle2 size={20} /> : <span className="text-sm font-semibold text-slate-900">{ex.reps}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};