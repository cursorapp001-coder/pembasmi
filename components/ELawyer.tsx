import React, { useState, useEffect } from 'react';
import { BackIcon, PaperPlaneIcon } from '../constants';
import { User } from '../App';
import Koperasi from './Koperasi';
import PembayaranOnline from './PembayaranOnline';
import ECommerce from './ECommerce';
import UpdateProfile from './UpdateProfile';

// --- START: NEW ICONS for ELawyer Sidebar ---
const DashboardSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CardSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const PencilSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const UsersSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const InfoSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const EventSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CalendarDateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FormSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const KoperasiSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ECommerceSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PembayaranSidebarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const HomePortalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
// --- END: NEW ICONS ---

// --- START: ICONS for Dashboard ---

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const DashboardEyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M5.47 9.53a7 7 0 0110.53-1.1M20 20v-5h-5m-1.47-4.47a7 7 0 01-10.53 1.1" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.967-.63 1.563-.43A6 6 0 0121.75 12z" />
    </svg>
);

const HomeGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#2D2D2D" d="M32 6L2 24l4 4 26-18 26 18 4-4z"/><path fill="#E84333" d="M54 28v30H10V28l22-16z"/><path fill="#F4A232" d="M22 42h8v16h-8zM34 42h8v16h-8z"/></svg>;
const KTAGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><g fill="#E84333"><path d="M42 12V6H20v30h22z"/><path d="M47 18V9h-5v24h14V18z"/><path d="M15 48V20H6v28h21v-8z"/></g><g fill="#F4A232"><path d="M25 12h12v4H25z"/><path d="M51 24h4v8h-4z"/><path d="M10 24h4v8h-4z"/></g></svg>;
const AnggotaGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#2D2D2D" d="M14 58V40h10v18zM28 58V40h8v18zM42 58V40h8v18z"/><g fill="#F4A232"><circle cx="19" cy="31" r="5"/><circle cx="32" cy="31" r="6"/><circle cx="46" cy="31" r="5"/></g></svg>;
const PanduanGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><rect x="10" y="6" width="44" height="52" rx="4" fill="#E84333"/><path fill="#2D2D2D" d="M20 18h24v4H20zM20 28h16v4H20z"/><rect x="10" y="6" width="8" height="52" fill="#D33323"/><path d="M18 46h-4a1 1 0 01-1-1V19a1 1 0 011-1h4v28z" fill="#2D2D2D"/><text x="21" y="52" fontFamily="sans-serif" fontSize="10" fill="white" fontWeight="bold">PANDUAN</text></svg>;
const LawfirmGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#E84333" d="M30 20h14v38H30z"/><path fill="#2D2D2D" d="M46 12h14v46H46zM28 58V32H12v26z"/><circle cx="20" cy="23" r="7" fill="#F4A232"/><path d="M14 58v-4h4v-4h4v8h-8z" fill="#F4A232"/><text x="32" y="32" fill="white" fontSize="6" fontWeight="bold">LAWFIRM</text></svg>;
const EventGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#4A4A4A" d="M10 12h44v46H10z"/><path fill="#E84333" d="M10 12h44v10H10z"/><path d="M18 8h4v8h-4zM42 8h4v8h-4z" fill="#F4A232"/><g fill="#FFFFFF"><rect x="16" y="30" width="8" height="6"/><rect x="28" y="30" width="8" height="6"/><rect x="40" y="30" width="8" height="6"/><rect x="16" y="42" width="8" height="6"/><rect x="28" y="42" width="8" height="6"/><rect x="40" y="42" width="8" height="6"/></g><rect x="16" y="30" width="8" height="6" fill="#4CAF50"/></svg>;
const KoperasiGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#2D2D2D" d="M32 6L2 24v4h60v-4L32 6z"/><path fill="#E84333" d="M54 34v24H10V34H6v28h52V34h-4z"/><path fill="#F4A232" d="M14 38h8v16h-8zM28 38h8v16h-8zM42 38h8v16h-8z"/></svg>;
const ECommerceGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#4CAF50" d="M10 10h44v6H10z"/><path fill="#E84333" d="M12 20h40v30H12z"/><circle cx="22" cy="56" r="4" fill="#2D2D2D"/><circle cx="42" cy="56" r="4" fill="#2D2D2D"/><path fill="#F4A232" d="M18 20l-6-10h-8v6h4l6 10zM46 20l6-10h8v6h-4l-6 10z"/><path fill="#FFFFFF" d="M18 26h28v4H18zM18 36h28v4H18z"/></svg>;
const PembayaranGridIcon = () => <svg viewBox="0 0 64 64" className="h-10 w-10"><path fill="#2196F3" d="M6 16h52v32H6z"/><path fill="#0D47A1" d="M6 22h52v6H6z"/><path fill="#FFFFFF" d="M12 40h16v4H12zM32 40h12v4H32z"/></svg>;

