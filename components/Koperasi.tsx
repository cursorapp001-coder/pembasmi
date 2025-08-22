import React, { useState } from 'react';
import { BackIcon } from '../constants';
import { User } from '../App';

// --- ICONS ---
const DashboardIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const SavingsIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LoanIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>;
const AccountingIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 14h.01M9 7a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" /></svg>;
const ReportIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" /></svg>;
const PaymentIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;

interface KoperasiProps {
    onBackToHome: () => void;
    user: User | null;
}

type KoperasiView = 'dashboard' | 'anggota' | 'simpanan' | 'pinjaman' | 'akuntansi' | 'pelaporan' | 'pembayaran';

const Koperasi: React.FC<KoperasiProps> = ({ onBackToHome, user }) => {
    const [activeView, setActiveView] = useState<KoperasiView>('dashboard');
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'anggota', label: 'Manajemen Anggota', icon: UsersIcon },
        { id: 'simpanan', label: 'Simpanan', icon: SavingsIcon },
        { id: 'pinjaman', label: 'Pinjaman', icon: LoanIcon },
        { id: 'akuntansi', label: 'Akuntansi', icon: AccountingIcon },
        { id: 'pelaporan', label: 'Pelaporan', icon: ReportIcon },
        { id: 'pembayaran', label: 'Pembayaran & Transfer', icon: PaymentIcon },
    ];
    
    const KoperasiNav = ({ activeView, setActiveView, menuItems }: {
        activeView: KoperasiView;
        setActiveView: (view: KoperasiView) => void;
        menuItems: any[];
    }) => (
        <div className="bg-white shadow-sm rounded-lg mb-8 p-2">
            <div className="flex flex-wrap items-center gap-2">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id as KoperasiView)}
                        aria-current={activeView === item.id ? 'page' : undefined}
                        className={`flex items-center text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                            activeView === item.id
                                ? 'bg-amber-500 text-white shadow'
                                : 'text-gray-600 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                    >
                        <item.icon className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
    
    const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    const DashboardView = () => (
        <div>
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">Dashboard</h2>
                <p className="text-sm text-gray-500">Selamat datang di sistem manajemen koperasi, {user?.name}.</p>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Anggota" value="1,250" icon={<UsersIcon className="h-6 w-6 text-white" />} color="bg-blue-500" />
                <StatCard title="Total Simpanan" value="Rp 1.2 M" icon={<SavingsIcon className="h-6 w-6 text-white" />} color="bg-green-500" />
                <StatCard title="Total Pinjaman" value="Rp 850 Jt" icon={<LoanIcon className="h-6 w-6 text-white" />} color="bg-red-500" />
            </div>
             <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Tambah Anggota Baru</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Buat Simpanan</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Ajukan Pinjaman</button>
                </div>
            </div>
        </div>
    );
    
    const PlaceholderView = ({ title }: { title: string }) => (
        <div className="bg-white p-8 rounded-lg shadow text-center">
             <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">{title}</h2>
            <p className="text-gray-500">Fitur ini sedang dalam pengembangan. Mohon kembali lagi nanti.</p>
        </div>
    );

    const AnggotaView = () => {
        const members = [
            { id: 'PEM-001', name: 'Ahmad Subarjo', joinDate: '2022-01-15', status: 'Aktif' },
            { id: 'PEM-002', name: 'Siti Aminah', joinDate: '2022-02-20', status: 'Aktif' },
            { id: 'PEM-003', name: 'Budi Santoso', joinDate: '2022-03-10', status: 'Non-Aktif' },
        ];
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Anggota</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Tambah Anggota</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-600">ID Anggota</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Nama</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Tanggal Bergabung</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                 <tr key={member.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-gray-800">{member.id}</td>
                                    <td className="p-3 text-gray-800">{member.name}</td>
                                    <td className="p-3 text-gray-800">{member.joinDate}</td>
                                    <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{member.status}</span></td>
                                 </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const PembayaranView = () => (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pembayaran Online</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jenis Pembayaran</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md">
                            <option>Iuran Wajib</option>
                            <option>Listrik Pascabayar</option>
                            <option>Pulsa</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
                        <input type="number" placeholder="50000" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md" />
                    </div>
                     <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg">Bayar Sekarang</button>
                </form>
            </div>
             <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transfer Antar Anggota</h3>
                 <form className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">ID Anggota Penerima</label>
                        <input type="text" placeholder="PEM-002" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah Transfer (Rp)</label>
                        <input type="number" placeholder="100000" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md" />
                    </div>
                     <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Transfer</button>
                </form>
            </div>
        </div>
    );


    const renderContent = () => {
        const currentItem = menuItems.find(i => i.id === activeView);
        switch (activeView) {
            case 'dashboard': return <DashboardView />;
            case 'anggota': return <AnggotaView />;
            case 'pembayaran': return <PembayaranView />;
            case 'simpanan': 
            case 'pinjaman':
            case 'akuntansi':
            case 'pelaporan':
                return <PlaceholderView title={currentItem?.label || 'Page'} />;
            default: return <DashboardView />;
        }
    };

    return (
        <>
            <KoperasiNav activeView={activeView} setActiveView={setActiveView} menuItems={menuItems} />
            {renderContent()}
        </>
    );
};

export default Koperasi;