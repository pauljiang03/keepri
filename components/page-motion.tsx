'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installOpeningMotion } from '@/lib/opening-motion';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const removeOpening = installOpeningMotion();
    const media = gsap.matchMedia();
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document
            .querySelectorAll<HTMLAnchorElement>('.navigation a')
            .forEach((link) => {
              if (link.hash === `#${entry.target.id}`)
                link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
        });
      },
      { rootMargin: '-20% 0px -45% 0px' },
    );
    document
      .querySelectorAll('#site, #thesis, #research')
      .forEach((section) => observer.observe(section));
    const installReveals = () => {
      media.revert();
      if (root.dataset.motion === 'paused') return;
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.hero-visual',
          { y: 0 },
          {
            y: -55,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
        gsap.utils
          .toArray<HTMLElement>(
            '.thesis-sentence, .philosophy-inner, .research-top, .research-panel, .research-consent',
          )
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 38, opacity: 0.25 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 93%',
                  once: true,
                },
              },
            );
          });
        gsap.fromTo(
          '.research-map li',
          { x: -15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.research-map',
              start: 'top 80%',
              once: true,
            },
          },
        );
      });
    };
    installReveals();
    window.addEventListener('keepri:motionchange', installReveals);
    return () => {
      window.removeEventListener('keepri:motionchange', installReveals);
      observer.disconnect();
      media.revert();
      removeOpening();
    };
  }, []);
  return null;
}
