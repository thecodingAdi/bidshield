'use client';

import { CheckCircle, XCircle, AlertCircle, FileText, Info } from 'lucide-react';
import { Bidder } from '../lib/demoData';

interface ManualReviewQueueProps {
  bidders: Bidder[];
  onResolve: (bidderId: string, resolution: 'eligible' | 'ineligible', value: number) => void;
}

export default function ManualReviewQueue({ bidders, onResolve }: ManualReviewQueueProps) {
  const reviewCases = bidders.filter(b => b.status === 'manual_review');

  if (reviewCases.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-amber-100/50 p-4 border-b border-amber-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-white rounded-lg">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-amber-900">Manual Review Queue</h2>
            <p className="text-sm text-amber-700 font-medium">System flagged {reviewCases.length} ambiguous case(s) requiring officer sign-off</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-amber-200">
        {reviewCases.map((bidder) => {
          const doc = bidder.documents.find(d => d.type === 'TURNOVER_CERT');
          return (
            <div key={bidder.id} className="p-6">
              <div className="grid grid-cols-[1fr_auto] gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-md font-bold text-xs">{bidder.id}</span>
                    <h3 className="text-xl font-bold text-slate-900">{bidder.name}</h3>
                  </div>

                  <div className="bg-white border border-amber-200 rounded-xl p-5 space-y-4 shadow-inner">
                    <div className="flex items-center gap-3 text-slate-600 mb-2">
                      <FileText className="w-5 h-5" />
                      <span className="font-bold text-sm uppercase tracking-wider">{doc?.filename}</span>
                    </div>
                    
                    <div className="relative p-4 bg-amber-50/50 border-l-4 border-amber-400 rounded-r-lg">
                      <p className="text-lg font-medium text-slate-800 italic">
                        "{doc?.extractedText}"
                      </p>
                      <div className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">
                        Confidence: {(bidder.ocr_confidence * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold">
                      <Info className="w-4 h-4" />
                      <span>Officer decision required to interpret the figure against Rs 5cr threshold.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center min-w-[280px]">
                  <button
                    onClick={() => onResolve(bidder.id, 'ineligible', 48000000)}
                    className="group w-full p-4 bg-white hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-400 rounded-xl transition-all flex items-center justify-between text-left shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-rose-500">Option A</div>
                      <div className="font-bold text-slate-900 leading-tight">Interpret as ₹4.8cr</div>
                      <div className="text-sm font-bold text-rose-600 mt-0.5">→ INELIGIBLE</div>
                    </div>
                    <XCircle className="w-6 h-6 text-slate-300 group-hover:text-rose-500" />
                  </button>

                  <button
                    onClick={() => onResolve(bidder.id, 'eligible', 84000000)}
                    className="group w-full p-4 bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-400 rounded-xl transition-all flex items-center justify-between text-left shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-emerald-500">Option B</div>
                      <div className="font-bold text-slate-900 leading-tight">Interpret as ₹8.4cr</div>
                      <div className="text-sm font-bold text-emerald-600 mt-0.5">→ ELIGIBLE</div>
                    </div>
                    <CheckCircle className="w-6 h-6 text-slate-300 group-hover:text-emerald-500" />
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
