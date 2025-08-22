import React, { useState } from 'react';
import { BackIcon } from '../constants';

// --- Icons ---
const PusatDataHeaderIcon: React.FC = () => (
    <div className="w-20 h-20 rounded-2xl bg-amber-400 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    </div>
);
const StatusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const PutusanIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.25 3.25l.707.707m16.086 16.086l.707.707" />
    </svg>
);
const PresedenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const KonsolidasiIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
);
const TerjemahanIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m4 13-4-4M19 17v-2a4 4 0 00-4-4H9.5M15 5a2 2 0 114 0 2 2 0 01-4 0zM19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const KaidahIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5l-2-2 2-2M18 4.5l2-2-2-2M6 19.5l-2 2 2 2M18 19.5l2 2-2 2" />
    </svg>
);


interface PusatDataProps {
    onBack: () => void;
}

const PlaceholderView: React.FC<{ title: string; onBack: () => void; }> = ({ title, onBack }) => (
    <div className="animate-fade-in-up">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6">
            <BackIcon />
            <span>Kembali ke Pusat Data</span>
        </button>
        <div className="bg-zinc-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-zinc-400 mt-2">Fitur ini sedang dalam pengembangan.</p>
        </div>
    </div>
);

const PusatData: React.FC<PusatDataProps> = ({ onBack }) => {
    const [activeFeature, setActiveFeature] = useState<string | null>(null);

    const features = [
        { id: 'status-keberlakuan', icon: <StatusIcon />, title: 'Status Keberlakuan', description: 'Cek sejarah dan status terbaru dari peraturan perundang-undangan.' },
        { id: 'pencari-putusan', icon: <PutusanIcon />, title: 'Pencari Putusan', description: 'Temukan putusan pengadilan relevan untuk memahami implementasi hukum.' },
        { id: 'pencari-preseden', icon: <PresedenIcon />, title: 'Pencari Preseden', description: 'Riset putusan dengan kaidah hukum sebagai rujukan memutus perkara serupa.' },
        { id: 'konsolidasi-peraturan', icon: <KonsolidasiIcon />, title: 'Konsolidasi Peraturan', description: 'Lihat naskah gabungan peraturan beserta semua amandemennya.' },
        { id: 'terjemahan-hukum', icon: <TerjemahanIcon />, title: 'Terjemahan Hukum', description: 'Terjemahkan dokumen atau teks hukum secara akurat (ID/EN).' },
        { id: 'kaidah-hukum', icon: <KaidahIcon />, title: 'Kaidah Hukum', description: 'Dapatkan penjelasan mendalam tentang adagium atau kaidah hukum dari Teguh Lita.' },
    ];
    
    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                {activeFeature ? (
                    <PlaceholderView 
                        title={features.find(f => f.id === activeFeature)?.title || 'Fitur'} 
                        onBack={() => setActiveFeature(null)} 
                    />
                ) : (
                    <div className="animate-fade-in-up">
                        <header className="text-center mb-12 relative">
                            <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                                <BackIcon />
                            </button>
                            <div className="flex justify-center mb-4">
                                <PusatDataHeaderIcon />
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                                Pusat Data
                            </h1>
                            <p className="mt-4 text-base text-zinc-400 max-w-2xl mx-auto">
                                Koleksi alat bantu riset hukum dari Teguh Lita untuk membantu analisis dan pemahaman peraturan perundang-undangan serta putusan pengadilan secara sistematis dan terintegrasi.
                            </p>
                        </header>
                        
                        <div className="space-y-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 flex flex-col">
                                    <div className="flex items-center gap-4">
                                        {feature.icon}
                                        <h2 className="text-xl font-bold text-white">{feature.title}</h2>
                                    </div>
                                    <p className="text-zinc-400 text-sm mt-3 mb-5 flex-grow">{feature.description}</p>
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => setActiveFeature(feature.id)}
                                            className="bg-amber-500 text-black font-semibold py-2.5 px-8 rounded-lg hover:bg-amber-400 transition-colors text-sm"
                                        >
                                            Gunakan Fitur
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PusatData;