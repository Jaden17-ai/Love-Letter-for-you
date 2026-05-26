/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, ArrowRight } from 'lucide-react';

interface PageOneLoveMeProps {
  onNext: () => void;
}

interface RomanceDesign {
  id: number;
  bgClass: string;
  cardClass: string;
  textColor: string;
  heartColor: string;
  quote: string;
  scale: number;
  rotation: number;
}

const ROMANCE_DESIGNS: RomanceDesign[] = [
  {
    id: 1,
    bgClass: 'bg-rose-50',
    cardClass: 'bg-white border-2 border-rose-200 shadow-rose-100',
    textColor: 'text-rose-600',
    heartColor: 'text-red-500',
    quote: '“You are the best thing that has ever been mine.”',
    scale: 1,
    rotation: 0,
  },
  {
    id: 2,
    bgClass: 'bg-red-500',
    cardClass: 'bg-white/95 border border-white/20 shadow-red-950/40',
    textColor: 'text-red-700',
    heartColor: 'text-rose-500',
    quote: '“My heart is, and always will be, yours.”',
    scale: 1.05,
    rotation: 2,
  },
  {
    id: 3,
    bgClass: 'bg-white',
    cardClass: 'bg-rose-100/50 border border-rose-200 shadow-rose-200/50',
    textColor: 'text-gray-900',
    heartColor: 'text-rose-600',
    quote: '“Everything makes sense when I look at you.”',
    scale: 0.98,
    rotation: -2,
  },
  {
    id: 4,
    bgClass: 'bg-rose-100',
    cardClass: 'bg-white border border-rose-300 shadow-rose-200',
    textColor: 'text-rose-700',
    heartColor: 'text-red-600',
    quote: '“Every single day of these two months has been a beautiful dream.”',
    scale: 1.02,
    rotation: 1,
  },
  {
    id: 5,
    bgClass: 'bg-white',
    cardClass: 'bg-red-600 border border-transparent shadow-red-100',
    textColor: 'text-white',
    heartColor: 'text-rose-200',
    quote: '“I love you because the entire universe conspired to help me find you.”',
    scale: 1.04,
    rotation: -1,
  },
  {
    id: 6,
    bgClass: 'bg-rose-50/50',
    cardClass: 'bg-white border-4 border-double border-red-200 shadow-red-50',
    textColor: 'text-red-600',
    heartColor: 'text-rose-500',
    quote: '“To love is nothing. To be loved is something. To love and be loved is everything.”',
    scale: 1,
    rotation: 3,
  }
];

export default function PageOneLoveMe({ onNext }: PageOneLoveMeProps) {
  const [hasClicked, setHasClicked] = useState(false);
  const [designIndex, setDesignIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  
  // High-performance romance transition routine
  useEffect(() => {
    if (!hasClicked) return;

    // Rapidly alternate designs to give a glowing, romantic chaotic effect!
    const interval = setInterval(() => {
      setDesignIndex((prev) => (prev + 1) % ROMANCE_DESIGNS.length);
    }, 900);

    return () => clearInterval(interval);
  }, [hasClicked]);

  const handleResponse = (answer: 'yes' | 'no') => {
    setHasClicked(true);
    setClickCount((prev) => prev + 1);
  };

  const handleNoButtonHover = () => {
    // Playfully move the "No" button randomly so it's tricky, but even if clicked, it unlocks the love designs!
    const randomX = (Math.random() - 0.5) * 240;
    const randomY = (Math.random() - 0.5) * 160;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const currentDesign = ROMANCE_DESIGNS[designIndex];

  return (
    <div
      id="love-check-wrapper"
      className={`min-h-screen transition-all duration-1000 flex flex-col items-center justify-center p-6 relative overflow-hidden ${
        hasClicked ? currentDesign.bgClass : 'bg-white'
      }`}
    >
      {/* Dynamic Background Sparkles/Circles */}
      <AnimatePresence>
        {hasClicked && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-[500px] h-[500px] rounded-full bg-red-400 blur-3xl"
              key={`bg-circle-1-${designIndex}`}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-[400px] h-[400px] rounded-full bg-rose-300 blur-3xl"
              key={`bg-circle-2-${designIndex}`}
            />
          </>
        )}
      </AnimatePresence>

      <div className="max-w-xl w-full text-center relative z-10 flex flex-col items-center">
        {!hasClicked ? (
          /* Static State: Prompting Question */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-rose-50 p-10 md:p-12 rounded-3xl shadow-xl shadow-rose-100/50 flex flex-col items-center"
          >
            {/* Pulsing heart graphic */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="text-red-600 mb-6"
            >
              <Heart size={64} fill="currentColor" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 font-bold tracking-tight mb-4">
              Do you love me?
            </h2>
            <p className="text-sm font-sans text-gray-500 max-w-sm mb-10 leading-relaxed font-light">
              We've shared 60 incredible days full of talks, late-night chats, and quiet moments. Here is an honest question from my heart to yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xs relative min-h-[50px]">
              {/* YES BUTTON */}
              <motion.button
                id="btn-love-yes"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleResponse('yes')}
                className="w-full sm:w-36 py-4 bg-red-600 hover:bg-red-700 text-white font-sans font-bold rounded-2xl shadow-lg shadow-red-200/50 transition-all cursor-pointer"
              >
                Yes, I do!
              </motion.button>

              {/* PLAYFUL NO BUTTON (moves around but is fully functional if tapped) */}
              <motion.button
                id="btn-love-no"
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                onMouseEnter={handleNoButtonHover}
                onFocus={handleNoButtonHover}
                onClick={() => handleResponse('no')}
                transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                className="w-full sm:w-36 py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-sans font-medium rounded-2xl border border-rose-200 transition-colors shadow-xs cursor-pointer"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Romance Design Changing State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: currentDesign.scale, opacity: 1, rotate: currentDesign.rotation }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className={`w-full p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-300 max-w-md ${currentDesign.cardClass}`}
          >
            {/* Spinning/pulsating heart */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={currentDesign.heartColor}
              >
                <Heart size={56} fill="currentColor" />
              </motion.div>
            </div>

            <p className={`text-2xl md:text-3xl font-serif font-semibold italic leading-snug tracking-tight mb-8 ${currentDesign.textColor}`}>
              {currentDesign.quote}
            </p>

            <div className={`flex flex-col items-center gap-3 ${currentDesign.textColor === 'text-white' ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-widest opacity-80">
                <Sparkles size={14} />
                <span>Romance Generator Active</span>
                <Sparkles size={14} />
              </div>
              <p className="text-xs font-sans opacity-70">
                Our hearts are perfectly in sync. Let's explore the memories.
              </p>
            </div>

            <motion.button
              id="btn-view-memories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onNext}
              className={`mt-10 px-6 py-4 rounded-2xl font-sans font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full transition-all ${
                currentDesign.textColor === 'text-white'
                  ? 'bg-white text-red-600 hover:bg-rose-50'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-red-200'
              }`}
            >
              <span>See Our Memory Photo Book</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>

      {hasClicked && (
        <div id="countdown-label" className="absolute bottom-16 select-none bg-white/70 backdrop-blur-xs px-4 py-1.5 rounded-full border border-rose-100 text-[11px] font-sans font-bold text-rose-600 uppercase tracking-widest">
          💖 Unlocking Our Timeline...
        </div>
      )}
    </div>
  );
}
