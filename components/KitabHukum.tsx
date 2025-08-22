import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const ChevronDownIcon: React.FC<{ open: boolean }> = ({ open }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

interface KitabHukumProps {
    onBack: () => void;
}

const KitabHukum: React.FC<KitabHukumProps> = ({ onBack }) => {
    const [context, setContext] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isContextVisible, setIsContextVisible] = useState(false);

    const exampleQuestions = [
        "Apa dasar hukum perbuatan tidak menyenangkan?",
        "Jelaskan tentang wanprestasi dalam KUH Perdata.",
        "Bagaimana prosedur gugatan sederhana?",
    ];

    const handleExampleClick = (q: string) => {
        setQuestion(q);
    };

    const handleSearch = async () => {
        if (!question.trim()) {
            setError('Silakan masukkan pertanyaan Anda.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnswer('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten hukum yang ahli dalam hukum Indonesia. Berdasarkan konteks hukum yang diberikan (jika ada), jawablah pertanyaan berikut dengan jelas, akurat, dan dalam Bahasa Indonesia. Jika jawaban tidak ada dalam konteks, gunakan pengetahuan umum Anda tentang hukum Indonesia untuk menjawab, dan sebutkan jika informasi tersebut tidak berasal dari konteks yang diberikan.\n\nKonteks:\n${context || 'Tidak ada konteks spesifik yang diberikan.'}\n\nPertanyaan:\n${question}\n\nJawaban:`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setAnswer(response.text);

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
                        Kitab Hukum <span className="text-amber-400">PEMBASMI</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Tanyakan apa saja tentang hukum Indonesia. Sistem kami akan membantu Anda menemukan jawabannya.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-4 border border-zinc-700">
                    <div>
                        <label htmlFor="question" className="sr-only">Pertanyaan Anda</label>
                        <div className="relative">
                            <input
                                id="question"
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ketik pertanyaan hukum Anda di sini..."
                                className="w-full bg-zinc-700 text-white placeholder-zinc-400 p-4 pr-32 rounded-lg border-2 border-transparent focus:border-amber-500 focus:ring-0 focus:outline-none transition-colors"
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
                                aria-label="Input pertanyaan hukum"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="absolute inset-y-0 right-2 my-2 flex items-center justify-center px-4 py-2 bg-amber-500 text-zinc-900 font-bold rounded-md hover:bg-amber-400 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <LoadingIcon /> : <SearchIcon />}
                                <span className="ml-2 hidden sm:inline">Cari</span>
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <button
                            onClick={() => setIsContextVisible(!isContextVisible)}
                            className="flex items-center text-sm text-amber-400 hover:text-amber-300 transition-colors"
                        >
                            <span>{isContextVisible ? 'Sembunyikan Konteks Tambahan' : 'Tambahkan Konteks Spesifik (Opsional)'}</span>
                            <ChevronDownIcon open={isContextVisible} />
                        </button>
                         {isContextVisible && (
                             <div className="mt-3">
                                <label htmlFor="context" className="sr-only">Konteks (Opsional)</label>
                                <textarea
                                    id="context"
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    placeholder="Tempelkan pasal, undang-undang, atau teks hukum lainnya di sini..."
                                    className="w-full h-32 p-3 bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                    aria-label="Area teks untuk konteks hukum"
                                />
                             </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <LightbulbIcon />
                        <h3 className="text-zinc-400 font-semibold">Butuh inspirasi? Coba contoh ini:</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {exampleQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleExampleClick(q)}
                                className="px-3 py-1.5 bg-zinc-700 text-zinc-300 text-sm rounded-full hover:bg-zinc-600 hover:text-white transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 min-h-[10rem]">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Sistem sedang menganalisis...</p>
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
                    {answer && (
                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700" role="status">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <BotIcon />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-amber-400 mb-3">Jawaban PEMBASMI</h2>
                                    <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-p:text-zinc-300 prose-strong:text-white">
                                        {answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="text-center p-6 text-xs text-zinc-500 mt-8">
                    &copy; {new Date().getFullYear()} PEMBASMI. Informasi yang ditampilkan mungkin memerlukan verifikasi lebih lanjut.
                </footer>
            </div>
        </div>
    );
};

export default KitabHukum;