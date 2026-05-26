/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, CheckCircle2, Trash2, ArrowLeft, RefreshCw, PenTool } from 'lucide-react';
import { LoveNote } from '../types';

interface PageFiveLetterboxProps {
  onBack: () => void;
  onReset: () => void;
}

export default function PageFiveLetterbox({ onBack, onReset }: PageFiveLetterboxProps) {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [savedNotes, setSavedNotes] = useState<LoveNote[]>(() => {
    try {
      const stored = localStorage.getItem('romance_love_letterbox_notes');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('romance_love_letterbox_notes', JSON.stringify(savedNotes));
    } catch (e) {
      console.error(e);
    }
  }, [savedNotes]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newNote: LoveNote = {
      id: `note-${Date.now()}`,
      author: author.trim() || 'My Girlfriend 💖',
      message: message.trim(),
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setSavedNotes((prev) => [newNote, ...prev]);
    setMessage('');
    setSubmitted(true);

    // Fade out success notification after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const deleteNote = (id: string) => {
    setSavedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div id="letterbox-container" className="min-h-screen bg-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Pink & Red radial background accents (25% boundary values) */}
      <div className="absolute top-[10%] right-[-10%] w-[380px] h-[380px] rounded-full bg-rose-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-red-50/20 blur-3xl pointer-events-none" />

      {/* Main Core Form Block */}
      <div className="max-w-4xl w-full mx-auto my-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Input form Box (7 columns) */}
        <div className="md:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-2 border-rose-50 p-8 rounded-3xl shadow-xl shadow-rose-100/40 relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-widest font-sans font-extrabold text-red-500">Page 05 / 05</span>
              <span className="font-sans text-xs text-neutral-200">|</span>
              <span className="text-xs font-sans text-neutral-400 font-medium tracking-wide">Leave Your Footprint</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-2">
              <PenTool size={24} className="text-red-600" />
              <span>Write Me a Letter</span>
            </h2>
            <p className="text-xs font-sans text-gray-400 max-w-sm mb-6 leading-relaxed">
              Before you leave our little page today, please pour some of your thoughts, dreams, or suggestions here. I will cherish every word.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-sans tracking-wider font-extrabold text-gray-500 pl-1">
                  Your Name
                </label>
                <input
                  id="author-input"
                  type="text"
                  placeholder="e.g. My Cutie (leave empty for My Girlfriend 💖)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-rose-50/40 border border-rose-100 rounded-xl font-sans text-sm focus:outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all text-gray-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-sans tracking-wider font-extrabold text-gray-500 pl-1">
                  Your Love Letter
                </label>
                <textarea
                  id="message-textarea"
                  rows={5}
                  required
                  placeholder="Tell me how you feel, write some wishes, or tell me your favorite memory of these two months..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 bg-rose-50/40 border border-rose-100 rounded-2xl font-sans text-sm pb-10 focus:outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all text-gray-800 resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  id="btn-back-p5"
                  onClick={onBack}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-sans font-bold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Interactive Stage</span>
                </button>

                <button
                  type="submit"
                  id="btn-note-submit"
                  disabled={!message.trim()}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-rose-300 text-white font-sans font-bold rounded-xl shadow-lg shadow-red-200/50 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Send to our Box</span>
                  <Send size={14} />
                </button>
              </div>
            </form>

            {/* In-app Letterbox feedback overlay */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center p-8 text-center z-20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-red-600 mb-4"
                  >
                    <Heart size={48} fill="currentColor" />
                  </motion.div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">Letter Sealed with a Kiss!</h3>
                  <p className="text-xs font-sans text-neutral-500 max-w-xs leading-relaxed">
                    Thank you! Your words have been safelocked in our universe. I will read them and hold them close forever.
                  </p>
                  <button
                    id="btn-write-another"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-sans font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Write Another Letter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: Saved letters display (5 columns) */}
        <div id="saved-letters-column" className="md:col-span-5 flex flex-col h-full max-h-[500px]">
          <h3 className="font-serif font-bold text-gray-800 text-lg mb-3 pl-1 flex items-center justify-between">
            <span>Our Letterbox Box ({savedNotes.length})</span>
            {savedNotes.length > 0 && (
              <span className="text-[10px] uppercase font-sans text-rose-500 tracking-widest font-bold">Unread Chords 💌</span>
            )}
          </h3>

          <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[400px]">
            <AnimatePresence initial={false}>
              {savedNotes.map((note) => (
                <motion.div
                  key={note.id}
                  id={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-rose-100 p-4 rounded-2xl shadow-xs relative group flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-rose-600">
                      {note.author}
                    </span>
                    <span className="text-[10px] font-sans text-gray-400">
                      {note.timestamp}
                    </span>
                  </div>

                  <p className="font-handwritten text-lg text-gray-700 whitespace-pre-wrap leading-tight pr-6">
                    "{note.message}"
                  </p>

                  <button
                    id={`btn-delete-${note.id}`}
                    onClick={() => deleteNote(note.id)}
                    className="absolute right-3 bottom-3 text-gray-300 hover:text-red-500 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Delete Note"
                  >
                    <Trash2 size={13} />
                  </button>
                </motion.div>
              ))}

              {savedNotes.length === 0 && (
                <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center text-rose-300/80 min-h-[220px]">
                  <CheckCircle2 size={24} className="mb-2 opacity-50" />
                  <p className="font-sans text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Empty Mailbox</p>
                  <p className="font-sans text-[11px] text-gray-400 max-w-[160px] leading-relaxed mt-1">
                    Your letters will populate here once you hit "Send".
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset app / Repeat memories button */}
          <button
            id="btn-re-experience"
            onClick={onReset}
            className="mt-4 w-full py-2.5 bg-rose-50 hover:bg-rose-100/60 transition-colors text-rose-600 text-xs font-sans font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} className="animate-spin-once" />
            <span>Re-experience Our Story from Beginning</span>
          </button>
        </div>

      </div>

      <div className="text-center text-[11px] text-neutral-400 font-sans mt-4">
        "Thank you for being part of my life. To many more months and memories."
      </div>
    </div>
  );
}
