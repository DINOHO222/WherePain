import React, { useState } from 'react';
import { BodyPart, Duration, PainLevel, SymptomData } from '@/types';
import { Button } from '@/components/Button';
import { Slider } from '@/components/Slider';
import { Select } from '@/components/Select';
import { cn } from '@/lib/utils';

interface SymptomFormProps {
  selectedPart: BodyPart;
  onSubmit: (data: SymptomData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ 
  selectedPart, 
  onSubmit, 
  onCancel,
  isLoading 
}) => {
  const [painLevel, setPainLevel] = useState<number>(5);
  const [duration, setDuration] = useState<Duration>('today');
  const [description, setDescription] = useState('');
  const [side, setSide] = useState<'front' | 'back'>('front');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bodyPart: selectedPart,
      side,
      painLevel: painLevel as PainLevel,
      duration,
      description
    });
  };

  const bodyPartName = {
    'head': '頭部',
    'neck': '頸部',
    'chest': '胸部',
    'upper_stomach': '上腹部',
    'lower_stomach': '下腹部',
    'back': '背部',
    'left_arm': '左手臂',
    'right_arm': '右手臂',
    'left_hand': '左手',
    'right_hand': '右手',
    'left_leg': '左腿',
    'right_leg': '右腿',
    'left_foot': '左腳',
    'right_foot': '右腳'
  }[selectedPart] || selectedPart;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[var(--bg-surface-secondary)] p-3 rounded-xl border border-[var(--border-light)]">
          <p className="text-xs text-[var(--text-muted)]">部位</p>
          <p className="text-base font-bold text-[var(--text-primary)]">{bodyPartName}</p>
        </div>

        <div className="flex bg-[var(--bg-surface-tertiary)] p-1 rounded-xl items-center">
          <button
            type="button"
            onClick={() => setSide('front')}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all h-full",
              side === 'front' 
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm ring-1 ring-black/5" 
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            )}
          >
            正面
          </button>
          <button
            type="button"
            onClick={() => setSide('back')}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all h-full",
              side === 'back' 
                ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm ring-1 ring-black/5" 
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            )}
          >
            背面
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Slider
          label="疼痛程度"
          value={painLevel}
          onChange={setPainLevel}
          min={0}
          max={10}
          className="space-y-2"
        />

        <Select
          label="持續時間"
          value={duration}
          onChange={(e) => setDuration(e.target.value as Duration)}
          options={[
            { value: 'today', label: '今天開始' },
            { value: 'few_days', label: '持續幾天' },
            { value: 'one_week', label: '約一週' },
            { value: 'one_month', label: '約一個月' },
            { value: 'chronic', label: '長期慢性' },
          ]}
          className="py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-[var(--text-secondary)]">
          其他描述 (選填)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例如：刺痛、悶痛..."
          className="w-full min-h-[60px] h-[60px] rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)] resize-none placeholder:text-[var(--input-placeholder)]"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <Button 
          type="button" 
          variant="secondary" 
          size="sm"
          className="flex-1 h-9" 
          onClick={onCancel}
          disabled={isLoading}
        >
          取消
        </Button>
        <Button 
          type="submit" 
          size="sm"
          className="flex-1 h-9"
          isLoading={isLoading}
        >
          開始分析
        </Button>
      </div>
    </form>
  );
};
