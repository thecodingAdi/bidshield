'use client';

import { useState, useEffect } from 'react';
import { Shield, Play, Loader2, FileText, Users, Activity, CheckCircle } from 'lucide-react';

interface DemoLauncherProps {
  onStart: () => void;
}

const processingSteps = [
  { text: "Ingesting CPWD Tender PDF...", icon: <FileText className="w-5 h-5"/> },
  { text: "Mapping 10 Bidder Submissions...", icon: <Users className="w-5 h-5"/> },
  { text: "Running OCR Extraction & Validation...", icon: <Loader2 className="w-5 h-5 animate-spin"/> },
  { text: "Building Fraud Network Graph...", icon: <Activity className="w-5 h-5"/> },
  { text: "Calculating Statistical Deviations...", icon: <CheckCircle className="w-5 h-5"/> }
];

export default function DemoLauncher({ onStart }: DemoLauncherProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);

  const handleRunDemo = () => {
    setIsProcessing(true);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev >= processingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(onStart, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isProcessing, onStart]);

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-[100] p-6 text-center">
        <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-8 relative">
          <Shield className="w-12 h-12 text-blue-500 animate-pulse" />
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
        </div>
        
        <div className="space-y-6 max-w-md w-full">
          <h2 className="text-3xl font-bold text-white tracking-tight">Processing Pipeline</h2>
          <div className="space-y-3">
            {processingSteps.map((s, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                  i === step ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-xl' : 
                  i < step ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-50' : 
                  'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                <div className="shrink-0">{s.icon}</div>
                <span className="font-semibold text-sm">{s.text}</span>
                {i < step && <CheckCircle className="ml-auto w-5 h-5 text-emerald-500" />}
              </div>
            ))}
          </div>
          <div className="pt-4">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                style={{ width: `${((step + 1) / processingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-[100] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      
      <div className="relative text-center space-y-10 p-6 max-w-2xl">
        <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 shadow-2xl">
          <Shield className="w-20 h-20 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-white tracking-tighter">
            Bid<span className="text-blue-500">Shield</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg mx-auto">
            AI-powered document evaluation + graph-based collusion detection for government procurement.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 pt-4">
          <button
            onClick={handleRunDemo}
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Play className="w-6 h-6 fill-current" /> RUN DEMO WITH SAMPLE TENDER
          </button>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4"/> 1 CPWD Tender</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4"/> 10 Bidders</span>
            <span className="flex items-center gap-2"><Activity className="w-4 h-4"/> Neo4j Graph</span>
          </div>
        </div>
      </div>
    </div>
  );
}
