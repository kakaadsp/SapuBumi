import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="fixed inset-0 z-[-2]"
            options={{
                particles: {
                    number: { value: 60, density: { enable: true, width: 800, height: 800 } },
                    color: { value: ['#00ff9d', '#00e5ff'] },
                    shape: { type: 'circle' },
                    opacity: { value: { min: 0.1, max: 0.5 } },
                    size: { value: { min: 1, max: 3 } },
                    links: {
                        enable: true, distance: 150, color: '#00e5ff',
                        opacity: 0.2, width: 1,
                    },
                    move: { enable: true, speed: 1, direction: 'none', outModes: 'out' },
                },
                interactivity: {
                    detectsOn: 'canvas',
                    events: {
                        onHover: { enable: true, mode: 'grab' },
                        onClick: { enable: true, mode: 'push' },
                        resize: { enable: true },
                    },
                    modes: {
                        grab: { distance: 200, links: { opacity: 0.5 } },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
