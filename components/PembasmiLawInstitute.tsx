import React, { useState } from 'react';

// --- ICONS ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const AttendanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GradesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const MaterialsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const TasksIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const QuizIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const ProjectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const ModuleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const ForumIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M5 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" /></svg>;
const NotificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const NewsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h.01M17 17h.01" /></svg>;
const AgendaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const GalleryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-4-4h4" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

interface PembasmiLawInstituteProps {
    onBack: () => void;
}

type LmsView = 'dashboard' | 'profil' | 'absensi' | 'nilai' | 'materi' | 'tugas' | 'ujian' | 'proyek' | 'modul' | 'diskusi' | 'notifikasi' | 'pesan' | 'berita' | 'agenda' | 'galeri';

// --- VIEW COMPONENTS ---

const DashboardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <div className="lg:col-span-2 bg-zinc-800 p-6 rounded-lg border border-zinc-700">
            <h3 className="text-2xl font-bold text-white">Selamat Datang, Budi Hartono!</h3>
            <p className="text-zinc-400 mt-2">Berikut adalah ringkasan aktivitas belajar Anda hari ini.</p>
        </div>
        <div className="bg-amber-500 text-zinc-900 p-6 rounded-lg">
            <h4 className="font-bold">Tugas Mendatang</h4>
            <p className="mt-2 text-sm">Analisis Kasus Perdata</p>
            <p className="text-xs font-semibold mt-1">Tenggat: Besok, 23:59</p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
            <h4 className="font-bold text-white">Nilai Terbaru</h4>
            <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span>Hukum Acara Pidana</span><span className="font-bold text-green-400">A</span></li>
                <li className="flex justify-between"><span>Hukum Kontrak</span><span className="font-bold text-yellow-400">B+</span></li>
            </ul>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 lg:col-span-2">
            <h4 className="font-bold text-white">Agenda Terdekat</h4>
            <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-4"><span className="font-bold text-amber-400 w-20">10:00</span><span>Kuliah Umum: Etika Profesi Advokat</span></li>
                <li className="flex items-center gap-4"><span className="font-bold text-amber-400 w-20">14:00</span><span>Diskusi Kelompok Proyek PBL</span></li>
            </ul>
        </div>
    </div>
);

const ProfileView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Profil Siswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 text-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&fit=crop" alt="Student Avatar" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-amber-500" />
                <h3 className="text-xl font-bold text-white">Budi Hartono</h3>
                <p className="text-zinc-400">PLI-2024-001</p>
                <button className="mt-4 bg-amber-500 text-zinc-900 font-bold py-2 px-6 rounded-lg w-full">Edit Profil</button>
            </div>
            <div className="md:col-span-2 space-y-4">
                <div><h4 className="font-bold text-amber-400">Email</h4><p>budi.hartono@example.com</p></div>
                <div><h4 className="font-bold text-amber-400">Riwayat Pendidikan</h4><p>S1 Hukum, Universitas Gadjah Mada</p></div>
                <div><h4 className="font-bold text-amber-400">Kegiatan Ekstrakurikuler</h4><p>Debat Hukum, Moot Court Competition</p></div>
            </div>
        </div>
    </div>
);

const AttendanceView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Rekap Absensi: Oktober 2024</h2>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => <div key={day} className="font-bold text-zinc-400">{day}</div>)}
            {[...Array(31)].map((_, i) => (
                <div key={i} className={`p-4 rounded-md ${{'0': 'bg-green-500/80', '13': 'bg-yellow-500/80', '24': 'bg-red-500/80'}[i] ?? 'bg-zinc-700'}`}>
                    {i + 1}
                </div>
            ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500"></div><span>Hadir</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-500"></div><span>Izin</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-500"></div><span>Sakit</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500"></div><span>Alpha</span></div>
        </div>
    </div>
);

const GradesView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Nilai & Raport</h2>
            <button className="bg-amber-500 text-zinc-900 font-bold py-2 px-4 rounded-lg">Unduh Raport Semester</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-zinc-700 text-zinc-400">
                        <th className="p-3">Mata Kuliah</th><th className="p-3">Nilai Akhir</th><th className="p-3">Predikat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-zinc-700">
                        <td className="p-3">Hukum Acara Pidana</td><td className="p-3">95</td><td className="p-3 text-green-400 font-bold">A</td>
                    </tr>
                    <tr className="border-b border-zinc-700">
                        <td className="p-3">Hukum Kontrak</td><td className="p-3">88</td><td className="p-3 text-yellow-400 font-bold">B+</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const MaterialsView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Materi Pelajaran</h2>
        <div className="space-y-4">
            <div className="bg-zinc-700 p-4 rounded-lg">
                <h3 className="font-bold">Hukum Acara Pidana</h3>
                <ul className="list-disc list-inside mt-2 text-sm text-zinc-300">
                    <li>Modul 1: Pengantar KUHAP (PDF)</li>
                    <li>Video Pembahasan Saksi Ahli (MP4)</li>
                </ul>
            </div>
        </div>
    </div>
);

const TasksView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Tugas & PR</h2>
        <div className="bg-zinc-700 p-4 rounded-lg flex justify-between items-center">
            <div>
                <h3 className="font-bold">Analisis Kasus Perdata</h3>
                <p className="text-sm text-zinc-400">Tenggat: Besok, 23:59</p>
            </div>
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Unggah Tugas</button>
        </div>
    </div>
);

