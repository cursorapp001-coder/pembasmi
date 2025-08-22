
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Icons ---
const CaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const ResearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v11m0 5l-2.293-2.293c-.63-.63-.184-1.707.707-1.707H17m-11 4v-4m4 4v-4" /><circle cx="15.5" cy="8.5" r="2.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5l2 2" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const SearchIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const LoadingIcon: React.FC = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const ErrorIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BotIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const archiveData = {
    "Arsip Perkara": {
        icon: <CaseIcon />,
        description: "Kumpulan dokumen kasus, dari pendaftaran hingga putusan final, termasuk berkas, bukti, dan salinan putusan.",
        placeholder: "Cari perkara terkait sengketa tanah di Jakarta Pusat tahun 2022...",
        promptSystem: "Anda adalah Pembasmi Virtual Arsiparis Pengadilan. Berdasarkan permintaan pengguna, buatlah daftar simulasi dokumen perkara yang relevan dan realistis seolah-olah diambil dari database pengadilan. Sertakan detail seperti nomor registrasi, para pihak, dan status terakhir."
    },
    "Arsip Hasil Penelitian": {
        icon: <ResearchIcon />,
        description: "Laporan-laporan penelitian pengadilan, seperti kajian pembatasan kasasi, penyelesaian sengketa, atau analisis putusan.",
        placeholder: "Berikan ringkasan penelitian tentang efektivitas mediasi dalam sengketa perdata...",
        promptSystem: "Anda adalah Pembasmi Virtual Asisten Peneliti Hukum. Jawab permintaan pengguna dengan memberikan ringkasan atau poin-poin utama dari laporan penelitian fiktif yang relevan, seolah-olah Anda memiliki akses ke arsip penelitian pengadilan."
    },
    "Arsip Administrasi & Hukum": {
        icon: <AdminIcon />,
        description: "Dokumen administrasi perkara dan peraturan, seperti kompilasi aturan, rumusan hukum, dan peraturan perundang-undangan.",
        placeholder: "Jelaskan rumusan hukum rapat pleno tentang eksekusi putusan arbitrase...",
        promptSystem: "Anda adalah Pembasmi Virtual Ahli Administrasi Hukum Pengadilan. Berikan jawaban yang informatif dan akurat berdasarkan peraturan atau dokumen administratif fiktif yang relevan dengan pertanyaan pengguna."
    },
};

const externalLinks = [
    {
        title: "Sistem Informasi Penelusuran Perkara (SIPP)",
        icon: <SystemIcon />,
        description: "Aplikasi dari Mahkamah Agung untuk pengelolaan arsip perkara secara elektronik, menggantikan sistem manual.",
        link: "https://sipp.mahkamahagung.go.id/",
        linkText: "Kunjungi SIPP",
    },
    {
        title: "Direktori Putusan",
        icon: <SystemIcon />,
        description: "Platform Mahkamah Agung untuk melihat dan mengunduh putusan pengadilan secara online.",
        link: "https://putusan3.mahkamahagung.go.id/",
        linkText: "Buka Direktori",
    }
];

const AIInteractionView: React.FC<{
    archiveTitle: string;
    onBack: () => void;
}> = ({ archiveTitle, onBack }) => {
    const archiveInfo = archiveData[archiveTitle as keyof typeof archiveData];
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Silakan masukkan permintaan Anda.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `${archiveInfo.promptSystem}\n\nPermintaan Pengguna:\n${query}`;
            
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setResponse(result.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat berkomunikasi dengan sistem. Mohon coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6">
                <BackIcon />
                <span>Kembali ke Pilihan Arsip</span>
            </button>
            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">{archiveInfo.icon}</div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{archiveTitle}</h3>
                        <p className="text-zinc-400 text-sm">{archiveInfo.description}</p>
                    </div>
                </div>
                <div className="space-y-4 mt-6">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={archiveInfo.placeholder}
                        className="w-full h-28 p-3 bg-zinc-700 text-white placeholder-zinc-500 border border-zinc-600 rounded-md focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="flex items-center justify-center px-5 py-2.5 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-zinc-600"
                        >
                            {isLoading ? <LoadingIcon /> : <SearchIcon />}
                            <span className="ml-2">Cari dengan Pembasmi Virtual</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 min-h-[8rem]">
                 {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                        <LoadingIcon />
                        <p className="mt-3 text-lg">Pembasmi Virtual sedang mencari di arsip...</p>
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
                {response && (
                    <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700" role="status">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0"><BotIcon /></div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-amber-400 mb-3">Hasil Pencarian Arsip</h2>
                                <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-p:text-zinc-300 prose-strong:text-white">
                                    {response}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const ArsipPengadilan: React.FC = () => {
    const [activeArchive, setActiveArchive] = useState<string | null>(null);

    if (activeArchive) {
        return <AIInteractionView archiveTitle={activeArchive} onBack={() => setActiveArchive(null)} />;
    }

    return (
        <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Arsip Pengadilan</h2>
            <p className="text-zinc-400 mb-8 max-w-3xl">
                Jelajahi berbagai koleksi arsip dan sistem informasi dari pengadilan. Kini didukung oleh Pembasmi Virtual untuk pencarian yang lebih cerdas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(archiveData).map(([title, data]) => (
                    <div key={title} className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 flex flex-col transition-all duration-300 hover:border-amber-500 hover:scale-[1.02]">
                        <div className="flex-shrink-0">{data.icon}</div>
                        <h3 className="text-xl font-bold mt-4 mb-2 text-white">{title}</h3>
                        <p className="text-zinc-400 text-sm flex-grow mb-6">{data.description}</p>
                        <button 
                            onClick={() => setActiveArchive(title)}
                            className="mt-auto block bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-500 hover:text-zinc-900 text-center transition-colors"
                        >
                            Gunakan Pembasmi Virtual
                        </button>
                    </div>
                ))}
                 {externalLinks.map((item) => (
                    <div key={item.title} className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 flex flex-col transition-all duration-300 hover:border-amber-500 hover:scale-[1.02]">
                        <div className="flex-shrink-0">{item.icon}</div>
                        <h3 className="text-xl font-bold mt-4 mb-2 text-white">{item.title}</h3>
                        <p className="text-zinc-400 text-sm flex-grow mb-6">{item.description}</p>
                        <a 
                            href={item.link} 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="mt-auto block bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-500 hover:text-zinc-900 text-center transition-colors"
                        >
                            {item.linkText}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArsipPengadilan;