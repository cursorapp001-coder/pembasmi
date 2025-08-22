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

interface BuatDraftDokumenProps {
    onBack: () => void;
}

const BuatDraftDokumen: React.FC<BuatDraftDokumenProps> = ({ onBack }) => {
    const [documentType, setDocumentType] = useState('surat-kuasa');
    const [keyInfo, setKeyInfo] = useState({ pihak1: '', pihak2: '', objek: '' });
    const [description, setDescription] = useState('');
    const [generatedDocument, setGeneratedDocument] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const documentTypes = [
        { id: 'surat-kuasa', label: 'Surat Kuasa' },
        { id: 'somasi', label: 'Surat Somasi' },
        { id: 'gugatan', label: 'Surat Gugatan' },
        { id: 'mou', label: 'MOU' },
        { id: 'surat-perjanjian', label: 'Surat Perjanjian' },
        { id: 'surat-pengaduan', label: 'Surat Pengaduan' },
        { id: 'permohonan', label: 'Permohonan' },
        { id: 'pelunasan-khusus', label: 'Pelunasan Khusus' },
        { id: 'lainnya', label: 'Dokumen Lainnya' },
    ];

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError('Silakan berikan deskripsi rinci untuk dokumen yang ingin dibuat.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedDocument('');
        setIsCopied(false);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten hukum ahli yang bertugas membuat draf dokumen hukum formal dalam Bahasa Indonesia untuk seorang advokat. Berdasarkan informasi berikut, buatlah draf dokumen yang diminta. Pastikan formatnya sesuai dengan standar hukum di Indonesia, lengkap dengan kop surat (jika perlu), judul, paragraf pembuka, isi, dan penutup. Gunakan placeholder seperti [Nama], [Alamat], [Tanggal] jika informasi spesifik tidak tersedia.
            
            Jenis Dokumen: ${documentTypes.find(d => d.id === documentType)?.label}
            
            Informasi Kunci:
            - Pihak 1 (Pemberi Kuasa/Penggugat/Pengirim Somasi): ${keyInfo.pihak1 || 'Tidak disebutkan'}
            - Pihak 2 (Penerima Kuasa/Tergugat/Penerima Somasi): ${keyInfo.pihak2 || 'Tidak disebutkan'}
            - Objek Perkara/Tuntutan: ${keyInfo.objek || 'Tidak disebutkan'}
            
            Deskripsi Tambahan dari Pengguna:
            ${description}
            
            Buat draf dokumen berikut secara lengkap:`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setGeneratedDocument(response.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat membuat dokumen. Mohon periksa koneksi Anda dan coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedDocument);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    const fillExample = () => {
        setDocumentType('somasi');
        setKeyInfo({
            pihak1: 'PT. Makmur Jaya',
            pihak2: 'CV. Bintang Terang',
            objek: 'Pembayaran invoice No. INV/2023/10/001 senilai Rp 50.000.000 yang telah jatuh tempo.'
        });
        setDescription('CV. Bintang Terang belum melakukan pembayaran atas invoice pembelian barang yang sudah jatuh tempo pada tanggal 1 Oktober 2023. Kami ingin mengirimkan surat somasi pertama untuk menagih pembayaran dalam waktu 7 hari kerja.');
    };

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10 relative">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                        <BackIcon />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Pembuat Draf <span className="text-amber-400">Dokumen</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Buat draf dokumen hukum secara otomatis. Cukup pilih jenis, berikan detail, dan biarkan sistem kami yang bekerja.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-6 border border-zinc-700">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">1. Pilih Jenis Dokumen</label>
                        <div className="flex flex-wrap gap-2">
                            {documentTypes.map(doc => (
                                <button
                                    key={doc.id}
                                    onClick={() => setDocumentType(doc.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${documentType === doc.id ? 'bg-amber-500 text-zinc-900 shadow-md' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                                >
                                    {doc.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">2. Masukkan Informasi Kunci (Opsional)</label>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input type="text" value={keyInfo.pihak1} onChange={e => setKeyInfo({...keyInfo, pihak1: e.target.value})} placeholder="Pihak 1 (Penggugat, dll)" className="w-full bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500 focus:border-amber-500" />
                            <input type="text" value={keyInfo.pihak2} onChange={e => setKeyInfo({...keyInfo, pihak2: e.target.value})} placeholder="Pihak 2 (Tergugat, dll)" className="w-full bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500 focus:border-amber-500" />
                            <input type="text" value={keyInfo.objek} onChange={e => setKeyInfo({...keyInfo, objek: e.target.value})} placeholder="Objek Perkara / Tuntutan" className="w-full sm:col-span-2 bg-zinc-700 p-2 rounded-md border-zinc-600 focus:ring-amber-500 focus:border-amber-500" />
                        </div>
                    </div>

                    <div>
                         <label htmlFor="description" className="block mb-2 text-sm font-medium text-zinc-300">
                            3. Jelaskan Detail Kebutuhan Dokumen Anda <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Contoh: Buatkan surat somasi untuk penagihan utang..."
                            className="w-full h-32 p-3 bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                        <button onClick={fillExample} className="text-xs text-amber-400 hover:underline mt-1">Isi dengan contoh</button>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <LoadingIcon /> : <GenerateIcon />}
                            <span className="ml-2">Buat Draf Dokumen</span>
                        </button>
                    </div>
                </div>

                <div className="mt-10 min-h-[10rem]">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Sistem sedang membuat draf dokumen...</p>
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
                    {generatedDocument && (
                        <div className="bg-zinc-800 rounded-xl border border-zinc-700" role="status">
                            <header className="flex justify-between items-center p-4 border-b border-zinc-700">
                                <h2 className="text-xl font-bold text-amber-400">Draf Dokumen Dihasilkan</h2>
                                <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-md hover:bg-zinc-600 transition-colors">
                                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                                    {isCopied ? 'Tersalin!' : 'Salin Teks'}
                                </button>
                            </header>
                            <div className="p-6 text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono text-sm bg-black/20 rounded-b-xl max-h-[50vh] overflow-y-auto">
                                {generatedDocument}
                            </div>
                        </div>
                    )}
                </div>

                <footer className="text-center p-6 text-xs text-zinc-500 mt-8">
                    &copy; {new Date().getFullYear()} PEMBASMI. Draf yang dihasilkan adalah titik awal dan mungkin memerlukan peninjauan oleh advokat profesional.
                </footer>
            </div>
        </div>
    );
};

export default BuatDraftDokumen;
