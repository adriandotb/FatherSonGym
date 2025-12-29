import React, { useState, useEffect } from 'react';
import { generateWorkout } from './services/geminiService';
import { WorkoutPlan, WorkoutLog, AppView } from './types';
import { ActiveWorkout } from './components/ActiveWorkout';
import { History } from './components/History';
import { Dumbbell, Activity, History as HistoryIcon, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [targetFocus, setTargetFocus] = useState<string>('');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [history, setHistory] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gymBuddyHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!targetFocus.trim()) {
      setError("Please select a workout type.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setView(AppView.GENERATING);

    try {
      const plan = await generateWorkout(targetFocus);
      setWorkoutPlan(plan);
      setView(AppView.ACTIVE);
    } catch (e) {
      console.error(e);
      setError("Failed to create workout. Check your internet or API key.");
      setView(AppView.HOME);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteWorkout = (log: WorkoutLog) => {
    const newHistory = [...history, log];
    setHistory(newHistory);
    localStorage.setItem('gymBuddyHistory', JSON.stringify(newHistory));
    setView(AppView.HISTORY);
    setWorkoutPlan(null);
  };

  // Quick select options based on user description
  const quickSelects = [
    "Arms, Chest, Back",
    "Legs & Abs",
    "Full Body"
  ];

  if (view === AppView.GENERATING) {
    return (
      <div className="min-h-screen bg-indigo-600 flex flex-col items-center justify-center p-6 text-white text-center">
        <Activity className="animate-spin w-16 h-16 mb-6 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">Building Your Routine...</h2>
        <p className="opacity-80">Finding the best machines for you and your son.</p>
      </div>
    );
  }

  if (view === AppView.ACTIVE && workoutPlan) {
    return (
      <ActiveWorkout 
        plan={workoutPlan} 
        onComplete={handleCompleteWorkout}
        onCancel={() => setView(AppView.HOME)}
      />
    );
  }

  if (view === AppView.HISTORY) {
    return (
      <History 
        logs={history} 
        onBack={() => setView(AppView.HOME)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="bg-indigo-600 text-white p-8 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Dumbbell size={150} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Gym Buddy</h1>
          <p className="text-indigo-100 font-medium opacity-90">Ready for a session with your son?</p>
        </div>
      </header>

      <main className="flex-1 p-6 -mt-6">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-100">
          <label className="block text-slate-700 font-bold mb-3 text-lg">
            What do you want to work on today?
          </label>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSelects.map(opt => (
              <button
                key={opt}
                onClick={() => setTargetFocus(opt)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  targetFocus === opt 
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={targetFocus}
              onChange={(e) => setTargetFocus(e.target.value)}
              placeholder="Select from above..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center group"
          >
            <Sparkles className="mr-2 group-hover:scale-110 transition-transform" />
            Generate Today's Plan
          </button>
        </div>

        {/* Stats / Menu */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setView(AppView.HISTORY)}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all text-left"
          >
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mb-3">
              <HistoryIcon size={20} />
            </div>
            <span className="block text-2xl font-bold text-slate-800">{history.length}</span>
            <span className="text-sm text-slate-500 font-medium">Workouts Completed</span>
          </button>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-left">
             <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 mb-3">
              <Activity size={20} />
            </div>
            <span className="block text-2xl font-bold text-slate-800">12 & 47</span>
            <span className="text-sm text-slate-500 font-medium">Team Ages</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;