


import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BackIcon } from '../constants';

// --- Icons ---
const GavelIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const BuildingIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg>;
const UsersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const LandIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 5.064A9 9 0 1016.116 5.064M12 21v-5.159" /></svg>;
const ScrollIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SendIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>;
const CloseIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SparkleIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 17.657l-2.828 2.828M17.657 6.343l2.828-2.828m-1.414 11.314L17.657 12m-2.828-2.828l-1.414 1.414M12 21v-4M4.222 11.802l-1.414-1.414M19.778 11.802l1.414-1.414M12 3v4" /></svg>;
const LoadingIcon: React.FC = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

interface JasaHukumProps {
    onBack: () => void;
}

const services = [
    { id: 'pidana', icon: <GavelIcon />, title: "Hukum Pidana", description: "Pendampingan hukum komprehensif mulai dari tahap penyidikan, penuntutan, hingga persidangan di semua tingkatan pengadilan.", details: { content: "Kami menangani berbagai kasus pidana, termasuk namun tidak terbatas pada: tindak pidana korupsi, penipuan, penggelapan, pencucian uang, dan kejahatan siber. Tim kami akan memastikan hak-hak Anda sebagai tersangka, terdakwa, maupun korban terlindungi sepenuhnya sesuai dengan KUHAP.", leadAdvocate: "Dr. C.M. Firdaus Oiwobo", advocateAvatar: "https://i.ibb.co/DfP7Knw3/IMG-20250822-WA0013.jpg" }},
    { id: 'perdata', icon: <ScrollIcon />, title: "Hukum Perdata", description: "Penanganan sengketa perdata seperti wanprestasi (ingkar janji), perbuatan melawan hukum, sengketa utang-piutang, dan ganti rugi.", details: { content: "Layanan kami meliputi penyelesaian sengketa kontrak, gugatan ganti rugi, sengketa jual beli, dan perkara perdata umum lainnya. Kami berupaya menyelesaikan sengketa melalui mediasi dan negosiasi, namun siap memperjuangkan kepentingan Anda di pengadilan.", leadAdvocate: "Ahmad Subarjo, S.H.", advocateAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&fit=crop" }},
    { id: 'korporat', icon: <BuildingIcon />, title: "Hukum Korporat", description: "Layanan hukum untuk bisnis, termasuk pendirian perusahaan, perjanjian, merger, akuisisi, dan kepatuhan regulasi.", details: { content: "Kami menyediakan layanan legalitas perusahaan, penyusunan dan review kontrak bisnis, uji tuntas (due diligence) untuk aksi korporasi, serta nasihat hukum terkait operasional perusahaan sehari-hari agar bisnis Anda berjalan lancar dan sesuai koridor hukum.", leadAdvocate: "Budi Santoso, S.H.", advocateAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256&fit=crop" }},
    { id: 'keluarga', icon: <UsersIcon />, title: "Hukum Keluarga", description: "Penyelesaian masalah hukum terkait perkawinan, perceraian, waris, hak asuh anak, dan harta gono-gini.", details: { content: "Dengan pendekatan yang empatik, kami membantu menangani perkara keluarga yang sensitif seperti perceraian, pembagian harta bersama, penetapan hak asuh anak, hingga sengketa waris. Kami mengutamakan solusi terbaik bagi semua pihak, terutama untuk kepentingan anak.", leadAdvocate: "Siti Aminah, S.H., M.H.", advocateAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&fit=crop" }},
    { id: 'agraria', icon: <LandIcon />, title: "Sengketa Agraria", description: "Penanganan sengketa pertanahan, termasuk sengketa kepemilikan, sertifikasi, dan pembebasan lahan.", details: { content: "Sengketa tanah memerlukan penanganan khusus. Kami berpengalaman dalam menyelesaikan sengketa batas tanah, tumpang tindih sertifikat, sengketa jual beli tanah, dan proses pembebasan lahan untuk kepentingan umum maupun swasta.", leadAdvocate: "Dr. C.M. Firdaus Oiwobo", advocateAvatar: "https://i.ibb.co/DfP7Knw3/IMG-20250822-WA0013.jpg" }}
];

const fees = [
    { id: 'hourly', title: 'Tarif Per Jam', short: 'Mulai dari Rp 500.000 / jam', description: 'Ideal untuk konsultasi, nasihat hukum berkelanjutan, atau pekerjaan yang volumenya tidak dapat diprediksi.', fullDetails: 'Dengan tarif per jam, Anda memiliki fleksibilitas penuh. Model ini cocok untuk tahap awal analisis kasus, review dokumen, atau ketika lingkup pekerjaan belum dapat ditentukan secara pasti. Kami menjamin transparansi penuh dengan time sheet yang detail.' },
    { id: 'flat', title: 'Tarif Tetap (Lumpsum)', short: 'Sesuai Kesepakatan', description: 'Biaya yang disepakati di muka untuk penanganan kasus tertentu dari awal hingga akhir, memberikan kepastian anggaran.', fullDetails: 'Untuk kasus dengan lingkup yang jelas, seperti pendirian PT atau gugatan sederhana, kami menawarkan biaya tetap. Ini memberikan Anda kepastian anggaran tanpa perlu khawatir tentang biaya tak terduga. Semua lingkup pekerjaan akan dituangkan secara jelas dalam perjanjian jasa hukum.', featured: true },
    { id: 'success', title: 'Success Fee', short: 'Persentase Kemenangan', description: 'Sebuah persentase dari nilai klaim yang berhasil dimenangkan. Hanya dibayarkan jika kami berhasil memenangkan kasus Anda.', fullDetails: 'Model ini sering digunakan dalam kasus-kasus dengan nilai sengketa finansial yang jelas, seperti gugatan ganti rugi atau sengketa utang. Biaya jasa hukum utama adalah persentase dari hasil yang kami menangkan untuk Anda, menyelaraskan kepentingan kita untuk mencapai hasil terbaik.' }
];

type Service = typeof services[0];
type Fee = typeof fees[0];

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; }> = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 animate-fade-in-up" onClick={onClose}>
        <div className="bg-zinc-800 rounded-lg shadow-xl w-full max-w-2xl border border-zinc-700 relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 rounded-full"><CloseIcon /></button>
            {children}
        </div>
    </div>
);

const JasaHukum: React.FC<JasaHukumProps> = ({ onBack }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [consultationForm, setConsultationForm] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

    // AI Calculator State
    const [calc, setCalc] = useState({ caseType: '', complexity: 'sederhana' });
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConsultationForm({ ...consultationForm, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (consultationForm.name && consultationForm.email && consultationForm.message) {
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus('idle');
                setConsultationForm({ name: '', email: '', message: '' });
            }, 3000);
        }
    };
    
    const handleCalculateFee = async () => {
        if (!calc.caseType) return;
        setIsCalculating(true);
        setAiAnalysis('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const prompt = `Anda adalah asisten legal yang membantu calon klien memperkirakan biaya jasa hukum di Indonesia.
            Berdasarkan jenis kasus dan kompleksitasnya, berikan:
            1.  **Estimasi Biaya**: Berikan rentang biaya yang realistis dalam Rupiah (Rp).
            2.  **Rekomendasi Struktur Biaya**: Sarankan model biaya yang paling cocok (Tarif Per Jam, Tarif Tetap, atau Success Fee).
            3.  **Analisis Singkat**: Jelaskan secara singkat faktor-faktor yang mempengaruhi biaya untuk kasus semacam ini.
            
            Format jawaban dalam satu teks utuh.
            
            Jenis Kasus: ${calc.caseType}
            Kompleksitas: ${calc.complexity}`;

            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setAiAnalysis(response.text);
        } catch (error) {
            console.error(error);
            setAiAnalysis('Maaf, terjadi kesalahan saat menghitung estimasi. Silakan coba lagi.');
        } finally {
            setIsCalculating(false);
        }
    };


    return (
        <div className="p-4 sm:p-8 bg-zinc-900 text-white min-h-screen font-sans">
            <button onClick={onBack} className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all" aria-label="Kembali ke menu utama">
                <BackIcon />
            </button>
            <div className="max-w-5xl mx-auto">
                 <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Jasa <span className="text-amber-400">Hukum Profesional</span></h1>
                    <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">Advokat PEMBASMI siap memberikan layanan hukum terbaik untuk melindungi hak dan kepentingan Anda.</p>
                </header>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Area Praktik Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map(service => (
                            <div key={service.id} onClick={() => setSelectedService(service)} className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 flex items-start gap-6 cursor-pointer hover:bg-zinc-700 hover:border-amber-500 transition-all">
                                <div className="flex-shrink-0">{service.icon}</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                    <p className="text-zinc-400 mt-2 text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                 {/* AI Fee Calculator Section */}
                <section className="mt-16">
                     <h2 className="text-3xl font-bold text-white mb-8 text-center">Kalkulator Estimasi Biaya</h2>
                     <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Dapatkan Perkiraan Biaya</h3>
                            <p className="text-sm text-zinc-400">Pilih jenis kasus dan tingkat kompleksitasnya untuk mendapatkan estimasi awal dari Pembasmi Virtual. Estimasi ini tidak mengikat.</p>
                            <div>
                                <label className="text-sm font-medium text-zinc-300">Jenis Kasus</label>
                                <select value={calc.caseType} onChange={e => setCalc({...calc, caseType: e.target.value})} className="mt-1 w-full bg-zinc-700 p-2 rounded-md">
                                    <option value="">Pilih Jenis Kasus</option>
                                    {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                                    <option value="Sengketa Waris">Sengketa Waris</option>
                                    <option value="Pendirian PT">Pendirian PT</option>
                                </select>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-zinc-300">Kompleksitas</label>
                                <select value={calc.complexity} onChange={e => setCalc({...calc, complexity: e.target.value})} className="mt-1 w-full bg-zinc-700 p-2 rounded-md">
                                    <option value="sederhana">Sederhana</option>
                                    <option value="sedang">Sedang</option>
                                    <option value="kompleks">Kompleks</option>
                                </select>
                            </div>
                            <button onClick={handleCalculateFee} disabled={isCalculating || !calc.caseType} className="w-full flex items-center justify-center p-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400 disabled:bg-zinc-600">
                                {isCalculating ? <LoadingIcon /> : <SparkleIcon />}
                                <span className="ml-2">{isCalculating ? 'Menghitung...' : 'Hitung Estimasi'}</span>
                            </button>
                        </div>
                        <div className="bg-zinc-900/50 p-6 rounded-lg min-h-[200px]">
                            <h4 className="font-bold text-amber-400 mb-2">Analisis & Estimasi</h4>
                            {isCalculating ? <p className="text-sm text-zinc-400">Pembasmi Virtual sedang menganalisis...</p> : 
                             aiAnalysis ? <p className="text-sm text-zinc-300 whitespace-pre-wrap">{aiAnalysis}</p> : <p className="text-sm text-zinc-500">Hasil estimasi akan muncul di sini.</p>
                            }
                        </div>
                     </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-2 text-center">Transparansi Biaya Jasa Hukum</h2>
                    <p className="text-center text-zinc-400 max-w-3xl mx-auto mb-8">Kami menawarkan struktur biaya yang fleksibel dan transparan.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {fees.map(fee => (
                            <div key={fee.id} onClick={() => setSelectedFee(fee)} className={`bg-zinc-800 p-6 rounded-lg border flex flex-col cursor-pointer hover:bg-zinc-700 transition-all ${fee.featured ? 'border-2 border-amber-500' : 'border-zinc-700 hover:border-amber-500'}`}>
                                <h3 className="text-xl font-bold text-amber-400">{fee.title}</h3>
                                <p className="text-zinc-400 mt-2 text-sm flex-grow">{fee.description}</p>
                                <div className="mt-4"><span className="text-2xl font-bold text-white">{fee.short}</span></div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={() => setPaymentModalOpen(true)} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">Lakukan Pembayaran</button>
                    </div>
                </section>
                
                <section className="mt-16 bg-zinc-800 rounded-2xl p-8 sm:p-12 border border-amber-500/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Butuh Konsultasi Hukum?</h2>
                            <p className="text-zinc-400 mt-4">Jadwalkan sesi konsultasi awal Anda hari ini. Tim kami siap membantu.</p>
                        </div>
                        <div>
                            {formStatus === 'success' ? (
                                <div className="text-center bg-green-500/20 text-green-300 p-6 rounded-lg">
                                    <h3 className="font-bold">Terima Kasih!</h3>
                                    <p className="text-sm">Permintaan Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-lg">
                                    <input type="text" name="name" value={consultationForm.name} onChange={handleFormChange} placeholder="Nama Lengkap" className="w-full bg-zinc-700 p-3 rounded-md" required />
                                    <input type="email" name="email" value={consultationForm.email} onChange={handleFormChange} placeholder="Alamat Email" className="w-full bg-zinc-700 p-3 rounded-md" required />
                                    <textarea name="message" value={consultationForm.message} onChange={handleFormChange} placeholder="Jelaskan singkat masalah Anda..." rows={3} className="w-full bg-zinc-700 p-3 rounded-md" required></textarea>
                                    <button type="submit" className="w-full flex items-center justify-center p-3 bg-amber-500 text-zinc-900 font-bold rounded-lg hover:bg-amber-400"><SendIcon /> Kirim Permintaan</button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            
            {selectedService && (
                <Modal onClose={() => setSelectedService(null)}>
                    <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                            {selectedService.icon}
                            <h2 className="text-2xl font-bold text-white mt-1">{selectedService.title}</h2>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{selectedService.details.content}</p>
                        <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg flex items-center gap-4">
                            <img src={selectedService.details.advocateAvatar} alt={selectedService.details.leadAdvocate} className="w-16 h-16 rounded-full object-cover"/>
                            <div>
                                <p className="text-sm text-zinc-400">Lead Advocate</p>
                                <p className="font-bold text-white">{selectedService.details.leadAdvocate}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
             {selectedFee && (
                <Modal onClose={() => setSelectedFee(null)}>
                     <div className="p-6">
                        <h2 className="text-2xl font-bold text-amber-400 mb-2">{selectedFee.title}</h2>
                        <p className="text-zinc-300 leading-relaxed">{selectedFee.fullDetails}</p>
                    </div>
                </Modal>
            )}
             {isPaymentModalOpen && (
                <Modal onClose={() => setPaymentModalOpen(false)}>
                     <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Metode Pembayaran</h2>
                        <div className="space-y-4 text-zinc-300">
                           <p>Silakan lakukan pembayaran melalui transfer bank ke rekening berikut:</p>
                           <div className="bg-zinc-700 p-4 rounded-lg">
                                <p className="font-mono"><strong>Bank Mandiri</strong></p>
                                <p className="font-mono">No. Rek: <strong>123-456-7890</strong></p>
                                <p className="font-mono">A/N: <strong>Perkumpulan Pembasmi</strong></p>
                            </div>
                            <p>Setelah melakukan pembayaran, mohon konfirmasi melalui email ke <a href="mailto:finance@pembasmi.org" className="text-amber-400 hover:underline">finance@pembasmi.org</a> dengan menyertakan bukti transfer.</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default JasaHukum;
