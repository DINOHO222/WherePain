import React, { useEffect, useState } from 'react';
import { HistoryRecord } from '@/types';
import { getHistory, clearHistory } from '@/services/history';
import { BODY_PART_LABELS, URGENCY_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';
import { Trash2, Calendar, Activity, ArrowLeft } from 'lucide-react';

interface HistoryListProps {
  onBack: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ onBack }) => {
  const [records, setRecords] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('確定要清除所有紀錄嗎？')) {
      clearHistory();
      setRecords([]);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-[var(--bg-surface-secondary)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">分析紀錄</h2>
        </div>

        {records.length > 0 && (
          <button
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-[var(--status-error-bg)] text-[var(--text-muted)] hover:text-[var(--status-error-text)] transition-colors"
            title="清除紀錄"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-20 space-y-4">
        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)] space-y-3">
            <Activity className="w-12 h-12 opacity-20" />
            <p>尚無分析紀錄</p>
          </div>
        ) : (
          records.map((record, index) => {
            const urgency = URGENCY_CONFIG[record.analysisResult.urgency];
            const bodyPartNames = record.symptomData.bodyParts && record.symptomData.bodyParts.length > 0
              ? record.symptomData.bodyParts.map(p => BODY_PART_LABELS[p] || p).join('、')
              : '未指定';

            return (
              <div
                key={record.id}
                className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(record.timestamp)}</span>
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full border",
                    urgency.bg,
                    urgency.color,
                    urgency.border
                  )}>
                    {urgency.label}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {bodyPartNames}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {record.symptomData.description || '無其他描述'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-light)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                    可能情況：
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {record.analysisResult.possibleCondition}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
