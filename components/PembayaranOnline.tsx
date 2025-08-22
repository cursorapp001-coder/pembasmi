import React, { useState } from 'react';
import { User } from '../App';

// --- ICONS for Grid ---
const PulsaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const SmsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const EWalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PlnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const GameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path d="M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M9 12V9a3 3 0 013-3h0a3 3 0 013 3v3" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 01-3 3H9a3 3 0 01-3-3" /></svg>;
const ETollIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ShoppingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const TravelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;

const Sparkle = () => (
    <>
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute top-3 right-3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse delay-400"></div>
    </>
);

interface PembayaranOnlineProps {
  onBack: () => void;
  user: User | null;
  onLogout: () => void;
}

const PaymentGridItem: React.FC<{ icon: React.ReactNode; label: React.ReactNode; }> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-start text-center space-y-2 group focus:outline-none">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-green-100 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
            {icon}
            <Sparkle />
        </div>
        <span className="text-xs font-medium text-gray-700 leading-tight">{label}</span>
    </button>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="py-4 mt-2">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    </div>
);

const NavButton: React.FC<{label: string; active?: boolean; onClick: () => void;}> = ({label, active = false, onClick}) => (
    <button
        onClick={onClick}
        className={`flex-1 text-sm font-medium py-3 px-2 text-center border-b-2 transition-colors duration-200 focus:outline-none ${
            active
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
    >
        {label}
    </button>
);

const PembayaranNav: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; navItems: {id: string; label: string}[]; }> = ({ activeTab, setActiveTab, navItems }) => (
    <div className="bg-white shadow-sm rounded-lg mb-6">
        <div className="flex justify-around">
            {navItems.map(item => (
                <NavButton
                    key={item.id}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                />
            ))}
        </div>
    </div>
);


const PembayaranOnline: React.FC<PembayaranOnlineProps> = ({ onBack, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('home');

    const topUpItems = [
        { icon: <PulsaIcon />, label: <>Pulsa<br />Nasional</> },
        { icon: <SmsIcon />, label: <>SMS<br />& Telp</> },
        { icon: <EWalletIcon />, label: 'e-Wallet' },
        { icon: <PlnIcon />, label: <>Token<br />PLN</> },
    ];
    
    const providerItems = [
        { icon: <div className="font-bold text-lg text-blue-600">AXIS</div>, label: 'Axis' },
        { icon: <div className="font-bold text-lg text-yellow-500">Indosat</div>, label: 'Indosat' },
        { icon: <div className="font-bold text-lg text-cyan-500">smartfren</div>, label: 'Smartfren' },
        { icon: <div className="font-bold text-lg text-red-500">Telkomsel</div>, label: 'Telkomsel' },
        { icon: <div className="font-bold text-2xl text-blue-800">3</div>, label: 'Tri' },
        { icon: <div className="font-bold text-2xl text-blue-500">XL</div>, label: 'XL' },
        { icon: <div className="font-bold text-lg text-purple-600">by.U</div>, label: 'By.U' },
        { icon: <GameIcon />, label: 'Digital' },
    ];

    const householdItems = [
        { icon: <ETollIcon />, label: <>Topup Saldo<br />E-toll</> },
        { icon: <ShoppingIcon />, label: <>Bayar<br />Belanjaan</> },
        { icon: <BillIcon />, label: <>Bayar<br />Tagihan</> },
        { icon: <TravelIcon />, label: <>Tour and<br />Travel</> },
    ];

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'transaksi', label: 'Transaksi' },
        { id: 'rekap', label: 'Rekap' },
        { id: 'informasi', label: 'Informasi' },
        { id: 'akun', label: 'Akun' },
    ];

    const HomeView = () => (
        <>
            <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                {topUpItems.map((item, index) => <PaymentGridItem key={index} icon={item.icon} label={item.label} />)}
            </div>
            <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-6">
                {providerItems.map((item, index) => <PaymentGridItem key={index} icon={item.icon} label={item.label} />)}
            </div>
            <SectionHeader title="Rumah Tangga" />
            <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                {householdItems.map((item, index) => <PaymentGridItem key={index} icon={item.icon} label={item.label} />)}
            </div>
        </>
    );

    const TransaksiView = () => {
        const transactions = [
            { id: 1, type: 'Pulsa Telkomsel', date: '15 Okt 2023', amount: '-Rp 50,000', status: 'Success', icon: <PulsaIcon/> },
            { id: 2, type: 'Token Listrik', date: '14 Okt 2023', amount: '-Rp 100,000', status: 'Success', icon: <PlnIcon/> },
            { id: 3, type: 'Top up GoPay', date: '12 Okt 2023', amount: '-Rp 250,000', status: 'Success', icon: <EWalletIcon/> },
            { id: 4, type: 'Bayar Tagihan', date: '10 Okt 2023', amount: '-Rp 350,000', status: 'Failed', icon: <BillIcon/> },
        ];
        return (
            <div className="space-y-4">
                {transactions.map(tx => (
                    <div key={tx.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.status === 'Success' ? 'bg-green-100' : 'bg-red-100'}`}>{tx.icon}</div>
                        <div className="flex-1 ml-4">
                            <p className="font-semibold text-gray-800">{tx.type}</p>
                            <p className="text-sm text-gray-500">{tx.date}</p>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${tx.status === 'Success' ? 'text-gray-800' : 'text-red-500'}`}>{tx.amount}</p>
                            <p className={`text-xs font-semibold ${tx.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{tx.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const RekapView = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-500">Total Pengeluaran Bulan Ini</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">Rp 750,000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-500">Total Transaksi</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">15 Kali</p>
            </div>
        </div>
    );

    const InformasiView = () => (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Pusat Bantuan</h3>
            <div>
                <h4 className="font-semibold">Bagaimana cara top up?</h4>
                <p className="text-gray-600 text-sm">Pilih menu yang diinginkan di halaman Home, masukkan nomor tujuan dan nominal, lalu lanjutkan ke pembayaran.</p>
            </div>
            <div>
                <h4 className="font-semibold">Pembayaran gagal?</h4>
                <p className="text-gray-600 text-sm">Pastikan saldo Anda cukup dan nomor tujuan sudah benar. Hubungi customer service jika masalah berlanjut.</p>
            </div>
        </div>
    );

    const AkunView = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <img src={user?.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-teal-200" alt="User Avatar" />
                <h3 className="text-xl font-bold text-gray-800 mt-4">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
                <button className="w-full text-left p-4 border-b hover:bg-gray-50">Edit Profil</button>
                <button className="w-full text-left p-4 border-b hover:bg-gray-50">Keamanan Akun</button>
                <button className="w-full text-left p-4 hover:bg-gray-50">Pusat Bantuan</button>
            </div>
            <button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg">Keluar / Logout</button>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case 'home': return <HomeView />;
            case 'transaksi': return <TransaksiView />;
            case 'rekap': return <RekapView />;
            case 'informasi': return <InformasiView />;
            case 'akun': return <AkunView />;
            default: return <HomeView />;
        }
    };

    return (
        <>
            <PembayaranNav activeTab={activeTab} setActiveTab={setActiveTab} navItems={navItems} />
            {renderContent()}
        </>
    );
};

export default PembayaranOnline;