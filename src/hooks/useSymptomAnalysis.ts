import { useState } from 'react';
import { BodyPart, SymptomData, AnalysisResult } from '@/types';
import { analyzeSymptoms } from '@/services/gemini';

export function useSymptomAnalysis() {
  const [step, setStep] = useState<'selecting' | 'inputting' | 'analyzing' | 'result'>('selecting');
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPart = (part: BodyPart) => {
    setSelectedPart(part);
    setStep('inputting');
  };

  const handleInputSubmit = async (data: SymptomData) => {
    setSymptomData(data);
    setStep('analyzing');
    setError(null);

    try {
      const analysis = await analyzeSymptoms(data);
      setResult(analysis);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生未知錯誤');
      setStep('inputting'); // Go back to input on error so user can retry
    }
  };

  const handleReset = () => {
    setStep('selecting');
    setSelectedPart(null);
    setSymptomData(null);
    setResult(null);
    setError(null);
  };

  const handleCancelInput = () => {
    setStep('selecting');
    setSelectedPart(null);
  };

  return {
    step,
    selectedPart,
    result,
    error,
    handleSelectPart,
    handleInputSubmit,
    handleReset,
    handleCancelInput
  };
}
