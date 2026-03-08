import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radar, Menu, X, Home, Info, Terminal, Mail } from 'lucide-react';

const NAV_ITEMS = [
    { path: '/', label: 'Beranda', id: 'home', icon: Home },
    { path: '/inovasi', label: 'Inovasi', id: 'about', icon: Info },
    { path: '/operasi', label: 'Modul Operasi', id: 'konten', icon: Terminal },
    { path: '/kontak', label: 'Kontak', id: 'contact', icon: Mail },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className="fixed w-full top-0 z-50 glass-panel border-b border-neon-green/20">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
                        <div className="relative w-10 h-10 rounded-lg bg-dark-800 border border-neon-green/50 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,255,157,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,157,0.6)] transition-all">
                            <Radar className="text-neon-green w-6 h-6 animate-pulse-glow" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-widest text-white leading-tight">
                                SAPU<span className="text-neon-green">BUMI</span>
                            </span>
                            <span className="text-[0.6rem] text-neon-blue tracking-[0.3em] font-mono">SYS_COMMAND</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-8 relative text-sm uppercase tracking-widest font-bold">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`nav-link relative text-gray-400 hover:text-neon-green transition-colors py-1 ${isActive(item.path) ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/operasi"
                            className="px-5 py-2 rounded bg-neon-green/10 hover:bg-neon-green/30 text-neon-green font-mono font-bold border border-neon-green transition-all shadow-[0_0_15px_rgba(0,255,157,0.3)] flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" /> Live Radar
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-neon-green" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 bg-dark-900/95 backdrop-blur-xl z-40 pt-24 px-6 flex flex-col gap-6 font-mono font-bold uppercase text-xl">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className="text-white border-b border-white/10 pb-4 text-left flex items-center gap-2"
                        >
                            <item.icon className="w-5 h-5 text-neon-green" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
