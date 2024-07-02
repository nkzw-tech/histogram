const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
const barLength = bars.length - 1;

const dim = (string: string) => `\x1B[2m${string}\x1B[22m`;

export default function histogram(data: ReadonlyArray<number>) {
  const count = new Map<number, number>();
  for (const entry of data) {
    count.set(entry, (count.get(entry) || 0) + 1);
  }

  const keys = [...count.keys()];
  const maxCount = Math.max(...count.values());
  const min = Math.min(...keys);
  const max = Math.max(...keys);
  const histogram = [];
  for (let i = min; i <= max; i++) {
    const value = count.get(i);
    if (value != null) {
      histogram.push(
        bars[Math.min(Math.floor((value / maxCount) * barLength), barLength)]
      );
    } else {
      histogram.push(dim(bars[0]));
    }
  }

  return `${min} ${histogram.join('')} ${max}`;
}
