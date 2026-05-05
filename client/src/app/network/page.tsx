"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Phone,
  MapPin,
  Link2,
  X
} from "lucide-react"

const filters = [
  { id: "shared-address", label: "Shared Address", active: true },
  { id: "common-directors", label: "Common Directors", active: true },
  { id: "phone-match", label: "Phone Match", active: false },
  { id: "bank-account", label: "Bank Account", active: false },
]

const nodes = [
  { id: 1, type: "company", name: "XYZ Holdings Ltd.", risk: "high", x: 50, y: 30 },
  { id: 2, type: "company", name: "ABC Corp", risk: "high", x: 30, y: 60 },
  { id: 3, type: "company", name: "Metro Services", risk: "medium", x: 70, y: 60 },
  { id: 4, type: "person", name: "John Santos", x: 50, y: 50 },
  { id: 5, type: "address", name: "Unit 5B, Commerce Tower", x: 40, y: 45 },
]

const connections = [
  { from: 1, to: 4, type: "director" },
  { from: 2, to: 4, type: "director" },
  { from: 1, to: 5, type: "address" },
  { from: 2, to: 5, type: "address" },
  { from: 3, to: 4, type: "owner" },
]

export default function NetworkPage() {
  const [selectedNode, setSelectedNode] = useState<typeof nodes[0] | null>(nodes[0])
  const [activeFilters, setActiveFilters] = useState(["shared-address", "common-directors"])

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#002B5B]" />
            <span className="text-lg font-semibold text-slate-900">BidShield</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/evaluation" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
              >
                <FileText className="h-4 w-4" />
                Evaluation
              </Link>
            </li>
            <li>
              <Link 
                href="/network" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#002B5B] text-white text-sm font-medium"
              >
                <Network className="h-4 w-4" />
                Network Explorer
              </Link>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Fraud Network Explorer</h1>
              <p className="text-sm text-slate-500">Neo4j-Powered Relationship Analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search entities..." 
                  className="pl-9 w-64 bg-white border-slate-200"
                />
              </div>
              <Button variant="outline" className="text-slate-600">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-white border-b border-slate-200 px-8 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 mr-2">Filters:</span>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilters.includes(filter.id)
                    ? "bg-[#002B5B] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Graph Canvas */}
          <div className="flex-1 relative bg-white">
            {/* Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Button variant="outline" size="icon" className="h-9 w-9 bg-white shadow-sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 bg-white shadow-sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 bg-white shadow-sm">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>

            {/* Graph Visualization */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {/* Grid Pattern */}
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#e2e8f0" strokeWidth="0.1"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Connections */}
              {connections.map((conn, i) => {
                const from = nodes.find(n => n.id === conn.from)
                const to = nodes.find(n => n.id === conn.to)
                if (!from || !to) return null
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={conn.type === "director" ? "#002B5B" : conn.type === "address" ? "#dc2626" : "#64748b"}
                    strokeWidth="0.3"
                    strokeDasharray={conn.type === "address" ? "1,0.5" : "none"}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node) => (
                <g key={node.id} className="cursor-pointer" onClick={() => setSelectedNode(node)}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.type === "company" ? 4 : 2.5}
                    fill={
                      node.type === "company" 
                        ? node.risk === "high" ? "#fee2e2" : node.risk === "medium" ? "#fef3c7" : "#dcfce7"
                        : node.type === "person" ? "#dbeafe" : "#f1f5f9"
                    }
                    stroke={
                      node.type === "company" 
                        ? node.risk === "high" ? "#dc2626" : node.risk === "medium" ? "#f59e0b" : "#16a34a"
                        : node.type === "person" ? "#2563eb" : "#64748b"
                    }
                    strokeWidth={selectedNode?.id === node.id ? "0.6" : "0.3"}
                    className="transition-all"
                  />
                  {node.type === "company" && (
                    <text
                      x={node.x}
                      y={node.y + 6}
                      textAnchor="middle"
                      className="text-[2px] fill-slate-700 font-medium"
                    >
                      {node.name.length > 15 ? node.name.slice(0, 15) + "..." : node.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
              <p className="text-xs font-medium text-slate-700 mb-2">Legend</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-100 border-2 border-red-600" />
                  <span className="text-xs text-slate-600">High Risk Company</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-100 border-2 border-amber-500" />
                  <span className="text-xs text-slate-600">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-100 border-2 border-blue-600" />
                  <span className="text-xs text-slate-600">Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-slate-100 border-2 border-slate-500" />
                  <span className="text-xs text-slate-600">Address</span>
                </div>
              </div>
            </div>
          </div>

          {/* Entity Details Panel */}
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Entity Details</h3>
              {selectedNode && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedNode(null)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {selectedNode ? (
              <div className="flex-1 overflow-auto">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      selectedNode.type === "company" 
                        ? "bg-slate-100" 
                        : selectedNode.type === "person" 
                          ? "bg-blue-100" 
                          : "bg-slate-100"
                    }`}>
                      {selectedNode.type === "company" ? (
                        <Building2 className="h-5 w-5 text-slate-600" />
                      ) : selectedNode.type === "person" ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <MapPin className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{selectedNode.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{selectedNode.type}</p>
                    </div>
                  </div>
                  {selectedNode.risk && (
                    <Badge 
                      variant={selectedNode.risk === "high" ? "destructive" : "outline"}
                      className={selectedNode.risk === "medium" ? "text-amber-600 border-amber-200" : ""}
                    >
                      {selectedNode.risk === "high" ? "High Risk" : "Medium Risk"}
                    </Badge>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">SEC Reg: 2019-00234567</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">Unit 5B, Commerce Tower</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600">+63 2 8888 1234</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Connections</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">ABC Corp</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Director</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Link2 className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">John Santos</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Common</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-400" />
                          <span className="text-sm text-slate-700">Shared Address</span>
                        </div>
                        <Badge variant="destructive" className="text-xs">Alert</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Tender History</h4>
                    <div className="space-y-2">
                      {[
                        { id: "TND-2024-002", result: "Active" },
                        { id: "TND-2023-045", result: "Won" },
                        { id: "TND-2023-012", result: "Lost" },
                      ].map((tender) => (
                        <div key={tender.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-mono text-slate-700">{tender.id}</span>
                          <Badge variant="outline" className="text-xs">{tender.result}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-200">
                  <Button className="w-full bg-[#002B5B] hover:bg-[#001d3d] text-white">
                    View Full Profile
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 text-center">
                <div>
                  <Network className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Select a node in the graph to view entity details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
