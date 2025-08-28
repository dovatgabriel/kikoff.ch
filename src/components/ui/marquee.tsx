import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export const Marquee: FC<MarqueeProps> = ({ children, duration = 60, className, pauseOnHover }) => {
  return (
    <div className={cn('relative overflow-hidden py-1', className)}>
      <div
        className={cn(
          'flex w-max animate-[marquee_linear_infinite] gap-8 pr-8',
          pauseOnHover && 'hover:[animation-play-state:paused] ',
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-[marquee_linear_infinite] { animation: marquee linear infinite; }
      `}</style>
    </div>
  );
};
