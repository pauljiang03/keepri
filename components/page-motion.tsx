'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Tastemaker's GSAP reveal pattern adapted to React cleanup and progressive enhancement.
// Static HTML is readable before hydration. Navigation never depends on animation.
export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = gsap.timeline({
        defaults: { duration: 0.24, ease: 'power3.out' },
      });
      hero
        .from('.hero h1', { y: 12, opacity: 0 })
        .from('.hero-bottom', { y: 8, opacity: 0 }, '-=0.1')
        .from('.board-ribbon', { y: 12, opacity: 0 }, '-=0.1');
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 12,
          opacity: 0,
          duration: 0.24,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      // One scroll-linked beat: 48px of game-piece travel, with no pinning or looping.
      gsap.to('.board-ribbon', {
        x: -48,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => media.revert();
  }, []);
  return null;
}
