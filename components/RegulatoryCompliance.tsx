
import React, { useState } from 'react';
import { BackIcon } from '../constants';

// Icons
const LoadingIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const ShieldCheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22a12.02 12.02 0 009-1.056c.343-.344.672-.698.988-1.06l-3.32-3.32z" />
    </svg>
);

interface RegulatoryComplianceProps {
    onBack: () => void;
}

const RegulatoryCompliance: React.FC<RegulatoryComplianceProps> = ({ onBack }) => {
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState('');

    const handleAnalyze = () => {
        if (!companyName || !industry) return;
        setIsLoading(true);
        setReport('');
        setTimeout(() => {
            setReport(`
## Laporan Kepatuhan Awal untuk ${companyName}

**Sektor Industri:** ${industry}
**Tanggal Analisis:** ${new Date().toLocaleDateString('id-ID')}

**Ringkasan:**
Berdasarkan analisis awal, ditemukan beberapa area potensial yang memerlukan perhatian lebih lanjut untuk memastikan kepatuhan penuh terhadap regulasi yang berlaku di Indonesia.

**1. Kepatuhan Lingkungan (Potensi Risiko: Sedang)**
- Perlu diverifikasi: Izin Analisis Mengenai Dampak Lingkungan (AMDAL) untuk operasi terbaru.
- Rekomendasi: Lakukan audit internal terhadap pengelolaan limbah B3 sesuai PP No. 22 Tahun 2021.

**2. Kepatuhan Ketenagakerjaan (Potensi Risiko: Rendah)**
- Perjanjian Kerja Waktu Tertentu (PKWT) terindikasi sesuai dengan UU Cipta Kerja.
- Rekomendasi: Pastikan pendaftaran semua karyawan dalam program BPJS Ketenagakerjaan dan Kesehatan telah lengkap.

**3. Kepatuhan Perlindungan Data (Potensi Risiko: Tinggi)**
- Perlu dipastikan: Kebijakan privasi perusahaan telah selaras dengan UU Pelindungan Data Pribadi (PDP).
- Rekomendasi: Tunjuk Petugas Perlindungan Data (DPO) jika perusahaan Anda memenuhi kriteria.

---
*Disclaimer: Laporan ini dihasilkan oleh Pembasmi Virtual dan bersifat simulasi. Ini bukan merupakan nasihat hukum dan memerlukan verifikasi oleh profesional hukum.*
            `);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10 relative">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                        <BackIcon />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Regulatory Compliance <span className="text-amber-400">System</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Pantau kepatuhan perusahaan terhadap peraturan perundang-undangan secara komprehensif.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-6 border border-zinc-700">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-zinc-300">Nama Perusahaan</label>
                            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Contoh: PT. Angin Ribut" className="w-full bg-zinc-700 p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-zinc-300">Sektor Industri</label>
                            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-zinc-700 p-2 rounded-md appearance-none">
                                <option value="">Pilih Sektor</option>
                                <option value="Teknologi">Teknologi</option>
                                <option value="Manufaktur">Manufaktur</option>
                                <option value="Keuangan">Keuangan</option>
                                <option value="Pertambangan">Pertambangan</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button onClick={handleAnalyze} disabled={isLoading || !companyName || !industry} className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 disabled:bg-zinc-600">
                            {isLoading ? <LoadingIcon /> : <ShieldCheckIcon />}
                            <span className="ml-2">Mulai Analisis Kepatuhan</span>
                        </button>
                    </div>
                </div>

                <div className="mt-10 min-h-[10rem]">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Menganalisis data kepatuhan...</p>
                        </div>
                    )}
                    {report && (
                         <div className="bg-zinc-800 rounded-xl border border-zinc-700">
                            <header className="p-4 border-b border-zinc-700">
                                <h2 className="text-xl font-bold text-amber-400">Laporan Analisis Kepatuhan</h2>
                            </header>
                            <div className="p-6 text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono text-sm bg-black/20 rounded-b-xl">
                                {report}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegulatoryCompliance;