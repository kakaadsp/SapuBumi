import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useReports } from '../context/ReportContext';

// Custom marker icons
const createIcon = (color) =>
    L.divIcon({
        className: '',
        html: `<div style="
      width:16px;height:16px;border-radius:50%;
      background:${color};
      box-shadow:0 0 12px ${color}, 0 0 24px ${color};
      border:2px solid ${color === '#ff0055' ? '#fff' : '#060b14'};
    "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -12],
    });

const ICONS = {
    KRITIS: createIcon('#ff0055'),
    SEDANG: createIcon('#00e5ff'),
    SELESAI: createIcon('#00ff9d'),
};

// Sub-component to handle map clicks
function MapClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            if (onMapClick) onMapClick(e.latlng);
        },
    });
    return null;
}

export default function InteractiveMap({ onMapClick, className = '', style }) {
    const { reports } = useReports();

    // Center on Indramayu area
    const center = [-6.321, 108.322];

    return (
        <MapContainer
            center={center}
            zoom={14}
            className={`w-full h-full ${className}`}
            style={{ minHeight: '350px', ...style }}
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <MapClickHandler onMapClick={onMapClick} />

            {reports.map((report) => (
                <Marker
                    key={report.id}
                    position={[report.lat, report.lng]}
                    icon={ICONS[report.severity] || ICONS.SEDANG}
                >
                    <Popup>
                        <div className="font-mono text-xs space-y-2 min-w-[200px]">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-neon-green">{report.id}</span>
                                <span
                                    className="px-2 py-0.5 rounded text-[9px] font-bold"
                                    style={{
                                        background:
                                            report.severity === 'KRITIS'
                                                ? 'rgba(255,0,85,0.8)'
                                                : report.severity === 'SEDANG'
                                                    ? 'rgba(0,229,255,0.3)'
                                                    : 'rgba(0,255,157,0.3)',
                                        color: '#fff',
                                    }}
                                >
                                    {report.severity}
                                </span>
                            </div>
                            <p className="text-gray-300 text-[11px]">{report.message}</p>
                            <div className="flex justify-between text-[9px] text-gray-400 border-t border-white/10 pt-1">
                                <span>Vol: {report.volume}</span>
                                <span>{new Date(report.timestamp).toLocaleTimeString('id-ID')}</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
