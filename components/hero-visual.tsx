'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, CornerUpLeft } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

export function HeroVisual() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const figure = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on('select', update);
    api.on('reInit', update);
    const element = figure.current;
    let lastWheel = -Infinity;
    let distance = 0;
    let used = false;
    const wheel = (event: WheelEvent) => {
      const dx = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (
        event.ctrlKey ||
        Math.abs(dx) <= Math.abs(event.shiftKey ? 0 : event.deltaY)
      )
        return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 240) {
        distance = 0;
        used = false;
      }
      lastWheel = now;
      distance += dx;
      if (!used && Math.abs(distance) > 18) {
        used = true;
        api.scrollTo(
          distance > 0 ? 1 : 0,
          matchMedia('(prefers-reduced-motion: reduce)').matches,
        );
      }
    };
    element?.addEventListener('wheel', wheel, { passive: false });
    return () => {
      api.off('select', update);
      api.off('reInit', update);
      element?.removeEventListener('wheel', wheel);
    };
  }, [api]);
  const select = (index: number) =>
    api?.scrollTo(
      index,
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
        document.documentElement.dataset.motion === 'paused',
    );
  return (
    <figure
      ref={figure}
      className="hero-visual model-flow"
      aria-labelledby="model-title"
    >
      <figcaption className="model-heading">
        <h2 id="model-title">How KeepRI would work</h2>
        <span>Planned model</span>
      </figcaption>
      <Carousel
        className="model-carousel"
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          duration: 24,
          breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
        }}
        aria-label="KeepRI business model"
        data-lenis-prevent-wheel
      >
        <CarouselContent className="model-track">
          <CarouselItem className="model-slide" aria-label="1 of 2: Diagram">
            <div className="model-panel">
              <div className="model-circuit">
                <div className="model-game">
                  <span className="model-label">01 / Free play</span>
                  <h3>Play different games.</h3>
                  <p>Free practice. New weekly challenges.</p>
                </div>
                <div className="model-branches">
                  <section
                    className="model-lane model-competition"
                    aria-labelledby="competition-path"
                  >
                    <ArrowDown
                      className="model-entry-arrow"
                      size={16}
                      aria-hidden="true"
                    />
                    <h3 id="competition-path">Competition</h3>
                    <ol>
                      <li>
                        <h4>Leaderboards</h4>
                        <ArrowDown
                          className="model-step-arrow"
                          size={14}
                          aria-hidden="true"
                        />
                      </li>
                      <li>
                        <h4>Cash-prize entry</h4>
                        <ArrowDown
                          className="model-step-arrow"
                          size={14}
                          aria-hidden="true"
                        />
                      </li>
                      <li>
                        <h4>Verified awards</h4>
                      </li>
                    </ol>
                    <div className="model-return">
                      <CornerUpLeft size={16} aria-hidden="true" /> Back to the
                      games
                    </div>
                  </section>
                  <section
                    className="model-lane model-research"
                    aria-labelledby="research-path"
                  >
                    <ArrowDown
                      className="model-entry-arrow"
                      size={16}
                      aria-hidden="true"
                    />
                    <h3 id="research-path">Prize-play research</h3>
                    <ol>
                      <li>
                        <h4>Prize-entry agreement</h4>
                        <ArrowDown
                          className="model-step-arrow"
                          size={14}
                          aria-hidden="true"
                        />
                      </li>
                      <li>
                        <h4>Learning records</h4>
                        <ArrowDown
                          className="model-step-arrow"
                          size={14}
                          aria-hidden="true"
                        />
                      </li>
                      <li>
                        <h4>AI teams pay</h4>
                      </li>
                    </ol>
                    <div className="model-revenue">
                      <ArrowDown size={16} aria-hidden="true" /> Research
                      revenue
                    </div>
                  </section>
                </div>
                <div className="model-reinvestment">
                  <div>
                    <h3>Fund the next round.</h3>
                    <p>Free access, new games and significant prizes.</p>
                  </div>
                </div>
              </div>
              <p className="model-choice">
                Cash-prize entry requires research agreement. Free practice
                stays separate.
              </p>
            </div>
          </CarouselItem>
          <CarouselItem
            className="model-slide"
            aria-label="2 of 2: Research and funding"
          >
            <div className="model-panel model-copy">
              <h3>Research &amp; funding</h3>
              <p>
                Free practice requires no research participation. Cash-prize
                entry would require agreement to research data collection and
                commercial use.
              </p>
              <p>
                AI teams would commission studies and license quality-checked
                learning records, game environments and human evaluations. Their
                questions would guide new games. Identity and prize-payment
                details would stay separate from research deliveries.
              </p>
              <p>
                Initial funding and event sponsorship would support early
                competitions. Research revenue would fund free access, new
                games, operations and prizes.
              </p>
              <p className="model-status">
                Research enrollment is not active. Cash-prize events are in
                development.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <fieldset className="model-switch">
          <legend className="sr-only">Choose diagram or explanation</legend>
          <Button
            variant="ghost"
            aria-pressed={selected === 0}
            onClick={() => select(0)}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Diagram
          </Button>
          <Button
            variant="ghost"
            aria-pressed={selected === 1}
            onClick={() => select(1)}
          >
            Research &amp; funding <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </fieldset>
        <span className="sr-only" aria-live="polite">
          {selected === 0
            ? 'Diagram, view 1 of 2'
            : 'Research and funding, view 2 of 2'}
        </span>
      </Carousel>
      <noscript>
        <style>{`.model-track { display: block !important; transform: none !important; } .model-slide + .model-slide { margin-top: 24px; } .model-switch { display: none !important; }`}</style>
      </noscript>
    </figure>
  );
}