const HomeNavIcon = ({active}:{active:boolean}) => <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ProfileNavIcon = ({active}:{active:boolean}) => <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const InfoNavIcon = ({active}:{active:boolean}) => <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" /></svg>;
const KTANavIcon = ({active}:{active:boolean}) => <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const AnggotaNavIcon = ({active}:{active:boolean}) => <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

// --- END: NEW ICONS ---

type Page = 'dashboard' | 'kta' | 'anggota' | 'panduan' | 'lawfirm' | 'event' | 'profile' | 'informasi' | 'koperasi' | 'ecommerce' | 'pembayaran';

// --- START: ELawyer Sidebar Component ---
const ELawyerSidebar: React.FC<{ isOpen: boolean; onClose: () => void; onLogout: () => void; setActivePage: (page: Page) => void; onBackToMainHome: () => void; }> = ({ isOpen, onClose, onLogout, setActivePage, onBackToMainHome }) => {
  const [keanggotaanOpen, setKeanggotaanOpen] = useState(true);
  const [commonOpen, setCommonOpen] = useState(true);
  const [layananOpen, setLayananOpen] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    onClose();
  };

  const formattedDate = time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' });

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardSidebarIcon />, page: 'dashboard', subItems: [] },
    {
      label: 'Keanggotaan',
      isOpen: keanggotaanOpen,
      toggle: () => setKeanggotaanOpen(!keanggotaanOpen),
      subItems: [
        { label: 'Perpanjang/Cetak KTA', icon: <CardSidebarIcon />, page: 'kta' },
        { label: 'UKDPA', icon: <PencilSidebarIcon />, page: 'event' },
        { label: 'Database Pengguna', icon: <UsersSidebarIcon />, page: 'anggota' },
      ],
    },
     {
      label: 'Layanan',
      isOpen: layananOpen,
      toggle: () => setLayananOpen(!layananOpen),
      subItems: [
        { label: 'Koperasi', icon: <KoperasiSidebarIcon />, page: 'koperasi' },
        { label: 'E-Commerce', icon: <ECommerceSidebarIcon />, page: 'ecommerce' },
        { label: 'Pembayaran Online', icon: <PembayaranSidebarIcon />, page: 'pembayaran' },
      ],
    },
    { label: 'Form-form', icon: <FormSidebarIcon />, page: 'panduan', subItems: [] },
    {
      label: 'Common',
      isOpen: commonOpen,
      toggle: () => setCommonOpen(!commonOpen),
      subItems: [
        { label: 'Informasi', icon: <InfoSidebarIcon />, page: 'informasi' },
        { label: 'Event', icon: <EventSidebarIcon />, page: 'event' },
      ],
    },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} aria-hidden="true"></div>
      <aside className={`fixed top-0 left-0 w-72 h-full bg-[#1e293b] text-gray-300 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center text-sm">
            <CalendarDateIcon />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <ClockIcon />
            <span>{formattedTime}</span>
          </div>
          <div className="flex justify-between text-sm mt-4 text-blue-400">
            <button className="hover:underline">Ikuti Tour</button>
            <button onClick={onClose} className="hover:underline">Tutup Menu</button>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={item.subItems.length > 0 ? item.toggle : () => handleNavClick(item.page as Page)}
                className="w-full flex items-center justify-between p-3 rounded-md text-left text-base hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.subItems.length > 0 && <ChevronDownIcon isOpen={item.isOpen!} />}
              </button>
              {item.isOpen && item.subItems.length > 0 && (
                <ul className="pl-6 py-1 space-y-1 bg-black/20">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button onClick={() => handleNavClick(subItem.page as Page)} className="w-full text-left flex items-center p-3 rounded-md text-sm text-gray-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                        {subItem.icon}
                        <span>{subItem.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
           <button onClick={onBackToMainHome} className="w-full flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
                <HomePortalIcon />
                <span>Halaman Utama</span>
            </button>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
            <LogoutIcon />
            <span>Keluar / Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
// --- END: ELawyer Sidebar Component ---


// --- START: Dashboard Component and its parts ---

const GridItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md aspect-square transition-transform transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500">
        <div className="w-16 h-16 flex items-center justify-center mb-2">
            {icon}
        </div>
        <span className="text-gray-800 font-semibold text-sm text-center">{label}</span>
    </button>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active = false, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full pt-1 focus:outline-none">
        {icon}
        <span className={`text-xs mt-1 ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    </button>
);

