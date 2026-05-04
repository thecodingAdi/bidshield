'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, Users, FileText, 
  Activity, BarChart3, ChevronDown, ChevronUp, History, Download, 
  Lock, Unlock, AlertCircle, Terminal, Search, ChevronRight
} from 'lucide-react';
import FraudNetworkGraph from '../components/FraudNetworkGraph';
import BenfordChart from '../components/BenfordChart';
import DemoLauncher from '../components/DemoLauncher';
import ManualReviewQueue from '../components/ManualReviewQueue';
import CriteriaApproval from '../components/CriteriaApproval';
import { demoBidders, demoTender, Bidder } from '../lib/demoData';
import { getFullAnalysis } from '../../lib/api';
import { AuditLog, AuditEntry } from '../lib/audit';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [view, setView] = useState<'launch' | 'approval' | 'results'>('launch');
  const [showAudit, setShowAudit] = useState(false);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [isIntegrityValid, setIsIntegrityValid] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const auditLog = useRef(new AuditLog());

  useEffect(() => {
    setMounted(true);
  }, []);

  const addLog = async (actor: "SYSTEM" | "OFFICER", action: any, details: string, bidderId?: string) => {
    await auditLog.current.addEntry({ actor, action, details, bidderId });
    setAuditEntries(auditLog.current.getEntries());
    setIsIntegrityValid(await auditLog.current.verifyIntegrity());
  };

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const res = await getFullAnalysis();
        setData({
          ...res.data,
          tender: { bidders: demoBidders }
        });
      } catch (e) { console.error(e); }
    };
    fetchBaseData();
  }, []);

  const handleStartDemo = async () => {
    setView('approval');
    await addLog("SYSTEM", "EVALUATION", `Initiated demo evaluation for Tender ${demoTender.id}`);
  };

  const handleApproveRegistry = async () => {
    setView('results');
    await addLog("OFFICER", "CRITERIA_REGISTRY_APPROVAL", `Officer authorized evaluation registry (${demoTender.criteria.length} criteria)`);
    
    for (const bidder of demoBidders) {
        if (bidder.status === 'ineligible') {
            await addLog("SYSTEM", "EVALUATION", `Bidder Ineligible: ${bidder.rejection_reason}`, bidder.id);
        } else if (bidder.status === 'manual_review') {
            await addLog("SYSTEM", "EVALUATION", `Flagged for manual review: ${bidder.review_reason}`, bidder.id);
        } else {
            await addLog("SYSTEM", "EVALUATION", `Bidder Eligible (Turnover verified: ₹${((bidder.turnover || 0)/10000000).toFixed(1)}cr)`, bidder.id);
        }
    }
    
    await addLog("SYSTEM", "FRAUD_DETECTION", "Relationship alert: Director Rajesh Kumar linked to Bidders 2, 5");
    await addLog("SYSTEM", "FRAUD_DETECTION", "Collusion risk score calculated as 79 for Bidders 2, 5");
  };

  const handleResolveManualReview = async (bidderId: string, resolution: 'eligible' | 'ineligible', value: number) => {
    setData((prev: any) => {
      const updatedBidders = prev.tender.bidders.map((b: Bidder) => {
        if (b.id === bidderId) {
          return { ...b, status: resolution, turnover: value, review_reason: undefined };
        }
        return b;
      });
      return { ...prev, tender: { bidders: updatedBidders } };
    });

    await addLog("OFFICER", "MANUAL_REVIEW", `Officer authorized ${bidderId} as ${resolution.toUpperCase()} (Value: ₹${(value/10000000).toFixed(1)}cr)`, bidderId);
  };

  const handleExportPDF = async () => {
    await auditLog.current.exportToPDF(demoTender.id);
  };

  const handleTamperTest = async () => {
    auditLog.current.tamper(2, "SYSTEM OVERRIDE: Modified eligibility status (ILLEGAL)");
    setAuditEntries(auditLog.current.getEntries());
    setIsIntegrityValid(await auditLog.current.verifyIntegrity());
  };

  const handleReset = () => {
    auditLog.current = new AuditLog();
    setAuditEntries([]);
    setIsIntegrityValid(true);
    setView('launch');
  };

  if (view === 'launch') return <DemoLauncher onStart={handleStartDemo} />;
  
  if (!data) return null;

  const { tender, detections } = data;
  const bidders = tender.bidders;
  const eligible = bidders.filter((b: any) => b.status === 'eligible').length;
  const ineligible = bidders.filter((b: any) => b.status === 'ineligible').length;
  const manual = bidders.filter((b: any) => b.status === 'manual_review').length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6]" suppressHydrationWarning>
      {view === 'approval' && <CriteriaApproval onApprove={handleApproveRegistry} />}

      {/* Header */}
      <header className="bg-[#1a3a5c] text-white h-16 flex items-center px-6 sticky top-0 z-50" suppressHydrationWarning>
        <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-6 h-10">
          <div className="text-[10px] leading-tight font-black uppercase tracking-tighter">
            भारत सरकार <br /> GOVT OF INDIA
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#b8860b]" />
          <h1 className="text-base font-medium tracking-tight">BidShield — Procurement Integrity System</h1>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-white/70">
            <Users className="w-4 h-4" /> Officer: Ansh Adit
          </div>
          <button 
            onClick={handleReset}
            className="text-[11px] font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 hover:bg-white/20 transition-all"
          >
            Reset
          </button>
        </div>
      </header>
      
      {/* Gold Separator */}
      <div className="h-[2px] bg-[#b8860b]"></div>
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#f3f4f6] px-6 py-2 border-b border-[#d1d5db] flex items-center gap-2 text-[11px] font-bold text-[#4b5563] uppercase tracking-widest">
        Home <ChevronRight className="w-3 h-3" /> Tenders <ChevronRight className="w-3 h-3" /> {demoTender.id} <ChevronRight className="w-3 h-3 text-[#1a3a5c]" /> Evaluation Matrix
      </div>

      <main className="max-w-7xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
        
        {/* Official Status Bar */}
        <div className="bg-white border border-[#d1d5db] flex flex-col md:flex-row shadow-sm">
          <div className="p-5 border-r border-[#d1d5db] flex-1">
            <div className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest mb-1">Active Tender File</div>
            <div className="text-xl font-bold text-[#1a3a5c]">{demoTender.title}</div>
            <div className="text-xs font-bold text-[#4b5563] mt-1">{demoTender.id} | {demoTender.department}</div>
          </div>
          <div className="flex bg-[#f9fafb]">
            <div className="px-8 py-5 flex flex-col items-center justify-center border-r border-[#d1d5db]">
               <div className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest mb-2">Eligible</div>
               <div className="text-2xl font-black text-[#1e5631]">{eligible}</div>
            </div>
            <div className="px-8 py-5 flex flex-col items-center justify-center border-r border-[#d1d5db]">
               <div className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest mb-2">Ineligible</div>
               <div className="text-2xl font-black text-[#8b0000]">{ineligible}</div>
            </div>
            <div className="px-8 py-5 flex flex-col items-center justify-center border-r border-[#d1d5db]">
               <div className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest mb-2">Review</div>
               <div className="text-2xl font-black text-[#92400e]">{manual}</div>
            </div>
            <div className="px-8 py-5 flex flex-col items-center justify-center border-l-[3px] border-l-[#b8860b]">
               <div className="text-[10px] font-black text-[#6b7280] uppercase tracking-widest mb-2">Flags</div>
               <div className="text-2xl font-black text-[#1a3a5c]">2</div>
            </div>
          </div>
        </div>

        <ManualReviewQueue bidders={bidders} onResolve={handleResolveManualReview} />

        {/* Bidder Matrix Table */}
        <div className="bg-white border border-[#d1d5db] shadow-sm overflow-hidden">
          <div className="bg-[#f3f4f6] px-5 py-4 border-b border-[#d1d5db] flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Bidder Eligibility Matrix
            </h2>
            <div className="text-[10px] font-black text-[#4b5563] uppercase tracking-widest">
              Officer Authorized: {mounted ? new Date().toLocaleDateString() : '—'}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-[#d1d5db]">
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">ID</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">Bidder Entity</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">Evaluation Status</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">Turnover (₹)</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">OCR Conf.</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">Risk Index</th>
                  <th className="px-5 py-3 text-[11px] font-black text-[#6b7280] uppercase tracking-widest">Decision Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bidders.map((bidder: Bidder, idx: number) => (
                  <tr key={bidder.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#faf9f6]'} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-5 py-4 font-mono text-[11px] font-bold text-[#6b7280]">{bidder.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-900 text-sm">{bidder.name}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${
                        bidder.status === 'eligible' ? 'bg-[#1e5631] text-white' : 
                        bidder.status === 'ineligible' ? 'bg-[#8b0000] text-white' : 'bg-[#92400e] text-white'
                      }`}>
                        {bidder.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] font-bold text-[#1a3a5c]">
                      {bidder.turnover ? `₹${(bidder.turnover / 10000000).toFixed(2)}cr` : '—'}
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] font-bold text-slate-500">
                        {(bidder.ocr_confidence * 100).toFixed(0)}%
                    </td>
                    <td className="px-5 py-4">
                        {(bidder.collusion_risk || 0) >= 40 ? (
                           <span className="bg-[#8b0000] text-white px-2 py-0.5 text-[9px] font-black uppercase">RISK {bidder.collusion_risk}</span>
                        ) : '—'}
                    </td>
                    <td className="px-5 py-4 text-[11px] text-slate-500 font-medium leading-relaxed italic">
                      {bidder.rejection_reason || bidder.review_reason || bidder.flags?.join(', ') || 'System authorized'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evaluation Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#d1d5db] shadow-sm h-[500px] flex flex-col">
            <div className="bg-[#f3f4f6] px-5 py-3 border-b border-[#d1d5db] flex items-center justify-between">
               <h3 className="text-[13px] font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-2">
                 <Activity className="w-4 h-4" /> Relationship Network Graph
               </h3>
            </div>
            <div className="flex-1 bg-white">
              <FraudNetworkGraph />
            </div>
          </div>

          <div className="bg-white border border-[#d1d5db] shadow-sm flex flex-col">
            <div className="bg-[#f3f4f6] px-5 py-3 border-b border-[#d1d5db] flex items-center justify-between">
               <h3 className="text-[13px] font-bold text-[#1a3a5c] uppercase tracking-wider flex items-center gap-2">
                 <BarChart3 className="w-4 h-4" /> Statistical Distribution (Benford)
               </h3>
            </div>
            <div className="p-8 flex-1">
              <BenfordChart data={detections.benfords_law} />
            </div>
          </div>
        </div>

        {/* Compliance Audit Section */}
        <div className={`bg-white border border-[#d1d5db] shadow-md transition-all duration-300 ${!isIntegrityValid ? 'border-l-[4px] border-l-[#8b0000]' : ''}`}>
          <div className="p-5 flex items-center justify-between bg-[#f3f4f6] border-b border-[#d1d5db]">
            <div className="flex items-center gap-4">
              <div className={`p-2 ${!isIntegrityValid ? 'bg-[#8b0000] text-white' : 'bg-[#1a3a5c] text-white'}`}>
                {isIntegrityValid ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-[13px] font-black text-[#1a3a5c] uppercase tracking-wider">Audit Trail & Compliance Registry</h2>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                    isIntegrityValid ? 'text-[#1e5631]' : 'text-[#8b0000]'
                  }`}>
                    {isIntegrityValid ? '✓ Integrity Verified' : '✗ Security Breach Detected'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">| {auditEntries.length} Operations Hashed</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2 bg-[#1a3a5c] hover:bg-[#0f2440] text-white text-[11px] font-black uppercase tracking-widest transition-all"
              >
                Download Signed Audit Log
              </button>
              <button onClick={() => setShowAudit(!showAudit)} className="text-slate-400">
                {showAudit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {showAudit && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#faf9f6] border-b border-[#d1d5db]">
                    <th className="px-6 py-2 text-[9px] font-black text-[#6b7280] uppercase tracking-widest">Entry ID</th>
                    <th className="px-6 py-2 text-[9px] font-black text-[#6b7280] uppercase tracking-widest">Actor</th>
                    <th className="px-6 py-2 text-[9px] font-black text-[#6b7280] uppercase tracking-widest">Action</th>
                    <th className="px-6 py-2 text-[9px] font-black text-[#6b7280] uppercase tracking-widest">Description</th>
                    <th className="px-6 py-2 text-[9px] font-black text-[#6b7280] uppercase tracking-widest">Chain Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[10px]">
                  {auditEntries.slice().reverse().map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-bold text-slate-400">{entry.id.padStart(4, '0')}</td>
                      <td className="px-6 py-3 font-bold text-[#1a3a5c]">{entry.actor}</td>
                      <td className="px-6 py-3 font-bold text-slate-700">{entry.action}</td>
                      <td className="px-6 py-3 text-slate-500 uppercase">{entry.details}</td>
                      <td className="px-6 py-3 text-slate-400">{entry.currentHash.substring(0, 16)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8 border-t border-gray-200">
           <button 
             onClick={handleTamperTest}
             className="text-[9px] font-black text-[#d1d5db] hover:text-[#8b0000] uppercase tracking-[0.3em] transition-colors"
           >
             Trigger System Integrity Test (Tamper Simulation)
           </button>
        </div>
      </main>
    </div>
  );
}