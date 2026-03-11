<p align="center">
  <img src="src/assets/sapubumi-logo.png" alt="SapuBumi Logo" width="120" />
</p>

<h1 align="center">🖥️ SapuBumi — Frontend</h1>

<p align="center">
  Aplikasi web <b>Environmental Command Center</b> berbasis React + Vite
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
</p>

> 🔙 **[← Kembali ke README Utama](../README.md)**

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** ≥ 18
- **npm** (bawaan Node.js)

### Instalasi & Jalankan

```bash
# 1. Masuk ke folder frontend
cd frontend

# 2. Install semua dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Script Tersedia

| Script | Perintah | Keterangan |
|--------|----------|------------|
| **Dev** | `npm run dev` | Menjalankan development server dengan HMR |
| **Build** | `npm run build` | Build untuk production |
| **Preview** | `npm run preview` | Preview hasil build production |
| **Lint** | `npm run lint` | Jalankan ESLint untuk cek kualitas kode |

---

## 📦 Library yang Digunakan

### Dependencies (Production)

| Library | Versi | Kegunaan |
|---------|-------|----------|
| **react** | ^19.2.0 | Library UI utama |
| **react-dom** | ^19.2.0 | Rendering React ke DOM |
| **react-router-dom** | ^7.13.1 | Routing & navigasi antar halaman |
| **tailwindcss** | ^4.2.1 | Utility-first CSS framework |
| **@tailwindcss/vite** | ^4.2.1 | Plugin integrasi Tailwind dengan Vite |
| **leaflet** | ^1.9.4 | Library peta interaktif |
| **react-leaflet** | ^5.0.0 | Wrapper React untuk Leaflet |
| **lucide-react** | ^0.577.0 | Ikon modern berbasis SVG |
| **@tsparticles/react** | ^3.0.0 | Komponen React untuk efek partikel |
| **@tsparticles/slim** | ^3.9.1 | Engine partikel versi ringan |

### DevDependencies (Development)

| Library | Versi | Kegunaan |
|---------|-------|----------|
| **vite** | ^7.3.1 | Build tool & dev server |
| **@vitejs/plugin-react** | ^5.1.1 | Plugin React untuk Vite (Babel/Fast Refresh) |
| **eslint** | ^9.39.1 | Linter untuk JavaScript |
| **@eslint/js** | ^9.39.1 | Konfigurasi default ESLint |
| **eslint-plugin-react-hooks** | ^7.0.1 | Aturan lint untuk React Hooks |
| **eslint-plugin-react-refresh** | ^0.4.24 | Aturan lint untuk React Fast Refresh |
| **globals** | ^16.5.0 | Definisi global variables untuk ESLint |
| **@types/react** | ^19.2.7 | Type definitions React |
| **@types/react-dom** | ^19.2.3 | Type definitions React DOM |

---

## 📂 Struktur Folder

```
frontend/
├── public/                     # File statis & favicon
├── src/
│   ├── assets/                 # Logo & gambar
│   ├── components/             # Komponen reusable
│   │   ├── AIScanner.jsx       # Modul upload & AI detection
│   │   ├── InteractiveMap.jsx  # Peta Leaflet interaktif
│   │   ├── Navbar.jsx          # Navigasi utama
│   │   ├── RadarVisual.jsx     # Animasi radar
│   │   ├── ParticlesBackground.jsx
│   │   ├── GlassPanel.jsx      # Panel glassmorphism
│   │   ├── GlitchText.jsx      # Efek teks glitch
│   │   └── Footer.jsx
│   ├── context/                # React Context (ReportContext)
│   ├── pages/                  # Halaman aplikasi
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── AboutPage.jsx       # Halaman inovasi teknologi
│   │   ├── KontenPage.jsx      # Modul operasi (Radar + AI)
│   │   └── ContactPage.jsx     # Halaman kontak
│   ├── App.jsx                 # Root component & routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & design tokens
├── vercel.json                 # Konfigurasi deployment Vercel
└── package.json                # Dependencies & scripts
```

---

## ⚙️ Environment Variables

Buat file `.env` di folder `frontend/` untuk konfigurasi opsional:

```env
# URL API Backend (default: HuggingFace Spaces)
VITE_API_URL=http://localhost:7860
```

> **💡 Tip:** Secara default, frontend mengarahkan request AI ke API yang di-deploy di HuggingFace Spaces. Gunakan variabel di atas hanya jika ingin menggunakan backend lokal.

---

## 🌐 Deployment

Frontend di-deploy menggunakan **Vercel** di [https://sapubumi.vercel.app](https://sapubumi.vercel.app/)

---

<p align="center">
  🔙 <b><a href="../README.md">← Kembali ke README Utama</a></b>
</p>

<p align="center">
  Dibuat dengan 💚 oleh <b>Tim Sapu Bumi</b> — UPN Veteran Jawa Timur
</p>
