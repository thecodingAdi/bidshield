import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Shield, 
  FileText, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  Users,
  TrendingUp
} from "lucide-react"

const tenders = [
  { id: "TND-2024-001", name: "IT Infrastructure Upgrade", bidders: 8, risk: "low", status: "Completed", date: "2024-01-15" },
  { id: "TND-2024-002", name: "Office Supplies Contract", bidders: 12, risk: "high", status: "Review", date: "2024-01-18" },
  { id: "TND-2024-003", name: "Security Services", bidders: 5, risk: "medium", status: "In Progress", date: "2024-01-20" },
  { id: "TND-2024-004", name: "Fleet Management", bidders: 6, risk: "low", status: "Completed", date: "2024-01-22" },
  { id: "TND-2024-005", name: "Construction Phase II", bidders: 4, risk: "high", status: "Flagged", date: "2024-01-25" },
  { id: "TND-2024-006", name: "Consulting Services", bidders: 9, risk: "low", status: "Completed", date: "2024-01-28" },
]

function getRiskBadge(risk: string) {
  switch (risk) {
    case "high":
      return <Badge variant="destructive">High Risk</Badge>
    case "medium":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
    case "low":
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Low Risk</Badge>
    default:
      return <Badge variant="secondary">{risk}</Badge>
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge variant="outline" className="text-emerald-600 border-emerald-200">Completed</Badge>
    case "Review":
      return <Badge variant="outline" className="text-amber-600 border-amber-200">Review</Badge>
    case "In Progress":
      return <Badge variant="outline" className="text-blue-600 border-blue-200">In Progress</Badge>
    case "Flagged":
      return <Badge variant="outline" className="text-red-600 border-red-200">Flagged</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function DashboardPage() {
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#002B5B] text-white text-sm font-medium"
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
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Tender Overview & Risk Analysis</p>
            </div>
            <Button className="bg-[#002B5B] hover:bg-[#001d3d] text-white">
              New Tender
            </Button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Tenders</CardTitle>
                <FileText className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-slate-500 mt-1">+12 this month</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Bidders</CardTitle>
                <Users className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,243</div>
                <p className="text-xs text-slate-500 mt-1">Across all tenders</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">High Risk Flags</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">8</div>
                <p className="text-xs text-red-600 mt-1">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Detection Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">94.2%</div>
                <p className="text-xs text-emerald-600 mt-1">+2.1% improvement</p>
              </CardContent>
            </Card>
          </div>

          {/* Tender Table */}
          <Card className="border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900">Recent Tenders</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="text-slate-600 font-medium">Tender ID</TableHead>
                    <TableHead className="text-slate-600 font-medium">Name</TableHead>
                    <TableHead className="text-slate-600 font-medium text-center">Bidders</TableHead>
                    <TableHead className="text-slate-600 font-medium">Risk Level</TableHead>
                    <TableHead className="text-slate-600 font-medium">Status</TableHead>
                    <TableHead className="text-slate-600 font-medium">Date</TableHead>
                    <TableHead className="text-slate-600 font-medium text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenders.map((tender) => (
                    <TableRow key={tender.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm text-slate-900">{tender.id}</TableCell>
                      <TableCell className="text-slate-700">{tender.name}</TableCell>
                      <TableCell className="text-center text-slate-700">{tender.bidders}</TableCell>
                      <TableCell>{getRiskBadge(tender.risk)}</TableCell>
                      <TableCell>{getStatusBadge(tender.status)}</TableCell>
                      <TableCell className="text-slate-500 text-sm">{tender.date}</TableCell>
                      <TableCell className="text-right">
                        <Link href="/evaluation">
                          <Button variant="ghost" size="sm" className="text-[#002B5B] hover:text-[#002B5B] hover:bg-slate-100">
                            Review
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  Recent Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "ABC Corp", status: "Verified", time: "2 hours ago" },
                    { name: "XYZ Holdings", status: "Flagged", time: "4 hours ago" },
                    { name: "Metro Services", status: "Verified", time: "6 hours ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                      <Badge 
                        variant={item.status === "Verified" ? "outline" : "destructive"}
                        className={item.status === "Verified" ? "text-emerald-600 border-emerald-200" : ""}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#002B5B]" />
                  Pending Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tender: "TND-2024-002", reason: "Collusion suspected", priority: "High" },
                    { tender: "TND-2024-005", reason: "Document mismatch", priority: "High" },
                    { tender: "TND-2024-003", reason: "Price anomaly", priority: "Medium" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900 font-mono">{item.tender}</p>
                        <p className="text-xs text-slate-500">{item.reason}</p>
                      </div>
                      <Badge 
                        variant={item.priority === "High" ? "destructive" : "outline"}
                        className={item.priority === "Medium" ? "text-amber-600 border-amber-200" : ""}
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
