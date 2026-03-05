import { BodyPart, Duration } from '@/types';

export const BODY_PART_LABELS: Record<BodyPart, string> = {
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
};

export const DURATION_LABELS: Record<Duration, string> = {
  'today': '今天開始',
  'few_days': '持續幾天',
  'one_week': '約一週',
  'one_month': '約一個月',
  'chronic': '長期慢性'
};

export const URGENCY_CONFIG = {
  low: {
    label: '低風險',
    color: 'text-[var(--status-success-text)]',
    bg: 'bg-[var(--status-success-bg)]',
    border: 'border-[var(--status-success-border)]',
  },
  medium: {
    label: '需注意',
    color: 'text-[var(--status-warning-text)]',
    bg: 'bg-[var(--status-warning-bg)]',
    border: 'border-[var(--status-warning-border)]',
  },
  high: {
    label: '建議就醫',
    color: 'text-[var(--status-error-text)]',
    bg: 'bg-[var(--status-error-bg)]',
    border: 'border-[var(--status-error-border)]',
  }
};
