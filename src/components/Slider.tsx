import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  label,
  className
}) => {
  // Calculate color based on pain level (Green -> Yellow -> Red)
  const getColor = (val: number) => {
    if (val <= 3) return 'bg-[var(--status-success)]';
    if (val <= 6) return 'bg-[var(--status-warning)]';
    return 'bg-[var(--status-error)]';
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-[var(--text-secondary)]">
            {label}
          </label>
          <span className={cn(
            "text-sm font-bold px-2 py-0.5 rounded-xl text-white",
            getColor(value)
          )}>
            {value} / {max}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[var(--border-light)] rounded-full appearance-none cursor-pointer accent-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/50"
      />
      <div className="grid grid-cols-3 text-xs text-[var(--text-muted)] mt-1 px-1">
        <span className="text-left">輕微</span>
        <span className="text-center">中度</span>
        <span className="text-right">劇烈</span>
      </div>
    </div>
  );
};
