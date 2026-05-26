/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useDragControls } from 'motion/react';
import { Heart, Sparkles, Smile, ArrowLeft, ArrowRight } from 'lucide-react';

interface PageFourFloatingProps {
  onNext: () => void;
  onBack: () => void;
}

interface FloatingElement {
  id: string;
  type: 'photo' | 'emoji' | 'letter';
  content: string; // Image src base64, emoji symbol, or letter text
  rotation: number;
  initialX: number; // Percentage
  initialY: number; // Percentage
  caption?: string;
  sizeClass: string;
  delay: number;
}

export default function PageFourFloating({ onNext, onBack }: PageFourFloatingProps) {
  const [photosToFloat, setPhotosToFloat] = useState<string[]>([]);

  // Load photos uploaded in Page 2 so we float BOTH the uploaded memories AND sweet default letters
  useEffect(() => {
    try {
      const stored = localStorage.getItem('romance_memories_photos');
      if (stored) {
        const parsed = JSON.parse(stored);
        const validUrls = parsed.map((p: any) => p.url).filter((url: string) => url !== '');
        setPhotosToFloat(validUrls);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Standard Short Letters (B2 English)
  const SHORT_LETTERS = [
    'You are my absolute sunshine, even on the grayest days.',
    '60 days of pure happiness with you! Let\'s multiply this by forever.',
    'I just love how you always know exactly how to draw a smile on my face.',
    'Sharing a cup of coffee with you is my absolute favorite way to spend an afternoon.',
    'Thank you for holding my hand so warm and making me feel so incredibly safe.',
    'No matter where I go, my thoughts always find a direct way back to you.'
  ];

  const EMOJIS = ['💖', '💕', '🥰', '❤️', '😘', '🧸', '🌹', '👩‍❤️‍👨'];

  // Combine elements to make a magnificent floating screen
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const list: FloatingElement[] = [];

    // Add Photos
    if (photosToFloat.length > 0) {
      photosToFloat.forEach((url, index) => {
        list.push({
          id: `float-photo-uploaded-${index}`,
          type: 'photo',
          content: url,
          caption: 'Our Real Memory 📸',
          rotation: Math.random() * 20 - 10,
          initialX: 10 + (index * 25) % 80,
          initialY: 15 + (index * 20) % 50,
          sizeClass: 'w-48 h-48',
          delay: index * 0.4
        });
      });
    } else {
      // Default romantic sketched memory frames if they haven't uploaded images yet
      list.push({
        id: 'float-photo-def-1',
        type: 'photo',
        content: 'placeholder-camera',
        caption: 'Future Photo Frame Click to Add! 📸',
        rotation: -8,
        initialX: 15,
        initialY: 20,
        sizeClass: 'w-44',
        delay: 0
      });
      list.push({
        id: 'float-photo-def-2',
        type: 'photo',
        content: 'placeholder-couple',
        caption: 'Our Cozy Coffee Dialogues ☕',
        rotation: 6,
        initialX: 65,
        initialY: 18,
        sizeClass: 'w-44',
        delay: 0.3
      });
    }

    // Add Short Letters (Post-its)
    SHORT_LETTERS.forEach((phrase, i) => {
      list.push({
        id: `float-letter-${i}`,
        type: 'letter',
        content: phrase,
        rotation: Math.random() * 16 - 8,
        initialX: 5 + (i * 28 + 10) % 85,
        initialY: 45 + (i * 12) % 35,
        sizeClass: 'max-w-xs',
        delay: 0.5 + i * 0.2
      });
    });

    // Add Emojis
    EMOJIS.forEach((emo, i) => {
      list.push({
        id: `float-emoji-${i}`,
        type: 'emoji',
        content: emo,
        rotation: Math.random() * 40 - 20,
        initialX: 5 + (i * 15 + 12) % 90,
        initialY: 8 + (i * 16) % 80,
        sizeClass: 'text-4xl md:text-5xl',
        delay: 0.2 + i * 0.15
      });
    });

    setElements(list);
  }, [photosToFloat]);

  return (
    <div id="floating-canvas-container" className="min-h-screen bg-rose-50/20 flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Translucent Backdrop Spots */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-rose-100/30 blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full bg-red-100/10 blur-3xl pointer-events-none" />

      {/* Floating Canvas Title Bar */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center mt-4 relative z-20">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs uppercase tracking-widest font-sans font-extrabold text-red-500">Page 04 / 05</span>
          <span className="font-sans text-xs text-neutral-300">|</span>
          <span className="text-xs font-sans text-neutral-400 font-medium tracking-wide">Your Interactive Galaxy</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
          Draggable Memories & Notes
        </h2>
        <p className="text-xs font-sans text-rose-500/80 mt-1 max-w-md font-medium">
          Drag, catch, and rearrange our floating love story. Tap and hold them!
        </p>
      </div>

      {/* FLOATING STAGE CANVAS */}
      <div id="canvas-stage" className="flex-1 w-full max-w-7xl mx-auto my-6 relative overflow-visible border border-dashed border-rose-100/80 rounded-3xl bg-white/40 backdrop-blur-xs shadow-inner select-none pointer-events-auto">
        
        {elements.map((el) => {
          return (
            <motion.div
              key={el.id}
              id={el.id}
              drag
              dragMomentum={true}
              dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
              initial={{
                opacity: 0,
                x: `${el.initialX}vw`,
                y: `${el.initialY}vh`,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                x: [`${el.initialX}vw`, `${el.initialX + (Math.random() > 0.5 ? 1 : -1)}vw`, `${el.initialX}vw`],
                y: [`${el.initialY}vh`, `${el.initialY + (Math.random() > 0.5 ? 2.5 : -2.5)}vh`, `${el.initialY}vh`],
                scale: 1,
                rotate: el.rotation
              }}
              transition={{
                opacity: { duration: 0.8, delay: el.delay },
                scale: { duration: 0.8, delay: el.delay },
                x: {
                  repeat: Infinity,
                  duration: 8 + Math.random() * 4,
                  ease: 'easeInOut'
                },
                y: {
                  repeat: Infinity,
                  duration: 10 + Math.random() * 4,
                  ease: 'easeInOut'
                }
              }}
              whileHover={{ scale: 1.08, zIndex: 50 }}
              whileDrag={{ scale: 1.12, zIndex: 100, rotate: 0 }}
              className="absolute cursor-grab active:cursor-grabbing select-none"
              style={{
                left: 0,
                top: 0,
              }}
            >
              {el.type === 'photo' && (
                <div className="bg-white p-3 pb-5 rounded-xl border border-rose-100/70 shadow-lg shadow-rose-100/40 w-44 hover:shadow-xl transition-shadow">
                  <div className="w-full aspect-square rounded bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-100 relative">
                    {el.content === 'placeholder-camera' || el.content === 'placeholder-couple' ? (
                      /* Beautiful vector SVG placeholder elements with romance theme */
                      <div className="flex flex-col items-center justify-center p-3 text-center text-rose-300">
                        <Heart size={32} className="animate-pulse text-rose-500" fill="currentColor" />
                        <span className="text-[10px] font-sans font-bold text-gray-400 mt-2 uppercase tracking-widest pl-1">Couple Sketch</span>
                      </div>
                    ) : (
                      <img src={el.content} className="w-full h-full object-cover pointer-events-none" alt="Floating memory" referrerPolicy="no-referrer" />
                    )}
                  </div>
                  <p className="mt-3 font-handwritten text-lg text-rose-600 font-bold text-center leading-xs">
                    {el.caption}
                  </p>
                </div>
              )}

              {el.type === 'letter' && (
                <div className="bg-rose-50/90 border border-rose-100/60 p-4 rounded-2xl shadow-md backdrop-blur-xs w-60 text-center flex flex-col items-center gap-1">
                  <span className="text-red-500 mb-0.5"><Heart size={12} fill="currentColor" /></span>
                  <p className="font-handwritten text-lg text-gray-800 leading-snug">
                    "{el.content}"
                  </p>
                </div>
              )}

              {el.type === 'emoji' && (
                <div className={`filter drop-shadow-md select-none ${el.sizeClass}`}>
                  {el.content}
                </div>
              )}
            </motion.div>
          );
        })}

        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-rose-200">
            <Heart size={64} fill="currentColor" className="animate-ping" />
          </div>
        )}

      </div>

      {/* Floating Canvas Actions */}
      <div id="floating-actions" className="max-w-xl w-full mx-auto flex justify-between items-center relative z-20 pb-4">
        <button
          id="btn-nav-back-p4"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/70 backdrop-blur-xs border border-rose-100/50 rounded-xl text-xs font-sans font-bold text-gray-500 hover:text-rose-600 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <div className="text-[10px] font-sans text-neutral-400 font-medium bg-white/90 shadow-xs border border-rose-100/40 px-3 py-1.5 rounded-full">
          ✨ <span className="font-semibold text-rose-500">Fun Fact:</span> You can fling the emojis across the screen!
        </div>

        <button
          id="btn-nav-forward-p4"
          onClick={onNext}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans font-bold shadow-md shadow-red-200 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Write a Note</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
