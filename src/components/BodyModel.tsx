import React, { useState, memo } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { cn } from '@/lib/utils';
import { BodyPart } from '@/types';
import { BODY_PART_LABELS } from '@/constants';
import { BODY_PATHS } from '@/data/body-paths';

interface BodyModelProps {
  onSelect: (part: BodyPart) => void;
  selectedPart: BodyPart | null;
}

// Local Anatomy Image
const BODY_IMAGE_URL = "/body.png";

const InteractiveZone = memo(({
  d,
  id,
  name,
  onClick,
  isSelected,
  transform
}: {
  d: string;
  id: BodyPart;
  name: string;
  onClick: (id: BodyPart) => void;
  isSelected: boolean;
  transform?: string;
}) => (
  <path
    d={d}
    style={{ transform }}
    onClick={() => onClick(id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(id);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`選擇${name}`}
    aria-pressed={isSelected}
    className={cn(
      "cursor-pointer transition-colors duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/50 rounded-sm",
      isSelected
        ? "fill-[var(--brand)]/60 stroke-[var(--brand)] stroke-2"
        : "fill-white/0 hover:fill-red-500/30 hover:stroke-red-500/50 stroke-transparent"
    )}
  >
    <title>{name}</title>
  </path>
));

InteractiveZone.displayName = 'InteractiveZone';

export const BodyModel: React.FC<BodyModelProps> = ({ onSelect, selectedPart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full max-h-[80vh] aspect-[220/500] mx-auto select-none flex flex-col">
      {/* Container for Image and Overlay */}
      <div className="relative flex-1 w-full bg-[var(--bg-surface)] rounded-2xl overflow-hidden shadow-md border border-[var(--border-light)]">

        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-secondary)] z-0 pointer-events-none">
            <div className="animate-pulse text-[var(--text-muted)] text-sm">Loading Anatomy...</div>
          </div>
        )}

        {/* Fallback if image fails */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-secondary)] z-0 pointer-events-none">
            <div className="text-[var(--text-muted)] text-sm">Image unavailable</div>
          </div>
        )}

        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.1 }}
          pinch={{ step: 5 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: '100%', height: '100%' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Realistic Body Image */}
              <img
                src={BODY_IMAGE_URL}
                alt="Human Anatomy"
                className={cn(
                  "absolute inset-0 w-full h-full object-contain z-0 transition-opacity duration-500 mix-blend-multiply dark:mix-blend-normal",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                draggable={false}
              />

              {/* Interactive SVG Overlay */}
              <svg
                viewBox="0 0 220 500"
                className="absolute inset-0 w-full h-full z-10 overflow-visible pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
              >
                {BODY_PATHS.map((path) => (
                  <InteractiveZone
                    key={path.id}
                    d={path.d}
                    id={path.id}
                    name={path.name}
                    onClick={onSelect}
                    isSelected={selectedPart === path.id}
                    transform={path.transform}
                  />
                ))}
              </svg>
            </div>
          </TransformComponent>
        </TransformWrapper>

        {/* Floating Labels Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {selectedPart && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--bg-surface)]/90 backdrop-blur-md text-[var(--text-primary)] px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--brand)]/30 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <span className="text-[var(--text-secondary)] font-bold mr-2">已選擇:</span>
              {BODY_PART_LABELS[selectedPart]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
