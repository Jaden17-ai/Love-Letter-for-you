/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'login' | 'love-check' | 'memories' | 'thank-you' | 'floating' | 'guestbook';

export interface MemoryPhoto {
  id: string;
  url: string; // Base64 or object URL
  caption: string;
  date: string;
}

export interface LoveNote {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}
