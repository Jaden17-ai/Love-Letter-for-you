/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Upload, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PageTwoMemoriesProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PageTwoMemories({ onNext, onBack }: PageTwoMemoriesProps) {
  // Try to load photos from LocalStorage for persistence
  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    try {
      const stored = localStorage.getItem('romance_memories_photos');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load photos:', e);
    }
    // Default placeholder structures
    return [
      { id: 'photo-1', url: '', caption: 'Our First Beautiful Day Together', date: 'Month 1' },
      { id: 'photo-2', url: '', caption: 'That Sweet Moment We Shared', date: 'Weeks Ago' },
      { id: 'photo-3', url: '', caption: 'When You Made Me Laugh the Hardest', date: 'Recently' }
    ];
  });

  const [activePhotoId, setActivePhotoId] = useState<string>('photo-1');

  useEffect(() => {
    try {
      localStorage.setItem('romance_memories_photos', JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save photos:', e);
    }
  }, [photos]);

  const handleImageUpload = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, url: base64 } : p))
      );
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateCaption = (id: string, newCaption: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption: newCaption } : p))
    );
  };

  const handleUpdateDate = (id: string, newDate: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, date: newDate } : p))
    );
  };

  const clearPhoto = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, url: '' } : p))
    );
  };

  const activePhoto = photos.find((p) => p.id === activePhotoId) || photos[0];

  return (
    <div id="memories-container" className="min-h-screen bg-rose-50/25 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Warm Spots */}
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-72 h-72 rounded-full bg-red-100/20 blur-3xl pointer-events-none" />

      {/* Main Core Layout */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        
        {/* LEFT COLUMN: Memory Polaroid & Slots (5 columns) */}
        <div id="memories-left" className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm flex flex-col gap-5">
            
            {/* Active Polaroid Display Frame */}
            <motion.div
              layoutId={`polaroid-container-${activePhotoId}`}
              className="bg-white border border-rose-100 p-5 pb-8 rounded-2xl shadow-xl shadow-rose-100/50 flex flex-col items-center transform transition-all duration-300 relative group"
            >
              {/* Photo Area */}
              <div className="w-full aspect-[4/4] bg-neutral-50 rounded-lg border border-neutral-100 flex flex-col items-center justify-center overflow-hidden relative group">
                {activePhoto.url ? (
                  <>
                    <img
                      src={activePhoto.url}
                      alt={activePhoto.caption}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Clear Button Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        id={`btn-clear-${activePhoto.id}`}
                        onClick={() => clearPhoto(activePhoto.id)}
                        className="p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-transform hover:scale-110 shadow-lg cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-rose-50/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3 group-hover:scale-110 transition-transform">
                      <Camera size={22} />
                    </div>
                    <span className="text-sm font-sans font-bold text-gray-700 mb-1">Upload Our Memory</span>
                    <span className="text-[11px] font-sans text-gray-400 max-w-[180px]">
                      Click to choose a real photo of us from your device
                    </span>
                    <input
                      type="file"
                      id={`input-file-${activePhoto.id}`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(activePhoto.id, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Editable Polaroid Info Section */}
              <div className="w-full mt-5 flex flex-col gap-2 text-center">
                <input
                  id={`caption-input-${activePhoto.id}`}
                  type="text"
                  value={activePhoto.caption}
                  onChange={(e) => handleUpdateCaption(activePhoto.id, e.target.value)}
                  placeholder="Where/When was this?"
                  className="w-full font-handwritten text-2xl text-rose-600 font-bold bg-transparent text-center focus:outline-none placeholder-rose-300 border-b border-transparent focus:border-rose-200"
                />
                
                <div className="flex items-center justify-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <input
                    id={`date-input-${activePhoto.id}`}
                    type="text"
                    value={activePhoto.date}
                    onChange={(e) => handleUpdateDate(activePhoto.id, e.target.value)}
                    placeholder="Date of this memory"
                    className="font-sans text-xs text-neutral-400 font-semibold tracking-wider bg-transparent text-center focus:outline-none placeholder-neutral-300 uppercase w-32 border-b border-transparent focus:border-rose-100"
                  />
                </div>
              </div>
            </motion.div>

            {/* Polaroid Slots Toggle Buttons */}
            <div className="flex gap-2 justify-center">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  id={`tab-${photo.id}`}
                  onClick={() => setActivePhotoId(photo.id)}
                  className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                    activePhotoId === photo.id
                      ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-200'
                      : 'bg-white border-rose-100 text-gray-500 hover:border-rose-200 hover:text-rose-500'
                  }`}
                >
                  <Heart size={10} fill={activePhotoId === photo.id ? 'currentColor' : 'none'} />
                  <span>{photo.date || 'Memory'}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Rich Love Letter (7 columns) */}
        <div id="memories-right" className="lg:col-span-7 flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full bg-white border border-rose-100 p-8 md:p-12 rounded-3xl shadow-xl shadow-rose-100/30 flex flex-col relative"
          >
            {/* Upper letter decoration */}
            <div className="absolute top-6 right-6 text-rose-100 rotate-12">
              <Heart size={80} fill="currentColor" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-widest font-sans font-extrabold text-red-500">Page 02 / 05</span>
              <span className="font-sans text-xs text-gray-300">|</span>
              <span className="text-xs font-sans font-medium text-gray-400">Our Shared Story</span>
            </div>

            <h3 className="text-3xl font-serif text-gray-900 font-bold tracking-tight mb-6">
              To My Favorite Human,
            </h3>

            {/* Curated B2 English Romantic Letter */}
            <div className="text-gray-700 font-sans leading-relaxed space-y-5 text-sm md:text-base mb-8">
              <p>
                Can you believe we have already shared two entire months together? Looking back, it feels like only yesterday we had our first awkward conversations. Yet, here we are today, completely comfortable around each other and making memories.
              </p>
              <p>
                Every funny message, every little coffee date, and every private joke has gradually built into something incredibly special. I decided to build this page because I wanted a beautiful space for us to look back on what we've started, and remember how far we've come.
              </p>
              <p>
                Thank you for being my constant source of laughter, my safe space, and my favorite distraction. Two months might seem like a short time to others, but to me, it's the beautiful beginning of our own little universe.
              </p>
            </div>

            {/* Sign off */}
            <div className="border-t border-rose-50 pt-5 mt-auto flex items-center justify-between">
              <div>
                <p className="font-handwritten text-3xl text-rose-600 font-bold mb-0.5">Yours always,</p>
                <p className="font-sans text-xs text-neutral-400 tracking-wider font-semibold uppercase">With all my heart</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  id="btn-nav-back"
                  onClick={onBack}
                  className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all cursor-pointer"
                  title="Back"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  id="btn-nav-forward"
                  onClick={onNext}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-sans font-bold shadow-md shadow-red-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Read On</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Floating Instructions for Girlfriend */}
      <div id="upload-hint" className="text-center text-xs text-neutral-400 mt-6 font-sans">
        💡 <span className="font-semibold text-rose-500">Tip:</span> You can tap the photo slot to upload real memories directly! They are saved on your device.
      </div>
    </div>
  );
}
