export default function RadarVisual() {
    return (
        <div className="glass-panel p-6 rounded-full w-full max-w-[350px] md:max-w-[550px] aspect-square flex items-center justify-center relative shadow-[0_0_40px_rgba(0,255,157,0.15)] border-neon-green/30">
            {/* Decorative rings */}
            <div className="absolute inset-2 border-2 border-dashed border-neon-green/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-6 border border-neon-blue/10 rounded-full animate-[spin_20s_linear_reverse_infinite]" />

            {/* Main radar */}
            <div className="radar-container w-full h-full rounded-full relative shadow-[0_0_50px_rgba(0,255,157,0.4)]">
                {/* Grid dots */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,255,157,0.3)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50" />

                {/* Concentric rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] border border-neon-green/50 rounded-full shadow-[0_0_15px_rgba(0,255,157,0.4)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-neon-green/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-neon-green/20 rounded-full border-dashed" />

                {/* Sweep & blips */}
                <div className="radar-sweep" />
                <div className="blip" style={{ top: '35%', left: '45%', animationDelay: '0.5s' }} />
                <div className="blip" style={{ top: '65%', left: '55%', animationDelay: '1.2s' }} />
                <div className="blip danger" style={{ top: '40%', left: '70%', animationDelay: '2.1s' }} />
            </div>
        </div>
    );
}
