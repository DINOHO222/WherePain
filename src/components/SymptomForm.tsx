import React, { useState } from 'react';
import { BodyPart, Duration, PainLevel, SymptomData } from '@/types';
import { Button } from '@/components/Button';
import { Slider } from '@/components/Slider';
import { Select } from '@/components/Select';
import { BODY_PART_LABELS, DURATION_LABELS } from '@/constants';

interface SymptomFormProps {
  selectedParts: BodyPart[];
  onSubmit: (data: SymptomData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({
  selectedParts,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [painLevel, setPainLevel] = useState<number>(5);
  const [duration, setDuration] = useState<Duration>('today');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bodyParts: selectedParts,
      painLevel: painLevel as PainLevel,
      duration,
      description
    });
  };

  const bodyPartNames = selectedParts.map(p => BODY_PART_LABELS[p] || p).join('、');

  const durationOptions = Object.entries(DURATION_LABELS).map(([value, label]) => ({
    value,
    label
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="bg-[var(--bg-surface-secondary)] p-3 rounded-2xl border border-[var(--border-light)] inline-block min-w-[120px]">
          <p className="text-xs text-[var(--text-muted)]">部位</p>
          <p className="text-base font-bold text-[var(--text-primary)]">{bodyPartNames}</p>
        </div>
      </div>

      <div
        className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards"
        style={{ animationDelay: '100ms' }}
      >
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
          options={durationOptions}
          className="py-2 text-sm"
        />
      </div>

      <div
        className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards"
        style={{ animationDelay: '200ms' }}
      >
        <label className="text-xs font-bold text-[var(--text-secondary)]">
          其他描述 (選填)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例如：刺痛、悶痛..."
          className="w-full min-h-[60px] h-[60px] rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)] resize-none placeholder:text-[var(--input-placeholder)] transition-all"
        />
      </div>

      <div
        className="flex gap-3 pt-1 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-backwards"
        style={{ animationDelay: '300ms' }}
      >
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
