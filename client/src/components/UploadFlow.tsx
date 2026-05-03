'use client';

import { useState, useEffect } from 'react';
import { FileText, Upload, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

type FlowState = 'idle' | 'uploading_tender' | 'uploading_bidders' | 'processing' | 'complete';

interface UploadFlowProps {
  onComplete: () => void;
}

const processingSteps = [
  "Running OCR extraction...",
  "Extracting criteria via LLM...",
  "Building vendor graph...",
  "Running statistical analysis...",
  "Calculating collusion risk scores..."
];

export default function UploadFlow({ onComplete }: UploadFlowProps) {
  const [state, setState] = useState<FlowState>('idle');
  const [tenderFile, setTenderFile] = useState<File | null>(null);
  const [bidderFiles, setBidderFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (state === 'uploading_tender') {
      const timer = setTimeout(() => setState('uploading_bidders'), 800);
      return () => clearTimeout(timer);
    }
    
    if (state === 'uploading_bidders') {
      let count = 0;
      const total = bidderFiles?.length || 10;
      const interval = setInterval(() => {
        count++;
        setProgress((count / total) * 100);
        if (count >= total) {
          clearInterval(interval);
          setTimeout(() => {
            setState('processing');
            setProgress(0);
          }, 500);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    if (state === 'processing') {
      const interval = setInterval(() => {
        setCurrentStepIndex(prev => (prev + 1) % processingSteps.length);
      }, 800);
      
      const timer = setTimeout(() => {
        clearInterval(interval);
        setState('complete');
      }, 4000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }

    if (state === 'complete') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, bidderFiles, onComplete]);

  const startEvaluation = () => {
    if (tenderFile && bidderFiles) {
      setState('uploading_tender');
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-8">
      {state === 'idle' && (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Start New Analysis</h1>
            <p className="text-slate-500">Upload tender documents and bidder submissions to detect fraud risk.</p>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-2 bg-slate-50/50">
            {/* Step 1: Tender */}
            <label className={`block p-8 cursor-pointer rounded-xl transition-all ${
              tenderFile ? 'bg-emerald-50 border-emerald-100' : 'hover:bg-white hover:shadow-md'
            }`}>
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => setTenderFile(e.target.files?.[0] || null)} 
              />
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-xl ${tenderFile ? 'bg-emerald-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                  <FileText className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">Step 1: Upload Tender Document</h3>
                  <p className="text-sm text-slate-500">
                    {tenderFile ? tenderFile.name : 'Click to select tender PDF or DOCX'}
                  </p>
                </div>
                {tenderFile && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              </div>
            </label>

            <div className="h-px bg-slate-200 mx-8 my-2"></div>

            {/* Step 2: Bidders */}
            <label className={`block p-8 cursor-pointer rounded-xl transition-all ${
              bidderFiles ? 'bg-emerald-50 border-emerald-100' : 'hover:bg-white hover:shadow-md'
            }`}>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={(e) => setBidderFiles(e.target.files)} 
              />
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-xl ${bidderFiles ? 'bg-emerald-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                  <Upload className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">Step 2: Upload Bidder Submissions</h3>
                  <p className="text-sm text-slate-500">
                    {bidderFiles ? `${bidderFiles.length} files selected` : 'Select one or more bidder PDFs'}
                  </p>
                </div>
                {bidderFiles && <CheckCircle className="w-6 h-6 text-emerald-500" />}
              </div>
            </label>
          </div>

          <button
            onClick={startEvaluation}
            disabled={!tenderFile || !bidderFiles}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              tenderFile && bidderFiles 
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Start Evaluation <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {(state !== 'idle' && state !== 'complete') && (
        <div className="text-center space-y-8 py-12">
          <div className="relative inline-flex">
            {state === 'processing' ? (
              <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600 animate-bounce" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">
              {state === 'uploading_tender' && 'Uploading tender document...'}
              {state === 'uploading_bidders' && `Uploading bidders (${Math.round(progress / 10)}/10)...`}
              {state === 'processing' && 'Analyzing data...'}
            </h2>
            <div className="h-2 w-64 mx-auto bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${state === 'uploading_tender' ? 100 : state === 'uploading_bidders' ? progress : 100}%` }}
              />
            </div>
            <p className="text-slate-500 min-h-[1.5rem] animate-pulse">
              {state === 'processing' ? processingSteps[currentStepIndex] : 'Please wait...'}
            </p>
          </div>
        </div>
      )}

      {state === 'complete' && (
        <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center scale-110 shadow-emerald-100 shadow-2xl">
            <CheckCircle className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Analysis Complete</h2>
            <p className="text-slate-500 font-medium">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
