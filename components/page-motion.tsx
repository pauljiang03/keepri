'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installIntroduction } from '@/lib/intro-controller';

// The entrance advances per gesture; the main site uses normal document scrolling.
export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const removeIntroduction = installIntroduction();

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 12,
          opacity: 0,
          duration: 0.24,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      gsap.fromTo(
        '.thinking-sequence',
        { '--sequence-progress': 0 },
        {
          '--sequence-progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.thinking-sequence',
            start: 'top 85%',
            end: 'bottom 35%',
            scrub: true,
          },
        },
      );
    });
    return () => {
      removeIntroduction();
      media.revert();
    };
  }, []);
  return null;
}
