'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Three native scroll chapters. Animation enhances the text; navigation never relies on it.
export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>('.intro-scene'),
    );
    const links = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scene-link]'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        links.forEach((link) => {
          if (link.dataset.sceneLink === visible.target.id)
            link.setAttribute('aria-current', 'step');
          else link.removeAttribute('aria-current');
        });
      },
      { threshold: [0.5, 0.65, 0.85] },
    );
    scenes.forEach((scene) => observer.observe(scene));

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      scenes.forEach((scene, index) => {
        const text = scene.querySelector('.intro-statement');
        if (index > 0) {
          gsap.fromTo(
            text,
            { opacity: 0.15, y: 48 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top 85%',
                end: 'top 20%',
                scrub: true,
              },
            },
          );
        }
        // Outer wrapper owns exit movement so its transform cannot conflict with text entry.
        gsap.to(scene.querySelector('.scene-inner'), {
          y: -48,
          opacity: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom 12%',
            scrub: true,
          },
        });
      });
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
      observer.disconnect();
      media.revert();
      links.forEach((link) => link.removeAttribute('aria-current'));
    };
  }, []);
  return null;
}
