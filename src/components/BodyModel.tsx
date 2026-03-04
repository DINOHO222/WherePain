import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { BodyPart } from '@/types';

interface BodyModelProps {
  onSelect: (part: BodyPart) => void;
  selectedPart: BodyPart | null;
}

// Local Anatomy Image
const BODY_IMAGE_URL = "/body.png";

const InteractiveZone = ({ 
  d, 
  id, 
  name, 
  onClick, 
  isSelected 
}: { 
  d: string; 
  id: BodyPart; 
  name: string; 
  onClick: (id: BodyPart) => void; 
  isSelected: boolean;
}) => (
  <motion.path
    d={d}
    onClick={() => onClick(id)}
    className={cn(
      "cursor-pointer transition-all duration-300",
      isSelected 
        ? "fill-[var(--brand)]/60 stroke-[var(--brand)] stroke-2" 
        : "fill-transparent hover:fill-[var(--brand)]/20 hover:stroke-[var(--brand)]/50 stroke-transparent"
    )}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <title>{name}</title>
  </motion.path>
);

export const BodyModel: React.FC<BodyModelProps> = ({ onSelect, selectedPart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full max-h-[80vh] aspect-[220/500] mx-auto select-none flex flex-col">
      {/* Container for Image and Overlay */}
      <div className="relative flex-1 w-full bg-[var(--bg-surface)] rounded-2xl overflow-hidden shadow-md border border-[var(--border-light)]">
        
        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-secondary)] z-0">
            <div className="animate-pulse text-[var(--text-muted)] text-sm">Loading Anatomy...</div>
          </div>
        )}

        {/* Fallback if image fails */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface-secondary)] z-0">
            <div className="text-[var(--text-muted)] text-sm">Image unavailable</div>
          </div>
        )}

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
        />

        {/* Interactive SVG Overlay */}
        <svg 
          viewBox="0 0 220 500" 
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Head - Centered top */}
          <InteractiveZone 
            d="M85,10 C85,10 75,20 75,45 C75,60 85,70 110,70 C135,70 145,60 145,45 C145,20 135,10 135,10 Z" 
            id="head" 
            name="頭部" 
            onClick={onSelect} 
            isSelected={selectedPart === 'head'} 
          />
          
          {/* Neck */}
          <InteractiveZone 
            d="M90,70 L130,70 L135,85 L85,85 Z" 
            id="neck" 
            name="頸部" 
            onClick={onSelect} 
            isSelected={selectedPart === 'neck'} 
          />

          {/* Chest - Upper Torso */}
          <InteractiveZone 
            d="M70,85 L150,85 L155,145 L65,145 Z" 
            id="chest" 
            name="胸部" 
            onClick={onSelect} 
            isSelected={selectedPart === 'chest'} 
          />

          {/* Upper Stomach */}
          <InteractiveZone 
            d="M65,145 L155,145 L153,175 L67,175 Z" 
            id="upper_stomach" 
            name="上腹部" 
            onClick={onSelect} 
            isSelected={selectedPart === 'upper_stomach'} 
          />

          {/* Lower Stomach */}
          <InteractiveZone 
            d="M67,175 L153,175 L150,210 L70,210 Z" 
            id="lower_stomach" 
            name="下腹部" 
            onClick={onSelect} 
            isSelected={selectedPart === 'lower_stomach'} 
          />

          {/* Left Arm - Shoulder to Wrist */}
          <InteractiveZone 
            d="M65,85 L30,110 L40,250 L65,145 Z" 
            id="left_arm" 
            name="左手臂" 
            onClick={onSelect} 
            isSelected={selectedPart === 'left_arm'} 
          />

          {/* Right Arm */}
          <InteractiveZone 
            d="M155,85 L190,110 L180,250 L155,145 Z" 
            id="right_arm" 
            name="右手臂" 
            onClick={onSelect} 
            isSelected={selectedPart === 'right_arm'} 
          />

          {/* Left Hand */}
          <InteractiveZone 
            d="M40,250 L30,290 L55,290 L50,250 Z" 
            id="left_hand" 
            name="左手" 
            onClick={onSelect} 
            isSelected={selectedPart === 'left_hand'} 
          />

          {/* Right Hand */}
          <InteractiveZone 
            d="M180,250 L190,290 L165,290 L170,250 Z" 
            id="right_hand" 
            name="右手" 
            onClick={onSelect} 
            isSelected={selectedPart === 'right_hand'} 
          />

          {/* Left Leg - Thigh to Ankle */}
          <InteractiveZone 
            d="M70,210 L110,210 L105,455 L75,455 Z" 
            id="left_leg" 
            name="左腿" 
            onClick={onSelect} 
            isSelected={selectedPart === 'left_leg'} 
          />

          {/* Right Leg */}
          <InteractiveZone 
            d="M110,210 L150,210 L145,455 L115,455 Z" 
            id="right_leg" 
            name="右腿" 
            onClick={onSelect} 
            isSelected={selectedPart === 'right_leg'} 
          />

          {/* Left Foot */}
          <InteractiveZone 
            d="M75,455 L105,455 L100,485 L70,485 Z" 
            id="left_foot" 
            name="左腳" 
            onClick={onSelect} 
            isSelected={selectedPart === 'left_foot'} 
          />

          {/* Right Foot */}
          <InteractiveZone 
            d="M115,455 L145,455 L150,485 L120,485 Z" 
            id="right_foot" 
            name="右腳" 
            onClick={onSelect} 
            isSelected={selectedPart === 'right_foot'} 
          />
        </svg>

        {/* Floating Labels Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {selectedPart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--bg-surface)]/90 backdrop-blur-md text-[var(--text-primary)] px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-[var(--brand)]/30"
            >
              <span className="text-[var(--text-secondary)] font-bold mr-2">已選擇:</span>
              {
                {
                  'head': '頭部', 'neck': '頸部', 'chest': '胸部', 'upper_stomach': '上腹部', 'lower_stomach': '下腹部', 'back': '背部',
                  'left_arm': '左手臂', 'right_arm': '右手臂', 'left_hand': '左手', 'right_hand': '右手',
                  'left_leg': '左腿', 'right_leg': '右腿', 'left_foot': '左腳', 'right_foot': '右腳'
                }[selectedPart]
              }
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
