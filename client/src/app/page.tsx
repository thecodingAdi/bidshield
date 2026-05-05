import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
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
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      {/* Floating Centered Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto">
        <div className="bg-slate-900/80 backdrop-blur-lg rounded-full px-8 py-4 shadow-2xl border border-white/10 flex items-center gap-12">
          <div className="flex items-center gap-3 border-r border-white/10 pr-10">
            <div className="relative w-7 h-7">
              <Image src="/image.webp" alt="Logo" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-white tracking-tighter uppercase">BidShield</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-all">Features</Link>
            <Link href="#security" className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-all">Security</Link>
          </div>

          <Link href="/demo">
            <Button className="bg-white text-[#002B5B] hover:bg-slate-100 rounded-full px-8 h-10 font-black text-xs uppercase tracking-widest shadow-xl transition-all">
              Run Demo
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Modern data center"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Content */}
            <div className="max-w-xl">
              <h1 className="font-serif text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
                Eliminate Fraud <br />
                <span className="text-[#002B5B]">Before The Award.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                AI-powered collusion detection and document evaluation for government agencies. Detect collusion rings and document inconsistencies in real-time.
              </p>

              <Link href="/demo">
                <Button
                  size="lg"
                  className="bg-[#002B5B] hover:bg-[#001E3C] text-white px-10 h-16 text-lg rounded-2xl shadow-2xl shadow-blue-900/20 font-bold group"
                >
                  Run Demo
                  <Activity className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right Column: Faded Dashboard Frame */}
            <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="absolute -inset-10 bg-[#002B5B]/5 blur-[100px] rounded-full" />
              <Card className="border-white/20 bg-white/40 backdrop-blur-2xl shadow-2xl rounded-[3rem] overflow-hidden">
                <div className="flex h-[540px]">
                  {/* Miniature Sidebar */}
                  <div className="w-20 bg-white/20 border-r border-black/5 flex flex-col items-center py-8 gap-8">
                    <div className="relative w-8 h-8 grayscale opacity-50">
                      <Image src="/image.webp" alt="Logo" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="p-3 bg-[#002B5B] text-white rounded-2xl shadow-lg"><LayoutDashboard className="h-5 w-5" /></div>
                      <div className="p-3 text-slate-400"><FileText className="h-5 w-5" /></div>
                      <div className="p-3 text-slate-400"><Network className="h-5 w-5" /></div>
                      <div className="p-3 text-slate-400"><Activity className="h-5 w-5" /></div>
                    </div>
                  </div>

                  {/* Dashboard Mock Content */}
                  <div className="flex-1 p-8 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-tighter">System Pulse</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Intelligence</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/60 p-4 rounded-2xl border border-white/40 shadow-sm">
                        <Users className="h-4 w-4 text-blue-600 mb-2" />
                        <p className="text-2xl font-black text-slate-900 leading-none">2,847</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Bidders</p>
                      </div>
                      <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 shadow-sm">
                        <AlertTriangle className="h-4 w-4 text-red-600 mb-2" />
                        <p className="text-2xl font-black text-red-900 leading-none">47</p>
                        <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mt-1">Alerts</p>
                      </div>
                      <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 shadow-sm">
                        <CheckCircle className="h-4 w-4 text-emerald-600 mb-2" />
                        <p className="text-2xl font-black text-emerald-900 leading-none">1,402</p>
                        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mt-1">Verified</p>
                      </div>
                      <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 shadow-sm">
                        <DollarSign className="h-4 w-4 text-white mb-2" />
                        <p className="text-2xl font-black text-white leading-none">$4.2M</p>
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1">Saved</p>
                      </div>
                    </div>

                    {/* Mini Collusion Ring Visualization */}
                    <div className="mt-8 p-6 bg-[#002B5B]/90 backdrop-blur-md rounded-[2.5rem] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Network Anomaly</p>
                          <Badge className="bg-red-500 text-white border-none text-[8px] px-2 py-0">HIGH RISK</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full border-2 border-red-400 flex items-center justify-center">
                            <Network className="h-6 w-6 text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Collusion Detected</p>
                            <p className="text-[10px] text-white/50 leading-tight">Identity overlapping found</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Features Section */}
      <section id="features" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900">Three Pillars of Protection</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-50 text-[#002B5B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FileSearch className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Document Analysis</h3>
              <p className="text-slate-600">Intelligent OCR that extracts data with 99.8% precision.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Network className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Network Intelligence</h3>
              <p className="text-slate-600">Identifies collusion rings through deep relationship mapping.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Audit Transparency</h3>
              <p className="text-slate-600">Complete immutable logs for government compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image src="/image.webp" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-slate-900">BidShield</span>
          </div>
          <p className="text-sm text-slate-400">© 2024 BidShield. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#features" className="text-sm text-slate-400 hover:text-slate-900">Privacy</Link>
            <Link href="#features" className="text-sm text-slate-400 hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
