'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installOpeningMotion } from '@/lib/opening-motion';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let removeOpening = installOpeningMotion();
    const media = gsap.matchMedia();
    media.add(
      '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
      () => {
        document.documentElement.dataset.desktopMotion = 'true';
        gsap.set('.product-card', { opacity: 0 });
        gsap.set('.card-visual', { yPercent: 110, opacity: 0 });
        gsap.set('.step-copy', { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.experience-list',
              start: 'top 60%',
              end: 'top 10%',
              scrub: true,
            },
          })
          .to(
            '.product-card',
            {
              opacity: 1,
              stagger: { from: 'end', each: 0.4 },
              duration: 0.5,
              ease: 'power2.in',
            },
            0,
          )
          .to(
            '.step-visual-0',
            { yPercent: 0, opacity: 1, duration: 2, ease: 'power3.in' },
            0.5,
          )
          .to(
            '.step-copy-0',
            { opacity: 1, duration: 1.5, ease: 'power3.in' },
            0.5,
          );
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.experience-sticky',
              endTrigger: '.experience-sequence',
              start: 'top top',
              end: 'bottom 50%',
              scrub: true,
            },
          })
          .to(
            '.step-visual-1',
            { yPercent: 0, opacity: 1, duration: 2, ease: 'power3.in' },
            0,
          )
          .to('.step-copy-0', { opacity: 0, duration: 1, ease: 'power3.in' }, 0)
          .to(
            '.step-copy-1',
            { opacity: 1, duration: 1.5, ease: 'power3.in' },
            1.5,
          )
          .to(
            '.step-copy-1',
            { opacity: 0, duration: 1, ease: 'power3.in' },
            4.5,
          )
          .to(
            '.step-visual-2',
            { yPercent: 0, opacity: 1, duration: 2, ease: 'power3.in' },
            4.5,
          )
          .to(
            '.step-copy-2',
            { opacity: 1, duration: 1.5, ease: 'power3.in' },
            6,
          )
          .to(
            '.step-copy-2',
            { opacity: 0, duration: 0.5, ease: 'power3.in' },
            9.5,
          );
        gsap.set('.earn-copy > *', { opacity: 0 });
        gsap.set('.earn-card', { yPercent: 30, opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.earn-section',
              start: () => `top ${(innerWidth * 426) / 1440}px`,
              end: 'bottom 70%',
              scrub: true,
            },
          })
          .fromTo(
            '.earn-line',
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 5, ease: 'none' },
            0,
          )
          .to(
            '.earn-copy > *',
            { opacity: 1, stagger: 1, duration: 1, ease: 'power3.in' },
            1,
          )
          .to(
            '.earn-card',
            { yPercent: 0, opacity: 1, duration: 4, ease: 'power3.out' },
            6,
          );
        gsap.fromTo(
          '.thesis-sentence',
          { xPercent: 100 },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.thesis-sentence',
              start: 'top bottom',
              end: 'bottom 35%',
              scrub: 1,
            },
          },
        );
        gsap.to('.closing-curve', {
          yPercent: -100,
          y: () => (innerWidth * 150) / 1440,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.closing-section',
            start: 'top bottom',
            end: 'bottom center',
            scrub: true,
          },
        });
        return () => {
          delete document.documentElement.dataset.desktopMotion;
        };
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
        sessionStorage.setItem('keepri:opening-seen:v2', '1');
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
