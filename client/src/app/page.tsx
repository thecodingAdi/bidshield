'use client';

import { useEffect, useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, Users, FileText, 
  Activity, BarChart3, Upload, ChevronDown, ChevronUp, History, Download 
} from 'lucide-react';
import FraudNetworkGraph from '../components/FraudNetworkGraph';
import BenfordChart from '../components/BenfordChart';
import DemoLauncher from '../components/DemoLauncher';
import ManualReviewQueue from '../components/ManualReviewQueue';
import { demoBidders, demoTender, Bidder } from '../lib/demoData';
import { getFullAnalysis } from '../../lib/api';

interface AuditEntry {
  id: string;
  timestamp: string;
  type: 'system' | 'officer';
  action: string;
  details: string;
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [view, setView] = useState<'launch' | 'results'>('launch');
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [showAudit, setShowAudit] = useState(false);

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const res = await getFullAnalysis();
        const initialData = {
          ...res.data,
          tender: { bidders: demoBidders },
          summary: {
            total_bidders: 10,
            eligible: 6,
            ineligible: 3,
            manual_review: 1,
            collusion_flags: 2,
            risk_level: "HIGH"
          }
        };
        setData(initialData);
        
        setAuditLog([
          { id: '1', timestamp: new Date().toLocaleTimeString(), type: 'system', action: 'Data Ingestion', details: 'Extracted 10 bidder submissions for Tender TNDR-2026' },
          { id: '2', timestamp: new Date().toLocaleTimeString(), type: 'system', action: 'Fraud Detection', details: 'Flagged Bidder 2 & 5 for Collusion Risk (Shared Director)' },
          { id: '3', timestamp: new Date().toLocaleTimeString(), type: 'system', action: 'Validation', details: 'Bidder 7 rejected: Turnover ₹3.2cr < threshold ₹5cr' }
        ]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBaseData();
  }, []);

  const handleResolveManualReview = (bidderId: string, resolution: 'eligible' | 'ineligible', value: number) => {
    setData((prev: any) => {
      const updatedBidders = prev.tender.bidders.map((b: Bidder) => {
        if (b.id === bidderId) {
          return { 
            ...b, 
            status: resolution, 
            turnover: value,
            review_reason: undefined,
            flags: resolution === 'ineligible' ? ['Turnover verified as ₹4.8cr (below threshold)'] : []
          };
        }
        return b;
      });

      const eligibleCount = updatedBidders.filter((b: any) => b.status === 'eligible').length;
      const ineligibleCount = updatedBidders.filter((b: any) => b.status === 'ineligible').length;
      const reviewCount = updatedBidders.filter((b: any) => b.status === 'manual_review').length;

      return {
        ...prev,
        tender: { bidders: updatedBidders },
        summary: {
          ...prev.summary,
          eligible: eligibleCount,
          ineligible: ineligibleCount,
          manual_review: reviewCount
        }
      };
    });

    setAuditLog(prev => [
      { 
        id: Math.random().toString(), 
        timestamp: new Date().toLocaleTimeString(), 
        type: 'officer', 
        action: 'Manual Resolution', 
        details: `Officer resolved ${bidderId} as ${resolution.toUpperCase()} (Value interpreted as ₹${(value/10000000).toFixed(1)}cr)` 
      },
      ...prev
    ]);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
      case 'ineligible': return 'bg-rose-100 text-rose-900 border-rose-300 font-semibold';
      case 'manual_review': return 'bg-amber-100 text-amber-900 border-amber-300 font-semibold';
      default: return 'bg-gray-100 text-gray-900 border-gray-300';
    }
  };

  const getRiskBadge = (risk?: number) => {
    if (!risk) return <span className="text-gray-400 text-sm">—</span>;
    if (risk >= 70) return <span className="px-2 py-1 bg-rose-600 text-white rounded text-xs font-bold">RISK {risk}</span>;
    if (risk >= 40) return <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-bold">RISK {risk}</span>;
    return <span className="px-2 py-1 bg-emerald-500 text-white rounded text-xs font-bold">RISK {risk}</span>;
  };

  if (view === 'launch') {
    return <DemoLauncher onStart={() => setView('results')} />;
  }

  if (!data) return null;

  const { tender, summary, detections } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Shield className="w-10 h-10 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">BidShield</h1>
            <p className="text-slate-400 text-sm font-medium">Government Procurement Fraud Detection</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button 
              onClick={() => setView('launch')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              <History className="w-4 h-4" /> Reset Demo
            </button>
            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
              summary.risk_level === 'HIGH' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
            }`}>
              {summary.risk_level} RISK
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Tender Context */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
              <FileText className="w-4 h-4" /> Active Tender
            </div>
            <h2 className="text-2xl font-black text-slate-900">{demoTender.title}</h2>
            <p className="text-slate-500 font-medium">{demoTender.department} • {demoTender.id}</p>
          </div>
          <div className="text-right">
             <div className="text-xs font-bold text-slate-400 uppercase mb-1">Criteria Extracted</div>
             <div className="flex gap-1 justify-end">
               {demoTender.criteria.map(c => (
                 <div key={c.id} className="w-2 h-2 rounded-full bg-blue-500" title={c.name}></div>
               ))}
             </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-4">
          <SummaryCard icon={<Users className="w-5 h-5"/>} label="Total Bidders" value={summary.total_bidders} color="blue" />
          <SummaryCard icon={<CheckCircle className="w-5 h-5"/>} label="Eligible" value={summary.eligible} color="green" />
          <SummaryCard icon={<AlertTriangle className="w-5 h-5"/>} label="Ineligible" value={summary.ineligible} color="red" />
          <SummaryCard icon={<Clock className="w-5 h-5"/>} label="Manual Review" value={summary.manual_review} color="yellow" />
          <SummaryCard icon={<Activity className="w-5 h-5"/>} label="Collusion Flags" value={summary.collusion_flags} color="purple" />
        </div>

        {/* Manual Review Queue */}
        <ManualReviewQueue bidders={tender.bidders} onResolve={handleResolveManualReview} />

        {/* Bidders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-bold text-gray-900">Bidder Evaluation Results</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Company Name</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Turnover</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">OCR Confidence</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Risk Score</th>
                  <th className="px-5 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tender.bidders.map((bidder: Bidder) => (
                  <tr key={bidder.id} className={`${bidder.collusion_risk ? 'bg-rose-50/30' : 'hover:bg-slate-50'} transition-colors`}>
                    <td className="px-5 py-4 font-mono text-xs font-bold text-slate-500">{bidder.id}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{bidder.name}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] border tracking-wider ${getStatusStyle(bidder.status)}`}>
                        {bidder.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700 font-bold">
                      {bidder.turnover ? `₹${(bidder.turnover / 10000000).toFixed(1)}cr` : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              bidder.ocr_confidence > 0.9 ? 'bg-emerald-500' : 
                              bidder.ocr_confidence > 0.7 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${bidder.ocr_confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-500">{(bidder.ocr_confidence * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">{getRiskBadge(bidder.collusion_risk)}</td>
                    <td className="px-5 py-4 text-[11px] text-slate-600 font-medium max-w-xs leading-tight">
                      {bidder.rejection_reason || bidder.review_reason || bidder.flags?.join(', ') || <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fraud Network */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[600px] flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Fraud Network Visualization</h2>
              </div>
              <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                Neo4j Graph
              </div>
            </div>
            <div className="flex-1 bg-white relative">
              <FraudNetworkGraph />
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <LegendItem color="bg-[#3b82f6]" label="Bidder" />
              <LegendItem color="bg-[#ef4444]" label="Director" rounded="rounded-full" />
              <LegendItem color="bg-[#10b981]" label="Address" />
              <LegendItem color="bg-[#f59e0b]" label="Bank" />
              <LegendItem color="bg-[#8b5cf6]" label="Phone" />
            </div>
          </div>

          {/* Benford's Law */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Benford's Law Analysis</h2>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                Statistical Deviations
              </div>
            </div>
            <div className="p-6 flex-1">
              <BenfordChart data={detections.benfords_law} />
              <div className="mt-6 flex items-start gap-3 text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <p className="leading-relaxed">
                  <strong>Why this matters?</strong> Humans are poor at generating truly random numbers. Significant deviations in the first-digit distribution (Benford's Law) provide strong mathematical evidence of artificial bid pricing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Trail Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <button 
            onClick={() => setShowAudit(!showAudit)}
            className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <History className="w-5 h-5" />
              <h2 className="text-lg font-bold">System & Officer Audit Trail</h2>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-black">{auditLog.length} ENTRIES</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); alert("PDF generated with SHA-256: 8f92b...c3a1"); }}
                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export Signed Report
              </button>
              {showAudit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>
          
          {showAudit && (
            <div className="border-t border-slate-100 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Timestamp</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Origin</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Action</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Detailed Log</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLog.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">{entry.timestamp}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                          entry.type === 'system' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
                        }`}>
                          {entry.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">{entry.action}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium">{entry.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function LegendItem({ color, label, rounded = 'rounded-md' }: { color: string, label: string, rounded?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 ${color} ${rounded} border border-white shadow-sm`}></div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-800 border-blue-100',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    red: 'bg-rose-50 text-rose-800 border-rose-100',
    yellow: 'bg-amber-50 text-amber-800 border-amber-100',
    purple: 'bg-purple-50 text-purple-800 border-purple-100',
  };

  return (
    <div className={`p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-3 opacity-70">
        <div className="p-1.5 bg-white/50 rounded-lg">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-4xl font-black tracking-tight">{value}</div>
    </div>
  );
}