/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId } from './types';
import AudioPlayer from './components/AudioPlayer';
import LoginPage from './components/LoginPage';
import PageOneLoveMe from './components/PageOneLoveMe';
import PageTwoMemories from './components/PageTwoMemories';
import PageThreeThankYou from './components/PageThreeThankYou';
import PageFourFloating from './components/PageFourFloating';
import PageFiveLetterbox from './components/PageFiveLetterbox';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('login');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Navigators
  const goToNextPage = (nextId: PageId) => {
    setCurrentPage(nextId);
  };

  const handleReset = () => {
    setCurrentPage('login');
    // Keep music playing or toggle it depending on preference
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden bg-white text-gray-950 font-sans">
      
      {/* Global Foreground Audio Background Controller */}
      {currentPage !== 'login' && (
        <AudioPlayer isPlaying={isPlayingMusic} setIsPlaying={setIsPlayingMusic} />
      )}

      {/* Pages Container with seamless transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          {currentPage === 'login' && (
            <LoginPage
              onUnlock={() => goToNextPage('love-check')}
              onPlayTrigger={() => setIsPlayingMusic(true)}
            />
          )}

          {currentPage === 'love-check' && (
            <PageOneLoveMe onNext={() => goToNextPage('memories')} />
          )}

          {currentPage === 'memories' && (
            <PageTwoMemories
              onNext={() => goToNextPage('thank-you')}
              onBack={() => goToNextPage('love-check')}
            />
          )}

          {currentPage === 'thank-you' && (
            <PageThreeThankYou
              onNext={() => goToNextPage('floating')}
              onBack={() => goToNextPage('memories')}
            />
          )}

          {currentPage === 'floating' && (
            <PageFourFloating
              onNext={() => goToNextPage('guestbook')}
              onBack={() => goToNextPage('thank-you')}
            />
          )}

          {currentPage === 'guestbook' && (
            <PageFiveLetterbox
              onBack={() => goToNextPage('floating')}
              onReset={handleReset}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
