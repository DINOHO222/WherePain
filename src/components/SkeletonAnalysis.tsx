import { Loader2 } from 'lucide-react';

export const SkeletonAnalysis = () => {
    return (
        <div className="flex flex-col w-full space-y-6 animate-in fade-in zoom-in-95 duration-500 py-4">

            {/* Top Banner / Hero Skeleton */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-2">
                <div className="relative">
                    <Loader2 className="h-10 w-10 animate-spin text-[var(--brand)]" />
                    <div className="absolute inset-0 animate-ping opacity-20 bg-[var(--brand)] rounded-full" />
                </div>
                <p className="text-[var(--brand)] animate-pulse font-bold tracking-wider text-sm">AI 正在為您進行病理分析...</p>
            </div>

            {/* Result Card Skeleton */}
            <div className="p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] flex items-start gap-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[var(--bg-surface-secondary)] shrink-0 animate-pulse mt-0.5" />
                <div className="space-y-3 w-full">
                    <div className="h-5 bg-[var(--bg-surface-secondary)] rounded-md w-1/3 animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-4 bg-[var(--bg-surface-secondary)] rounded-md w-full animate-pulse" />
                        <div className="h-4 bg-[var(--bg-surface-secondary)] rounded-md w-4/5 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Recommendations Skeleton */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-[var(--bg-surface-secondary)] rounded-full animate-pulse" />
                    <div className="h-5 bg-[var(--bg-surface-secondary)] rounded-md w-1/4 animate-pulse" />
                </div>
                <div className="bg-[var(--bg-surface-secondary)] p-4 rounded-xl space-y-3">
                    <div className="h-4 bg-[var(--border-light)] rounded-md w-full animate-pulse opacity-50" />
                    <div className="h-4 bg-[var(--border-light)] rounded-md w-5/6 animate-pulse opacity-50" />
                    <div className="h-4 bg-[var(--border-light)] rounded-md w-4/6 animate-pulse opacity-50" />

                    {/* Fake Button Skeleton */}
                    <div className="mt-6 h-10 bg-[var(--bg-main)] rounded-lg w-full animate-pulse opacity-40 border border-[var(--border-light)]" />
                </div>
            </div>

        </div>
    );
};
