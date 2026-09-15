'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installOpeningMotion } from '@/lib/opening-motion';
import { installBookMotion } from '@/lib/book-motion';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const book = installBookMotion();
    const removeOpening = installOpeningMotion(book.navigate, book.reveal);
    return () => {
      removeOpening();
      book.destroy();
    };
  }, []);
  return null;
}
