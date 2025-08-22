import React from 'react';
import { BackIcon } from '../constants';

// Icons
const FolderIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);
const FileIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const UploadIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

interface DocumentManagementProps {
    onBack: () => void;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({ onBack }) => {

    const folders = ["Perjanjian Klien", "Akta Perusahaan", "Perizinan", "Dokumen Litigasi", "Arsip"];
    const documents = [
        { name: "Perjanjian Kerjasama PT. Abadi.pdf", lastModified: "12 Okt 2023", size: "2.1 MB" },
        { name: "Akta Pendirian PT. Sejahtera.docx", lastModified: "10 Okt 2023", size: "850 KB" },
        { name: "Surat Kuasa Khusus - Budi.pdf", lastModified: "09 Okt 2023", size: "1.2 MB" },
        { name: "Izin Usaha Perdagangan.jpg", lastModified: "05 Okt 2023", size: "4.5 MB" },
    ];

    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans flex flex-col">
            <header className="text-center mb-10 relative">
                <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                    <BackIcon />
                </button>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    Document Management <span className="text-amber-400">System</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                    Kelola semua dokumen perusahaan dalam satu platform terintegrasi.
                </p>
            </header>
            
            <div className="flex-1 flex flex-col md:flex-row gap-6 bg-zinc-800 p-6 rounded-xl border border-zinc-700">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 bg-zinc-900/50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-amber-400 mb-4">Folder</h2>
                    <nav className="space-y-2">
                        {folders.map(folder => (
                             <a href="#" key={folder} className="flex items-center p-2 text-zinc-300 rounded-md hover:bg-zinc-700">
                                <FolderIcon className="h-5 w-5 mr-3" />
                                <span>{folder}</span>
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full sm:w-auto">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon /></span>
                            <input type="search" placeholder="Cari dokumen..." className="w-full sm:w-80 bg-zinc-700 p-2 pl-10 rounded-md" />
                        </div>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400">
                            <UploadIcon className="h-5 w-5" />
                            <span>Unggah Dokumen</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-sm text-zinc-400 border-b border-zinc-700">
                                    <th className="p-3">Nama Dokumen</th>
                                    <th className="p-3">Tanggal Modifikasi</th>
                                    <th className="p-3">Ukuran</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(doc => (
                                    <tr key={doc.name} className="border-b border-zinc-700 hover:bg-zinc-700/50">
                                        <td className="p-3 font-medium flex items-center"><FileIcon className="h-5 w-5 mr-3 text-zinc-400" />{doc.name}</td>
                                        <td className="p-3 text-zinc-400">{doc.lastModified}</td>
                                        <td className="p-3 text-zinc-400">{doc.size}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DocumentManagement;