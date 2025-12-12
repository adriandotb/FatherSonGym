import React from 'react';
import { WorkoutLog } from '../types';
import { Calendar, Dumbbell, ChevronLeft } from 'lucide-react';

interface HistoryProps {
  logs: WorkoutLog[];
  onBack: () => void;
}

export const History: React.FC<HistoryProps> = ({ logs, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-4 flex items-center shadow-sm">
        <button 
          onClick={onBack}
          className="mr-3 p-2 rounded-full hover:bg-slate-100 text-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Workout Log</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {logs.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Dumbbell className="mx-auto h-12 w-12 mb-2 opacity-50" />
            <p>No workouts recorded yet.</p>
            <p className="text-sm">Finish a workout to see it here!</p>
          </div>
        ) : (
          logs.slice().reverse().map((log) => (
            <div key={log.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-800">{log.targetZone}</h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <Calendar size={14} className="mr-1" />
                    {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {log.exercises.map((ex, idx) => (
                  <div key={idx} className="text-sm border-l-2 border-indigo-100 pl-3 py-1">
                    <span className="font-medium text-slate-700">{ex.name}</span>
                    <span className="text-slate-400 mx-2">•</span>
                    <span className="text-slate-500">{ex.setsCompleted.length} Sets</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};