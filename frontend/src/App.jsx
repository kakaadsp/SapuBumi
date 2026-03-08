import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import KontenPage from './pages/KontenPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesBackground />

      {/* Ambient Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-green/10 rounded-full blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none z-[-1]" />

      <Navbar />

      <main className="flex-grow pt-28 pb-12 relative z-10" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inovasi" element={<AboutPage />} />
          <Route path="/operasi" element={<KontenPage />} />
          <Route path="/kontak" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
