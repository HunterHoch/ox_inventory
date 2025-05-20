import { useEffect, useRef, useState } from 'react';

export default function useFitText(baseSize = 0.7) {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState(baseSize);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;

    const resize = () => {
      if (!el) return;
      let size = baseSize;
      el.style.fontSize = `${size}vw`;
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      while (size > 0.1 && el.scrollWidth > parent.clientWidth) {
        size -= 0.05;
        el.style.fontSize = `${size}vw`;
      }
      setFontSize(size);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [baseSize]);

  return { labelRef, fontSize };
}
