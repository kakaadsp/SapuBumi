import { Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import RadarVisual from '../components/RadarVisual';

export default function HomePage() {
    return (
        <section className="container mx-auto px-6 pt-6 md:pt-12 page-enter">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                {/* Left Content */}
                <div className="space-y-6 md:space-y-8 z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neon-blue/10 border-l-4 border-neon-blue text-neon-blue text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        Sistem Pemantauan Cerdas • Techsoft 2026
                    </div>

                    {/* Glitch Headline */}
                    <div className="glitch-wrapper w-full">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter uppercase glitch-text"
                            data-text="Deteksi Krisis"
                        >
                            Deteksi{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
                                Krisis
                            </span>
                            <br />
                            Lingkungan.
                        </h1>
                    </div>

                    {/* Typing text */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg leading-relaxed border-l-2 border-neon-green pl-4 font-mono border-transparent mx-auto lg:mx-0 text-left">
                        Memetakan penumpukan sampah plastik penyebab banjir secara real-time via AI Command Center.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6 font-mono text-sm w-full lg:w-auto">
                        <Link
                            to="/operasi"
                            className="w-full sm:w-auto px-8 py-4 bg-neon-green hover:bg-white text-dark-900 font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(0,255,157,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:-translate-y-1"
                        >
                            <Scan className="w-5 h-5" /> Inisialisasi AI
                        </Link>
                        <Link
                            to="/inovasi"
                            className="w-full sm:w-auto px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-neon-green/50 text-neon-green font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                            Pelajari Sistem
                        </Link>
                    </div>
                </div>

                {/* Right: Radar */}
                <div className="relative w-full flex justify-center items-center p-4 md:p-0 mt-8 lg:mt-0">
                    <RadarVisual />
                </div>
            </div>
        </section>
    );
}
