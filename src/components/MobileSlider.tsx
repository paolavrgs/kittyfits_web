'use client'
import { useState, useRef, useEffect, ReactNode } from "react";

interface MobileSliderProps {
  children: ReactNode[];
  interval?: number;
  showDots?: boolean;
}

const MobileSlider = ({ children, interval = 5000, showDots = false }: MobileSliderProps) => {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i === children.length - 1 ? 0 : i + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [children.length, interval]);

  const prev = () => setCurrent((i) => (i === 0 ? children.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === children.length - 1 ? 0 : i + 1));

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  if (!children || children.length === 0) return null;

  return (
    <div className="flex flex-col w-full relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="w-full overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {children.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${idx === current ? 'w-6 bg-primary' : 'w-2 bg-primary/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileSlider;
