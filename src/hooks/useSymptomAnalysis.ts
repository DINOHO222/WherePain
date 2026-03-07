import { useState } from 'react';
import { BodyPart, SymptomData, AnalysisResult } from '@/types';
import { analyzeSymptoms } from '@/services/gemini';
import { saveHistory } from '@/services/history';
import { useToast } from '@/hooks/useToast';

export function useSymptomAnalysis() {
  const [step, setStep] = useState<'selecting' | 'inputting' | 'analyzing' | 'result'>('selecting');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const toast = useToast();

  const handleSelectPart = (part: BodyPart) => {
    setSelectedParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedParts.length > 0) {
      setStep('inputting');
    }
  };

  const handleInputSubmit = async (data: SymptomData) => {
    setStep('analyzing');

    try {
      const analysis = await analyzeSymptoms(data);
      setResult(analysis);
      setStep('result');

      // Save to history
      saveHistory({
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        symptomData: data,
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
    setSelectedParts([]);
    setResult(null);
  };

  const handleCancelInput = () => {
    setStep('selecting');
    // We intentionally keep selectedParts so the user doesn't lose their selection
  };

  const handleClearSelection = () => {
    setSelectedParts([]);
  };

  return {
    step,
    viewSide,
    setViewSide,
    selectedParts,
    result,
    handleSelectPart,
    handleConfirmSelection,
    handleClearSelection,
    handleInputSubmit,
    handleReset,
    handleCancelInput
  };
}
