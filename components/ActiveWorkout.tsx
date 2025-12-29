import React, { useState, useEffect } from 'react';
import { WorkoutPlan, WorkoutLog, CompletedSet, Exercise } from '../types';
import { CheckCircle2, Circle, Clock, Info, Save, ChevronLeft, Image as ImageIcon, Loader2, RefreshCw, X, Filter } from 'lucide-react';
import { generateExerciseImage } from '../services/geminiService';
import { EXERCISE_LIBRARY } from '../services/exerciseLibrary';

interface ActiveWorkoutProps {
  plan: WorkoutPlan;
  onComplete: (log: WorkoutLog) => void;
  onCancel: () => void;
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ plan, onComplete, onCancel }) => {
  const [exercises, setExercises] = useState<Exercise[]>(plan.exercises);
  const [tracker, setTracker] = useState<Record<number, CompletedSet[]>>({});
  const [completedCardio, setCompletedCardio] = useState(false);
  const [exerciseImages, setExerciseImages] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  // Swap Modal State
  const [swappingIndex, setSwappingIndex] = useState<number | null>(null);

  useEffect(() => {
    exercises.forEach(async (ex) => {
      if (exerciseImages[ex.name] || loadingImages[ex.name]) return;

      setLoadingImages(prev => ({ ...prev, [ex.name]: true }));
      try {
        const base64Image = await generateExerciseImage(ex.name);
        if (base64Image) {
          setExerciseImages(prev => ({ ...prev, [ex.name]: base64Image }));
        }
      } catch (err) {
        console.error(`Failed to load image for ${ex.name}`, err);
      } finally {
        setLoadingImages(prev => ({ ...prev, [ex.name]: false }));
      }
    });
  }, [exercises]);

  const toggleSet = (exerciseIdx: number, setIdx: number, targetReps: string) => {
    setTracker(prev => {
      const currentSets = prev[exerciseIdx] || [];
      const newSets = [...currentSets];
      
      if (newSets[setIdx]) {
        newSets.splice(setIdx, 1);
      } else {
        const repVal = parseInt(targetReps.split('-')[0]) || 10; 
        newSets[setIdx] = { weight: 0, reps: repVal }; 
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
      exercises: exercises.map((ex, idx) => ({
        name: ex.name,
        setsCompleted: tracker[idx] || []
      }))
    };
    onComplete(log);
  };

  const handleSwap = (newExerciseId: string) => {
    if (swappingIndex === null) return;

    const originalEx = exercises[swappingIndex];
    const newLibEx = EXERCISE_LIBRARY.find(e => e.id === newExerciseId);

    if (newLibEx) {
      const newExercise: Exercise = {
        id: newLibEx.id,
        name: newLibEx.name,
        muscleGroup: newLibEx.muscleGroup,
        equipment: newLibEx.category,
        sets: originalEx.sets, // Keep same volume
        reps: originalEx.reps,
        notes: newLibEx.defaultNotes
      };

      const updatedExercises = [...exercises];
      updatedExercises[swappingIndex] = newExercise;
      
      setExercises(updatedExercises);
      
      // Reset tracker for this slot
      setTracker(prev => {
        const newTracker = { ...prev };
        delete newTracker[swappingIndex];
        return newTracker;
      });
    }
    setSwappingIndex(null);
  };

  // Get alternatives grouped by specificTarget or at least sorted
  const getAlternatives = (currentEx: Exercise) => {
    if (!currentEx.muscleGroup) return [];
    
    // Find library entry for current exercise to know its specific target
    const currentLibEx = EXERCISE_LIBRARY.find(e => e.id === currentEx.id);
    const currentTarget = currentLibEx?.specificTarget;

    // Filter by muscle group, exclude self
    let alts = EXERCISE_LIBRARY.filter(ex => 
      ex.muscleGroup === currentEx.muscleGroup && ex.id !== currentEx.id
    );
    
    // Sort: put exact target matches at the top
    if (currentTarget) {
      alts.sort((a, b) => {
        if (a.specificTarget === currentTarget && b.specificTarget !== currentTarget) return -1;
        if (a.specificTarget !== currentTarget && b.specificTarget === currentTarget) return 1;
        return 0;
      });
    }

    return alts;
  };

  const swappingExercise = swappingIndex !== null ? exercises[swappingIndex] : null;
  const alternatives = swappingExercise ? getAlternatives(swappingExercise) : [];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
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
          
          {exercises.map((ex, exIdx) => (
            <div key={exIdx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative group">
              
              <div className="flex justify-between items-start mb-2">
                <div className="pr-8">
                  <h4 className="text-lg font-bold text-slate-800 leading-tight">{ex.name}</h4>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md uppercase font-bold mt-1 inline-block">
                    {ex.equipment}
                  </span>
                </div>
                
                {/* Swap Button */}
                <button 
                  onClick={() => setSwappingIndex(exIdx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 p-1 bg-slate-50 rounded-lg border border-slate-100"
                  title="Swap Exercise"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
              
              {/* Image Generation Section */}
              <div className="mt-3 mb-4 w-full h-48 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                  {loadingImages[ex.name] ? (
                      <div className="flex flex-col items-center text-slate-400">
                          <Loader2 className="animate-spin mb-2" />
                          <span className="text-xs font-medium">Creating visual...</span>
                      </div>
                  ) : exerciseImages[ex.name] ? (
                      <img src={exerciseImages[ex.name]} alt={ex.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                  ) : (
                      <div className="flex flex-col items-center text-slate-300">
                           <ImageIcon size={32} />
                           <span className="text-xs mt-1">No visual available</span>
                      </div>
                  )}
              </div>

              <p className="text-sm text-slate-500 mb-4 flex items-start">
                <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" /> 
                <span>{ex.notes}</span>
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

      {/* Swap Modal */}
      {swappingIndex !== null && swappingExercise && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-11/12 max-w-md h-[80vh] sm:h-auto rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Swap {swappingExercise.name}</h3>
                <p className="text-sm text-slate-500 flex items-center">
                  <Filter size={12} className="mr-1"/>
                  {swappingExercise.muscleGroup} Options
                </p>
              </div>
              <button onClick={() => setSwappingIndex(null)} className="p-2 text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-2 flex-1 space-y-2">
              {alternatives.map((alt) => (
                <button
                  key={alt.id}
                  onClick={() => handleSwap(alt.id)}
                  className="w-full text-left p-4 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all flex justify-between items-center group"
                >
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-700">{alt.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-semibold">{alt.category}</span>
                        {alt.specificTarget && (
                            <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-semibold">
                                {alt.specificTarget}
                            </span>
                        )}
                    </div>
                  </div>
                  <ChevronLeft className="rotate-180 text-slate-300 group-hover:text-indigo-400" size={20} />
                </button>
              ))}
              {alternatives.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  <p>No other alternatives found for this muscle group in the library.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};