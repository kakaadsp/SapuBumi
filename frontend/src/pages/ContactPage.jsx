import { MapPin, Mail, Send } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { useState } from 'react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 pt-12 pb-20 page-enter">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                {/* Info Side */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-black mb-2 uppercase text-white tracking-widest">
                            Terminal <span className="text-neon-blue">Komunikasi</span>
                        </h2>
                        <p className="text-gray-400 text-sm border-l-2 border-neon-blue pl-3 font-mono">
                            Bergabung sebagai Relawan Lingkungan atau integrasikan API Command Center ini ke sistem Pemda setempat.
                        </p>
                    </div>
                    <GlassPanel className="p-6 rounded-lg border-l-4 border-l-neon-green flex gap-4 items-start">
                        <MapPin className="text-neon-green w-6 h-6 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Pusat Komando</h4>
                            <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                Laboratorium RPL Polindra
                                <br />
                                Jl. Raya Lohbener Lama No.8, Indramayu
                            </p>
                        </div>
                    </GlassPanel>
                    <GlassPanel className="p-6 rounded-lg border-l-4 border-l-neon-blue flex gap-4 items-center">
                        <Mail className="text-neon-blue w-6 h-6 shrink-0" />
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Transmisi Surel</h4>
                            <p className="text-xs text-gray-400 font-mono">hello@sapubumi.tech</p>
                        </div>
                    </GlassPanel>
                </div>

                {/* Form Side */}
                <GlassPanel className="p-8 rounded-xl border border-white/5 relative">
                    <form onSubmit={handleSubmit} className="space-y-5 font-mono">
                        <div>
                            <label className="block text-[10px] font-bold text-neon-blue mb-2 uppercase tracking-widest">
                                Identitas Sistem
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="Nama / Instansi"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neon-blue mb-2 uppercase tracking-widest">
                                Protokol Kontak
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                                placeholder="Alamat Email Aktif"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neon-blue mb-2 uppercase tracking-widest">
                                Pesan Log
                            </label>
                            <textarea
                                rows={4}
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors resize-none"
                                placeholder="Masukkan transmisi pesan atau request API..."
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${submitted
                                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                                    : 'bg-neon-blue/20 hover:bg-neon-blue text-neon-blue hover:text-dark-900 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                                }`}
                        >
                            {submitted ? '✅ Transmisi Berhasil!' : (
                                <>
                                    Inisialisasi Kirim <Send className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </GlassPanel>
            </div>
        </section>
    );
}
