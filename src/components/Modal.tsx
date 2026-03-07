import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Modal Content */}
      <div
        className="relative z-50 w-full max-w-sm bg-[var(--bg-surface)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-light)] animate-in zoom-in-95 fade-in slide-in-from-bottom-2 duration-300"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-light)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {title || 'Modal'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-tertiary)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--text-muted)]" />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
