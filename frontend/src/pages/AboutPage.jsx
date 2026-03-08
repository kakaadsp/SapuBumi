import { ScanLine, Map, Siren, Trash2 } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';

const FEATURES = [
    {
        icon: ScanLine,
        title: 'YOLOv8 Vision',
        desc: 'Inovasi pendeteksian otomatis. Warga mengunggah foto, AI mengekstraksi jenis material dominan (Plastik/Organik) dan tingkat ancaman.',
        color: '#00e5ff',
        borderClass: 'border-t-[#00e5ff]',
    },
    {
        icon: Map,
        title: 'Spatial Mapping',
        desc: 'Data dipetakan spasial real-time. Mengoptimalkan pengerahan armada truk sampah ke titik kritis efisien tanpa menunggu laporan manual.',
        color: '#00ff9d',
        borderClass: 'border-t-neon-green',
    },
    {
        icon: Siren,
        title: 'Auto-Mitigation',
        desc: 'Memvalidasi masalah via partisipasi publik. Sistem otomatis menghitung estimasi volume dan rekomendasi armada untuk mencegah banjir.',
        color: '#ff0055',
        borderClass: 'border-t-[#ff0055]',
    },
];

export default function AboutPage() {
    return (
        <section className="container mx-auto px-6 pt-12 page-enter">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-widest text-white">
                    Inovasi{' '}
                    <span className="text-neon-blue glitch-text" data-text="TEKNOLOGI">
                        TEKNOLOGI
                    </span>
                </h2>
                <p className="text-gray-400 font-mono text-sm">
                    Arsitektur sistem mitigasi bencana banjir berbasis kecerdasan buatan.
                </p>
            </div>

            {/* SDG Explanation */}
            <GlassPanel className="p-8 rounded-xl border-l-4 border-l-neon-blue flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
                <div className="w-16 h-16 shrink-0 bg-neon-blue/10 rounded-xl flex items-center justify-center border border-neon-blue/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <Trash2 className="w-8 h-8 text-neon-blue" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Mengapa Spesifik Memantau Sampah Plastik?</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        Kami mendukung SDG 11 (Kota Berkelanjutan) dan SDG 14 (Ekosistem Air). Berdasarkan prinsip Software Engineering, Model Machine Learning (seperti YOLOv8) sangat akurat dalam mengidentifikasi pola material plastik non-organik. Dengan mengunci target deteksi pada tumpukan sampah liar yang menyumbat aliran drainase, data yang masuk ke Command Center sangat valid dan dapat langsung ditindaklanjuti secara efektif oleh Dinas Lingkungan Hidup.
                    </p>
                </div>
            </GlassPanel>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
                {FEATURES.map((feat) => (
                    <GlassPanel
                        key={feat.title}
                        className={`p-8 rounded-xl border-t-4 ${feat.borderClass} group`}
                    >
                        <div
                            className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 border"
                            style={{
                                background: `${feat.color}15`,
                                borderColor: `${feat.color}50`,
                                boxShadow: `0 0 15px ${feat.color}30`,
                            }}
                        >
                            <feat.icon className="w-8 h-8 group-hover:animate-pulse" style={{ color: feat.color }} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-widest">{feat.title}</h3>
                        <p className="text-gray-400 text-xs font-mono leading-relaxed">{feat.desc}</p>
                    </GlassPanel>
                ))}
            </div>
        </section>
    );
}
