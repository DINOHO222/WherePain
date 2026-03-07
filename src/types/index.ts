export type BodyPart =
  // --- 正面 (Front) ---
  | 'head_front' | 'face' | 'neck_front'
  | 'chest' | 'abdomen' | 'pelvis'
  | 'left_shoulder_front' | 'right_shoulder_front'
  | 'left_upper_arm_front' | 'right_upper_arm_front'
  | 'left_elbow_front' | 'right_elbow_front'
  | 'left_forearm_front' | 'right_forearm_front'
  | 'left_wrist_front' | 'right_wrist_front'
  | 'left_hand_front' | 'right_hand_front'
  | 'left_thigh_front' | 'right_thigh_front'
  | 'left_knee' | 'right_knee'
  | 'left_calf_front' | 'right_calf_front'
  | 'left_ankle_front' | 'right_ankle_front'
  | 'left_foot_front' | 'right_foot_front'

  // --- 背面 (Back) ---
  | 'head_back' | 'neck_back'
  | 'upper_back' | 'lower_back' | 'glutes'
  | 'left_shoulder_back' | 'right_shoulder_back'
  | 'left_upper_arm_back' | 'right_upper_arm_back'
  | 'left_elbow_back' | 'right_elbow_back'
  | 'left_forearm_back' | 'right_forearm_back'
  | 'left_wrist_back' | 'right_wrist_back'
  | 'left_hand_back' | 'right_hand_back'
  | 'left_thigh_back' | 'right_thigh_back'
  | 'left_calf_back' | 'right_calf_back'
  | 'left_ankle_back' | 'right_ankle_back'
  | 'left_heel' | 'right_heel'
  | 'left_foot_back' | 'right_foot_back';

export type PainLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Duration =
  | 'today'
  | 'few_days'
  | 'one_week'
  | 'one_month'
  | 'chronic';

export interface SymptomData {
  bodyPart: BodyPart | null;
  side: 'front' | 'back';
  painLevel: PainLevel;
  duration: Duration;
  description?: string;
}

export interface AnalysisResult {
  possibleCondition: string;
  recommendation: string;
  urgency: 'low' | 'medium' | 'high';
  medicalDepartment?: string;
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  symptomData: SymptomData;
  analysisResult: AnalysisResult;
}
