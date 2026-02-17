import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  withArrow?: boolean;
}

const variants = {
  primary:   'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-pink-300/40',
  secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300',
  danger:    'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-300/40',
};

export default function Button({ variant = 'primary', loading = false, withArrow = false, className = '', children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 focus:outline-none ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      <span>{children}</span>
      {withArrow && !loading && (
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </button>
  );
}