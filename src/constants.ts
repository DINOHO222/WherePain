import { BodyPart, Duration } from './types';

export const BODY_PART_LABELS: Record<BodyPart, string> = {
  // --- 正面 ---
  'head_front': '額頭/頭頂',
  'face': '臉部',
  'neck_front': '前頸部',
  'chest': '胸部',
  'abdomen': '腹部',
  'pelvis': '鼠蹊部/下腹',
  'left_shoulder_front': '左前肩',
  'right_shoulder_front': '右前肩',
  'left_upper_arm_front': '左大臂(前)',
  'right_upper_arm_front': '右大臂(前)',
  'left_elbow_front': '左手肘(前)',
  'right_elbow_front': '右手肘(前)',
  'left_forearm_front': '左小臂(前)',
  'right_forearm_front': '右小臂(前)',
  'left_wrist_front': '左手腕(前)',
  'right_wrist_front': '右手腕(前)',
  'left_hand_front': '左手掌(手心)',
  'right_hand_front': '右手掌(手心)',
  'left_thigh_front': '左大腿(前)',
  'right_thigh_front': '右大腿(前)',
  'left_knee': '左膝蓋',
  'right_knee': '右膝蓋',
  'left_calf_front': '左小腿(前脛骨)',
  'right_calf_front': '右小腿(前脛骨)',
  'left_ankle_front': '左腳踝(前)',
  'right_ankle_front': '右腳踝(前)',
  'left_foot_front': '左腳背/腳趾',
  'right_foot_front': '右腳背/腳趾',

  // --- 背面 ---
  'head_back': '後腦勺',
  'neck_back': '後頸部',
  'upper_back': '上背部',
  'lower_back': '下背',
  'glutes': '臀部',
  'left_shoulder_back': '左後肩',
  'right_shoulder_back': '右後肩',
  'left_upper_arm_back': '左大臂(後)',
  'right_upper_arm_back': '右大臂(後)',
  'left_elbow_back': '左手肘(後)',
  'right_elbow_back': '右手肘(後)',
  'left_forearm_back': '左小臂(後)',
  'right_forearm_back': '右小臂(後)',
  'left_wrist_back': '左手腕(後)',
  'right_wrist_back': '右手腕(後)',
  'left_hand_back': '左手背',
  'right_hand_back': '右手背',
  'left_thigh_back': '左大腿(後)',
  'right_thigh_back': '右大腿(後)',
  'left_calf_back': '左小腿(肚)',
  'right_calf_back': '右小腿(肚)',
  'left_ankle_back': '左腳踝(後)',
  'right_ankle_back': '右腳踝(後)',
  'left_heel': '左腳跟',
  'right_heel': '右腳跟',
  'left_foot_back': '左腳底',
  'right_foot_back': '右腳底'
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
