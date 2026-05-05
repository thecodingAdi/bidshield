import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import {
  Shield,
  FileText,
  Network,
  LayoutDashboard,
  Settings,
  LogOut,
  CheckCircle,
  Circle,
  AlertTriangle,
  FileCheck,
  ZoomIn,
  ZoomOut,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const steps = [
  { id: 1, name: "OCR Processing", status: "complete", description: "Text extraction complete" },
  { id: 2, name: "Criteria Mapping", status: "complete", description: "12 criteria evaluated" },
  { id: 3, name: "Graph Check", status: "current", description: "Analyzing network connections" },
  { id: 4, name: "Final Review", status: "pending", description: "Awaiting completion" },
]

const insights = [
  { type: "success", title: "Business Registration", description: "Valid registration verified with SEC" },
  { type: "success", title: "Tax Compliance", description: "Tax clearance certificate valid until Dec 2024" },
  { type: "warning", title: "Financial Capacity", description: "Net worth below recommended threshold" },
  { type: "success", title: "Experience", description: "3 similar projects completed in last 5 years" },
  { type: "error", title: "Address Match", description: "Shared address detected with another bidder" },
]

export default function EvaluationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col">
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#002B5B] text-white text-sm font-medium"
              >
                <FileText className="h-4 w-4" />
                Evaluation
              </Link>
            </li>
            <li>
              <Link
                href="/network"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium"
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
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Evaluation Workspace</h1>
                <p className="text-sm text-slate-500">TND-2024-002 - Office Supplies Contract</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-slate-600">
                Skip Bidder
              </Button>
              <Button className="bg-[#002B5B] hover:bg-[#001d3d] text-white">
                Approve Bidder
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Verdict Card */}
          <Card className="border-slate-200 bg-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Manual Review Required</h2>
                    <p className="text-sm text-slate-500">Bidder: XYZ Holdings Ltd. | Score: 72/100</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-sm px-4 py-1.5">
                  Pending Review
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Viewer */}
            <Card className="border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-[#002B5B]" />
                    Document Viewer
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] bg-slate-100 flex flex-col">
                  {/* PDF Mock */}
                  <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm p-8 min-h-full">
                      <div className="border-b border-slate-200 pb-4 mb-6">
                        <h3 className="text-xl font-bold text-slate-900">BID PROPOSAL</h3>
                        <p className="text-sm text-slate-500 mt-1">XYZ Holdings Ltd.</p>
                      </div>

                      <div className="space-y-4 text-sm text-slate-700">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">1. Company Information</h4>
                          <p className="pl-4">Registration No: <span className="bg-emerald-100 text-emerald-800 px-1 rounded">2019-00234567</span></p>
                          <p className="pl-4">Address: <span className="bg-red-100 text-red-800 px-1 rounded">Unit 5B, Commerce Tower, Manila</span></p>
                          <p className="pl-4">Established: 2019</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">2. Financial Statement</h4>
                          <p className="pl-4">Annual Revenue: PHP 45,000,000</p>
                          <p className="pl-4">Net Worth: <span className="bg-amber-100 text-amber-800 px-1 rounded">PHP 8,500,000</span></p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">3. Technical Proposal</h4>
                          <p className="pl-4 text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">4. Price Quotation</h4>
                          <p className="pl-4">Total Bid Amount: PHP 12,450,000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-slate-500">Page 1 of 12</span>
                    <Button variant="ghost" size="sm" className="text-slate-600">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Panel */}
            <div className="space-y-6">
              {/* Progress Stepper */}
              <Card className="border-slate-200 bg-white">
                <CardHeader className="border-b border-slate-200">
                  <CardTitle className="text-lg font-semibold text-slate-900">Evaluation Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {step.status === "complete" ? (
                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-emerald-600" />
                            </div>
                          ) : step.status === "current" ? (
                            <div className="h-8 w-8 rounded-full bg-[#002B5B] flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                              <Circle className="h-5 w-5 text-slate-400" />
                            </div>
                          )}
                          {index < steps.length - 1 && (
                            <div className={`w-0.5 h-8 ${step.status === "complete" ? "bg-emerald-200" : "bg-slate-200"}`} />
                          )}
                        </div>
                        <div className="pt-1">
                          <p className={`text-sm font-medium ${step.status === "current" ? "text-[#002B5B]" : step.status === "complete" ? "text-slate-900" : "text-slate-400"}`}>
                            {step.name}
                          </p>
                          <p className="text-xs text-slate-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="border-slate-200 bg-white">
                <CardHeader className="border-b border-slate-200">
                  <CardTitle className="text-lg font-semibold text-slate-900">AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {insights.map((insight, index) => (
                      <div key={index} className="p-4 flex items-start gap-3">
                        {insight.type === "success" ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                        ) : insight.type === "warning" ? (
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-900">{insight.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Link href="/network" className="flex-1">
                      <Button variant="outline" className="w-full text-[#002B5B] border-[#002B5B] hover:bg-[#002B5B]/5">
                        <Network className="h-4 w-4 mr-2" />
                        View in Network
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 text-slate-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
