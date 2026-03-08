import { useState, useRef, useCallback } from 'react';
import { ScanLine, Loader, Siren, Cpu, SatelliteDish, Check, X, Info, MapPin } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { useReports } from '../context/ReportContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AIScanner({ onTransmitSuccess }) {
    const { addReport } = useReports();
    const fileInputRef = useRef(null);

    const [phase, setPhase] = useState('idle'); // idle | scanning | result
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [transmitting, setTransmitting] = useState(false);
    const [transmitted, setTransmitted] = useState(false);

    // Progress bar widths (for animation)
    const [plasticWidth, setPlasticWidth] = useState('0%');
    const [organicWidth, setOrganicWidth] = useState('0%');

    const resetState = () => {
        setPhase('idle');
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        setPlasticWidth('0%');
        setOrganicWidth('0%');
        setTransmitted(false);
    };

    const handleFileSelect = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        resetState();
        setPhase('scanning');
        setPreviewUrl(URL.createObjectURL(file));

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch(`${API_URL}/deteksi`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const data = await res.json();
            setResult(data);
            setPhase('result');

            // Animate progress bars
            setTimeout(() => {
                if (data.isTrashDetected) {
                    const plastic = Math.min(95, 60 + data.itemCount * 8);
                    const organic = 100 - plastic;
                    setPlasticWidth(`${plastic}%`);
                    setOrganicWidth(`${organic}%`);
                }
            }, 100);
        } catch (err) {
            setError(err.message);
            setPhase('result');
        }
    }, []);

    const handleTransmit = useCallback(() => {
        if (!result?.isTrashDetected || transmitted) return;
        setTransmitting(true);

        // Get user geolocation or use default
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const report = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        severity: result.itemCount >= 4 ? 'KRITIS' : result.itemCount >= 2 ? 'SEDANG' : 'SEDANG',
                        volume: result.volume,
                        message: `${result.message} (AI Scan: ${result.itemCount} tumpukan terdeteksi)`,
                        itemCount: result.itemCount,
                    };
                    addReport(report);
                    setTransmitting(false);
                    setTransmitted(true);
                    if (onTransmitSuccess) onTransmitSuccess();
                },
                () => {
                    // Fallback: random offset from Indramayu center
                    const report = {
                        lat: -6.321 + (Math.random() - 0.5) * 0.02,
                        lng: 108.322 + (Math.random() - 0.5) * 0.02,
                        severity: result.itemCount >= 4 ? 'KRITIS' : 'SEDANG',
                        volume: result.volume,
                        message: `${result.message} (AI Scan: ${result.itemCount} tumpukan terdeteksi)`,
                        itemCount: result.itemCount,
                    };
                    addReport(report);
                    setTransmitting(false);
                    setTransmitted(true);
                    if (onTransmitSuccess) onTransmitSuccess();
                },
            );
        } else {
            const report = {
                lat: -6.321 + (Math.random() - 0.5) * 0.02,
                lng: 108.322 + (Math.random() - 0.5) * 0.02,
                severity: result.itemCount >= 4 ? 'KRITIS' : 'SEDANG',
                volume: result.volume,
                message: `${result.message} (AI Scan: ${result.itemCount} tumpukan terdeteksi)`,
                itemCount: result.itemCount,
            };
            addReport(report);
            setTransmitting(false);
            setTransmitted(true);
            if (onTransmitSuccess) onTransmitSuccess();
        }
    }, [result, transmitted, addReport, onTransmitSuccess]);

    const severityColor = result?.isTrashDetected
        ? result.itemCount >= 4 ? '#ff0055' : '#00e5ff'
        : '#00ff9d';

    return (
        <div className="max-w-4xl mx-auto">
            <GlassPanel className="p-6 sm:p-8 md:p-12 rounded-2xl relative shadow-2xl border-t-4 border-t-neon-green">
                {/* Header */}
                <div className="mb-8 md:mb-10 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-3">
                        AI <span className="text-neon-green">Vision Scanner</span>
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm font-mono">
                        Unggah citra visual ancaman lingkungan. AI akan mengekstraksi data material dan memproyeksikannya ke Radar Command Center.
                    </p>
                </div>

                {/* Guide */}
                <div className="mb-10 bg-dark-900/80 p-5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-neon-blue" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Panduan Input Visual AI</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-dark-800 border border-neon-green/30 rounded-lg p-3 flex gap-4 items-start">
                            <div className="w-24 h-16 shrink-0 rounded overflow-hidden relative border border-neon-green/50">
                                <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Benar" />
                                <div className="absolute top-1 right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-dark-900" />
                                </div>
                            </div>
                            <div>
                                <h5 className="text-neon-green font-bold text-[10px] md:text-[11px] uppercase mb-1">Dianjurkan</h5>
                                <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed font-mono">
                                    Foto lanskap memperlihatkan tumpukan sampah beserta konteks lingkungannya.
                                </p>
                            </div>
                        </div>
                        <div className="bg-dark-800 border border-red-500/30 rounded-lg p-3 flex gap-3 md:gap-4 items-start">
                            <div className="w-24 h-16 shrink-0 rounded overflow-hidden relative border border-red-500/50">
                                <img src="https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Salah" />
                                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                    <X className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h5 className="text-red-400 font-bold text-[10px] md:text-[11px] uppercase mb-1">Hindari</h5>
                                <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed font-mono">
                                    Foto objek terlalu close-up, gelap, atau hanya menunjukkan satu botol kecil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Zone */}
                <div
                    className="border-2 border-dashed border-neon-blue/60 rounded-xl bg-dark-900/60 p-8 sm:p-12 text-center cursor-pointer hover:bg-neon-blue/10 transition-all relative overflow-hidden group shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]"
                    onClick={() => phase === 'idle' && fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    {/* Idle State */}
                    {phase === 'idle' && (
                        <div className="relative z-10">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-dark-800 border border-neon-blue/40 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all">
                                <ScanLine className="text-neon-blue w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h4 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-widest">Inisialisasi Upload Citra</h4>
                            <p className="text-[10px] md:text-xs text-neon-blue font-mono tracking-widest">.JPG / .PNG ACCEPTED</p>
                        </div>
                    )}

                    {/* Scanning State */}
                    {phase === 'scanning' && (
                        <div className="flex flex-col items-center justify-center z-20 p-6">
                            <div className="relative w-full max-w-lg h-56 bg-dark-800 rounded-lg overflow-hidden border border-neon-green shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                                {previewUrl && (
                                    <img src={previewUrl} className="w-full h-full object-cover opacity-70 grayscale contrast-125" alt="Scanning" />
                                )}
                                {/* Scanner laser */}
                                <div className="absolute left-0 w-full h-1 bg-neon-green shadow-[0_0_20px_#00ff9d,0_0_40px_#00ff9d] animate-scan z-30" />
                            </div>
                            <div className="mt-6 flex items-center gap-3">
                                <Loader className="w-5 h-5 text-neon-green animate-spin" />
                                <p className="text-neon-green font-mono text-sm tracking-widest">ANALYZING YOLOV8_MODEL...</p>
                            </div>
                        </div>
                    )}

                    {/* Result shows below, keep zone clickable to re-scan */}
                    {phase === 'result' && (
                        <div className="relative z-10" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                            <div className="w-16 h-16 bg-dark-800 border border-neon-green/40 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-all">
                                <ScanLine className="text-neon-green w-8 h-8" />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-widest">Scan Ulang</h4>
                            <p className="text-[10px] text-neon-green font-mono tracking-widest">KLIK UNTUK UPLOAD CITRA BARU</p>
                        </div>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-mono">
                        ❌ Error: {error}
                    </div>
                )}

                {/* Result Output */}
                {phase === 'result' && result && (
                    <div className="mt-10 transition-opacity duration-500 opacity-100">
                        <h4 className="text-xs text-neon-blue font-bold uppercase tracking-widest mb-4 border-l-2 border-neon-blue pl-2 font-mono">
                            Terminal Output Data
                        </h4>

                        <div className="bg-dark-900 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                            {/* Status Header */}
                            <div
                                className="border-b p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                                style={{
                                    borderColor: `${severityColor}50`,
                                    background: `repeating-linear-gradient(45deg, ${severityColor}10, ${severityColor}10 10px, ${severityColor}20 10px, ${severityColor}20 20px)`,
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded flex items-center justify-center shadow-lg animate-pulse"
                                        style={{ background: severityColor, boxShadow: `0 0 20px ${severityColor}` }}
                                    >
                                        <Siren className="text-white w-7 h-7" />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-black uppercase tracking-widest text-sm">
                                            STATUS: {result.isTrashDetected ? (result.itemCount >= 4 ? 'KRITIS TINGKAT 1' : 'DETEKSI POSITIF') : 'AMAN'}
                                        </h5>
                                        <p className="text-xs font-mono mt-1" style={{ color: `${severityColor}cc` }}>
                                            {result.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-right bg-dark-900/80 p-2 rounded border" style={{ borderColor: `${severityColor}50` }}>
                                    <p className="text-[9px] font-mono tracking-widest" style={{ color: severityColor }}>VOLUME</p>
                                    <p className="text-sm text-white font-mono font-bold">{result.volume}</p>
                                </div>
                            </div>

                            {result.isTrashDetected && (
                                <div className="p-8 grid md:grid-cols-2 gap-10">
                                    {/* Analytics */}
                                    <div>
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs mb-2 font-mono font-bold">
                                                <span className="text-neon-blue tracking-widest">PLASTIC_POLYMER</span>
                                                <span className="text-white">{plasticWidth}</span>
                                            </div>
                                            <div className="w-full bg-dark-800 h-2 border border-neon-blue/30">
                                                <div className="bg-neon-blue h-full progress-bar shadow-[0_0_10px_#00e5ff]" style={{ width: plasticWidth }} />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs mb-2 font-mono font-bold">
                                                <span className="text-neon-green tracking-widest">ORGANIC_WASTE</span>
                                                <span className="text-white">{organicWidth}</span>
                                            </div>
                                            <div className="w-full bg-dark-800 h-2 border border-neon-green/30">
                                                <div className="bg-neon-green h-full progress-bar shadow-[0_0_10px_#00ff9d]" style={{ width: organicWidth }} />
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="mt-8 p-4 bg-dark-800 border border-white/10 rounded font-mono text-[10px] text-gray-400 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-neon-blue">DETEKSI_COUNT</span>
                                                <span className="text-white">{result.itemCount} TUMPUKAN</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neon-blue">EST_VOLUME</span>
                                                <span className="text-white">{result.volume?.toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neon-blue">BOUNDING_BOXES</span>
                                                <span className="text-white">{result.detail_boxes?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Panel */}
                                    <div className="bg-dark-800/60 p-6 rounded border border-neon-green/30 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] text-neon-green uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
                                                <Cpu className="w-4 h-4" /> System Recommendation
                                            </p>
                                            <p className="text-sm text-white font-bold mb-2 uppercase tracking-widest">
                                                {result.itemCount >= 4 ? 'Deploy Tim Gorong-gorong' : 'Dispatch Tim Kebersihan'}
                                            </p>
                                            <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                                                {result.itemCount >= 4
                                                    ? 'Lokasi membutuhkan pengerukan manual mendesak sebelum curah hujan ekstrem.'
                                                    : 'Diperlukan pembersihan area untuk mencegah akumulasi lebih lanjut.'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleTransmit}
                                            disabled={transmitting || transmitted}
                                            className={`w-full mt-6 py-4 font-bold uppercase tracking-widest text-[10px] rounded transition-all flex items-center justify-center gap-2 ${transmitted
                                                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 cursor-default'
                                                    : 'bg-neon-green hover:bg-white text-dark-900 shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
                                                }`}
                                        >
                                            {transmitting ? (
                                                <>
                                                    <Loader className="w-4 h-4 animate-spin" /> Transmisi...
                                                </>
                                            ) : transmitted ? (
                                                <>
                                                    <Check className="w-4 h-4" /> Berhasil Ditransmisikan ke Radar
                                                </>
                                            ) : (
                                                <>
                                                    <SatelliteDish className="w-4 h-4" /> Transmisikan Ke Radar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </GlassPanel>
        </div>
    );
}
