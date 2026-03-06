import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
    error: (message: string) => void;
    success: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const value = {
        toast: showToast,
        error: (msg: string) => showToast(msg, 'error'),
        success: (msg: string) => showToast(msg, 'success'),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}

            {/* Toast Container Stack */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none w-full max-w-sm px-4">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className={cn(
                            "flex items-center gap-3 w-full p-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto",
                            {
                                'bg-[var(--status-error)] border-red-900/50 text-white': t.type === 'error',
                                'bg-[var(--status-success)] border-green-900/50 text-white': t.type === 'success',
                                'bg-[var(--bg-surface-secondary)] border-[var(--border-light)] text-[var(--text-primary)]': t.type === 'info',
                            }
                        )}
                    >
                        {t.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
                        {t.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
                        {t.type === 'info' && <Info className="w-5 h-5 shrink-0" />}

                        <p className="text-sm font-medium flex-1">{t.message}</p>

                        <button
                            onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}
                            className="p-1 hover:bg-black/10 rounded-md transition-colors shrink-0"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
