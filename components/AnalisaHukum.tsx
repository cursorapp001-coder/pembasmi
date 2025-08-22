import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- Icons ---
const AnalyzeIcon: React.FC = () => (
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
const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);
const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const DocumentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-zinc-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


interface AnalisaHukumProps {
    onBack: () => void;
}

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}

const AnalisaHukum: React.FC<AnalisaHukumProps> = ({ onBack }) => {
    const [documentText, setDocumentText] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [question, setQuestion] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputType, setInputType] = useState<'text' | 'file'>('text');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = [
                'image/png', 
                'image/jpeg', 
                'application/pdf', 
                'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (allowedTypes.includes(file.type)) {
                setUploadedFile(file);
                setFileName(file.name);
                setDocumentText('');
                setError(null);

                if (file.type.startsWith('image/')) {
                    setFilePreview(URL.createObjectURL(file));
                } else {
                    setFilePreview(null);
                }
            } else {
                setError('Format file tidak didukung. Harap unggah file JPG, PNG, PDF, DOC, atau DOCX.');
                setUploadedFile(null);
                setFilePreview(null);
                setFileName('');
            }
        }
    };
    
    const handleAnalyze = async () => {
        if (!question.trim()) {
            setError('Silakan masukkan pertanyaan Anda terkait dokumen.');
            return;
        }
        if (inputType === 'text' && !documentText.trim()) {
            setError('Silakan tempelkan teks dokumen yang ingin dianalisis.');
            return;
        }
        if (inputType === 'file' && !uploadedFile) {
            setError('Silakan unggah dokumen yang ingin dianalisis.');
            return;
        }

        setIsLoading(true);
setError(null);
        setAnalysis('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const prompt = `Anda adalah seorang ahli hukum dan analis dokumen untuk organisasi advokat PEMBASMI. Tugas Anda adalah menganalisis dokumen yang diberikan dan menjawab pertanyaan pengguna secara akurat berdasarkan isi dokumen tersebut. Jawaban harus dalam Bahasa Indonesia yang jelas dan profesional.
            
            Pertanyaan Pengguna: "${question}"
            
            Berikan jawaban Anda berdasarkan analisis dokumen yang dilampirkan.`;

            let contents;
            if (inputType === 'file' && uploadedFile) {
                const filePart = await fileToGenerativePart(uploadedFile);
                contents = { parts: [filePart, { text: prompt }] };
            } else {
                contents = `Konteks Dokumen:\n---\n${documentText}\n---\n\n${prompt}`;
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents,
            });

            setAnalysis(response.text);

        } catch (e) {
            console.error(e);
            setError('Terjadi kesalahan saat menganalisis dokumen. Periksa koneksi Anda atau coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10 relative">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                        <BackIcon />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        Analisa <span className="text-amber-400">Dokumen Hukum</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Unggah atau tempelkan dokumen Anda, ajukan pertanyaan, dan dapatkan analisis mendalam.
                    </p>
                </header>

                <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl space-y-6 border border-zinc-700">
                    <div>
                        <label className="block mb-3 text-sm font-medium text-zinc-300">1. Sediakan Dokumen Anda</label>
                        <div className="flex bg-zinc-700 rounded-lg p-1">
                            <button onClick={() => setInputType('text')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${inputType === 'text' ? 'bg-amber-500 text-zinc-900' : 'text-zinc-300 hover:bg-zinc-600'}`}>Tempel Teks</button>
                            <button onClick={() => setInputType('file')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${inputType === 'file' ? 'bg-amber-500 text-zinc-900' : 'text-zinc-300 hover:bg-zinc-600'}`}>Unggah File</button>
                        </div>
                    </div>

                    {inputType === 'text' ? (
                        <div>
                            <textarea
                                value={documentText}
                                onChange={(e) => setDocumentText(e.target.value)}
                                placeholder="Tempelkan isi dokumen Anda di sini. Untuk PDF atau Word, salin dan tempel teksnya ke dalam bidang ini."
                                className="w-full h-48 p-3 bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 rounded-md focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    ) : (
                        <div>
                             <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-600">
                                {filePreview ? (
                                    <img src={filePreview} alt="Pratinjau dokumen" className="h-full w-full object-contain p-2" />
                                ) : fileName ? (
                                    <div className="flex flex-col items-center justify-center text-center p-4">
                                        <DocumentIcon />
                                        <p className="font-semibold text-zinc-300 break-all">{fileName}</p>
                                        <p className="text-xs text-zinc-500 mt-1">Klik untuk mengganti file</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadIcon />
                                        <p className="mb-2 text-sm text-zinc-400"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan lepas</p>
                                        <p className="text-xs text-zinc-500">JPG, PNG, PDF, DOC, DOCX (Maks. 10MB)</p>
                                    </div>
                                )}
                                <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
                            </label>
                        </div>
                    )}

                    <div>
                        <label htmlFor="question" className="block mb-2 text-sm font-medium text-zinc-300">2. Ajukan Pertanyaan Tentang Dokumen</label>
                        <input
                            id="question"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Contoh: Apa saja kewajiban Pihak Kedua dalam perjanjian ini?"
                            className="w-full bg-zinc-700 text-white placeholder-zinc-400 p-3 rounded-md border border-zinc-600 focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-zinc-600"
                        >
                            {isLoading ? <LoadingIcon /> : <AnalyzeIcon />}
                            <span className="ml-2">Analisa Dokumen</span>
                        </button>
                    </div>
                </div>

                <div className="mt-10 min-h-[10rem]">
                     {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-400 p-8">
                            <LoadingIcon />
                            <p className="mt-3 text-lg">Sistem sedang menganalisa dokumen...</p>
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
                    {analysis && (
                        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700" role="status">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0"><BotIcon /></div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-amber-400 mb-3">Hasil Analisis Dokumen</h2>
                                    <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed prose prose-invert prose-p:text-zinc-300 prose-strong:text-white">
                                        {analysis}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalisaHukum;