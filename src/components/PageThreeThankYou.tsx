/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Stars, Gift, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface PageThreeThankYouProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PageThreeThankYou({ onNext, onBack }: PageThreeThankYouProps) {
  return (
    <div id="thank-you-container" className="min-h-screen bg-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Pink decorative circles (25%) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-rose-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-rose-100/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-50/10 blur-3xl pointer-events-none" />

      {/* Floating Sparkles in Background */}
      <div className="absolute top-1/4 right-20 text-red-200 animate-pulse">
        <Stars size={28} />
      </div>
      <div className="absolute bottom-1/4 left-16 text-rose-300 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Sparkles size={24} />
      </div>

      <div className="max-w-4xl w-full mx-auto my-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white border-2 border-rose-50 p-8 md:p-16 rounded-3xl shadow-xl shadow-rose-100/45 relative overflow-hidden"
        >
          {/* Subtle Pink and Red Accent Stripes inside the card to outline premium framing */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300 via-red-500 to-rose-300" />
          
          <div className="flex flex-col items-center text-center mb-10">
            {/* Soft pink circle holding red icon */}
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-red-600 mb-5">
              <Gift size={28} className="pulse-heart" />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-sans">Page 03 / 05</span>
              <span className="font-sans text-xs text-neutral-200">|</span>
              <span className="text-xs font-sans text-neutral-400 font-medium tracking-wide">A Heart Full of Gratitude</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 font-bold tracking-tight">
              Thank You for Loving Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Letter Content */}
            <div className="md:col-span-8 flex flex-col gap-6">
              <p className="font-sans text-gray-700 leading-relaxed text-sm md:text-base">
                Dear, today I want to take a moment to say a real, heartfelt thank you. Thank you for choosing to be by my side, and for loving me exactly as I am.
              </p>
              <p className="font-sans text-gray-700 leading-relaxed text-sm md:text-base">
                Loving someone is a choice we make every single day, and I am incredibly grateful that you choose me. Thank you for the sweet morning messages that instantly brighten my mood, for listening to my thoughts even when I repeat myself, and for making me feel like the luckiest person whenever we speak.
              </p>
              <p className="font-sans text-gray-700 leading-relaxed text-sm md:text-base">
                You bring a warmth into my life that I did not realize was missing. With your kindness, patience, and joyful spirit, you have turned these past two months into the absolute happiest period of my year.
              </p>
              <p className="font-sans text-gray-700 leading-relaxed text-sm md:text-base">
                Here is to the beautiful smiles, the deep conversations, and all the quiet, reassuring moments we share. I appreciate you more than these simple words can ever express.
              </p>
            </div>

            {/* Right Column: Romantic Quotes / Callout card (Pink background) */}
            <div className="md:col-span-4 flex flex-col gap-5">
              {/* Romance Word Card 1 */}
              <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl flex flex-col gap-2.5">
                <div className="text-red-600">
                  <Heart size={16} fill="currentColor" />
                </div>
                <h4 className="font-serif font-bold text-gray-900 text-sm">Every breath has you</h4>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  "If I had a flower for every time I thought of you... I could walk through my garden forever."
                </p>
              </div>

              {/* Romance Word Card 2 */}
              <div className="bg-red-50/20 border border-red-100/30 p-5 rounded-2xl flex flex-col gap-2.5">
                <div className="text-red-500">
                  <Sparkles size={16} />
                </div>
                <h4 className="font-serif font-bold text-gray-900 text-sm">My Safe Haven</h4>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  "In your arms is where I feel safest, happiest, and most loved. Thank you for being my anchor."
                </p>
              </div>

              {/* Day Counter */}
              <div className="border border-dashed border-rose-200 p-4 rounded-2xl text-center flex flex-col gap-1 bg-white">
                <span className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 font-bold">Anniversary Milestone</span>
                <span className="font-serif text-3xl font-extrabold text-red-600">60 Days</span>
                <span className="text-[10px] font-sans text-rose-500 font-semibold uppercase">Of Pure Happiness 💖</span>
              </div>
            </div>

          </div>

          {/* Bottom Nav */}
          <div className="border-t border-rose-50 pt-8 mt-10 flex justify-between items-center w-full">
            <button
              id="btn-nav-back-p3"
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 y-2.5 text-xs font-sans font-bold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Memory Lane</span>
            </button>
            <button
              id="btn-nav-forward-p3"
              onClick={onNext}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans font-bold shadow-md shadow-red-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore Floating Memories</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </motion.div>
      </div>

      <div className="text-center text-[11px] text-neutral-400 font-sans mt-4">
        "Thank you for being you, for two wonderful months and counting."
      </div>
    </div>
  );
}
