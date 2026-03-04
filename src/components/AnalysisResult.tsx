import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@/types';
import { Button } from '@/components/Button';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultProps {
  result: AnalysisResultType;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const urgencyConfig = {
    low: {
      color: 'text-[var(--status-success-text)]',
      bg: 'bg-[var(--status-success-bg)]',
      border: 'border-[var(--status-success-border)]',
      icon: CheckCircle,
      label: '低風險'
    },
    medium: {
      color: 'text-[var(--status-warning-text)]',
      bg: 'bg-[var(--status-warning-bg)]',
      border: 'border-[var(--status-warning-border)]',
      icon: Info,
      label: '需注意'
    },
    high: {
      color: 'text-[var(--status-error-text)]',
      bg: 'bg-[var(--status-error-bg)]',
      border: 'border-[var(--status-error-border)]',
      icon: AlertTriangle,
      label: '建議就醫'
    }
  };

  const config = urgencyConfig[result.urgency] || urgencyConfig.low;
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <div className={cn(
        "p-4 rounded-xl border flex items-start gap-4",
        config.bg,
        config.border
      )}>
        <Icon className={cn("w-6 h-6 shrink-0 mt-0.5", config.color)} />
        <div>
          <h3 className={cn("font-bold text-lg mb-1", config.color)}>
            {config.label}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {result.possibleCondition}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-1 h-4 bg-[var(--brand)] rounded-full"/>
          建議處置
        </h4>
        <div className="bg-[var(--bg-surface-secondary)] p-4 rounded-xl text-[var(--text-secondary)] text-sm leading-relaxed">
          {result.recommendation}
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={onReset} className="w-full" size="lg">
          再次檢測
        </Button>
      </div>
      
      <p className="text-xs text-center text-[var(--text-muted)] mt-4">
        注意：本結果僅供參考，並非正式醫療診斷。如有嚴重不適請立即就醫。
      </p>
    </div>
  );
};
