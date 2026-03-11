import { useState, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import InteractiveMap from '../components/InteractiveMap';
import AIScanner from '../components/AIScanner';
import { useReports } from '../context/ReportContext';

export default function KontenPage() {
    const [activeTab, setActiveTab] = useState('radar');
    const [selectedReport, setSelectedReport] = useState(null);
    const { reports } = useReports();

    const switchToRadar = useCallback(() => setActiveTab('radar'), []);

    const kritisCount = reports.filter((r) => r.severity === 'KRITIS').length;
    const activeCount = reports.filter((r) => r.severity !== 'SELESAI').length;

    const handleLogClick = useCallback((report) => {
        setSelectedReport(report);
    }, []);

    return (
        <section className="container mx-auto px-4 sm:px-6 pt-8 page-enter">
            {/* Tab Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-4 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <Terminal className="text-neon-blue w-6 h-6 md:w-8 md:h-8" /> Sistem Operasi
                    </h2>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto bg-dark-900 rounded p-1 border border-white/10 shadow-inner gap-1 sm:gap-0">
                    <button
                        onClick={() => setActiveTab('radar')}
                        className={`w-full sm:w-auto px-8 py-3 sm:py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'radar'
                            ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 shadow-[0_0_15px_rgba(0,255,157,0.2)]'
                            : 'text-gray-500 hover:text-white border border-transparent'
                            }`}
                    >
                        Radar Utama
                    </button>
                    <button
                        onClick={() => setActiveTab('lapor')}
                        className={`w-full sm:w-auto px-8 py-3 sm:py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'lapor'
                            ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                            : 'text-gray-500 hover:text-white border border-transparent'
                            }`}
                    >
                        AI Scanner
                    </button>
                </div>
            </div>

            {/* TAB: RADAR */}
            {activeTab === 'radar' && (
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:h-[600px]">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 flex flex-col gap-4 font-mono order-2 lg:order-1">
                        {/* Stats Card */}
                        <GlassPanel className="p-6 rounded-xl border-l-4 border-l-neon-green">
                            <h4 className="text-[10px] text-gray-400 mb-2 tracking-widest">TOTAL LAPORAN AKTIF</h4>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl md:text-5xl text-neon-green font-black drop-shadow-[0_0_10px_rgba(0,255,157,0.8)]">
                                    {activeCount}
                                </span>
                                <span className="text-xs text-neon-green pb-1 animate-pulse">TITIK</span>
                            </div>
                            <div className="w-full bg-dark-800 h-1.5 mt-4 border border-neon-green/30">
                                <div
                                    className="bg-neon-green h-full shadow-[0_0_10px_#00ff9d] transition-all duration-500"
                                    style={{ width: `${Math.min(100, activeCount * 15)}%` }}
                                />
                            </div>
                        </GlassPanel>

                        {/* Live Log */}
                        <GlassPanel className="p-5 rounded-xl border-l-4 border-l-neon-blue flex-grow flex flex-col h-[300px] lg:h-auto">
                            <h4 className="text-[10px] text-gray-400 mb-4 shrink-0 tracking-widest">DATA LOG (LIVE)</h4>
                            <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                                {reports.map((report, idx) => {
                                    const isKritis = report.severity === 'KRITIS';
                                    const isSelesai = report.severity === 'SELESAI';
                                    const isSelected = selectedReport && selectedReport.id === report.id;
                                    return (
                                        <div
                                            key={report.id}
                                            onClick={() => handleLogClick(report)}
                                            className={`bg-dark-900/80 p-3 rounded border transition-all cursor-pointer ${isSelected
                                                ? 'ring-2 ring-neon-green shadow-[0_0_15px_rgba(0,255,157,0.3)] scale-[1.02]'
                                                : ''
                                                } ${isKritis
                                                    ? 'border-red-500/50 hover:bg-red-500/20'
                                                    : isSelesai
                                                        ? 'border-neon-green/30 hover:bg-neon-green/20'
                                                        : 'border-neon-blue/30 hover:bg-neon-blue/20'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span
                                                    className={`text-[9px] px-2 py-0.5 rounded font-bold tracking-widest ${isKritis
                                                        ? 'bg-red-500 text-white'
                                                        : isSelesai
                                                            ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                                                            : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                                                        }`}
                                                >
                                                    {report.severity}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {isSelected && (
                                                        <span className="text-[9px] text-neon-green font-bold tracking-widest">📍 FOKUS</span>
                                                    )}
                                                    {idx === 0 && (
                                                        <span className="text-[9px] text-red-400 animate-pulse">LIVE</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-400">{report.message}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassPanel>
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-3 glass-panel rounded-xl overflow-hidden relative h-[400px] lg:h-auto order-1 lg:order-2">
                        {/* Map UI Overlay */}
                        <div className="absolute top-4 left-4 flex gap-2 z-[1000]">
                            <span className="bg-dark-900/90 border border-neon-blue/50 px-4 py-2 rounded text-[10px] font-mono font-bold text-neon-blue shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                                {reports.length} ZONA
                            </span>
                            {kritisCount > 0 && (
                                <span className="bg-red-500/20 border border-red-500/50 px-4 py-2 rounded text-[10px] font-mono font-bold text-red-400 backdrop-blur-md animate-pulse">
                                    {kritisCount} KRITIS
                                </span>
                            )}
                        </div>
                        <InteractiveMap className="z-0" selectedReport={selectedReport} />
                    </div>
                </div>
            )}

            {/* TAB: AI SCANNER */}
            {activeTab === 'lapor' && (
                <AIScanner onTransmitSuccess={switchToRadar} />
            )}
        </section>
    );
}