const DashboardGrid: React.FC<{ setPage: (page: Page) => void; user: User | null; }> = ({ setPage, user }) => (
    <>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
                <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&fit=crop&crop=faces"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4 border-2 border-red-500 object-cover"
                />
                <div>
                    <h2 className="font-bold text-blue-800 text-base leading-tight">{user?.fullName || 'Guest User'}</h2>
                    <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">Menunggu Persetujuan</span>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-4">
                 <button onClick={() => setPage('profile')} className="flex items-center text-blue-600 font-semibold focus:outline-none">
                    <DashboardEyeIcon />
                    Edit Profile
                </button>
                <div className="flex items-center space-x-4">
                    <button aria-label="Refresh"><RefreshIcon /></button>
                    <button aria-label="Settings"><SettingsIcon /></button>
                </div>
            </div>

            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center focus:outline-none focus:shadow-outline transition-colors" type="button">
                <KeyIcon />
                Reset Password
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <GridItem icon={<HomeGridIcon />} label="HOME" onClick={() => setPage('dashboard')} />
            <GridItem icon={<KTAGridIcon />} label="KTA" onClick={() => setPage('kta')} />
            <GridItem icon={<AnggotaGridIcon />} label="ANGGOTA" onClick={() => setPage('anggota')} />
            <GridItem icon={<PanduanGridIcon />} label="PANDUAN" onClick={() => setPage('panduan')} />
            <GridItem icon={<LawfirmGridIcon />} label="LAWFIRM" onClick={() => setPage('lawfirm')} />
            <GridItem icon={<EventGridIcon />} label="EVENT" onClick={() => setPage('event')} />
            <GridItem icon={<KoperasiGridIcon />} label="KOPERASI" onClick={() => setPage('koperasi')} />
            <GridItem icon={<ECommerceGridIcon />} label="E-COMMERCE" onClick={() => setPage('ecommerce')} />
            <GridItem icon={<PembayaranGridIcon />} label="PEMBAYARAN" onClick={() => setPage('pembayaran')} />
        </div>
    </>
);

