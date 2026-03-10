<p align="center">
  <img src="frontend/src/assets/sapubumi-logo.png" alt="SapuBumi Logo" width="160" />
</p>

<h1 align="center">🌍 SapuBumi</h1>

<p align="center">
  <b>Environmental Command Center — Sistem Pemantauan Cerdas untuk Deteksi Krisis Lingkungan Berbasis AI</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/YOLOv8-Ultralytics-blue?logo=yolo" alt="YOLOv8" />
  <img src="https://img.shields.io/badge/Hugging_Face-Spaces-FFD21E?logo=huggingface&logoColor=black" alt="HuggingFace" />
</p>

---

## 📖 Tentang Proyek

**SapuBumi** adalah platform *command center* berbasis web yang memanfaatkan kecerdasan buatan (AI) untuk mendeteksi dan memantau tumpukan sampah plastik yang berpotensi menyumbat drainase dan menyebabkan banjir. Proyek ini mendukung **SDG 11** *(Kota dan Komunitas Berkelanjutan)* dan **SDG 14** *(Ekosistem Perairan)*.

> 🎯 **Misi:** Memetakan penumpukan sampah plastik penyebab banjir secara real-time via AI Command Center.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🤖 **AI Scanner (YOLOv8)** | Upload foto → AI mendeteksi tumpukan sampah secara otomatis, menghitung volume, dan level ancaman |
| 🗺️ **Peta Interaktif** | Visualisasi spasial real-time menggunakan Leaflet untuk memetakan titik-titik sampah yang dilaporkan |
| 📡 **Radar Visual** | Animasi radar futuristik yang menampilkan status pemantauan sistem |
| 📊 **Live Data Log** | Daftar laporan aktif dengan status severity (KRITIS / AKTIF / SELESAI) secara real-time |
| 🚨 **Auto-Mitigation** | Estimasi otomatis volume sampah dan rekomendasi pengerahan armada untuk pencegahan banjir |
| 🎨 **UI Futuristik** | Desain dark-mode dengan efek neon-glow, glassmorphism, glitch text, dan animasi partikel |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  React 19 + Tailwind CSS 4 + Vite 7                    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Beranda  │  │ Inovasi  │  │ Operasi  │  │ Kontak  │ │
│  │ (Home)   │  │ (About)  │  │ (Radar   │  │(Contact)│ │
│  │          │  │          │  │  & AI    │  │         │ │
│  │          │  │          │  │ Scanner) │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                       │                                 │
│              REST API │ POST /deteksi                   │
└───────────────────────┼─────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────┐
│                  BACKEND (HuggingFace Spaces)           │
│  FastAPI + Gradio + YOLOv8 (best.pt)                    │
│                                                         │
│  GET  /api      → Health Check                          │
│  POST /deteksi  → Upload gambar → Hasil deteksi JSON    │
│  GET  /         → Gradio Web UI                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** ≥ 18
- **Python** ≥ 3.9
- **Git**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kakaadsp/SapuBumi.git
cd SapuBumi
```

### 2️⃣ Jalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 3️⃣ Jalankan Backend (Opsional — untuk AI Detection lokal)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend akan berjalan di `http://localhost:7860`

> **💡 Tip:** Secara default, frontend mengarahkan request AI ke API yang di-deploy di HuggingFace Spaces. Jika ingin menggunakan backend lokal, atur variabel environment `VITE_API_URL=http://localhost:7860` di file `.env` pada folder `frontend/`.

---

## 📂 Struktur Proyek

```
SapuBumi/
├── frontend/                    # Aplikasi web React
│   ├── public/                  # File statis & favicon
│   ├── src/
│   │   ├── assets/              # Logo & gambar
│   │   ├── components/          # Komponen reusable
│   │   │   ├── AIScanner.jsx    # Modul upload & AI detection
│   │   │   ├── InteractiveMap.jsx # Peta Leaflet interaktif
│   │   │   ├── Navbar.jsx       # Navigasi utama
│   │   │   ├── RadarVisual.jsx  # Animasi radar
│   │   │   ├── ParticlesBackground.jsx
│   │   │   ├── GlassPanel.jsx   # Panel glassmorphism
│   │   │   ├── GlitchText.jsx   # Efek teks glitch
│   │   │   └── Footer.jsx
│   │   ├── context/             # React Context (ReportContext)
│   │   ├── pages/               # Halaman aplikasi
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── AboutPage.jsx    # Halaman inovasi teknologi
│   │   │   ├── KontenPage.jsx   # Modul operasi (Radar + AI)
│   │   │   └── ContactPage.jsx  # Halaman kontak
│   │   ├── App.jsx              # Root component & routing
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles & design tokens
│   └── package.json
│
├── backend/                     # API Backend
│   ├── app.py                   # FastAPI + Gradio server
│   ├── Dockerfile               # Container untuk HuggingFace
│   └── requirements.txt         # Dependensi Python
│
├── best.pt                      # Model YOLOv8 (trained weights)
└── README.md
```

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Layer</th>
    <th>Teknologi</th>
  </tr>
  <tr>
    <td><b>Frontend</b></td>
    <td>React 19, Tailwind CSS 4, Vite 7, React Router, Leaflet, Lucide Icons, tsParticles</td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>Python, FastAPI, Gradio, Ultralytics YOLOv8, OpenCV, Pillow</td>
  </tr>
  <tr>
    <td><b>AI Model</b></td>
    <td>YOLOv8 (Custom trained untuk deteksi tumpukan sampah)</td>
  </tr>
  <tr>
    <td><b>Deployment</b></td>
    <td>Hugging Face Spaces (Backend), Vercel/Netlify ready (Frontend)</td>
  </tr>
</table>

---

## 🌐 API Endpoints

| Method | Endpoint   | Deskripsi                                      |
|--------|------------|-------------------------------------------------|
| `GET`  | `/api`     | Health check — memastikan API aktif             |
| `POST` | `/deteksi` | Upload gambar untuk deteksi sampah via AI       |
| `GET`  | `/`        | Gradio Web Interface untuk testing interaktif   |

### Contoh Response `POST /deteksi`

```json
{
  "status": "sukses",
  "isTrashDetected": true,
  "itemCount": 3,
  "volume": "Sedang",
  "message": "Valid. Terdeteksi 3 tumpukan.",
  "detail_boxes": [
    {
      "label": "Tumpukan Sampah",
      "confidence": "87.5%",
      "box": { "x1": 120.5, "y1": 80.3, "x2": 350.2, "y2": 290.7 }
    }
  ]
}
```

---

## 🎯 SDG yang Didukung

<table>
  <tr>
    <td align="center"><b>SDG 11</b><br/>Kota dan Komunitas<br/>Berkelanjutan</td>
    <td align="center"><b>SDG 14</b><br/>Ekosistem<br/>Perairan</td>
  </tr>
  <tr>
    <td>Memantau dan mengurangi tumpukan sampah liar yang mengganggu lingkungan perkotaan dan menyebabkan banjir.</td>
    <td>Mencegah sampah plastik masuk ke aliran air dan mencemari ekosistem perairan.</td>
  </tr>
</table>

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan fork repository ini dan buat pull request.

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dibuat untuk kompetisi **Techsoft 2026**.

---

<p align="center">
  Dibuat dengan 💚 oleh <b>Tim SapuBumi</b>
</p>