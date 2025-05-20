import { useEffect } from 'react';

export default function useFitText(ref: React.RefObject<HTMLElement>, deps: React.DependencyList = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const parent = el.parentElement as HTMLElement;

    const adjust = () => {
      if (!el) return;
      el.style.whiteSpace = 'nowrap';
      el.style.fontSize = '';
      el.style.transform = '';

      const parentWidth = parent.clientWidth;
      if (el.scrollWidth > parentWidth) {
        const scale = parentWidth / el.scrollWidth;
        el.style.transformOrigin = 'left top';
        el.style.transform = `scale(${scale})`;
      }
    };

    adjust();
    window.addEventListener('resize', adjust);
    return () => window.removeEventListener('resize', adjust);
  }, deps);
}
