import { useState, useRef, useLayoutEffect } from 'react';

export default function useFitText(deps: any[] = [], min = 6, max = 14) {
  const ref = useRef<HTMLElement | null>(null);
  const [fontSize, setFontSize] = useState(max);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;

    let size = max;
    el.style.fontSize = `${size}px`;
    const parent = el.parentElement;

    while (el.scrollWidth > parent.clientWidth && size > min) {
      size -= 0.5;
      el.style.fontSize = `${size}px`;
    }

    setFontSize(size);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, fontSize } as const;
}
