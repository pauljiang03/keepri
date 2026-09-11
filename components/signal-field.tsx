import { SIGNAL_THREADS, signalPath } from '@/lib/signal-shape';

export function SignalField({
  className,
  chapter = 0,
}: {
  className: string;
  chapter?: number;
}) {
  return (
    <div className={`signal-field ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1600 1000" fill="none" focusable="false">
        {Array.from({ length: SIGNAL_THREADS }, (_, index) => (
          <path
            className={`signal-thread${index % 11 === 0 ? ' signal-accent' : ''}`}
            key={index}
            d={signalPath(index, chapter)}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
