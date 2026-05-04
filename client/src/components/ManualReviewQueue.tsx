'use client';

import { AlertCircle, FileText, Info, Check, X } from 'lucide-react';
import { Bidder } from '../lib/demoData';

interface ManualReviewQueueProps {
  bidders: Bidder[];
  onResolve: (bidderId: string, resolution: 'eligible' | 'ineligible', value: number) => void;
}

export default function ManualReviewQueue({ bidders, onResolve }: ManualReviewQueueProps) {
  const reviewCases = bidders.filter(b => b.status === 'manual_review');

  if (reviewCases.length === 0) return null;

  return (
    <div className="bg-white border border-[#d1d5db] border-l-[3px] border-l-[#b8860b] shadow-sm mb-8 animate-in fade-in duration-500">
      <div className="bg-[#faf9f6] p-4 border-b border-[#d1d5db] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#92400e]" />
          <div>
            <h2 className="text-[13px] font-black text-[#1a3a5c] uppercase tracking-wider">Attention Required — Manual Evaluation Queue</h2>
            <p className="text-[11px] text-[#4b5563] font-bold uppercase tracking-widest mt-0.5">
              System flagged {reviewCases.length} ambiguous case(s) requiring officer authorization
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#d1d5db]">
        {reviewCases.map((bidder) => {
          const doc = bidder.documents.find(d => d.type === 'TURNOVER_CERT');
          return (
            <div key={bidder.id} className="p-8">
              <div className="grid grid-cols-[1fr_auto] gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="bg-[#1a3a5c] text-white px-3 py-1 font-bold text-[11px] tracking-widest uppercase">{bidder.id}</span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{bidder.name}</h3>
                  </div>

                  <div className="border border-[#d1d5db] p-6 space-y-4">
                    <div className="flex items-center gap-2 text-[#4b5563] mb-4">
                      <FileText className="w-4 h-4" />
                      <span className="font-black text-[10px] uppercase tracking-[0.2em]">{doc?.filename}</span>
                    </div>
                    
                    <div className="relative p-5 bg-[#faf9f6] border border-[#d1d5db]">
                      <p className="text-base font-medium text-slate-800 leading-relaxed italic">
                        "{doc?.extractedText}"
                      </p>
                      <div className="absolute top-0 right-0 bg-[#8b0000] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest">
                        OCR Confidence: {(bidder.ocr_confidence * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#4b5563] text-xs font-bold leading-relaxed">
                      <Info className="w-4 h-4 text-[#1a3a5c] shrink-0 mt-0.5" />
                      <span>Officer must authorize interpretation of the financial figure against the mandatory ₹5cr threshold.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 justify-center min-w-[320px]">
                  <button
                    onClick={() => onResolve(bidder.id, 'ineligible', 48000000)}
                    className="group w-full p-5 border border-[#d1d5db] hover:border-[#8b0000] transition-colors text-left bg-white"
                  >
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Option 01</div>
                    <div className="font-bold text-slate-900">Interpret as ₹4.80 Crore</div>
                    <div className="text-[11px] font-black text-[#8b0000] mt-1 uppercase tracking-widest">→ INELIGIBLE</div>
                  </button>

                  <button
                    onClick={() => onResolve(bidder.id, 'eligible', 84000000)}
                    className="group w-full p-5 bg-[#1a3a5c] hover:bg-[#0f2440] transition-colors text-left text-white"
                  >
                    <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">Option 02</div>
                    <div className="font-bold">Interpret as ₹8.40 Crore</div>
                    <div className="text-[11px] font-black text-[#1e5631] bg-white px-2 py-0.5 inline-block mt-2 uppercase tracking-widest">→ ELIGIBLE</div>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
