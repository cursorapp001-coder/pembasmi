import React, { useState } from 'react';

// --- ICONS ---
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22a12.02 12.02 0 009-1.056c.343-.344.672-.698.988-1.06l-3.32-3.32z" /></svg>;
const LogoutAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const EyeAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CheckAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const XAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const CloseAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

// --- Sidebar Icons ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const PostIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h.01M17 17h.01" /></svg>;
const PageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const MediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const AppearanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const PluginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const SettingsAdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ToolsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L12.125 6.125a3.375 3.375 0 00-4.773 0L3 10.5a3.375 3.375 0 000 4.773l2.472 2.472M11.42 15.17l-2.472 2.472a3.375 3.375 0 01-4.773 0L3 19.5a3.375 3.375 0 010-4.773l2.472-2.472" /></svg>;
const AccessCodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3m10 0h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3m-3 4a3 3 0 100-6 3 3 0 000 6z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;

interface BackendOfficeProps {
    isAdminLoggedIn: boolean;
    onAdminLogin: () => void;
    onAdminLogout: () => void;
}

// --- MOCK DATA ---
const initialMembers = [
  { id: 'usr-001', name: 'Budi Hartono', email: 'budi.h@example.com', ktp: '3201...001', registrationDate: '2023-10-26', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256', details: { "No. KTP": "3201234567890001", "Alamat": "Jl. Merdeka No. 1, Jakarta", "Pendidikan": "S2 (Lulus)" }, role: 'Anggota' },
  { id: 'usr-002', name: 'Citra Lestari', email: 'citra.l@example.com', ktp: '3202...002', registrationDate: '2023-10-25', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256', details: { "No. KTP": "3202123456780002", "Alamat": "Jl. Sudirman No. 2, Bandung", "Pendidikan": "S1" }, role: 'Anggota' },
  { id: 'usr-003', name: 'Doni Firmansyah', email: 'doni.f@example.com', ktp: '3203...003', registrationDate: '2023-10-24', status: 'Approved', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c025cbddd?q=80&w=256', details: { "No. KTP": "3203987654320003", "Alamat": "Jl. Gatot Subroto No. 3, Surabaya", "Pendidikan": "S1" }, role: 'Anggota' },
  { id: 'usr-004', name: 'Eka Wijaya', email: 'eka.w@example.com', ktp: '3204...004', registrationDate: '2023-10-23', status: 'Approved', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256', details: { "No. KTP": "3204112233440004", "Alamat": "Jl. Asia Afrika No. 4, Medan", "Pendidikan": "S3 (Lulus)" }, role: 'Admin' },
  { id: 'usr-005', name: 'Fitriani', email: 'fitriani@example.com', ktp: '3205...005', registrationDate: '2023-10-22', status: 'Rejected', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256', details: { "No. KTP": "3205667788990005", "Alamat": "Jl. Diponegoro No. 5, Yogyakarta", "Pendidikan": "S1" }, role: 'Anggota' },
];

type MemberStatus = 'Pending' | 'Approved' | 'Rejected';
type Member = typeof initialMembers[0];

// --- LOGIN COMPONENT ---
const AdminLogin: React.FC<{ onAdminLogin: () => void }> = ({ onAdminLogin }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (username.trim() === 'admin' && password.trim() === 'pembasmi2024') {
            onAdminLogin();
        } else {
            setError('Username atau password salah.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans">
            <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
                <div className="text-center">
                    <ShieldIcon />
                    <h1 className="mt-4 text-3xl font-extrabold text-white">Backend Office</h1>
                    <p className="mt-2 text-sm text-slate-400">Silakan login untuk melanjutkan</p>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-300">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             placeholder="••••••••"
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- MODAL COMPONENT ---
const MemberDetailModal: React.FC<{ member: Member; onClose: () => void }> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg border border-slate-700 animate-fade-in-up">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Detail Pengguna</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><CloseAdminIcon /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <img className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500" src={member.avatar} alt={member.name} />
            <div>
              <h4 className="text-2xl font-bold text-white">{member.name}</h4>
              <p className="text-slate-400">{member.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4">
            {Object.entries(member.details).map(([key, value]) => (
              <div key={key} className="bg-slate-700 p-3 rounded-md">
                <p className="font-semibold text-slate-400">{key}</p>
                <p className="text-white">{value}</p>
              </div>
            ))}
            <div className="bg-slate-700 p-3 rounded-md">
                <p className="font-semibold text-slate-400">Tanggal Registrasi</p>
                <p className="text-white">{member.registrationDate}</p>
            </div>
             <div className="bg-slate-700 p-3 rounded-md">
                <p className="font-semibold text-slate-400">Role</p>
                <p className="text-white">{member.role}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-b-lg flex justify-end">
             <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD SUB-COMPONENTS ---
const Sidebar: React.FC<{ activePage: string; setActivePage: (page: string) => void; isSidebarOpen: boolean; }> = ({ activePage, setActivePage, isSidebarOpen }) => {
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({ content: true, tools: true });

    const toggleMenu = (id: string) => {
        setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'users', label: 'Manajemen Pengguna', icon: <UsersIcon /> },
        { 
            id: 'content', 
            label: 'Manajemen Konten', 
            icon: <ContentIcon />,
            subItems: [
                { id: 'posts', label: 'Posts/Berita', icon: <PostIcon /> },
                { id: 'pages', label: 'Pages/Halaman', icon: <PageIcon /> },
                { id: 'media', label: 'Media', icon: <MediaIcon /> },
                { id: 'comments', label: 'Komentar', icon: <CommentIcon /> },
            ]
        },
        { id: 'appearance', label: 'Pengaturan Tampilan', icon: <AppearanceIcon /> },
        { id: 'plugins', label: 'Plugin/Ekstensi', icon: <PluginIcon /> },
        { id: 'settings', label: 'Pengaturan', icon: <SettingsAdminIcon /> },
        { 
            id: 'tools', 
            label: 'Alat', 
            icon: <ToolsIcon />,
            subItems: [
                { id: 'access-codes', label: 'Kode Akses', icon: <AccessCodeIcon /> },
            ]
        },
    ];

    return (
        <aside className={`bg-slate-800 text-slate-300 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center justify-center h-20 border-b border-slate-700">
                <ShieldIcon />
                {isSidebarOpen && <span className="ml-3 text-xl font-bold text-white">PEMBASMI</span>}
            </div>
            <nav className="mt-4">
                {navItems.map(item => (
                    <div key={item.id}>
                        <button 
                            onClick={() => item.subItems ? toggleMenu(item.id) : setActivePage(item.id)} 
                            className={`flex items-center justify-between w-full py-3 px-6 transition-colors duration-200 ${activePage === item.id && !item.subItems ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700'}`}
                        >
                            <div className="flex items-center">
                                {item.icon}
                                {isSidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
                            </div>
                            {isSidebarOpen && item.subItems && <ChevronDownIcon />}
                        </button>
                        {isSidebarOpen && item.subItems && openMenus[item.id] && (
                            <div className="pl-8 bg-slate-900/50">
                                {item.subItems.map(subItem => (
                                    <button key={subItem.id} onClick={() => setActivePage(subItem.id)} className={`flex items-center w-full py-2.5 px-4 text-sm transition-colors duration-200 ${activePage === subItem.id ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'}`}>
                                        {subItem.icon}
                                        <span className="ml-3">{subItem.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

const Header: React.FC<{ onLogout: () => void; toggleSidebar: () => void; pageTitle: string; }> = ({ onLogout, toggleSidebar, pageTitle }) => (
    <header className="flex items-center justify-between h-20 px-6 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-slate-700 mr-4"><ChevronLeftIcon /></button>
            <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-slate-700">
                <BellIcon />
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-slate-800"></span>
            </button>
            <div className="relative">
                <button onClick={onLogout} className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-700">
                    <img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256" alt="Admin Avatar" />
                    <span className="font-medium text-sm hidden sm:block">Admin</span>
                    <LogoutAdminIcon />
                </button>
            </div>
        </div>
    </header>
);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center space-x-4">
        <div className="bg-slate-700 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const DashboardView: React.FC<{ members: Member[]; setPage: (page: string) => void; }> = ({ members, setPage }) => {
    const pendingMembers = members.filter(m => m.status === 'Pending');
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Pengguna" value={members.length.toString()} icon={<UsersIcon />} />
                <StatCard title="Persetujuan Tertunda" value={pendingMembers.length.toString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard title="Total Postingan" value="25" icon={<PostIcon />} />
                <StatCard title="Total Halaman" value="8" icon={<PageIcon />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Sekilas Pandang</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Postingan</span><span className="font-semibold text-white">25</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Halaman</span><span className="font-semibold text-white">8</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Komentar</span><span className="font-semibold text-white">120</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Status Sistem</span><span className="font-semibold text-green-400">✓ Normal</span></div>
                    </div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Aktivitas Terbaru</h3>
                    <div className="space-y-4">
                        {members.slice(0, 3).map(member => (
                            <div key={member.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-md">
                                <div className="flex items-center space-x-3">
                                    <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover"/>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{member.name} <span className="font-normal text-slate-400">baru saja mendaftar.</span></p>
                                        <p className="text-xs text-slate-500">{member.registrationDate}</p>
                                    </div>
                                </div>
                                <button onClick={() => setPage('users')} className="px-3 py-1 text-xs bg-indigo-600 rounded-md hover:bg-indigo-700">Lihat</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserManagementView: React.FC<{ members: Member[]; setMembers: (members: Member[]) => void; viewMember: (member: Member) => void }> = ({ members, setMembers, viewMember }) => {
    
    const updateStatus = (id: string, status: MemberStatus) => {
        setMembers(members.map(m => m.id === id ? { ...m, status } : m));
    };

    const StatusBadge: React.FC<{ status: MemberStatus }> = ({ status }) => {
        const colors = {
            Pending: 'bg-yellow-500/20 text-yellow-400',
            Approved: 'bg-green-500/20 text-green-400',
            Rejected: 'bg-red-500/20 text-red-400',
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
    };
    
    return (
         <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Daftar Pengguna</h3>
                <div className="relative">
                    <input type="text" placeholder="Cari pengguna..." className="bg-slate-700 border border-slate-600 rounded-md pl-10 pr-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nama</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Tanggal Registrasi</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 flex items-center space-x-3">
                                    <img className="h-8 w-8 rounded-full object-cover" src={member.avatar} alt={member.name} />
                                    <div>
                                        <div className="font-semibold text-white">{member.name}</div>
                                        <div className="text-xs text-slate-500">{member.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{member.role}</td>
                                <td className="px-6 py-4">{member.registrationDate}</td>
                                <td className="px-6 py-4"><StatusBadge status={member.status as MemberStatus} /></td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => viewMember(member)} className="p-1.5 rounded-md hover:bg-slate-600" aria-label="Lihat"><EyeAdminIcon /></button>
                                        <button onClick={() => updateStatus(member.id, 'Approved')} className="p-1.5 rounded-md hover:bg-green-500/20 text-green-400" aria-label="Setujui"><CheckAdminIcon /></button>
                                        <button onClick={() => updateStatus(member.id, 'Rejected')} className="p-1.5 rounded-md hover:bg-red-500/20 text-red-400" aria-label="Tolak"><XAdminIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- MOCK CONTENT VIEWS ---
const PostsView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Manajemen Postingan</h3>
        <p className="text-slate-400">Fitur manajemen postingan berita dan artikel akan ditampilkan di sini.</p>
    </div>
);
const PagesView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Manajemen Halaman</h3>
        <p className="text-slate-400">Fitur untuk mengelola halaman statis (seperti 'Tentang Kami', 'Kontak') akan ada di sini.</p>
    </div>
);
const MediaView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Manajemen Media</h3>
        <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="bg-slate-700 aspect-square rounded-md"></div>)}
        </div>
    </div>
);
const CommentsView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Manajemen Komentar</h3>
        <p className="text-slate-400">Antarmuka untuk menyetujui, menolak, atau membalas komentar akan ditampilkan di sini.</p>
    </div>
);
const AppearanceView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Pengaturan Tampilan</h3>
        <p className="text-slate-400">Pengaturan untuk tema, warna, dan tata letak situs akan ada di sini.</p>
    </div>
);
const PluginsView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Plugin/Ekstensi</h3>
        <p className="text-slate-400">Manajemen plugin atau ekstensi untuk menambah fungsionalitas akan ditampilkan di sini.</p>
    </div>
);
const SettingsView: React.FC = () => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Pengaturan Umum</h3>
        <p className="text-slate-400">Pengaturan umum aplikasi seperti nama situs, email admin, dll., akan ada di sini.</p>
    </div>
);

// --- ACCESS CODE MANAGEMENT VIEW ---
const initialAccessCodes = [
    { id: 1, code: 'PEMBASMI2024', user: 'Admin Generated', type: 'Lifetime', status: 'Active', expiry: 'N/A' },
    { id: 2, code: 'PEM-LIFETIME-DEMO', user: 'System Demo', type: 'Lifetime', status: 'Active', expiry: 'N/A' },
    { id: 3, code: 'USR-MONTHLY-XYZ', user: 'budi.h@example.com', type: 'Monthly', status: 'Active', expiry: '2024-11-26' },
    { id: 4, code: 'USR-MONTHLY-ABC', user: 'citra.l@example.com', type: 'Monthly', status: 'Expired', expiry: '2024-10-25' },
];
type AccessCode = typeof initialAccessCodes[0];

const AccessCodeManagementView: React.FC = () => {
    const [codes, setCodes] = useState<AccessCode[]>(initialAccessCodes);

    const generateCode = () => {
        const newCode = `PEM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        const newEntry: AccessCode = {
            id: codes.length + 1,
            code: newCode,
            user: 'Unassigned',
            type: 'Monthly',
            status: 'Active',
            expiry: expiryDate.toISOString().split('T')[0],
        };
        setCodes(prev => [...prev, newEntry]);
    };

    const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
        const colors: { [key: string]: string } = {
            Active: 'bg-green-500/20 text-green-400',
            Expired: 'bg-red-500/20 text-red-400',
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
    };

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Manajemen Kode Akses</h3>
                <button onClick={generateCode} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                    <PlusIcon />
                    <span>Buat Kode Baru</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Kode Akses</th>
                            <th scope="col" className="px-6 py-3">Pengguna</th>
                            <th scope="col" className="px-6 py-3">Tipe</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Kedaluwarsa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map(code => (
                            <tr key={code.id} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-mono text-white">{code.code}</td>
                                <td className="px-6 py-4">{code.user}</td>
                                <td className="px-6 py-4">{code.type}</td>
                                <td className="px-6 py-4"><StatusBadge status={code.status} /></td>
                                <td className="px-6 py-4">{code.expiry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const BackendOffice: React.FC<BackendOfficeProps> = ({ isAdminLoggedIn, onAdminLogin, onAdminLogout }) => {
    const [activePage, setActivePage] = useState('dashboard');
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (!isAdminLoggedIn) {
        return <AdminLogin onAdminLogin={onAdminLogin} />;
    }
    
    const pageTitles: Record<string, string> = {
        dashboard: 'Dashboard',
        users: 'Manajemen Pengguna',
        posts: 'Manajemen Postingan',
        pages: 'Manajemen Halaman',
        media: 'Manajemen Media',
        comments: 'Manajemen Komentar',
        appearance: 'Pengaturan Tampilan',
        plugins: 'Plugin/Ekstensi',
        settings: 'Pengaturan',
        'access-codes': 'Manajemen Kode Akses',
    };
    
    const renderContent = () => {
        switch (activePage) {
            case 'dashboard': return <DashboardView members={members} setPage={setActivePage} />;
            case 'users': return <UserManagementView members={members} setMembers={setMembers} viewMember={setSelectedMember} />;
            case 'posts': return <PostsView />;
            case 'pages': return <PagesView />;
            case 'media': return <MediaView />;
            case 'comments': return <CommentsView />;
            case 'appearance': return <AppearanceView />;
            case 'plugins': return <PluginsView />;
            case 'settings': return <SettingsView />;
            case 'access-codes': return <AccessCodeManagementView />;
            default: return <DashboardView members={members} setPage={setActivePage} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
            {selectedMember && <MemberDetailModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
            <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onLogout={onAdminLogout} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} pageTitle={pageTitles[activePage] || 'Backend Office'} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default BackendOffice;