const PlaceholderPage: React.FC<{ title: string; }> = ({ title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600">
            This is the placeholder page for the "{title}" section. Functionality and content for this feature would be displayed here.
        </p>
    </div>
);

const ELawyerDashboard: React.FC<{ onLogout: () => void; user: User | null; onBackToMainHome: () => void; }> = ({ onLogout, user, onBackToMainHome }) => {
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const pageTitles: Record<Page, string> = {
        dashboard: 'Dashboard',
        kta: 'KTA',
        anggota: 'Anggota',
        panduan: 'Panduan',
        lawfirm: 'Lawfirm',
        event: 'Event',
        profile: 'Update Profile',
        informasi: 'Informasi',
        koperasi: 'Koperasi',
        ecommerce: 'E-Commerce',
        pembayaran: 'Pembayaran Online',
    };

    const navItems = [
        { id: 'dashboard', icon: <HomeNavIcon active={activePage === 'dashboard'} />, label: 'Home' },
        { id: 'profile', icon: <ProfileNavIcon active={activePage === 'profile'} />, label: 'Profile' },
        { id: 'informasi', icon: <InfoNavIcon active={activePage === 'informasi'} />, label: 'Informasi' },
        { id: 'kta', icon: <KTANavIcon active={activePage === 'kta'} />, label: 'KTA' },
        { id: 'anggota', icon: <AnggotaNavIcon active={activePage === 'anggota'} />, label: 'Anggota' },
    ];

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardGrid setPage={setActivePage} user={user} />;
            case 'koperasi':
                return <Koperasi user={user} onBackToHome={() => setActivePage('dashboard')} />;
            case 'ecommerce':
                return <ECommerce user={user} onBack={() => setActivePage('dashboard')} />;
            case 'pembayaran':
                return <PembayaranOnline user={user} onLogout={onLogout} onBack={() => setActivePage('dashboard')} />;
            case 'kta':
                return <PlaceholderPage title="Kartu Tanda Anggota (KTA)" />;
            case 'anggota':
                return <PlaceholderPage title="Daftar Anggota" />;
            case 'panduan':
                return <PlaceholderPage title="Panduan Pengguna" />;
            case 'lawfirm':
                return <PlaceholderPage title="Manajemen Lawfirm" />;
            case 'event':
                return <PlaceholderPage title="Jadwal Event" />;
            case 'profile':
                return <UpdateProfile user={user} />;
            case 'informasi':
                return <PlaceholderPage title="Pusat Informasi" />;
            default:
                return <DashboardGrid setPage={setActivePage} user={user} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <ELawyerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} setActivePage={setActivePage} onBackToMainHome={onBackToMainHome} />
            <header className="bg-red-600 text-white flex items-center justify-between p-4 shadow-lg sticky top-0 z-20">
                {activePage !== 'dashboard' && activePage !== 'profile' ? (
                    <button onClick={() => setActivePage('dashboard')} className="focus:outline-none" aria-label="Back to dashboard">
                        <BackIcon />
                    </button>
                ) : (
                    <button onClick={() => setIsSidebarOpen(true)} className="focus:outline-none" aria-label="Menu">
                        <MenuIcon />
                    </button>
                )}
                <h1 className="text-xl font-bold">{pageTitles[activePage]}</h1>
                <div className="w-6"></div>
            </header>

            <main className={`pb-24 ${activePage === 'profile' ? '' : 'p-4'}`}>
                {renderContent()}
            </main>

            <button className="fixed bottom-20 right-5 bg-teal-500 hover:bg-teal-600 text-white font-bold w-16 h-16 rounded-full shadow-lg flex flex-col items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-110">
                <span className="text-sm leading-none">Action</span>
            </button>


            <footer className="bg-black text-white fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center z-20 shadow-up">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activePage === item.id}
                        onClick={() => setActivePage(item.id as Page)}
                    />
                ))}
            </footer>
        </div>
    );
};

// --- END: Dashboard Component ---


interface ELawyerProps {
  onBack: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  user: User | null;
}

// --- START: ICONS for Login/Register ---
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.052 10.052 0 013.453-4.412M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c1.554 0 3.02.446 4.313 1.233m5.229 5.229A10.052 10.052 0 0119.542 12c-1.274 4.057-5.064 7-9.542 7-1.554 0-3.02-.446-4.313-1.233m-2.228-2.228L3 3l18 18-2.228-2.228" />
  </svg>
);

const ELawyerTitleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m6 0v-4a2 2 0 00-2-2h-2" />
  </svg>
);

const LoginArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" transform="rotate(180 10 10)" />
  </svg>
);

const RegisterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const JusticeScaleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M3 9l9 3l9 -3" />
    <path d="M3 9v-4a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v4" />
    <path d="M3 15h18" />
    <path d="M3 15l-2 3" />
    <path d="M21 15l2 3" />
  </svg>
);

// --- END: ICONS ---

const LoginForm = ({ onRegisterClick, onLoginSuccess }: { onRegisterClick: () => void; onLoginSuccess: () => void; }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className="bg-purple-800 text-white p-6 relative overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(to right, #3730a3, #5b21b6)' }}
      >
        <div className="absolute inset-0 bg-repeat opacity-5" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-48 relative z-10 text-center">
            <div className="flex items-center justify-center p-2 rounded-lg bg-white/10 border border-white/20 mb-3">
              <JusticeScaleIcon className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold tracking-widest text-sm text-gray-300">★★ PEMBASMI ★★</p>
            <h1 className="text-2xl font-bold tracking-wider">ORGANISASI ADVOKAT</h1>
            <h2 className="text-5xl font-extrabold text-red-500 my-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>PEMBASMI</h2>
            <p className="text-sm">PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA</p>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg -mt-24 p-6 relative z-20">
            <h2 className="text-lg font-bold text-gray-700 mb-6 flex items-center">
                <ELawyerTitleIcon className="h-6 w-6 text-gray-500" />
                <span className="ml-2">e-Lawyer</span>
            </h2>

            <form className="space-y-4">
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1" htmlFor="identity">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                        <span>NIK / Mobile Phone / Email</span>
                    </label>
                    <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="identity" type="text" placeholder="NIK / Mobile Phone / Email" />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1" htmlFor="password">
                       <LockIcon className="h-4 w-4 text-gray-500" />
                       <span>Password</span>
                    </label>
                    <div className="relative">
                        <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" id="password" type={showPassword ? 'text' : 'password'} placeholder="Password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700" aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <button onClick={onLoginSuccess} className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
                        <LoginArrowIcon className="h-5 w-5" />
                        Log In
                    </button>
                    <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:shadow-outline transition-colors" type="button">
                        Ganti Password
                    </button>
                    <button onClick={onRegisterClick} className="w-full flex items-center justify-center gap-2 bg-[#84cc16] hover:bg-lime-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
                        <RegisterIcon className="h-5 w-5" />
                        Registrasi
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="button">
                       <HelpIcon className="h-5 w-5" />
                       Bantuan
                    </button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
}


