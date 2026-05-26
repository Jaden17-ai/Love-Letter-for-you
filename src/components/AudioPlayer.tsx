/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const [useFallbackSynth, setUseFallbackSynth] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Simple Synthesizer for romantic acoustic piano chords (fallback if video doesn't play)
  // plays a gorgeous I - V - vi - IV progression (the key of D major / similar to Photograph)
  const playFallbackNote = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Beautiful Photograph chords: Dm, Bb, F, C or C, G, Am, F
      // Let's do C - G - Am - F progressive melody
      const progression = [
        [261.63, 329.63, 392.00], // C major (C4, E4, G4)
        [196.00, 246.94, 293.66], // G major (G3, B3, D4)
        [220.00, 261.63, 329.63], // A minor (A3, C4, E4)
        [174.61, 220.00, 261.63]  // F major (F3, A3, C4)
      ];

      let chordIndex = 0;
      const interval = window.setInterval(() => {
        if (!isPlaying) return;
        
        const now = ctx.currentTime;
        const notes = progression[chordIndex];
        
        // Play chord
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          // Soft piano envelope
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 3);
        });

        // Soft melodic note
        setTimeout(() => {
          if (!isPlaying) return;
          const melodyNotes = [392.00, 440.00, 523.25, 587.33, 659.25]; // Melodic pentatonic scale
          const randomNote = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(randomNote * (Math.random() > 0.5 ? 1 : 0.5), ctx.currentTime);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.5);
        }, 1200);

        chordIndex = (chordIndex + 1) % progression.length;
      }, 4000);

      synthIntervalRef.current = interval;
    } catch (e) {
      console.warn('Audio Context failed:', e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (useFallbackSynth) {
        playFallbackNote();
      } else {
        // Send play command to YouTube iframe player (if possible)
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
      }
    } else {
      // Pause synthesized notes
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      // Send pause command to YouTube iframe
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    }

    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, [isPlaying, useFallbackSynth]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  const switchToSynth = () => {
    setUseFallbackSynth(true);
  };

  return (
    <div id="audio-widget" className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Hidden YouTube Iframe Player of "Photograph - Ed Sheeran" (Audio Track) */}
      {!useFallbackSynth && (
        <iframe
          ref={iframeRef}
          className="hidden"
          width="1"
          height="1"
          src="https://www.youtube.com/embed/nSDgHBxUbVQ?enablejsapi=1&loop=1&playlist=nSDgHBxUbVQ&controls=0&origin=https://ais-dev-mjvc76xbpsn4nhef5ym45a-827729846764.asia-east1.run.app"
          title="Photograph Instrumental Cover"
          allow="autoplay"
          onError={switchToSynth}
        />
      )}

      {/* Floating Controller widget */}
      <button
        id="btn-toggle-audio"
        onClick={toggleSound}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border text-sm font-sans font-medium transition-all duration-300 ${
          isPlaying
            ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
            : 'bg-white border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-500'
        }`}
      >
        <div className={`relative flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
          <Music size={18} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          )}
        </div>
        <div className="flex flex-col items-start leading-none pr-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-65">Soundtrack</span>
          <span className="text-xs font-bold font-serif whitespace-nowrap">Photograph - Ed Sheeran</span>
        </div>
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {/* Mini Hint */}
      {isPlaying && (
        <div className="text-[10px] text-gray-400 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-gray-100 transition-opacity">
          Click disc to pause original Ed Sheeran soundtrack
        </div>
      )}
    </div>
  );
}
