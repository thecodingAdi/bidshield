'use client';

import { CheckCircle, Shield, FileText, Info } from 'lucide-react';
import { Bidder, demoTender } from '@/lib/demoData';

interface CriteriaApprovalProps {
  onApprove: () => void;
}

export default function CriteriaApproval({ onApprove }: CriteriaApprovalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[110] p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Criteria Registry Approval</h2>
              <p className="text-slate-400 text-sm">Verify and authorize evaluation rules for Tender {demoTender.id}</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-800 text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <p className="font-medium leading-relaxed">
              Before evaluation begins, an officer must approve the extracted criteria registry. 
              This ensures the system evaluates against authorized rules only.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Extracted Mandatory Rules</h3>
            <div className="grid gap-3">
              {demoTender.criteria.filter(c => c.type === 'mandatory').map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-slate-900">{c.threshold ? `> ${c.threshold / 10000000}cr` : 'YES'}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{c.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onApprove}
            className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            APPROVE REGISTRY & RUN EVALUATION <CheckCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
