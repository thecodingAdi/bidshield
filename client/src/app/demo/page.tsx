"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  FileText, 
  Network, 
  LayoutDashboard,
  Settings,
  LogOut,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize,
  Building2,
  User,
  MapPin,
  Link2,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Activity,
  BarChart3,
  X
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line
} from "recharts"

// --- HARDCODED DATA ---

const evaluationResults = [
  { id: "BID-001", bidder: "Beta Infra Group", status: "Ineligible", score: 45, reason: "Shared address detected" },
  { id: "BID-002", bidder: "Epsilon Corp", status: "Ineligible", score: 52, reason: "Common directors found" },
  { id: "BID-003", bidder: "Omega Builders", status: "Manual Review", score: 72, reason: "Financial capacity anomaly" },
  { id: "BID-004", bidder: "Delta Systems", status: "Eligible", score: 94, reason: "All criteria met" },
  { id: "BID-005", bidder: "Alpha Logistics", status: "Eligible", score: 88, reason: "All criteria met" },
  { id: "BID-006", bidder: "Sigma Tech", status: "Eligible", score: 91, reason: "All criteria met" },
  { id: "BID-007", bidder: "Zeta Constructions", status: "Eligible", score: 85, reason: "All criteria met" },
  { id: "BID-008", bidder: "Theta Services", status: "Eligible", score: 82, reason: "All criteria met" },
  { id: "BID-009", bidder: "Iota Partners", status: "Eligible", score: 89, reason: "All criteria met" },
  { id: "BID-010", bidder: "Kappa Engineering", status: "Ineligible", score: 38, reason: "Invalid tax clearance" },
]

const benfordData = [
  { digit: "1", expected: 30.1, actual: 32.5 },
  { digit: "2", expected: 17.6, actual: 18.2 },
  { digit: "3", expected: 12.5, actual: 11.8 },
  { digit: "4", expected: 9.7, actual: 14.5 }, // Anomaly
  { digit: "5", expected: 7.9, actual: 6.2 },
  { digit: "6", expected: 6.7, actual: 7.1 },
  { digit: "7", expected: 5.8, actual: 4.5 },
  { digit: "8", expected: 5.1, actual: 3.2 },
  { digit: "9", expected: 4.6, actual: 2.0 },
]

const graphNodes = [
  { id: 1, type: "company", name: "Beta Infra Group", risk: "high", x: 40, y: 30 },
  { id: 2, type: "company", name: "Epsilon Corp", risk: "high", x: 60, y: 30 },
  { id: 3, type: "person", name: "Marcio Rossi", x: 50, y: 50 },
  { id: 4, type: "address", name: "123 Business Way, Sector 4", x: 50, y: 20 },
  { id: 5, type: "company", name: "Delta Systems", risk: "low", x: 20, y: 60 },
  { id: 6, type: "company", name: "Alpha Logistics", risk: "low", x: 80, y: 60 },
]

const graphConnections = [
  { from: 1, to: 3, type: "director", label: "Director" },
  { from: 2, to: 3, type: "director", label: "Director" },
  { from: 1, to: 4, type: "address", label: "Shared Address" },
  { from: 2, to: 4, type: "address", label: "Shared Address" },
]

// --- COMPONENTS ---