const QuizView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Kuis & Ujian Online</h2>
        <div className="bg-zinc-700 p-4 rounded-lg flex justify-between items-center">
            <h3 className="font-bold">Ujian Tengah Semester</h3>
            <button className="bg-amber-500 text-zinc-900 font-bold py-2 px-4 rounded-lg">Mulai Ujian</button>
        </div>
    </div>
);

const ProjectsView = () => (
     <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Proyek Pembelajaran</h2>
        <p className="text-zinc-400 text-center">Fitur untuk mendukung pembelajaran berbasis proyek (PBL).</p>
    </div>
);

const InteractiveModuleView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Modul Interaktif</h2>
        <div className="bg-zinc-700 p-4 rounded-lg flex justify-between items-center">
            <h3 className="font-bold">SCORM: Simulasi Persidangan</h3>
            <button className="bg-amber-500 text-zinc-900 font-bold py-2 px-4 rounded-lg">Mulai Modul</button>
        </div>
    </div>
);

const ForumView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Forum Diskusi</h2>
        <p className="text-zinc-400 text-center">Tempat berdiskusi mengenai materi pelajaran.</p>
    </div>
);

const NotificationsView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Notifikasi</h2>
        <ul className="space-y-3">
            <li className="bg-zinc-700 p-3 rounded-lg text-sm">Tugas "Analisis Kasus Perdata" akan berakhir besok.</li>
            <li className="bg-zinc-700 p-3 rounded-lg text-sm">Nilai Kuis Hukum Pidana telah dirilis.</li>
        </ul>
    </div>
);

const MessagingView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Pesan Langsung</h2>
        <p className="text-zinc-400 text-center">Fitur pesan langsung untuk komunikasi antar siswa dan guru.</p>
    </div>
);

const NewsView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Berita & Artikel</h2>
        <div className="bg-zinc-700 p-4 rounded-lg">
            <h3 className="font-bold">PEMBASMI Law Institute Buka Angkatan Baru</h3>
            <p className="text-sm text-zinc-400 mt-2">Pendaftaran untuk program pendidikan khusus profesi advokat (PKPA) angkatan V telah dibuka...</p>
        </div>
    </div>
);

const AgendaView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Agenda Kegiatan</h2>
        <ul className="space-y-4">
            <li className="bg-zinc-700 p-4 rounded-lg"><span className="font-bold text-amber-400 mr-4">25 Okt:</span> Kuliah Umum: Etika Profesi Advokat</li>
            <li className="bg-zinc-700 p-4 rounded-lg"><span className="font-bold text-amber-400 mr-4">28 Okt:</span> Ujian Tengah Semester</li>
        </ul>
    </div>
);

const GalleryView = () => (
    <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Galeri Kegiatan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1573496130407-57329f01f769?fit=crop&w=300" className="rounded-lg aspect-square object-cover" alt="Kegiatan 1"/>
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?fit=crop&w=300" className="rounded-lg aspect-square object-cover" alt="Kegiatan 2"/>
            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?fit=crop&w=300" className="rounded-lg aspect-square object-cover" alt="Kegiatan 3"/>
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?fit=crop&w=300" className="rounded-lg aspect-square object-cover" alt="Kegiatan 4"/>
        </div>
    </div>
);


