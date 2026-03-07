import { useState } from 'react';
import { BodyPart, SymptomData, AnalysisResult } from '@/types';
import { analyzeSymptoms } from '@/services/gemini';
import { saveHistory } from '@/services/history';
import { useToast } from '@/hooks/useToast';

export function useSymptomAnalysis() {
  const [step, setStep] = useState<'selecting' | 'inputting' | 'analyzing' | 'result'>('selecting');
  // Add state to track the visible side on the model
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const toast = useToast();

  const handleSelectPart = (part: BodyPart) => {
    setSelectedPart(part);
    setStep('inputting');
  };

  const handleInputSubmit = async (data: SymptomData) => {
    // Inject the selected side directly from the hook state instead of asking the user explicitly
    const finalData = { ...data, side: viewSide };
    setSymptomData(finalData);
    setStep('analyzing');

    try {
      const analysis = await analyzeSymptoms(finalData);
      setResult(analysis);
      setStep('result');

      // Save to history
      saveHistory({
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        symptomData: finalData,
        analysisResult: analysis
      });
      toast.success('分析完成，已儲存至歷史紀錄');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '發生未知錯誤');
      setStep('inputting'); // Go back to input on error so user can retry
    }
  };

  const handleReset = () => {
    setStep('selecting');
    setSelectedPart(null);
    setSymptomData(null);
    setResult(null);
  };

  const handleCancelInput = () => {
    setStep('selecting');
    setSelectedPart(null);
  };

  return {
    step,
    viewSide,
    setViewSide,
    selectedPart,
    result,
    handleSelectPart,
    handleInputSubmit,
    handleReset,
    handleCancelInput
  };
}
