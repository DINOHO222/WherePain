import { SymptomData, AnalysisResult } from '@/types';

export const analyzeSymptoms = async (data: SymptomData): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptomData: data }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.details || errorData.error || 'Failed to analyze symptoms via server API');
    }

    const result = await response.json();
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw new Error('無法連線至後端伺服器進行分析，請確認。');
  }
};