const PembasmiLawInstitute: React.FC<PembasmiLawInstituteProps> = ({ onBack }) => {
    const [activeView, setActiveView] = useState<LmsView>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const student = {
        name: 'Budi Hartono',
        nim: 'PLI-2024-001',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&fit=crop',
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'profil', label: 'Profil Siswa', icon: <ProfileIcon /> },
        { id: 'absensi', label: 'Absensi', icon: <AttendanceIcon /> },
        { id: 'nilai', label: 'Nilai & Raport', icon: <GradesIcon /> },
        { id: 'materi', label: 'Materi Pelajaran', icon: <MaterialsIcon /> },
        { id: 'tugas', label: 'Tugas & PR', icon: <TasksIcon /> },
        { id: 'ujian', label: 'Kuis & Ujian Online', icon: <QuizIcon /> },
        { id: 'proyek', label: 'Proyek Pembelajaran', icon: <ProjectIcon /> },
        { id: 'modul', label: 'Modul Interaktif', icon: <ModuleIcon /> },
        { id: 'diskusi', label: 'Forum Diskusi', icon: <ForumIcon /> },
        { id: 'notifikasi', label: 'Notifikasi', icon: <NotificationIcon /> },
        { id: 'pesan', label: 'Pesan Langsung', icon: <MessageIcon /> },
        { id: 'berita', label: 'Berita & Artikel', icon: <NewsIcon /> },
        { id: 'agenda', label: 'Agenda Kegiatan', icon: <AgendaIcon /> },
        { id: 'galeri', label: 'Galeri', icon: <GalleryIcon /> },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardView />;
            case 'profil': return <ProfileView />;
            case 'absensi': return <AttendanceView />;
            case 'nilai': return <GradesView />;
            case 'materi': return <MaterialsView />;
            case 'tugas': return <TasksView />;
            case 'ujian': return <QuizView />;
            case 'proyek': return <ProjectsView />;
            case 'modul': return <InteractiveModuleView />;
            case 'diskusi': return <ForumView />;
            case 'notifikasi': return <NotificationsView />;
            case 'pesan': return <MessagingView />;
            case 'berita': return <NewsView />;
            case 'agenda': return <AgendaView />;
            case 'galeri': return <GalleryView />;
            default: return <DashboardView />;
        }
    };
    
    const handleMenuClick = (view: LmsView) => {
        setActiveView(view);
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    }

    return (
        <div className="flex h-screen bg-zinc-900 text-slate-300 font-sans">
             {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
            ></div>
            {/* Sidebar */}
            <aside className={`absolute md:relative z-40 w-64 h-full bg-zinc-800 text-slate-300 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="flex items-center justify-between h-20 px-6 border-b border-zinc-700">
                    <div className="flex items-center gap-2">
                        <img src="https://i.ibb.co/h18LwFqq/Picsart-25-08-22-07-33-42-560.png" alt="Logo" className="h-8 w-8 object-contain" />
                        <span className="text-lg font-bold text-white">PLI</span>
                    </div>
                     <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white"><CloseIcon /></button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map(item => (
                        <button 
                            key={item.id}
                            onClick={() => handleMenuClick(item.id as LmsView)}
                            className={`flex items-center w-full py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm ${activeView === item.id ? 'bg-amber-500 text-zinc-900 font-semibold' : 'hover:bg-zinc-700 text-zinc-300'}`}
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-zinc-700">
                     <button onClick={onBack} className="flex items-center w-full py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm hover:bg-zinc-700 text-zinc-300">
                        <LogoutIcon />
                        <span className="ml-3">Kembali ke Menu Utama</span>
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between h-20 px-6 bg-zinc-900 border-b border-zinc-700 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-zinc-300"><MenuIcon /></button>
                        <h1 className="text-xl font-bold text-white">{menuItems.find(item => item.id === activeView)?.label}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="p-2 rounded-full hover:bg-zinc-800">
                                <NotificationIcon />
                                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-zinc-900"></span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt="Student Avatar" />
                            <div className="hidden sm:block">
                                <p className="font-semibold text-sm text-white">{student.name}</p>
                                <p className="text-xs text-zinc-400">{student.nim}</p>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-900 p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default PembasmiLawInstitute;
