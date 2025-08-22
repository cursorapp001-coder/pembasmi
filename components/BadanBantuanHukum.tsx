
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
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
const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const SparkleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 17.657l-2.828 2.828M17.657 6.343l2.828-2.828m-1.414 11.314L17.657 12m-2.828-2.828l-1.414 1.414M12 21v-4M4.222 11.802l-1.414-1.414M19.778 11.802l1.414-1.414M12 3v4" />
    </svg>
);
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

interface BadanBantuanHukumProps {
    onBack: () => void;
}

const BadanBantuanHukum: React.FC<BadanBantuanHukumProps> = ({ onBack }) => {
    const [formData, setFormData] = useState({ name: '', contact: '', description: '' });
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAnalyze = async () => {
        if (!formData.description.trim()) {
            setError('Harap jelaskan uraian singkat perkara Anda.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten hukum virtual dari Badan Bantuan Hukum PEMBASMI. Tugas Anda adalah memberikan analisis awal dan informasi umum berdasarkan deskripsi kasus yang diberikan oleh calon klien.
            
            **PENTING: Anda dilarang memberikan nasihat hukum definitif.** 
            
            Selalu mulai jawaban Anda dengan penafian (disclaimer) berikut: 
            '**DISCLAIMER:** Analisis ini dibuat oleh sistem AI dan bersifat informatif, bukan merupakan nasihat hukum resmi. Untuk penanganan lebih lanjut, kasus Anda perlu ditinjau oleh advokat kami.'
            
            Setelah disclaimer, berikan analisis yang terstruktur:
            1.  **Identifikasi Pokok Masalah:** Ringkas masalah utama dari deskripsi pengguna.
            2.  **Potensi Aspek Hukum:** Sebutkan beberapa aspek hukum atau peraturan yang mungkin relevan (misalnya: 'Ini mungkin berkaitan dengan Wanprestasi dalam KUH Perdata' atau 'Ini bisa masuk dalam ranah sengketa konsumen').
            3.  **Langkah Umum yang Bisa Dipertimbangkan:** Berikan saran langkah-langkah umum yang tidak bersifat spesifik (misalnya: 'Mengumpulkan bukti-bukti', 'Mencoba jalur mediasi terlebih dahulu', 'Membuat kronologi kejadian secara tertulis').
            4.  **Informasi Tambahan:** Sarankan informasi atau dokumen tambahan apa yang mungkin berguna untuk memperjelas kasus.

            Gunakan bahasa yang empatik, jelas, dan mudah dipahami oleh orang awam.

            Deskripsi Kasus dari Pengguna:
            "${formData.description}"
            
            Analisis Awal:`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setAnalysis(response.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat melakukan analisis. Mohon coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
             <button
                onClick={onBack}
                className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                aria-label="Kembali ke menu utama"
            >
                <BackIcon />
            </button>
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Badan Bantuan <span className="text-amber-400">Hukum</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        PEMBASMI menyediakan bantuan hukum bagi masyarakat yang membutuhkan. Ajukan permohonan Anda melalui formulir di bawah ini.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Form Section */}
                    <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl border border-zinc-700 space-y-6">
                        <h2 className="text-2xl font-bold text-white">Formulir Permohonan</h2>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-zinc-300">Nama Lengkap</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500" />
                        </div>
                         <div>
                            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-zinc-300">Kontak (Email/No. HP)</label>
                            <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-zinc-300">Uraian Singkat Perkara</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={6} className="w-full bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500" placeholder="Jelaskan kronologi masalah yang Anda hadapi..."></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                             <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-700 text-amber-300 font-semibold rounded-lg hover:bg-zinc-600 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <LoadingIcon /> : <SparkleIcon className="h-5 w-5"/>}
                                <span>Dapatkan Analisis Awal</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400">
                                <SendIcon />
                                <span>Kirim Permohonan</span>
                            </button>
                        </div>
                    </div>

                    {/* Analysis Section */}
                    <div className="min-h-[20rem]">
                         {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-start" role="alert">
                                <ErrorIcon />
                                <div><h4 className="font-bold">Error</h4><p className="text-sm">{error}</p></div>
                            </div>
                        )}
                        {analysis && !error && (
                             <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700" role="status">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0"><BotIcon /></div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-amber-400 mb-3">Analisis Awal oleh Pembasmi Virtual</h2>
                                        <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-p:text-zinc-300 prose-strong:text-white">
                                            {analysis}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                         {!analysis && !error && (
                            <div className="bg-zinc-800/50 p-6 rounded-xl border-2 border-dashed border-zinc-700 text-center">
                                <SparkleIcon className="h-10 w-10 mx-auto text-zinc-500"/>
                                <h3 className="text-lg font-semibold text-white mt-4">Analisis Awal Anda Akan Muncul di Sini</h3>
                                <p className="text-zinc-400 text-sm mt-1">Isi uraian perkara dan klik tombol "Dapatkan Analisis Awal" untuk melihat pandangan dari Pembasmi Virtual.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadanBantuanHukum;
