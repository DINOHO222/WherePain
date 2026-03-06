import React from 'react';
import { AnalysisResult as AnalysisResultType } from '@/types';
import { Button } from '@/components/Button';
import { AlertTriangle, CheckCircle, Info, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { URGENCY_CONFIG } from '@/constants';

interface AnalysisResultProps {
  result: AnalysisResultType;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const config = URGENCY_CONFIG[result.urgency] || URGENCY_CONFIG.low;

  const Icon = {
    low: CheckCircle,
    medium: Info,
    high: AlertTriangle
  }[result.urgency] || CheckCircle;

  const department = result.medicalDepartment || '診所';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('附近' + department)}`;

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "p-4 rounded-xl border flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
          config.bg,
          config.border
        )}
      >
        <Icon className={cn("w-6 h-6 shrink-0 mt-0.5", config.color)} />
        <div>
          <h3 className={cn("font-bold text-lg mb-1", config.color)}>
            {config.label}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-wrap break-words">
            {result.possibleCondition}
          </p>
        </div>
      </div>

      <div
        className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
        style={{ animationDelay: '150ms' }}
      >
        <h4 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-1 h-4 bg-[var(--brand)] rounded-full" />
          建議處置
        </h4>
        <div className="bg-[var(--bg-surface-secondary)] p-4 rounded-xl text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-wrap break-words">
          {result.recommendation}

          {department && department !== '不需就醫' && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[var(--bg-main)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors active:scale-95"
            >
              <MapPin className="w-4 h-4 text-[var(--brand)]" />
              <span className="font-medium text-sm">尋找附近的{department}</span>
            </a>
          )}
        </div>
      </div>

      <div
        className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
        style={{ animationDelay: '300ms' }}
      >
        <Button onClick={onReset} className="w-full" size="lg">
          再次檢測
        </Button>
      </div>

      <p
        className="text-xs text-center text-[var(--text-muted)] mt-4 animate-in fade-in duration-700 fill-mode-backwards"
        style={{ animationDelay: '500ms' }}
      >
        注意：本結果僅供參考，並非正式醫療診斷。如有嚴重不適請立即就醫。
      </p>
    </div>
  );
};
