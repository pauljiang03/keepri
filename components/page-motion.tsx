'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installOpeningMotion, INTRO_STORAGE_KEY } from '@/lib/opening-motion';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let removeOpening = installOpeningMotion();
    const media = gsap.matchMedia();
    media.add(
      '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
      () => {
        gsap.fromTo(
          '.thesis-sentence',
          { xPercent: 12, opacity: 0.3 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.thesis-sentence',
              start: 'top bottom',
              end: 'bottom 35%',
              scrub: 1,
            },
          },
        );
      },
    );
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      const opening = document.querySelector<HTMLElement>('.opening');
      const range = opening?.dataset.enhanced
        ? opening.offsetHeight - innerHeight
        : 0;
      const position = Math.max(0, scrollY - range);
      removeOpening();
      document.documentElement.dataset.intro = 'seen';
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
      } catch {
        /* Optional storage. */
      }
      removeOpening = installOpeningMotion(false);
      window.scrollTo({ top: position, behavior: 'instant' });
      ScrollTrigger.refresh();
    };
    preference.addEventListener('change', change);
    return () => {
      preference.removeEventListener('change', change);
      media.revert();
      removeOpening();
    };
  }, []);
  return null;
}
