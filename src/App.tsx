import { useState } from 'react';
import { BodyModel } from '@/components/BodyModel';
import { Modal } from '@/components/Modal';
import { SymptomForm } from '@/components/SymptomForm';
import { AnalysisResult } from '@/components/AnalysisResult';
import { HistoryList } from '@/components/HistoryList';
import { useSymptomAnalysis } from '@/hooks/useSymptomAnalysis';
import { SkeletonAnalysis } from '@/components/SkeletonAnalysis';
import { ToastProvider } from '@/hooks/useToast';
import { MessageSquareText, RotateCcw } from 'lucide-react';

function AppContent() {
  const [view, setView] = useState<'home' | 'history'>('home');

  const {
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
  } = useSymptomAnalysis();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans selection:bg-[var(--brand)]/30 flex flex-col">
      <header className="sticky top-0 z-30 w-full border-b border-[var(--border-light)] bg-[var(--bg-surface)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg-surface)]/60 shrink-0 flex justify-center">
        <div className="w-full max-w-md flex h-14 items-center justify-between px-4 relative">
          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto object-contain select-none cursor-pointer"
              onClick={() => setView('home')}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setView('history')}
              className="p-2 rounded-full hover:bg-[var(--bg-surface-secondary)] text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors relative group"
              title="分析紀錄"
            >
              <MessageSquareText className="w-[21.6px] h-[21.6px]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--status-error)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-2 overflow-hidden w-full max-w-md mx-auto relative">
        {view === 'history' ? (
          <HistoryList onBack={() => setView('home')} />
        ) : (
          <div className="w-full h-full flex flex-col items-center gap-2 animate-in fade-in duration-300">
            <div className="text-center shrink-0 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-primary)]">哪裡不舒服？</span>
              <span>點擊下方人體模型選擇部位</span>
            </div>

            <div className="flex-1 w-full flex items-center justify-center min-h-0 animate-in fade-in duration-1000 slide-in-from-bottom-4 relative">
              <BodyModel
                onSelect={handleSelectPart}
                selectedParts={selectedParts}
                side={viewSide}
                onSideChange={setViewSide}
              />

              {/* Confirm & Reset Buttons */}
              {selectedParts.length > 0 && step === 'selecting' && (
                <>
                  <div className="absolute bottom-6 left-4 z-30 animate-in fade-in slide-in-from-left-4 duration-300">
                    <button
                      onClick={handleClearSelection}
                      className="bg-[var(--bg-surface)] text-[var(--status-error-text)] border border-[var(--status-error-border)] px-4 py-3 rounded-2xl font-bold shadow-lg shadow-[var(--status-error-bg)]/20 hover:bg-[var(--status-error-bg)] hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      重置
                    </button>
                  </div>
                  <div className="absolute bottom-6 right-4 z-30 animate-in fade-in slide-in-from-right-4 duration-300">
                    <button
                      onClick={handleConfirmSelection}
                      className="bg-[var(--brand)] text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-[var(--brand)]/30 hover:bg-[var(--brand)]/90 hover:scale-105 transition-all flex items-center gap-2"
                    >
                      下一步 ({selectedParts.length})
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Input Modal */}
        <Modal
          isOpen={step === 'inputting' || step === 'analyzing'}
          onClose={handleCancelInput}
          title="症狀描述"
        >
          {step === 'analyzing' ? (
            <SkeletonAnalysis />
          ) : (
            selectedParts.length > 0 && (
              <SymptomForm
                selectedParts={selectedParts}
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
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
