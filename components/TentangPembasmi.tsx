import React, { useState } from 'react';
import { BackIcon } from '../constants';

interface TentangPembasmiProps {
    onBack: () => void;
}

type Tab = 'tentang' | 'struktur' | 'legalitas' | 'sekretariat';

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void; }> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 text-sm sm:text-base font-bold transition-all duration-300 border-b-4 ${
            active 
                ? 'border-amber-400 text-white' 
                : 'border-transparent text-zinc-400 hover:border-amber-400/50 hover:text-zinc-200'
        }`}
    >
        {label}
    </button>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-zinc-800/50 p-6 sm:p-8 rounded-xl border border-zinc-700 animate-fade-in-up ${className}`}>
        <h3 className="text-2xl font-bold text-amber-400 mb-4">{title}</h3>
        <div className="space-y-4 text-zinc-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const pengurus = [
    {
        nama: 'Dr. C.M. Firdaus Oiwobo',
        jabatan: 'Ketua Umum',
        avatar: 'https://i.ibb.co/DfP7Knw3/IMG-20250822-WA0013.jpg'
    },
    {
        nama: 'Ahmad Subarjo, S.H.',
        jabatan: 'Sekretaris Jenderal',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&fit=crop'
    },
    {
        nama: 'Siti Aminah, S.H., M.H.',
        jabatan: 'Bendahara Umum',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&fit=crop'
    },
    {
        nama: 'Budi Santoso, S.H.',
        jabatan: 'Ketua Bidang Organisasi',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256&fit=crop'
    }
];

const TentangSection = () => (
    <Section title="Tentang PEMBASMI">
        <p>
            PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA (PEMBASMI) adalah organisasi advokat yang didirikan dengan semangat perjuangan untuk keadilan dan solidaritas. Kami berkomitmen untuk menjadi wadah bagi para advokat yang memiliki integritas, profesionalisme, dan kepedulian sosial yang tinggi.
        </p>
        <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div>
                <h4 className="font-bold text-lg text-white mb-2">Visi Kami</h4>
                <p>Menjadi organisasi advokat yang modern, terpercaya, dan berdaya saing tinggi, serta mampu memberikan kontribusi nyata bagi penegakan hukum dan keadilan di Indonesia.</p>
            </div>
            <div>
                <h4 className="font-bold text-lg text-white mb-2">Misi Kami</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Meningkatkan kualitas dan profesionalisme anggota melalui pendidikan dan pelatihan berkelanjutan.</li>
                    <li>Memberikan perlindungan dan pembelaan hukum bagi anggota dalam menjalankan profesinya.</li>
                    <li>Menyelenggarakan bantuan hukum bagi masyarakat yang tidak mampu.</li>
                    <li>Berperan aktif dalam pembaharuan hukum nasional.</li>
                </ul>
            </div>
        </div>
    </Section>
);

const StrukturSection = () => (
    <Section title="Struktur Pengurus Pusat">
        <p>Dewan Pimpinan Pusat PEMBASMI terdiri dari para advokat berpengalaman yang berdedikasi untuk memajukan organisasi dan profesi advokat di Indonesia.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            {pengurus.map((p, index) => (
                <div key={index} className="text-center">
                    <img src={p.avatar} alt={p.nama} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-zinc-700 mb-3" />
                    <h5 className="font-bold text-white">{p.nama}</h5>
                    <p className="text-sm text-amber-400">{p.jabatan}</p>
                </div>
            ))}
        </div>
    </Section>
);

const LegalitasSection = () => (
    <Section title="Legalitas Organisasi">
        <p>PEMBASMI merupakan organisasi yang sah dan diakui secara hukum berdasarkan peraturan perundang-undangan yang berlaku di Republik Indonesia.</p>
        <ul className="space-y-4 pt-4">
            <li className="bg-zinc-700/50 p-4 rounded-lg">
                <h5 className="font-bold text-white">Akta Pendirian Notaris</h5>
                <p>Nama Notaris: John Doe, S.H., M.Kn.</p>
                <p>Nomor Akta: 01</p>
                <p>Tanggal: 17 Agustus 2020</p>
            </li>
            <li className="bg-zinc-700/50 p-4 rounded-lg">
                <h5 className="font-bold text-white">Surat Keputusan Kemenkumham RI</h5>
                <p>Nomor: AHU-0001234.AH.01.07.TAHUN 2020</p>
                <p>Tentang: Pengesahan Pendirian Badan Hukum Perkumpulan Badan Advokat Solidaritas Merdeka Indonesia.</p>
            </li>
            <li className="bg-zinc-700/50 p-4 rounded-lg">
                <h5 className="font-bold text-white">Nomor Pokok Wajib Pajak (NPWP)</h5>
                <p>Nomor: 01.234.567.8-091.000</p>
            </li>
        </ul>
    </Section>
);

const SekretariatSection = () => (
    <Section title="Sekretariat">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold text-lg text-white mb-2">Alamat Kantor Pusat</h4>
                <p>Jl. Pancoran Timur Raya No.37, RT.7/RW.3, Pengadegan, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12770</p>
                <h4 className="font-bold text-lg text-white mt-4 mb-2">Kontak</h4>
                <p>Telepon: (021) 123-4567</p>
                <p>Email: <a href="mailto:info@pembasmi.org" className="text-amber-400 hover:underline">info@pembasmi.org</a></p>
                <h4 className="font-bold text-lg text-white mt-4 mb-2">Jam Operasional</h4>
                <p>Senin - Jumat: 09:00 - 17:00 WIB</p>
            </div>
            <div>
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.208753232824!2d106.84880681530602!3d-6.236166862803859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3bd2c7820a3%3A0x6b26f54668b8e01!2sJl.%20Pancoran%20Timur%20Raya%20No.37%2C%20RT.7%2FRW.3%2C%20Pengadegan%2C%20Kec.%20Pancoran%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012770!5e0!3m2!1sen!2sid!4v1698223637172!5m2!1sen!2sid"
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    title="Lokasi Sekretariat PEMBASMI">
                </iframe>
            </div>
        </div>
    </Section>
);

const TentangPembasmi: React.FC<TentangPembasmiProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<Tab>('tentang');

    const renderContent = () => {
        switch (activeTab) {
            case 'tentang': return <TentangSection />;
            case 'struktur': return <StrukturSection />;
            case 'legalitas': return <LegalitasSection />;
            case 'sekretariat': return <SekretariatSection />;
            default: return <TentangSection />;
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

            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-8">
                    <img src="https://i.ibb.co/St94y05/Picsart-25-08-22-07-29-37-148.png" alt="Logo PEMBASMI" className="w-24 h-24 mx-auto mb-4" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Tentang <span className="text-amber-400">PEMBASMI</span>
                    </h1>
                    <p className="mt-2 text-lg text-zinc-400">
                        PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA
                    </p>
                </header>

                <div className="border-b border-zinc-700 flex justify-center mb-8">
                    <TabButton label="Tentang Kami" active={activeTab === 'tentang'} onClick={() => setActiveTab('tentang')} />
                    <TabButton label="Struktur Pengurus" active={activeTab === 'struktur'} onClick={() => setActiveTab('struktur')} />
                    <TabButton label="Legalitas" active={activeTab === 'legalitas'} onClick={() => setActiveTab('legalitas')} />
                    <TabButton label="Sekretariat" active={activeTab === 'sekretariat'} onClick={() => setActiveTab('sekretariat')} />
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default TentangPembasmi;