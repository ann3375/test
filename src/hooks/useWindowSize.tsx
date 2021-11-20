import { useEffect, useState } from 'react';

type WindowSizeType = {
  width: number;
};

export function useWindowSize(): WindowSizeType {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({ width: 0 });

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return windowSize;
}
