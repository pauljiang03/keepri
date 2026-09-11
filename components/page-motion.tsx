'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { installIntroduction } from '@/lib/intro-controller';
import { fieldParallax, morphSignal } from '@/lib/field-motion';

export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const removeIntroduction = installIntroduction();
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 95%', once: true },
        });
      });
      gsap.from('.hero-title-line > span', {
        yPercent: 110,
        rotation: 2,
        duration: 1.05,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hero', start: 'top 88%', once: true },
      });
      gsap.to('.hero-field svg', {
        y: 100,
        rotation: 22,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
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
      gsap.fromTo(
        '.thinking-sequence',
        { '--sequence-progress': 0 },
        {
          '--sequence-progress': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.thinking-sequence',
            start: 'top 65%',
            end: 'bottom 55%',
            scrub: 0.8,
          },
        },
      );
      const steps = gsap.utils.toArray<HTMLElement>('.thinking-step');
      const sculpture = document.querySelector('.experience-field');
      const counter = document.querySelector(
        '.experience-coordinate span:last-child',
      );
      let sculptureMotion: gsap.core.Timeline | undefined;
      let active = -1;
      const select = (index: number) => {
        if (active === index) return;
        active = index;
        steps.forEach((step, i) => {
          step.dataset.active = String(i === index);
        });
        if (counter) counter.textContent = `0${index + 1} / 04`;
        sculptureMotion?.kill();
        if (sculpture) sculptureMotion = morphSignal(sculpture, index, 1.1);
      };
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => select(index),
          onEnterBack: () => select(index),
        });
        gsap.fromTo(
          step.querySelector('h3'),
          { x: 24 },
          {
            x: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: step,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          },
        );
      });
      gsap.from('.model-node', {
        y: 38,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.model-diagram',
          start: 'top 90%',
          once: true,
        },
      });
      gsap.from('.footer-wordmark', {
        yPercent: 55,
        rotation: -3,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top bottom',
          end: 'top 55%',
          scrub: 1,
        },
      });
      return () => {
        sculptureMotion?.kill();
        steps.forEach((step) => {
          delete step.dataset.active;
        });
        if (counter) counter.textContent = '01 / 04';
      };
    });
    media.add(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
      () => {
        const hero = document.querySelector<HTMLElement>('.hero');
        const field = document.querySelector<HTMLElement>('.hero-field');
        if (hero && field) return fieldParallax(hero, field, 24);
      },
    );
    return () => {
      removeIntroduction();
      media.revert();
    };
  }, []);
  return null;
}
