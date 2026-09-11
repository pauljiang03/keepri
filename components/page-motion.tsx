'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installIntroduction } from '@/lib/intro-controller';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const removeIntroduction = installIntroduction();
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 18,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 95%', once: true },
        });
      });
      gsap.from('.hero-title-line > span', {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hero', start: 'top 88%', once: true },
      });
      gsap.to('.site-progress', {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#site',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
      gsap.from('.footer-wordmark', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 95%',
          once: true,
        },
      });
    });
    return () => {
      removeIntroduction();
      media.revert();
    };
  }, []);
  return null;
}
