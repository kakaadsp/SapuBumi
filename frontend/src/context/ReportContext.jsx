import { createContext, useContext, useState, useCallback } from 'react';

const ReportContext = createContext();

// Default seed data (dummy awal supaya peta tidak kosong)
const SEED_REPORTS = [
    {
        id: 'TKT-882',
        lat: -6.321,
        lng: 108.322,
        severity: 'KRITIS',
        volume: 'Banyak',
        message: 'Penyumbatan sungai Jembatan Merah. Plastik menutupi 80% gorong-gorong utama.',
        timestamp: new Date().toISOString(),
        itemCount: 5,
    },
    {
        id: 'TKT-801',
        lat: -6.328,
        lng: 108.335,
        severity: 'SELESAI',
        volume: 'Sedikit',
        message: 'Area hijau telah dibersihkan siang ini.',
        timestamp: new Date().toISOString(),
        itemCount: 0,
    },
    {
        id: 'TKT-790',
        lat: -6.315,
        lng: 108.310,
        severity: 'SEDANG',
        volume: 'Sedang',
        message: 'Selokan tersumbat plastik di area pasar.',
        timestamp: new Date().toISOString(),
        itemCount: 2,
    },
];

export function ReportProvider({ children }) {
    const [reports, setReports] = useState(SEED_REPORTS);

    const addReport = useCallback((report) => {
        const newReport = {
            id: `TKT-${String(Date.now()).slice(-4)}`,
            timestamp: new Date().toISOString(),
            ...report,
        };
        setReports((prev) => [newReport, ...prev]);
        return newReport;
    }, []);

    return (
        <ReportContext.Provider value={{ reports, addReport }}>
            {children}
        </ReportContext.Provider>
    );
}

export function useReports() {
    const ctx = useContext(ReportContext);
    if (!ctx) throw new Error('useReports must be used within a ReportProvider');
    return ctx;
}
