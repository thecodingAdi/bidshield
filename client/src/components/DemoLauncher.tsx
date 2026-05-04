'use client';

import { useState, useEffect, useRef } from 'react';
import { Shield, FileText, Network, Lock, CheckCircle, ArrowDown, Users, Activity, Play } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const processingSteps = [
  { label: "Document Ingestion" },
  { label: "Criteria Extraction" },
  { label: "Eligibility Evaluation" },
  { label: "Fraud Detection" }
];

export default function LandingPage({ onStart }: LandingPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const launchCardRef = useRef<HTMLDivElement>(null);

  const scrollToLaunch = () => {
    launchCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isProcessing, onStart]);

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-[#faf9f6] flex items-center justify-center p-6 z-[200]">
        <div className="bg-white border border-[#d1d5db] w-full max-w-[640px] shadow-sm">
          <div className="p-8 pb-4 text-center">
            <div className="text-[#1a3a5c] font-bold text-xs uppercase tracking-[0.2em] mb-1">
              भारत सरकार | GOVERNMENT OF INDIA
            </div>
            <div className="h-[1px] bg-[#b8860b] w-24 mx-auto mb-6"></div>
            <h1 className="text-[28px] font-semibold text-[#1a3a5c] mb-1 tracking-tight">BidShield</h1>
            <div className="py-12 px-4">
              <div className="flex items-center justify-between relative mb-12 max-w-sm mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>
                {processingSteps.map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center border-2 transition-all duration-500 ${
                      i < step ? 'bg-[#1e5631] border-[#1e5631] text-white' : 
                      i === step ? 'bg-white border-[#1a3a5c] text-[#1a3a5c]' : 
                      'bg-white border-gray-200 text-gray-300'
                    }`}>
                      {i < step ? <CheckCircle className="w-5 h-5" /> : 
                       i === step ? <div className="w-3 h-3 bg-[#1a3a5c]"></div> : 
                       <div className="w-2 h-2 bg-gray-200"></div>}
                    </div>
                    <div className={`absolute top-12 whitespace-nowrap text-[9px] font-black uppercase tracking-tighter ${
                      i <= step ? 'text-[#1a3a5c]' : 'text-gray-400'
                    }`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#1a3a5c] font-black text-xs uppercase tracking-[0.2em] mt-12 animate-pulse">
                System evaluating bids against mandatory criteria...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6]" suppressHydrationWarning>
      {/* Section 1: Hero */}
      <section className="min-h-screen bg-gradient-to-br from-[#0f2440] via-[#1a3a5c] to-[#0f2440] relative overflow-hidden flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 py-2 px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="text-[#b8860b] font-black tracking-[0.2em] text-[10px] uppercase">भारत सरकार | GOVERNMENT OF INDIA</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-7xl font-black text-white leading-[0.95] tracking-tighter">
                  Bid<span className="text-[#b8860b]">Shield</span>
                </h1>
                <p className="text-3xl text-blue-100 font-light leading-snug">
                  The First System That Reads Documents <br />
                  <span className="text-[#b8860b] font-bold italic tracking-wide">AND</span> Sees Collusion
                </p>
              </div>

              <div className="flex flex-wrap gap-8 py-6 border-y border-white/10">
                <div className="flex items-center gap-3 text-blue-200">
                  <FileText className="w-5 h-5 text-[#b8860b]" />
                  <span className="text-xs font-black uppercase tracking-widest">Document AI</span>
                </div>
                <div className="flex items-center gap-3 text-blue-200">
                  <Network className="w-5 h-5 text-[#b8860b]" />
                  <span className="text-xs font-black uppercase tracking-widest">Graph Detection</span>
                </div>
                <div className="flex items-center gap-3 text-blue-200">
                  <Lock className="w-5 h-5 text-[#b8860b]" />
                  <span className="text-xs font-black uppercase tracking-widest">Immutable Audit</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={scrollToLaunch}
                  className="bg-[#b8860b] hover:bg-[#9a7209] text-white px-10 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all shadow-2xl hover:scale-105"
                >
                  ▶ Watch Demo
                </button>
                <button 
                  onClick={scrollToLaunch}
                  className="border border-blue-400/50 text-blue-300 hover:bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all"
                >
                  View Dashboard
                </button>
              </div>
            </div>

            {/* Right: Preview Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-sm blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8">
                <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
                  {/* Mock Graph Animation */}
                  <div className="relative">
                    {/* Rajesh Kumar Node */}
                    <div className="w-12 h-12 bg-[#8b0000] rounded-full flex items-center justify-center z-10 relative">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    {/* Connecting Lines */}
                    <div className="absolute top-1/2 left-1/2 w-32 h-[2px] bg-blue-500 origin-left rotate-45 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-[2px] bg-blue-500 origin-left -rotate-45 animate-pulse delay-1000"></div>
                    {/* Bidder Nodes */}
                    <div className="absolute -right-32 -top-24 w-10 h-10 bg-[#1a3a5c] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -right-32 -bottom-24 w-10 h-10 bg-[#1a3a5c] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Relationship Preview</div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping delay-75"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          onClick={scrollToLaunch}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-400 flex flex-col items-center gap-2 cursor-pointer transition-all hover:text-white"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to Launch</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Section 2: The Problem */}
      <section className="py-32 bg-[#faf9f6] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#1a3a5c] tracking-tight">Government Procurement is Broken</h2>
            <div className="h-1 w-20 bg-[#b8860b] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 border-l-[6px] border-[#8b0000] text-left shadow-sm">
              <h3 className="font-black text-xl text-[#1a3a5c] mb-4 uppercase tracking-tight">Manual Inconsistency</h3>
              <p className="text-[#4b5563] leading-relaxed">
                Committees review 500+ pages per tender. Different officers reach conflicting conclusions. 
                Scanned certificates are misread. Bidders are rejected without documented reason, leading to litigation.
              </p>
            </div>
            <div className="bg-white p-10 border-l-[6px] border-[#8b0000] text-left shadow-sm">
              <h3 className="font-black text-xl text-[#1a3a5c] mb-4 uppercase tracking-tight">Invisible Collusion</h3>
              <p className="text-[#4b5563] leading-relaxed">
                Front groups register multiple companies with valid GSTs and audits. Each submission passes individual checks. 
                The fraud lives in the hidden connections — existing systems catch it years too late.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-24">
            <h2 className="text-4xl font-black text-[#1a3a5c] tracking-tight">Technical Architecture</h2>
            <p className="text-[#6b7280] font-bold uppercase tracking-widest text-sm italic">Engineered for Transparency</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Pillar 1 */}
            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 bg-[#1a3a5c] text-white flex items-center justify-center mx-auto text-3xl font-black transition-transform group-hover:scale-110">1</div>
              <h3 className="font-black text-[#1a3a5c] text-lg uppercase tracking-wider">Document Evaluation</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                OCR extracts data from PDFs and scanned images. LLM normalizes criteria against tender rules. 
                Generates a three-state verdict: Eligible / Ineligible / Manual Review.
              </p>
            </div>
            {/* Pillar 2 */}
            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 bg-[#1a3a5c] text-white flex items-center justify-center mx-auto text-3xl font-black transition-transform group-hover:scale-110">2</div>
              <h3 className="font-black text-[#1a3a5c] text-lg uppercase tracking-wider">Relationship Analysis</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                Builds complex vendor graphs from directors, addresses, phones, and bank accounts. 
                Detects star graphs, cliques, and bid clustering in real-time.
              </p>
            </div>
            {/* Pillar 3 */}
            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 bg-[#1a3a5c] text-white flex items-center justify-center mx-auto text-3xl font-black transition-transform group-hover:scale-110">3</div>
              <h3 className="font-black text-[#1a3a5c] text-lg uppercase tracking-wider">Immutable Audit</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                Every action and decision is hash-chained. Officer approvals are cryptographically logged. 
                Tamper-evident design prevents post-hoc manipulation of evaluation results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Launch Card */}
      <section ref={launchCardRef} className="py-32 bg-[#faf9f6]">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white border border-[#d1d5db] shadow-xl">
            <div className="p-10 text-center">
              <div className="text-[#1a3a5c] font-bold text-xs uppercase tracking-[0.2em] mb-1">
                भारत सरकार | GOVERNMENT OF INDIA
              </div>
              <div className="h-[1px] bg-[#b8860b] w-24 mx-auto mb-8"></div>
              
              <h1 className="text-4xl font-black text-[#1a3a5c] mb-2 tracking-tighter">Initiate Evaluation</h1>
              <p className="text-[#4b5563] text-sm font-bold uppercase tracking-widest mb-8">
                Tender ID: TNDR-2026-CPWD-7842
              </p>
              
              <div className="space-y-6 mb-10 text-left">
                <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900 font-medium leading-relaxed">
                    Evaluates **10 bidder submissions** against mandatory financial and compliance criteria.
                  </p>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-100">
                  <Activity className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    Identifies **hidden relationships** and potential bid-rigging patterns in the vendor network.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleRunDemo}
                className="w-full bg-[#1a3a5c] text-white py-5 font-black text-sm uppercase tracking-[0.3em] hover:bg-[#0f2440] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" /> Run Live Evaluation
              </button>
              
              <p className="text-[#6b7280] text-[10px] mt-8 font-black uppercase tracking-widest">
                System will process 10 PDF submissions + Neo4j Graph Data
              </p>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-[#f9fafb] text-center">
              <p className="text-[#6b7280] text-[10px] font-bold uppercase tracking-[0.15em]">
                Authorized for Hackathon Demo Purposes Only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2440] text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-[#b8860b]" />
            <span className="text-lg font-black tracking-tight uppercase">BidShield</span>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
            Ministry of Housing and Urban Affairs | Central Public Works Department
          </div>
          <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest pt-4">
            BidShield v1.0 | Built for Strategic Procurement Integrity
          </div>
        </div>
      </footer>
    </div>
  );
}
