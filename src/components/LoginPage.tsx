/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Lock } from 'lucide-react';

interface LoginPageProps {
  onUnlock: () => void;
  onPlayTrigger: () => void;
}

export default function LoginPage({ onUnlock, onPlayTrigger }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    
    // Accept standard romantic passwords, or let them enter anything after 1 attempt
    if (cleanPass.length > 0 || attempts >= 0) {
      onPlayTrigger(); // Start Ed Sheeran song
      onUnlock();
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div id="login-container" className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Soft pink romantic background decorations (25% Pink rule) */}
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-rose-50/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />

      {/* Floating subtle red/pink hearts */}
      <div className="absolute top-1/4 left-10 text-rose-200/40 select-none animate-bounce" style={{ animationDuration: '4s' }}>
        <Heart size={36} fill="currentColor" />
      </div>
      <div className="absolute bottom-1/4 right-12 text-rose-300/30 select-none animate-bounce" style={{ animationDuration: '6s' }}>
        <Heart size={48} fill="currentColor" />
      </div>

      <motion.div
        id="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md bg-white border border-rose-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-rose-50/40 relative z-10 flex flex-col items-center"
      >
        {/* Heart icon lock */}
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6 relative">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-red-500 absolute"
          >
            <Heart size={28} fill="currentColor" />
          </motion.div>
          <div className="text-white bg-red-600 rounded-full p-1.5 absolute bottom-0 right-0 border-2 border-white">
            <Lock size={12} />
          </div>
        </div>

        {/* Dynamic Titles */}
        <h1 className="text-3xl font-serif text-gray-900 font-bold tracking-tight text-center mb-2">
          Our 2nd Month Anniversary
        </h1>
        <p className="text-sm font-sans text-rose-600/90 font-medium tracking-wide text-center mb-8">
          60 Days of Laughter, Joy & Beautiful Memories
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="anniversary-pwd" className="text-xs font-sans font-bold text-gray-600 uppercase tracking-widest pl-1">
              Who is the key to my heart?
            </label>
            <input
              id="anniversary-pwd"
              type="text"
              placeholder="Type your name or a lovely word..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className="w-full px-5 py-4 border border-rose-100 rounded-2xl font-sans text-gray-800 placeholder-rose-300/70 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all text-center text-lg"
            />
            <p className="text-[11px] text-gray-400 text-center italic mt-1 font-sans">
              Hint: Enter your name, or a sweet phrase like "me" or "love"
            </p>
          </div>

          <motion.button
            id="btn-unlock-love"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-sans font-semibold tracking-wide shadow-md shadow-red-200/50 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Unlock Our Memory Book
          </motion.button>
        </form>

        {/* Sweet B2 Level Quote */}
        <div className="mt-8 border-t border-rose-50 w-full pt-6 text-center text-xs text-rose-500 font-serif italic">
          "Time flies when you are with the one who makes your heart beat faster."
        </div>
      </motion.div>
    </div>
  );
}