export default function DemoPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedNode, setSelectedNode] = useState<any>(graphNodes[0])
  const [activeTab, setActiveTab] = useState("analysis")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null


  return (
    <div className="min-h-screen bg-slate-50 flex" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#002B5B] text-white flex flex-col z-20" suppressHydrationWarning>
        <div className="p-8 border-b border-white/10" suppressHydrationWarning>
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold tracking-tight">BidShield</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-6" suppressHydrationWarning>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab("analysis")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "analysis" ? "bg-white/10 text-white shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-semibold">Analysis</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("graph")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "graph" ? "bg-white/10 text-white shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <Network className="h-5 w-5" />
                <span className="font-semibold">Network Graph</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("stats")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "stats" ? "bg-white/10 text-white shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-semibold">Statistics</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-6 border-t border-white/10" suppressHydrationWarning>
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
              <LogOut className="h-5 w-5" />
              <span className="font-semibold">Exit Demo</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-10 py-6 sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === "analysis" && "Evaluation Workspace"}
                {activeTab === "graph" && "Fraud Network Explorer"}
                {activeTab === "stats" && "Procurement Forensics"}
              </h1>
              <p className="text-sm font-medium text-slate-400">
                Project: TND-2024-002 - Smart City Infrastructure
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 font-bold">
                PROTOTYPE MODE
              </Badge>
              <div className="h-10 w-10 rounded-full bg-[#002B5B] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10 flex-1 overflow-auto">
          {activeTab === "analysis" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Verdict Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none bg-emerald-50 shadow-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CheckCircle className="h-12 w-12 text-emerald-600" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Eligible</p>
                    <h3 className="text-4xl font-black text-emerald-900">6</h3>
                    <p className="text-xs font-medium text-emerald-700/60 mt-2">Verified Compliance</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-red-50 shadow-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <AlertTriangle className="h-12 w-12 text-red-600" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm font-bold text-red-600 uppercase tracking-widest mb-1">Ineligible</p>
                    <h3 className="text-4xl font-black text-red-900">3</h3>
                    <p className="text-xs font-medium text-red-700/60 mt-2">Fraud/Criteria Violations</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-amber-50 shadow-sm overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Search className="h-12 w-12 text-amber-600" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-1">Manual Review</p>
                    <h3 className="text-4xl font-black text-amber-900">1</h3>
                    <p className="text-xs font-medium text-amber-700/60 mt-2">Anomalies Detected</p>
                  </CardContent>
                </Card>
              </div>

              {/* Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* PDF Preview Mock */}
                <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 px-8 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-[#002B5B]" />
                      <CardTitle className="text-sm font-bold text-slate-700">Document Preview</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ZoomOut className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ZoomIn className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Download className="h-4 w-4" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[500px] bg-slate-100/50 p-8 overflow-auto">
                      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-10 min-h-full max-w-lg mx-auto relative overflow-hidden">
                        {/* Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-red-500/5 text-6xl font-black pointer-events-none uppercase">
                          Fraud Detected
                        </div>
                        
                        <div className="border-b-2 border-slate-900 pb-4 mb-8">
                          <h4 className="text-xl font-black text-slate-900">BID PROPOSAL</h4>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Beta Infra Group | Sector 4 Operations</p>
                        </div>
                        
                        <div className="space-y-6 text-sm text-slate-700">
                          <div>
                            <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Address</p>
                            <p className="p-2 bg-red-50 text-red-800 rounded-md border border-red-100 font-medium">
                              123 Business Way, Sector 4, Manila, PH
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Company Secretary</p>
                            <p className="p-2 bg-slate-50 text-slate-800 rounded-md border border-slate-100 font-medium">
                              Marcio Rossi
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-1">Tax Identification</p>
                            <p className="p-2 bg-slate-50 text-slate-800 rounded-md border border-slate-100 font-medium font-mono">
                              TIN-994-112-440-X
                            </p>
                          </div>
                          <div className="pt-4 space-y-2 opacity-40">
                            <div className="h-3 bg-slate-100 rounded w-full" />
                            <div className="h-3 bg-slate-100 rounded w-full" />
                            <div className="h-3 bg-slate-100 rounded w-3/4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Table */}
                <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 px-8">
                    <CardTitle className="text-sm font-bold text-slate-700">Detailed Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bidder</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {evaluationResults.map((res) => (
                            <tr key={res.id} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-slate-700">{res.bidder}</span>
                                <p className="text-[10px] text-slate-400">{res.reason}</p>
                              </td>
                              <td className="px-6 py-4">
                                <Badge className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase border-none ${
                                  res.status === 'Eligible' ? 'bg-emerald-100 text-emerald-700' :
                                  res.status === 'Ineligible' ? 'bg-red-100 text-red-700' :
                                  'bg-amber-100 text-amber-700'
                                }`}>
                                  {res.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${res.score > 80 ? 'bg-emerald-500' : res.score > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                      style={{ width: `${res.score}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-black text-slate-900">{res.score}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "graph" && (
            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
              <Card className="flex-1 border-none shadow-2xl rounded-[3rem] overflow-hidden flex bg-white relative">
                {/* Graph View */}
                <div className="flex-1 relative bg-slate-50/50">
                  <div className="absolute top-6 left-6 z-10 space-y-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-white rounded-2xl shadow-sm border-slate-200"><ZoomIn className="h-5 w-5 text-slate-600" /></Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-white rounded-2xl shadow-sm border-slate-200"><ZoomOut className="h-5 w-5 text-slate-600" /></Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-white rounded-2xl shadow-sm border-slate-200"><Maximize className="h-5 w-5 text-slate-600" /></Button>
                  </div>

                  <svg className="w-full h-full" viewBox="0 0 100 80">
                    <defs>
                      <pattern id="grid-demo" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000" strokeWidth="0.05" opacity="0.1"/>
                      </pattern>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2" markerHeight="2" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
                      </marker>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-demo)" />

                    {/* Connections */}
                    {graphConnections.map((conn, i) => {
                      const from = graphNodes.find(n => n.id === conn.from)
                      const to = graphNodes.find(n => n.id === conn.to)
                      if (!from || !to) return null
                      return (
                        <g key={i}>
                          <line
                            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                            stroke={conn.type === 'address' ? '#dc2626' : '#002B5B'}
                            strokeWidth="0.5"
                            strokeDasharray={conn.type === 'address' ? "1,0.5" : "none"}
                          />
                          <text x={(from.x+to.x)/2} y={(from.y+to.y)/2 - 1} textAnchor="middle" className="text-[1.5px] fill-slate-400 font-bold uppercase tracking-widest">{conn.label}</text>
                        </g>
                      )
                    })}

                    {/* Collusion Ring Highlight */}
                    <ellipse cx="50" cy="25" rx="15" ry="8" fill="none" stroke="#dc2626" strokeWidth="0.2" strokeDasharray="1,1" className="animate-pulse" />
                    <text x="50" y="15" textAnchor="middle" className="text-[2px] fill-red-600 font-black uppercase tracking-tighter">Collusion Ring Detected</text>

                    {/* Nodes */}
                    {graphNodes.map((node) => (
                      <g key={node.id} className="cursor-pointer group" onClick={() => setSelectedNode(node)}>
                        <circle
                          cx={node.x} cy={node.y} r={node.type === 'company' ? 4 : 3}
                          fill={node.risk === 'high' ? '#fee2e2' : node.risk === 'low' ? '#dcfce7' : '#f1f5f9'}
                          stroke={node.risk === 'high' ? '#dc2626' : node.risk === 'low' ? '#16a34a' : '#94a3b8'}
                          strokeWidth={selectedNode?.id === node.id ? "0.8" : "0.4"}
                          className="transition-all duration-300"
                        />
                        <text x={node.x} y={node.y + 7} textAnchor="middle" className={`text-[2px] font-black tracking-tight ${node.risk === 'high' ? 'fill-red-700' : 'fill-slate-600'}`}>{node.name}</text>
                        {node.type === 'company' && <Building2 className="w-1 h-1" x={node.x-0.5} y={node.y-0.5} />}
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Detail Panel */}
                <div className="w-96 bg-white border-l border-slate-100 p-8 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Entity Intel</h3>
                    <Badge variant="outline" className="text-[10px] font-black border-red-100 text-red-600 bg-red-50">CRITICAL ALERT</Badge>
                  </div>

                  {selectedNode && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`h-16 w-16 rounded-3xl flex items-center justify-center shadow-inner ${selectedNode.risk === 'high' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                          {selectedNode.type === 'company' ? <Building2 className="w-8 h-8" /> : <User className="w-8 h-8" />}
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{selectedNode.name}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedNode.type}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Primary Connections</p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-bold text-slate-700">Beta Infra Group</span>
                              </div>
                              <Badge className="bg-red-100 text-red-700 text-[9px] border-none">Shared Addr</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-bold text-slate-700">Marcio Rossi</span>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 text-[9px] border-none">Director</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                          <p className="text-[10px] font-black text-red-600 uppercase mb-1">Collusion Signal</p>
                          <p className="text-xs font-bold text-red-800/80 leading-relaxed">
                            Detected recurring relationship between Epsilon Corp and Beta Infra across 4 previous smart city tenders.
                          </p>
                        </div>
                      </div>

                      <Button className="w-full bg-[#002B5B] hover:bg-[#003B73] h-12 rounded-2xl font-bold shadow-lg shadow-blue-900/10">
                        View Full Forensic Dossier
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Benford Chart */}
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="p-8 border-b border-slate-50">
                    <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter">Benford's Law Analysis</CardTitle>
                    <CardDescription className="font-bold text-slate-400">Financial Digit Frequency Distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={benfordData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="digit" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                          <Tooltip 
                            contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                            cursor={{fill: '#f8fafc'}}
                          />
                          <Bar dataKey="expected" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Expected Frequency" />
                          <Bar dataKey="actual" fill="#002B5B" radius={[4, 4, 0, 0]} name="Actual Frequency">
                            {benfordData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.digit === '4' ? '#dc2626' : '#002B5B'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-red-900">Digit '4' Anomaly Detected</p>
                        <p className="text-xs font-bold text-red-700/70 mt-1">
                          Frequency of '4' is 49% higher than expected. This pattern is characteristic of manual manipulation of pricing data.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cluster Analysis */}
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="p-8 border-b border-slate-50">
                    <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter text-blue-900">Bid Clustering Alert</CardTitle>
                    <CardDescription className="font-bold text-slate-400">Statistical Variance Measurement</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="96" cy="96" r="88" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                          <circle 
                            cx="96" cy="96" r="88" fill="none" stroke="#dc2626" strokeWidth="16" 
                            strokeDasharray={2 * Math.PI * 88}
                            strokeDashoffset={2 * Math.PI * 88 * (1 - 0.41/100)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-black text-red-600">0.41%</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Variance</span>
                        </div>
                      </div>
                      
                      <div className="mt-10 text-center space-y-4 max-w-sm mx-auto">
                        <h4 className="text-lg font-black text-slate-900">High Collusion Probability</h4>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed">
                          The bid price variance is exceptionally low (below 1%). This strongly suggests pre-coordinated price fixing between participants.
                        </p>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Normal Variance</p>
                          <p className="text-lg font-black text-slate-600">12% - 18%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-center">
                          <p className="text-[10px] font-black text-red-600 uppercase mb-1">Detected</p>
                          <p className="text-lg font-black text-red-600">0.41%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
