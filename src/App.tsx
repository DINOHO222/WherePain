import React from 'react';
import { BodyModel } from '@/components/BodyModel';
import { Modal } from '@/components/Modal';
import { SymptomForm } from '@/components/SymptomForm';
import { AnalysisResult } from '@/components/AnalysisResult';
import { useSymptomAnalysis } from '@/hooks/useSymptomAnalysis';
import { Loader2 } from 'lucide-react';

export default function App() {
  const {
    step,
    selectedPart,
    result,
    error,
    handleSelectPart,
    handleInputSubmit,
    handleReset,
    handleCancelInput
  } = useSymptomAnalysis();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand)]/30 flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-[var(--border-light)] bg-[var(--bg-surface)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg-surface)]/60 shrink-0">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-center px-4">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 w-auto object-contain select-none"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-2 overflow-hidden">
        <div className="w-full h-full flex flex-col items-center gap-2">
          <div className="text-center shrink-0 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="font-bold text-[var(--text-primary)]">哪裡不舒服？</span>
            <span>點擊下方人體模型選擇部位</span>
          </div>

          <div className="flex-1 w-full flex items-center justify-center min-h-0">
            <BodyModel 
              onSelect={handleSelectPart} 
              selectedPart={selectedPart} 
            />
          </div>
        </div>

        {/* Input Modal */}
        <Modal
          isOpen={step === 'inputting' || step === 'analyzing'}
          onClose={handleCancelInput}
          title="症狀描述"
        >
          {step === 'analyzing' ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--brand)]" />
              <p className="text-[var(--text-muted)] animate-pulse">正在分析您的症狀...</p>
            </div>
          ) : (
            selectedPart && (
              <SymptomForm
                selectedPart={selectedPart}
                onSubmit={handleInputSubmit}
                onCancel={handleCancelInput}
                isLoading={step === 'analyzing'}
              />
            )
          )}
        </Modal>

        {/* Result Modal */}
        <Modal
          isOpen={step === 'result' && !!result}
          onClose={handleReset}
          title="分析結果"
        >
          {result && (
            <AnalysisResult
              result={result}
              onReset={handleReset}
            />
          )}
        </Modal>

        {/* Error Toast (Simple implementation) */}
        {error && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[var(--status-error)] text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-4">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
