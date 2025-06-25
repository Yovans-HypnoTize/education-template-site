import { useEffect, useState, useRef } from "react";

type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut";

const easeFunctions: Record<Easing, (t: number) => number> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

export function useCounterAnimation(
  finalCount: number,
  duration: number = 1500,
  easing: Easing = "easeOut"
): number {
  const [count, setCount] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (finalCount <= 0) {
      return;
    }

    const start = performance.now();
    const step = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeFunctions[easing](progress);
      setCount(Math.floor(finalCount * eased));

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      }
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== undefined) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [finalCount, duration, easing]);

  return count;
}
