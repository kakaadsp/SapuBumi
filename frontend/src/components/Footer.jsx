import { Radar } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-dark-900/80 backdrop-blur-md py-6 mt-auto font-mono text-[10px] text-gray-500 uppercase tracking-widest relative z-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Radar className="text-neon-green w-4 h-4" />
                    <span className="font-bold text-white">SYS_V1.0 SAPU BUMI</span>
                </div>
                <p>Dibangun untuk Techsoft 2026. Hak Cipta © SapuBumi Team.</p>
                <div className="flex items-center gap-2 text-neon-green">
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#00ff9d]" />
                    SERVER OK
                </div>
            </div>
        </footer>
    );
}
