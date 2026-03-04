import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  disabled,
  ...props 
}) => {
  const variants = {
    primary: "bg-[var(--brand)] text-[var(--text-primary)] hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)] shadow-sm",
    secondary: "bg-[var(--bg-surface-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-light)] active:bg-[var(--border-medium)]",
    outline: "border border-[var(--border-light)] bg-transparent hover:bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)]",
    ghost: "bg-transparent hover:bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)]",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
