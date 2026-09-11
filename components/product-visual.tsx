import { ArrowUp, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { asset } from '@/lib/site';

export function ProductVisual({ step }: { step: number }) {
  if (step < 2)
    return (
      <div
        className={`product-visual product-screen ${step === 0 ? 'tutorial-screen' : 'solution-screen'}`}
      >
        <Image
          unoptimized
          src={asset(
            `/assets/product/${step === 0 ? 'tutorial' : 'solution'}.png`,
          )}
          width={942}
          height={2048}
          alt={
            step === 0
              ? 'Keepri closed-beta tutorial: learn how your pieces move on a four-by-four board.'
              : 'Keepri closed-beta solution: review both sides of a move to understand why a strategy works.'
          }
          loading="lazy"
        />
      </div>
    );
  return (
    <div className="product-visual planned-visual">
      <span className="visual-label">In development</span>
      <div className="challenge-symbol">
        <ArrowUp size={50} strokeWidth={1} />
      </div>
      <h4>
        One challenge.
        <br />
        Your strategy.
      </h4>
      <div className="planned-row">
        <span>Shared challenges</span>
        <Check size={15} />
      </div>
      <div className="planned-row">
        <span>Expanded competition</span>
        <Sparkles size={15} />
      </div>
      <p>A reason to give it your all.</p>
    </div>
  );
}
