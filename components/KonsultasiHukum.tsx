import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface KonsultasiHukumProps {
    onBack: () => void;
}

const KonsultasiHukum: React.FC<KonsultasiHukumProps> = ({ onBack }) => {
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const exampleProblems = [
        "Saya menyewakan rumah, tetapi penyewa tidak mau bayar. Apa yang harus saya lakukan?",
        "Bagaimana proses perceraian di pengadilan agama?",
        "Saya ditipu saat belanja online, bisakah saya lapor polisi?",
    ];

    const handleExampleClick = (p: string) => {
        setProblem(p);
    };

    const getSolution = async () => {
        if (!problem.trim()) {
            setError('Silakan jelaskan masalah hukum Anda terlebih dahulu.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSolution('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten hukum yang berempati untuk organisasi advokat PEMBASMI di Indonesia. Peran Anda adalah memberikan informasi hukum awal dan solusi potensial berdasarkan hukum Indonesia. 
            
            **PENTING: Anda dilarang keras memberikan nasihat hukum yang definitif atau menciptakan hubungan advokat-klien.** 
            
            Selalu mulai jawaban Anda dengan penafian (disclaimer) yang jelas dan tebal: 
            '**Penafian: Informasi ini bersifat umum dan bukan merupakan nasihat hukum profesional. Untuk masalah spesifik, sangat disarankan untuk berkonsultasi langsung dengan advokat.**'
            
            Setelah penafian, analisis situasi pengguna dan berikan respons yang terstruktur, mencakup:
            1.  **Analisis Singkat:** Ringkas masalah hukum yang dihadapi pengguna.
            2.  **Konsep Hukum Terkait:** Jelaskan konsep hukum yang relevan dengan bahasa yang mudah dipahami.
            3.  **Langkah-Langkah Potensial:** Berikan beberapa langkah umum yang bisa dipertimbangkan (misalnya: mediasi, somasi, pelaporan).
            4.  **Dasar Hukum (jika relevan):** Sebutkan pasal atau peraturan terkait secara singkat.
            
            Gunakan bahasa Indonesia yang jelas dan mudah dimengerti.
            
            Masalah Pengguna:
            ${problem}
            
            Solusi dan Informasi:`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setSolution(response.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat berkomunikasi dengan sistem. Mohon periksa koneksi Anda dan coba lagi nanti.');
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
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Konsultasi Hukum
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Jelaskan masalah hukum Anda, dan biarkan sistem kami memberikan pandangan dan solusi awal.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-4 border border-zinc-700">
                    <div>
                        <label htmlFor="problem" className="block mb-2 text-sm font-medium text-zinc-300">Jelaskan masalah Anda di sini:</label>
                        <textarea
                            id="problem"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="Contoh: Saya membeli barang online tapi yang datang tidak sesuai pesanan, dan penjual tidak mau bertanggung jawab..."
                            className="w-full h-40 p-3 bg-zinc-700 text-white placeholder-zinc-400 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                            aria-label="Area teks untuk menjelaskan masalah hukum"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={getSolution}
                            disabled={isLoading}
                            className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <LoadingIcon /> : <SendIcon />}
                            <span className="ml-2">Dapatkan Solusi</span>
                        </button>
                    </div>
                </div>
                
                 <div className="mt-8 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <LightbulbIcon />
                        <h3 className="text-zinc-400 font-semibold">Bingung mulai dari mana? Coba ini:</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {exampleProblems.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => handleExampleClick(p)}
                                className="px-3 py-1.5 bg-zinc-700 text-zinc-300 text-sm rounded-full hover:bg-zinc-600 hover:text-white transition-colors"
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="mt-10 min-h-[10rem]">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Sistem sedang merumuskan solusi...</p>
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
                    {solution && (
                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700" role="status">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <BotIcon />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-amber-400 mb-3">Analisis dan Solusi</h2>
                                    <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-p:text-zinc-300 prose-strong:text-white">
                                        {solution}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="text-center p-6 text-xs text-zinc-500 mt-8">
                    &copy; {new Date().getFullYear()} PEMBASMI. Informasi yang diberikan bukan merupakan nasihat hukum yang mengikat.
                </footer>
            </div>
        </div>
    );
};

export default KonsultasiHukum;