
import React, { useState } from 'react';
import BuatDraftDokumen from './BuatDraftDokumen';
import AnalisaHukum from './AnalisaHukum';
import BuatBerkasHukum from './BuatBerkasHukum';
import RegulatoryCompliance from './RegulatoryCompliance';
import DocumentManagement from './DocumentManagement';
import { BackIcon } from '../constants';
import PusatData from './PusatData';

// --- Icons for Hub Cards ---
const DraftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const AnalyzeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const GavelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const ComplianceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22a12.02 12.02 0 009-1.056c.343-.344.672-.698.988-1.06l-3.32-3.32z" />
    </svg>
);

const DmsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
);

const PusatDataIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0V5.625c0 .621.504 1.125 1.125 1.125H12m0 0V8.25m0 0H12M8.25 6H6.75a2.25 2.25 0 0 0-2.25 2.25v7.5a2.25 2.25 0 0 0 2.25 2.25h3.75a2.25 2.25 0 0 0 2.25-2.25V11.25m0-4.5h3.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-3.75m-9-1.5h15" />
    </svg>
);


type ActiveTool = 'hub' | 'draft' | 'analisa' | 'berkas' | 'compliance' | 'dms' | 'pusat-data';

interface AlatHukumProps {
    onBackToHome: () => void;
}

const AlatHukum: React.FC<AlatHukumProps> = ({ onBackToHome }) => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('hub');
    const [hasAccess, setHasAccess] = useState(true); // Changed to true to bypass access gate
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    const handleAccessCheck = () => {
        // In a real app, this would be an API call to validate the code.
        // For this demo, we check against a predefined list of valid codes.
        // This list includes codes that can be "generated" in the admin backend.
        const validCodes = ['PEMBASMI2024', 'PEM-LIFETIME-DEMO', 'PEM-MONTHLY-DEMO'];
        if (validCodes.includes(accessCode)) {
            setHasAccess(true);
            setError('');
        } else {
            setError('Kode akses tidak valid. Silakan coba lagi.');
        }
    };

    const renderAccessGateway = () => (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
                <LockIcon />
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4">Akses Fitur Premium: Alat Hukum</h1>
                <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
                    Tingkatkan produktivitas Anda dengan alat hukum berbasis Pembasmi Virtual. Diperlukan langganan untuk mengakses fitur ini.
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                        <h2 className="text-xl font-bold text-white">Bulanan</h2>
                        <p className="text-3xl font-bold text-amber-400 my-2">Rp 250rb</p>
                        <p className="text-zinc-400 text-sm">Akses penuh ke semua alat hukum, diperpanjang setiap bulan.</p>
                        <button className="mt-4 w-full bg-zinc-700 text-white font-semibold py-2 rounded-lg hover:bg-zinc-600">Pilih Paket</button>
                    </div>
                     <div className="bg-zinc-800 p-6 rounded-xl border-2 border-amber-500 relative">
                        <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full">TERBAIK</span>
                        <h2 className="text-xl font-bold text-white">Selamanya</h2>
                        <p className="text-3xl font-bold text-amber-400 my-2">Rp 2jt</p>
                        <p className="text-zinc-400 text-sm">Satu kali pembayaran untuk akses tanpa batas selamanya.</p>
                        <button className="mt-4 w-full bg-amber-500 text-zinc-900 font-bold py-2 rounded-lg hover:bg-amber-400">Pilih Paket</button>
                    </div>
                </div>

                <div className="mt-10 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-zinc-300">Sudah Melakukan Pembayaran?</h3>
                    <p className="text-sm text-zinc-500 mb-4">Masukkan kode akses yang Anda terima untuk membuka fitur.</p>
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Masukkan kode akses..."
                            className="flex-grow bg-zinc-700 text-white placeholder-zinc-400 p-3 rounded-lg border border-zinc-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                        <button onClick={handleAccessCheck} className="px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400">
                            Gunakan
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                 <button onClick={onBackToHome} className="mt-12 text-zinc-400 hover:text-white transition-colors text-sm">
                    &larr; Kembali ke Beranda
                </button>
            </div>
        </div>
    );

    const renderHub = () => (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12 relative">
                     <button onClick={onBackToHome} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                        <BackIcon />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Pusat Alat Hukum <span className="text-amber-400">PEMBASMI</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto">
                        Pilih alat yang Anda butuhkan untuk mempercepat dan mempermudah pekerjaan hukum Anda.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<PusatDataIcon />}
                        title="Pusat Data"
                        description="Koleksi alat bantu riset hukum untuk analisis peraturan dan putusan pengadilan."
                        onClick={() => setActiveTool('pusat-data')}
                    />
                    <FeatureCard
                        icon={<DraftIcon />}
                        title="Buat Draf Dokumen"
                        description="Hasilkan berbagai draf dokumen hukum seperti surat kuasa, somasi, atau perjanjian dengan cepat."
                        onClick={() => setActiveTool('draft')}
                    />
                    <FeatureCard
                        icon={<AnalyzeIcon />}
                        title="Analisa Dokumen Hukum"
                        description="Unggah dokumen (PDF, Word, Gambar) dan ajukan pertanyaan untuk mendapatkan analisis dan solusi."
                        onClick={() => setActiveTool('analisa')}
                    />
                    <FeatureCard
                        icon={<GavelIcon />}
                        title="Buat Berkas Persidangan"
                        description="Siapkan berkas hukum untuk pengadilan seperti Replik, Duplik, dan dokumen persidangan lainnya."
                        onClick={() => setActiveTool('berkas')}
                    />
                    <FeatureCard
                        icon={<ComplianceIcon />}
                        title="Regulatory Compliance"
                        description="Pantau kepatuhan perusahaan terhadap peraturan perundang-undangan secara komprehensif melalui Pembasmi Virtual."
                        onClick={() => setActiveTool('compliance')}
                    />
                    <FeatureCard
                        icon={<DmsIcon />}
                        title="Document Management"
                        description="Kelola dokumen perusahaan dalam satu platform terintegrasi untuk efisiensi dan efektivitas kerja."
                        onClick={() => setActiveTool('dms')}
                    />
                </div>
                 <footer className="text-center p-6 text-xs text-zinc-500 mt-12">
                    &copy; {new Date().getFullYear()} PEMBASMI. Semua alat dirancang untuk membantu, namun tetap memerlukan tinjauan profesional.
                </footer>
            </div>
        </div>
    );

    const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
        <div 
            onClick={onClick}
            className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-zinc-700 hover:border-amber-500 hover:scale-105"
        >
            {icon}
            <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
            <p className="text-zinc-400 text-sm mb-6 flex-grow">{description}</p>
            <span className="mt-auto bg-amber-500 text-zinc-900 font-bold py-2 px-6 rounded-lg text-sm">
                Gunakan Alat
            </span>
        </div>
    );

    if (!hasAccess) {
        return renderAccessGateway();
    }

    switch (activeTool) {
        case 'draft':
            return <BuatDraftDokumen onBack={() => setActiveTool('hub')} />;
        case 'analisa':
            return <AnalisaHukum onBack={() => setActiveTool('hub')} />;
        case 'berkas':
            return <BuatBerkasHukum onBack={() => setActiveTool('hub')} />;
        case 'compliance':
            return <RegulatoryCompliance onBack={() => setActiveTool('hub')} />;
        case 'dms':
            return <DocumentManagement onBack={() => setActiveTool('hub')} />;
        case 'pusat-data':
            return <PusatData onBack={() => setActiveTool('hub')} />;
        case 'hub':
        default:
            return renderHub();
    }
};

export default AlatHukum;