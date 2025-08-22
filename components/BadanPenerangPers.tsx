
import React from 'react';
import { BackIcon } from '../constants';

// --- Icons ---
const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


interface BadanPenerangPersProps {
    onBack: () => void;
}

const pressReleases = [
    {
        date: '25 Oktober 2023',
        title: 'PEMBASMI Sukses Gelar PKPA Angkatan Ke-V',
        excerpt: 'Perkumpulan Badan Advokat Solidaritas Merdeka Indonesia (PEMBASMI) telah berhasil menyelenggarakan Pendidikan Khusus Profesi Advokat (PKPA) angkatan kelima yang diikuti oleh puluhan calon advokat dari seluruh Indonesia...'
    },
    {
        date: '15 September 2023',
        title: 'Ketua Umum PEMBASMI Menyerukan Pentingnya Integritas Advokat',
        excerpt: 'Dalam acara seminar nasional, Ketua Umum PEMBASMI, Dr. C.M. Firdaus Oiwobo, menekankan pentingnya menjaga integritas dan etika profesi advokat di era digital...'
    },
];

const galleryImages = [
    'https://images.unsplash.com/photo-1573496130407-57329f01f769?fit=crop&w=500&h=400',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?fit=crop&w=500&h=400',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?fit=crop&w=500&h=400',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?fit=crop&w=500&h=400',
];

const BadanPenerangPers: React.FC<BadanPenerangPersProps> = ({ onBack }) => {
    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
             <button
                onClick={onBack}
                className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                aria-label="Kembali ke menu utama"
            >
                <BackIcon />
            </button>
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Badan Penerang <span className="text-amber-400">& Pers</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Pusat informasi resmi, siaran pers, dan materi media dari PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* Siaran Pers */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Siaran Pers</h2>
                        <div className="space-y-6">
                            {pressReleases.map(release => (
                                <div key={release.title} className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                                    <p className="text-sm text-zinc-400 mb-1">{release.date}</p>
                                    <h3 className="text-xl font-bold text-amber-400">{release.title}</h3>
                                    <p className="text-zinc-300 mt-2">{release.excerpt}</p>
                                    <a href="#" className="text-white font-semibold hover:underline mt-4 inline-block">Baca Selengkapnya &rarr;</a>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Media Kit & Galeri */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Media Kit</h2>
                            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 space-y-4">
                                <p className="text-zinc-300">Unduh aset resmi kami untuk keperluan publikasi.</p>
                                <button className="w-full flex items-center justify-center p-3 bg-zinc-700 font-semibold rounded-lg hover:bg-zinc-600"><DownloadIcon /> Logo PEMBASMI (PNG, SVG)</button>
                                <button className="w-full flex items-center justify-center p-3 bg-zinc-700 font-semibold rounded-lg hover:bg-zinc-600"><DownloadIcon /> Foto Pengurus Pusat</button>
                                <button className="w-full flex items-center justify-center p-3 bg-zinc-700 font-semibold rounded-lg hover:bg-zinc-600"><DownloadIcon /> Profil Organisasi (PDF)</button>
                            </div>
                        </section>
                        <section>
                             <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Galeri Kegiatan</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {galleryImages.map((src, i) => <img key={i} src={src} alt={`Kegiatan ${i+1}`} className="rounded-lg object-cover w-full h-32" />)}
                            </div>
                        </section>
                    </div>

                    {/* Kontak Media */}
                    <section>
                         <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Kontak Media</h2>
                         <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Nama Anda" className="w-full bg-zinc-700 p-3 rounded-md"/>
                                    <input type="text" placeholder="Asal Media" className="w-full bg-zinc-700 p-3 rounded-md"/>
                                </div>
                                <input type="email" placeholder="Alamat Email" className="w-full bg-zinc-700 p-3 rounded-md"/>
                                <textarea placeholder="Pesan Anda..." rows={4} className="w-full bg-zinc-700 p-3 rounded-md"></textarea>
                                <div className="flex justify-end">
                                    <button type="submit" className="flex items-center justify-center px-6 py-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400">
                                        <SendIcon /> Kirim Pertanyaan
                                    </button>
                                </div>
                            </form>
                         </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BadanPenerangPers;
