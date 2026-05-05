import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FileSearch,
  Network,
  CheckCircle,
  Lock,
  Building2,
  ArrowRight,
  FileText,
  GitBranch,
  Activity,
  ChevronRight,
  Users,
  AlertTriangle,
  FileX,
  DollarSign,
  LayoutDashboard,
  Settings,
  Bell,
  Search
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Floating Centered Navbar - Terra Style */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white">BidShield</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#demo" className="text-sm text-white/70 hover:text-white transition-colors">
                Demo
              </Link>
              <Link href="#security" className="text-sm text-white/70 hover:text-white transition-colors">
                Security
              </Link>
            </div>
            <Link href="/evaluation">
              <Button size="sm" className="bg-[#002B5B] hover:bg-[#001E3C] text-white rounded-full px-5 transition-all duration-200">
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Modern data center"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-36 pb-72">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

            <h1
              className="font-serif text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl text-balance"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
            >
              Secure Every Bid
            </h1>

            <p className="mt-8 text-xl text-white/60 leading-relaxed max-w-2xl mx-auto text-pretty">
              AI-powered collusion detection and document evaluation for government agencies.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/evaluation">
                <Button
                  size="lg"
                  className="bg-white text-[#002B5B] hover:bg-white/90 px-8 h-14 text-base transition-all duration-200 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
                >
                  Enter Evaluation Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-14 text-base transition-all duration-200"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Peek Dashboard Card - Tucked at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 translate-y-1/2">
          <div className="mx-auto max-w-6xl">
            <Card className="border-slate-200 bg-white shadow-2xl rounded-2xl overflow-hidden">
              <div className="flex">
                {/* Sidebar */}
                <div className="w-56 bg-slate-50 border-r border-slate-200 p-4 hidden md:block">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="h-6 w-6 text-[#002B5B]" />
                    <span className="font-semibold text-slate-900">BidShield</span>
                  </div>
                  <nav className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#002B5B] text-white">
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Documents</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <Network className="h-4 w-4" />
                      <span className="text-sm">Network</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Audit Log</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">Settings</span>
                    </div>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
                      <p className="text-sm text-slate-500">Q4 2024 Procurement Analysis</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search tenders..."
                          className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 w-48"
                          readOnly
                        />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  {/* Stat Cards Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">+12%</Badge>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">2,847</p>
                      <p className="text-sm text-slate-500">Total Bidders</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700">-8%</Badge>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">47</p>
                      <p className="text-sm text-slate-500">Alerts Found</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                          <FileX className="h-5 w-5 text-red-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-red-50 text-red-700">3 new</Badge>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">23</p>
                      <p className="text-sm text-slate-500">Ineligible Docs</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-emerald-600" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700">Protected</Badge>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">$4.2M</p>
                      <p className="text-sm text-slate-500">Savings Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </section>

      {/* Spacing to account for peek dashboard */}
      <div className="h-80 md:h-72" />

      {/* Bento Grid Features Section */}
      <section id="features" className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-[#002B5B] bg-[#002B5B]/10">
              Core Capabilities
            </Badge>
            <h2 className="font-serif text-4xl font-bold text-slate-900 text-balance">
              Three Pillars of Protection
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive fraud detection powered by document analysis, network intelligence, and complete audit trails
            </p>
          </div>

          {/* Bento Grid - 3 columns */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Document Pillar */}
            <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="h-40 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="relative">
                    <div className="w-20 h-28 bg-white rounded border-2 border-slate-300 shadow-sm flex flex-col items-center justify-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-200 rounded" />
                      <div className="w-14 h-1.5 bg-slate-200 rounded" />
                      <div className="w-10 h-1.5 bg-slate-200 rounded" />
                      <div className="w-12 h-1.5 bg-slate-200 rounded" />
                      <div className="w-8 h-1.5 bg-slate-200 rounded" />
                    </div>
                    <div className="absolute -right-3 top-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                    </div>
                    <div className="absolute -right-2 top-10">
                      <CheckCircle className="h-4 w-4 text-emerald-500 fill-emerald-50" />
                    </div>
                    <div className="absolute -right-3 bottom-4">
                      <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-50" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#002B5B]" />
                  Document Analysis
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Pillar 1 - Intelligent OCR Processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Gemini 1.5 Pro extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Criteria compliance mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Cross-submission verification</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2: Graph Pillar */}
            <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="h-40 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 mb-4 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 120 80" className="w-32 h-20">
                    <line x1="30" y1="40" x2="60" y2="20" stroke="#002B5B" strokeWidth="2" opacity="0.3" />
                    <line x1="30" y1="40" x2="60" y2="60" stroke="#002B5B" strokeWidth="2" opacity="0.3" />
                    <line x1="60" y1="20" x2="90" y2="30" stroke="#002B5B" strokeWidth="2" opacity="0.3" />
                    <line x1="60" y1="60" x2="90" y2="50" stroke="#002B5B" strokeWidth="2" opacity="0.3" />
                    <line x1="60" y1="20" x2="60" y2="60" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />

                    <circle cx="30" cy="40" r="8" fill="#002B5B" />
                    <circle cx="60" cy="20" r="8" fill="#002B5B" />
                    <circle cx="60" cy="60" r="8" fill="#dc2626" />
                    <circle cx="90" cy="30" r="6" fill="#002B5B" opacity="0.7" />
                    <circle cx="90" cy="50" r="6" fill="#002B5B" opacity="0.7" />
                  </svg>
                </div>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-[#002B5B]" />
                  Network Analysis
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Pillar 2 - Collusion Detection Engine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Neo4j relationship mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Shared entity detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Historical pattern analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3: Audit Pillar */}
            <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="h-40 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 mb-4 p-4 overflow-hidden">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <div className="flex-1 h-2.5 bg-slate-200 rounded w-3/4" />
                      <span className="text-[10px] text-slate-400">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                      <div className="flex-1 h-2.5 bg-slate-200 rounded w-2/3" />
                      <span className="text-[10px] text-slate-400">5m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <div className="flex-1 h-2.5 bg-slate-200 rounded w-4/5" />
                      <span className="text-[10px] text-slate-400">8m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <div className="flex-1 h-2.5 bg-slate-200 rounded w-1/2" />
                      <span className="text-[10px] text-slate-400">12m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <div className="flex-1 h-2.5 bg-slate-200 rounded w-3/5" />
                      <span className="text-[10px] text-slate-400">15m ago</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#002B5B]" />
                  Audit Trail
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Pillar 3 - Complete Transparency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Immutable action logging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>User attribution tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Exportable compliance reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-[#002B5B] bg-[#002B5B]/10">
              Process
            </Badge>
            <h2 className="font-serif text-4xl font-bold text-slate-900 text-balance">
              From Upload to Verdict
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              A streamlined four-step process that delivers actionable intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Document Upload", desc: "Scanned bid documents are securely ingested", icon: FileSearch },
              { step: "02", title: "OCR Processing", desc: "AI extracts text and structured data fields", icon: FileText },
              { step: "03", title: "Rule Analysis", desc: "Compliance checks and anomaly detection run", icon: Network },
              { step: "04", title: "Final Verdict", desc: "Risk score and recommendation generated", icon: Shield },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative">
                  <Card className="border-slate-200 bg-white shadow-sm text-center h-full">
                    <CardHeader className="pb-2">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#002B5B] text-white mx-auto mb-3">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="text-sm font-mono text-[#002B5B] mb-1">Step {item.step}</div>
                      <CardTitle className="text-lg text-slate-900">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-[#002B5B] bg-[#002B5B]/10">
              Enterprise Security
            </Badge>
            <h2 className="font-serif text-4xl font-bold text-slate-900 text-balance">
              Built for Government Standards
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Security architecture designed for the most sensitive procurement environments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-slate-200 bg-white shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-[#002B5B]/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-7 w-7 text-[#002B5B]" />
                </div>
                <CardTitle className="text-lg text-slate-900">On-Premise Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Full control with air-gapped installation options for classified environments
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-[#002B5B]/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-7 w-7 text-[#002B5B]" />
                </div>
                <CardTitle className="text-lg text-slate-900">Dockerized Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Containerized deployment for consistent, reproducible installations
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm text-center hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-[#002B5B]/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-[#002B5B]" />
                </div>
                <CardTitle className="text-lg text-slate-900">Data Sovereignty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  No data leaves your infrastructure. Complete audit trails maintained
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#002B5B] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white text-balance">
            Ready to Protect Your Procurement Process?
          </h2>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Join the growing number of government agencies using BidShield to ensure fair and transparent bidding.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/evaluation">
              <Button
                size="lg"
                className="bg-white text-[#002B5B] hover:bg-slate-100 px-8 h-14 text-base transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Access Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold text-white">BidShield</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#demo" className="hover:text-white transition-colors">Demo</Link>
              <Link href="#security" className="hover:text-white transition-colors">Security</Link>
            </div>
            <p className="text-sm text-slate-500">
              Protecting procurement integrity
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
