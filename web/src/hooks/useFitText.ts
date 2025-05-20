import { useLayoutEffect, useRef, useState } from 'react';

const useFitText = (text: string, max = 0.7, min = 0.4) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(max);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let size = max;
    el.style.fontSize = `${size}vw`;
    while (size > min && el.scrollWidth > el.clientWidth) {
      size -= 0.05;
      el.style.fontSize = `${size}vw`;
    }
    setFontSize(size);
  }, [text, max, min]);

  return { ref, fontSize };
};

export default useFitText;
