export type Sequence = [number, number, number];
export const hypotheses = [
  {
    label: 'All even',
    accepts: (values: Sequence) => values.every((value) => value % 2 === 0),
  },
  {
    label: 'Add two',
    accepts: ([a, b, c]: Sequence) => b - a === 2 && c - b === 2,
  },
  { label: 'Increasing', accepts: ([a, b, c]: Sequence) => a < b && b < c },
];
export const acceptsSequence = (sequence: Sequence) =>
  hypotheses[2].accepts(sequence);
export function parseSequence(fields: string[]): Sequence | null {
  if (
    fields.length !== 3 ||
    fields.some((field) => !/^-?\d+$/.test(field.trim()))
  )
    return null;
  const values = fields.map(Number);
  return values.every(
    (value) => Number.isSafeInteger(value) && Math.abs(value) <= 999,
  )
    ? (values as Sequence)
    : null;
}
export function remainingHypotheses(remaining: boolean[], sequence: Sequence) {
  const accepted = acceptsSequence(sequence);
  return hypotheses.map(
    (rule, i) => remaining[i] && rule.accepts(sequence) === accepted,
  );
}