const RegistrationForm = ({ onBackToLogin }: { onBackToLogin: () => void }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header
        className="bg-purple-900 text-white p-6 md:p-8 text-center relative overflow-hidden"
        style={{
            backgroundImage: 'linear-gradient(135deg, #4c0519 0%, #3730a3 100%)',
        }}
        >
        <div
            className="absolute inset-0 bg-repeat opacity-5"
            style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 mb-4 bg-white/10 p-2 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-10 h-10">
                    <path fillRule="evenodd" d="M12.96 6.26a.75.75 0 01.472.693v4.334l3.195 1.845a.75.75 0 01-.744 1.29l-3.5-2.02a.75.75 0 01-.373-.648V7.01a.75.75 0 01.95-.75z" clipRule="evenodd" />
                    <path d="M11.625 3.375a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
                    <path d="M12.375 19.125a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
                    <path d="M16.875 6.375a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
                    <path d="M7.875 16.125a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                </svg>
            </div>
            <p className="text-sm font-bold tracking-widest text-gray-300">★★ PEMBASMI ★★</p>
            <h1 className="text-xl md:text-2xl font-bold tracking-wider mt-2">ORGANISASI ADVOKAT</h1>
            <h2 className="text-4xl md:text-5xl font-extrabold text-red-500 my-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>PEMBASMI</h2>
            <p className="text-md md:text-lg">PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA</p>
        </div>
      </header>

      <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md -mt-20 relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Form Pendaftaran</h3>
              <p className="text-gray-500 mb-6 text-sm">Dengan Klik Kirim bearti anda menjamin kebenaran data yang Anda input</p>

              <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="nama">Nama <span className="text-red-500">*</span> <span className="text-gray-500 font-normal text-xs">(Nama lengkap, tanpa gelar)</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="nama" type="text" placeholder="Nama Lengkap" />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email <span className="text-red-500">*</span> <span className="text-gray-500 font-normal text-xs">(Gunakan Email yg terdaftar di e-Court)</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="email" type="email" placeholder="email@contoh.com"/>
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ktp">No. KTP <span className="text-red-500">*</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="ktp" type="text" />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="hp">Nomer HP <span className="text-red-500">*</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="hp" type="text" />
                      </div>
                  </div>

                  <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Level <span className="text-red-500">*</span></label>
                      <div className="flex flex-col space-y-2 text-sm text-gray-800">
                          <label className="inline-flex items-center"><input type="radio" className="form-radio text-purple-600" name="level" value="anggota_pembasmi" /> <span className="ml-2">Anggota PEMBASMI</span></label>
                          <label className="inline-flex items-center"><input type="radio" className="form-radio text-purple-600" name="level" value="anggota_lain" /> <span className="ml-2">Anggota Organisasi Advokat lain</span></label>
                          <label className="inline-flex items-center"><input type="radio" className="form-radio text-purple-600" name="level" value="peserta_pengangkatan" /> <span className="ml-2">Peserta Pengangkatan Advokat</span></label>
                          <label className="inline-flex items-center"><input type="radio" className="form-radio text-purple-600" name="level" value="peserta_pkpa" /> <span className="ml-2">Peserta PKPA & UKDPA</span></label>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="group">Group <span className="text-red-500">*</span></label>
                          <select id="group" className="appearance-none border rounded-md w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600">
                              <option>Pilih Group</option>
                              <option>Group A</option>
                              <option>Group B</option>
                              <option>Group C</option>
                          </select>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password_reg">Password <span className="text-red-500">*</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="password_reg" type="password" />
                      </div>
                      <div>
                          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="confirm_password">Konfirmasi Password <span className="text-red-500">*</span></label>
                          <input className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600" id="confirm_password" type="password" />
                      </div>
                  </div>

                  <div className="flex items-center justify-start pt-4">
                       <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center gap-2 transition-all transform hover:scale-105" type="button">
                          <PaperPlaneIcon />
                          Daftar
                      </button>
                  </div>
              </form>

              <p className="text-center text-sm text-gray-600 mt-8">
                  Bila anda sudah terdaftar, Kembali ke <button onClick={onBackToLogin} className="text-blue-600 hover:underline font-semibold">Login Page</button>
              </p>
          </div>
      </main>
    </div>
  );
};


const ELawyer: React.FC<ELawyerProps> = ({ onBack, isLoggedIn, onLoginSuccess, onLogout, user }) => {
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleLogout = () => {
    onLogout();
  };

  const handleBackNavigation = () => {
    if (view === 'register') {
      setView('login');
    } else {
      onBack();
    }
  };

  if (isLoggedIn) {
      return <ELawyerDashboard onLogout={handleLogout} user={user} onBackToMainHome={onBack} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <button
        onClick={handleBackNavigation}
        className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
        aria-label={view === 'register' ? "Kembali ke E-Lawyer" : "Kembali ke menu utama"}
      >
        <BackIcon />
      </button>

      {view === 'login' && <LoginForm onRegisterClick={() => setView('register')} onLoginSuccess={onLoginSuccess}/>}
      {view === 'register' && <RegistrationForm onBackToLogin={() => setView('login')} />}
    </div>
  );
};

export default ELawyer;