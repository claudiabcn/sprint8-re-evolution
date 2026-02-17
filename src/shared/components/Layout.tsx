
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode; 
  maxWidth?: 'max-w-4xl' | 'max-w-6xl' | 'max-w-7xl';
}

export default function Layout({ 
  children, 
  title, 
  subtitle, 
  headerContent,
  maxWidth = 'max-w-6xl' 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 py-8 md:py-12 px-4 md:px-6">
      <div className={`${maxWidth} mx-auto`}>
        

        {(title || headerContent) && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">

            <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-300/10 rounded-full blur-2xl"></div>
            
            <div>
              {title && (
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-rose-600 mt-1 font-medium">{subtitle}</p>
              )}
            </div>

            {headerContent && (
              <div className="relative z-10">
                {headerContent}
              </div>
            )}
          </div>
        )}


        <div className="relative">

          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-amber-400/15 to-rose-400/15 rounded-2xl blur-xl transform scale-105"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 overflow-hidden">

            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500"></div>
            
            <div className="p-6 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}