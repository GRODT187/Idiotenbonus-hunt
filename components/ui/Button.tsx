import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-violet-500/30",
    secondary: "bg-brand-card border border-white/10 hover:border-violet-500/50 text-white hover:bg-white/5",
    danger: "bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40",
    ghost: "bg-transparent hover:bg-white/5 text-brand-muted hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};