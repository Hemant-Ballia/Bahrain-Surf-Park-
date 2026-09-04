import React from "react";

export default function WaveBarLoader({ progress = 0 }) {
  const currentProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      {/* Custom Keyframe Styles for Wave Motion */}
      <style>{`
        @keyframes waveBar {
          0%, 100% { height: 16px; }
          50% { height: 56px; }
        }
        .animate-wave-1 { animation: waveBar 1.2s ease-in-out infinite 0.1s; }
        .animate-wave-2 { animation: waveBar 1.2s ease-in-out infinite 0.25s; }
        .animate-wave-3 { animation: waveBar 1.2s ease-in-out infinite 0.4s; }
        .animate-wave-4 { animation: waveBar 1.2s ease-in-out infinite 0.55s; }
        .animate-wave-5 { animation: waveBar 1.2s ease-in-out infinite 0.7s; }
      `}</style>

      {/* Equalizer Wave Container */}
      <div className="flex items-end justify-center h-16 space-x-2.5">
        <span className="w-3 bg-cyan-500 rounded-full animate-wave-1" />
        <span className="w-3 bg-sky-400 rounded-full animate-wave-2" />
        <span className="w-3 bg-blue-600 rounded-full animate-wave-3" />
        <span className="w-3 bg-sky-400 rounded-full animate-wave-4" />
        <span className="w-3 bg-cyan-500 rounded-full animate-wave-5" />
      </div>

      {/* Progress Percentage */}
      <div className="mt-6 text-center">
        <span className="text-3xl font-extrabold tracking-tight text-slate-800">
          {Math.round(currentProgress)}%
        </span>
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
          Loading Experience...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-52 h-2 bg-slate-100 rounded-full mt-4 overflow-hidden border border-slate-200/80 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  );
}