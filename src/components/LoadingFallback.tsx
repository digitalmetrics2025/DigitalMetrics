import React from 'react';
import { Code, TrendingUp } from 'lucide-react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="relative">
            <Code className="h-12 w-12 text-blue-400" />
            <TrendingUp className="h-6 w-6 text-green-400 absolute -top-1 -right-1" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Digital Metrics
          </span>
        </div>
        
        {/* Loading Animation */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-white mb-2">Loading Application</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Initializing services and preparing your experience...
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;