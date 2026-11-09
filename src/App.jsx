import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend 
} from 'recharts';
import { 
  Truck, Leaf, ShieldAlert, FileText, BarChart3, Settings, Search, Download, 
  Sun, Moon, Filter, RefreshCw, Layers, CheckCircle2, AlertTriangle, Zap, Building2, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

const emissionsData = [
  { month: 'Jan', scope1: 420, scope2: 150, scope3: 210, target: 800 },
  { month: 'Feb', scope1: 390, scope2: 145, scope3: 195, target: 780 },
  { month: 'Mar', scope1: 410, scope2: 140, scope3: 200, target: 760 },
  { month: 'Apr', scope1: 370, scope2: 130, scope3: 180, target: 740 },
  { month: 'May', scope1: 340, scope2: 125, scope3: 175, target: 720 },
  { month: 'Jun', scope1: 310, scope2: 110, scope3: 160, target: 700 },
];

const fleetVehicles = [
  { id: 'FL-104', type: 'EV Freight', model: 'Volvo FL Electric', route: 'Urban Local', emissions: '0.0 kg/km', efficiency: '98%', status: 'Active' },
  { id: 'FL-209', type: 'Diesel Hauler', model: 'Scania R500', route: 'Interstate North', emissions: '0.82 kg/km', efficiency: '74%', status: 'Maintenance Due' },
  { id: 'FL-312', type: 'CNG Transporter', model: 'Iveco S-Way', route: 'Regional Cross', emissions: '0.41 kg/km', efficiency: '89%', status: 'Active' },
  { id: 'FL-405', type: 'Hybrid Rigid', model: 'MAN TGM', route: 'Suburban Loop', emissions: '0.35 kg/km', efficiency: '91%', status: 'Active' },
  { id: 'FL-518', type: 'Diesel Hauler', model: 'Volvo FH16', route: 'Interstate South', emissions: '0.89 kg/km', efficiency: '68%', status: 'High Emission Alert' }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const filteredFleet = fleetVehicles.filter(v => {
    const matchesSearch = v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || v.type.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 border-r ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'} p-6 z-20 hidden md:block`}>
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-emerald-500 p-2.5 rounded-xl text-slate-950 font-bold">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">EcoLogix</h1>
            <span className="text-xs text-emerald-500 font-semibold tracking-wider">ESG DASHBOARD</span>
          </div>
        </div>

        <nav className="space-y-2">
          <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Truck className="w-5 h-5" />
            <span>Fleet Emissions</span>
          </a>
          <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Layers className="w-5 h-5" />
            <span>Scope Analysis</span>
          </a>
          <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
            <FileText className="w-5 h-5" />
            <span>Audit Reports</span>
          </a>
          <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 p-6 md:p-10 space-y-8">
        {/* Top Navigation */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">ESG Compliance & Carbon Footprint</h2>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time fleet carbon accounting and GHG reporting metrics.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-lg border ${darkMode ? 'border-slate-800 bg-slate-900 text-amber-400' : 'border-slate-200 bg-white text-slate-700'} hover:opacity-80 transition`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2.5 rounded-lg font-semibold transition"
            >
              <Download className="w-4 h-4" />
              <span>Generate Audit PDF</span>
            </button>
          </div>
        </header>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold tracking-wider uppercase">Gross Emissions</span>
              <Truck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold">630</span>
              <span className="text-sm font-medium text-slate-400">MT CO₂e</span>
            </div>
            <div className="flex items-center text-xs text-emerald-400 space-x-1">
              <ArrowDownRight className="w-4 h-4" />
              <span>8.4% reduction vs last month</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold tracking-wider uppercase">Scope 1 (Direct Fleet)</span>
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold">310</span>
              <span className="text-sm font-medium text-slate-400">MT CO₂e</span>
            </div>
            <div className="flex items-center text-xs text-emerald-400 space-x-1">
              <ArrowDownRight className="w-4 h-4" />
              <span>4.2% lower fuel burn</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold tracking-wider uppercase">Scope 2 & 3 Combined</span>
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold">270</span>
              <span className="text-sm font-medium text-slate-400">MT CO₂e</span>
            </div>
            <div className="flex items-center text-xs text-amber-400 space-x-1">
              <ArrowUpRight className="w-4 h-4" />
              <span>1.1% increased warehouse power</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-3`}>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold tracking-wider uppercase">Fleet Electrification</span>
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold">34%</span>
              <span className="text-sm font-medium text-slate-400">of Total Fleet</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[34%]"></div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Emissions Trend by Scope (GHG Protocol)</h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Monthly CO₂ intensity tracking against corporate targets.</p>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#94a3b8' : '#64748b'} />
                  <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                  <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', borderColor: '#334155' }} />
                  <Legend />
                  <Bar dataKey="scope1" name="Scope 1 (Fleet)" fill="#10b981" stackId="a" />
                  <Bar dataKey="scope2" name="Scope 2 (Power)" fill="#6366f1" stackId="a" />
                  <Bar dataKey="scope3" name="Scope 3 (Supply)" fill="#f59e0b" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compliance Card */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
            <h3 className="font-bold text-lg">ESG Compliance Score</h3>
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-8 border-emerald-500/20 border-t-emerald-500">
                <span className="text-4xl font-black">A+</span>
              </div>
              <span className="text-sm text-emerald-400 font-semibold">ISO 14064 Compliant</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Fleet Efficiency Standard</span>
                <span className="font-semibold text-emerald-400">92/100</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Biofuel Transition Rate</span>
                <span className="font-semibold text-amber-400">68/100</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Data Audit Readiness</span>
                <span className="font-semibold text-emerald-400">98/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Table */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-4`}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Fleet Vehicles & Emission Intensity</h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time telematics and carbon efficiency per kilometer.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search fleet or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-9 pr-4 py-2 rounded-lg text-sm border ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'} focus:outline-none focus:border-emerald-500`}
                />
              </div>

              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'} focus:outline-none focus:border-emerald-500`}
              >
                <option value="All">All Types</option>
                <option value="EV">EV</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-3 px-4">Vehicle ID</th>
                  <th className="py-3 px-4">Model & Type</th>
                  <th className="py-3 px-4">Assigned Route</th>
                  <th className="py-3 px-4">Carbon Output</th>
                  <th className="py-3 px-4">Efficiency</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredFleet.map((v) => (
                  <tr key={v.id} className={`hover:${darkMode ? 'bg-slate-800/40' : 'bg-slate-50'} transition`}>
                    <td className="py-3.5 px-4 font-mono font-medium text-emerald-400">{v.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold">{v.model}</div>
                      <div className="text-xs text-slate-400">{v.type}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{v.route}</td>
                    <td className="py-3.5 px-4 font-semibold">{v.emissions}</td>
                    <td className="py-3.5 px-4 text-slate-400">{v.efficiency}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        v.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        v.status === 'Maintenance Due' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Generator */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-6`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Generate Official ESG Audit PDF</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <p className="text-sm text-slate-400">This action will compile real-time Scope 1-3 telematics data into an ISO 14064 compliant reporting document.</p>

            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Reporting Framework</label>
              <select className={`w-full p-3 rounded-lg text-sm border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <option>GHG Protocol Corporate Standard</option>
                <option>ISO 14064 Standard Framework</option>
                <option>EU Corporate Sustainability Reporting (CSRD)</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-700">Cancel</button>
              <button 
                onClick={() => {
                  setReportGenerated(true);
                  setTimeout(() => {
                    setReportGenerated(false);
                    setIsModalOpen(false);
                  }, 1500);
                }} 
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition flex items-center space-x-2"
              >
                {reportGenerated ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                <span>{reportGenerated ? 'Report Compiled!' : 'Export PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
