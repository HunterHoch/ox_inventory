import { useLayoutEffect, useRef } from 'react';

const useFitText = (text: string, maxFontSize = 0.7) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    el.style.whiteSpace = 'nowrap';
    let fontSize = maxFontSize;
    el.style.fontSize = `${fontSize}vw`;

    const parentWidth = parent.clientWidth;
    while (el.scrollWidth > parentWidth && fontSize > 0.3) {
      fontSize -= 0.05;
      el.style.fontSize = `${fontSize}vw`;
    }
  }, [text, maxFontSize]);

  return ref;
};

export default useFitText;
