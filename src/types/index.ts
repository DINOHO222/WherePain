export type BodyPart = 
  | 'head' | 'neck' | 'chest' | 'upper_stomach' | 'lower_stomach' | 'back' 
  | 'left_arm' | 'right_arm' | 'left_hand' | 'right_hand'
  | 'left_leg' | 'right_leg' | 'left_foot' | 'right_foot';

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
}
