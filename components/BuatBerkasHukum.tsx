import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Icons ---
const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const LoadingIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const ErrorIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);
const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface BuatBerkasHukumProps {
    onBack: () => void;
}

const BuatBerkasHukum: React.FC<BuatBerkasHukumProps> = ({ onBack }) => {
    const [berkasType, setBerkasType] = useState('replik');
    const [caseInfo, setCaseInfo] = useState({
        nomorPerkara: '',
        pengadilan: '',
        penggugat: '',
        tergugat: ''
    });
    const [mainPoints, setMainPoints] = useState('');
    const [generatedBerkas, setGeneratedBerkas] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const berkasTypes = [
        { id: 'replik', label: 'Replik' },
        { id: 'duplik', label: 'Duplik' },
        { id: 'kesimpulan', label: 'Kesimpulan' },
        { id: 'pledoi', label: 'Pledoi' },
        { id: 'surat-gugatan-lainnya', label: 'Gugatan Lainnya' },
    ];
    
    const handleGenerate = async () => {
        if (!mainPoints.trim() || !caseInfo.penggugat.trim() || !caseInfo.tergugat.trim()) {
            setError('Harap isi Penggugat, Tergugat, dan Poin-poin Utama untuk melanjutkan.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedBerkas('');
        setIsCopied(false);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten hukum ahli litigasi di Indonesia. Tugas Anda adalah membuat draf berkas hukum untuk persidangan.
            
            Instruksi: Buatlah draf **${berkasTypes.find(b => b.id === berkasType)?.label}** berdasarkan data berikut. Pastikan format dokumen (judul, pembuka, isi, penutup, hormat kami, tanda tangan) sesuai dengan standar yang berlaku di pengadilan Indonesia.
            
            - **Jenis Berkas**: ${berkasTypes.find(b => b.id === berkasType)?.label}
            - **Nomor Perkara**: ${caseInfo.nomorPerkara || '[Nomor Perkara]'}
            - **Pengadilan**: ${caseInfo.pengadilan || '[Nama Pengadilan]'}
            - **Penggugat**: ${caseInfo.penggugat}
            - **Tergugat**: ${caseInfo.tergugat}
            - **Poin-poin Kunci / Argumen Utama yang Harus Dimasukkan**:
            ${mainPoints}
            
            Silakan buat draf berkas persidangan secara lengkap.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setGeneratedBerkas(response.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat membuat berkas. Mohon periksa koneksi Anda dan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedBerkas);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10 relative">
                     <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                        <BackIcon />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Pembuat Berkas <span className="text-amber-400">Persidangan</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Siapkan draf Replik, Duplik, Kesimpulan, dan berkas lainnya dengan lebih efisien.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-6 border border-zinc-700">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">1. Pilih Jenis Berkas</label>
                        <div className="flex flex-wrap gap-2">
                            {berkasTypes.map(b => (
                                <button
                                    key={b.id}
                                    onClick={() => setBerkasType(b.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${berkasType === b.id ? 'bg-amber-500 text-zinc-900 shadow-md' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">2. Informasi Perkara</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input type="text" value={caseInfo.nomorPerkara} onChange={e => setCaseInfo({...caseInfo, nomorPerkara: e.target.value})} placeholder="Nomor Perkara (Opsional)" className="w-full bg-zinc-700 p-2 rounded-md" />
                            <input type="text" value={caseInfo.pengadilan} onChange={e => setCaseInfo({...caseInfo, pengadilan: e.target.value})} placeholder="Pengadilan (Opsional)" className="w-full bg-zinc-700 p-2 rounded-md" />
                            <input type="text" value={caseInfo.penggugat} onChange={e => setCaseInfo({...caseInfo, penggugat: e.target.value})} placeholder="Penggugat*" className="w-full bg-zinc-700 p-2 rounded-md" />
                            <input type="text" value={caseInfo.tergugat} onChange={e => setCaseInfo({...caseInfo, tergugat: e.target.value})} placeholder="Tergugat*" className="w-full bg-zinc-700 p-2 rounded-md" />
                        </div>
                    </div>

                    <div>
                         <label htmlFor="mainPoints" className="block mb-2 text-sm font-medium text-zinc-300">3. Poin-poin Kunci / Argumen Utama*</label>
                        <textarea
                            id="mainPoints"
                            value={mainPoints}
                            onChange={(e) => setMainPoints(e.target.value)}
                            placeholder="Jelaskan argumen utama, dalil-dalil, atau bantahan yang ingin disampaikan dalam berkas ini..."
                            className="w-full h-40 p-3 bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 rounded-md focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-zinc-600"
                        >
                            {isLoading ? <LoadingIcon /> : <GenerateIcon />}
                            <span className="ml-2">Buat Draf Berkas</span>
                        </button>
                    </div>
                </div>
                
                <div className="mt-10 min-h-[10rem]">
                     {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Sistem sedang menyusun berkas...</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-start" role="alert">
                            <ErrorIcon />
                            <div>
                                <h4 className="font-bold">Terjadi Kesalahan</h4>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    )}
                    {generatedBerkas && (
                        <div className="bg-zinc-800 rounded-xl border border-zinc-700" role="status">
                             <header className="flex justify-between items-center p-4 border-b border-zinc-700">
                                <h2 className="text-xl font-bold text-amber-400">Draf Berkas Dihasilkan</h2>
                                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-md hover:bg-zinc-600 transition-colors">
                                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                                    {isCopied ? 'Tersalin!' : 'Salin Teks'}
                                </button>
                            </header>
                             <div className="p-6 text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono text-sm bg-black/20 rounded-b-xl max-h-[50vh] overflow-y-auto">
                                {generatedBerkas}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuatBerkasHukum;
