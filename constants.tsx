import React from 'react';

// --- ICONS for Main Navigation Grid ---
const HomeNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ToolsNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L12.125 6.125a3.375 3.375 0 00-4.773 0L3 10.5a3.375 3.375 0 000 4.773l2.472 2.472M11.42 15.17l-2.472 2.472a3.375 3.375 0 01-4.773 0L3 19.5a3.375 3.375 0 010-4.773l2.472-2.472" /></svg>;
const AcademicCapNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
const ArchiveNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const BookNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ChatNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const BriefcaseNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ScaleNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const NewspaperNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h.01M17 17h.01" /></svg>;
const RobotNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z" /><path d="M10 16h4" /><circle cx="8.5" cy="11.5" r=".5" fill="currentColor" /><circle cx="15.5" cy="11.5" r=".5" fill="currentColor" /><path d="M9 7l-1 -4" /><path d="M15 7l1 -4" /></svg>;
const CogNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const PembasmiLawInstituteNavGridIcon = () => <img src="https://i.ibb.co/h18LwFqq/Picsart-25-08-22-07-33-42-560.png" alt="Pembasmi Law Institute Logo" className="h-full w-full object-contain" />;
const TentangPembasmiNavGridIcon = () => <img src="https://i.ibb.co/xqxcG6c3/Picsart-25-08-22-07-56-50-973.png" alt="Tentang PEMBASMI Logo" className="h-full w-full object-contain p-2" />;

const BantuanHukumNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.5 21h-3.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10.5" /><path d="M14 21v-5.5a2.5 2.5 0 0 0 -5 0v5.5" /><path d="M8 3v4" /><path d="M12 3v4" /><path d="M16 3v4" /><path d="M13 14h-2" /></svg>;
const PenerangPersNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a1 1 0 0 1 1 -1h3" /><circle cx="12" cy="12" r="3" /><path d="M4 16l2.121 -2.121a3 3 0 0 1 4.242 0l2.122 2.121" /><path d="M16 4l2.121 -2.121a3 3 0 0 1 4.242 0l-2.12 2.12" /><path d="M8 20l-2.121 2.121a3 3 0 0 1 -4.242 0l2.12 -2.12" /><path d="M18.879 18.879l2.121 2.121a3 3 0 0 1 0 4.242l-2.12 2.12" /><path d="M20 8l2.121 -2.121a3 3 0 0 1 0 -4.242l-2.12 2.12" /></svg>;
const JasaHukumNavGridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3" /><path d="M10 7.5l2 3l2 -3" /><path d="M7.5 10l3 2l-3 2" /><path d="M16.5 10l-3 2l3 2" /></svg>;


export const MENU_ITEMS = [
  { id: 'home', label: 'HOME', icon: <HomeNavGridIcon /> },
  { id: 'alat-hukum', label: 'ALAT HUKUM', icon: <ToolsNavGridIcon /> },
  { id: 'pkpa', label: 'PKPA & UJIAN', icon: <AcademicCapNavGridIcon /> },
  { id: 'arsip-pengadilan', label: 'ARSIP PENGADILAN', icon: <ArchiveNavGridIcon /> },
  { id: 'kitab-hukum', label: 'KITAB HUKUM', icon: <BookNavGridIcon /> },
  { id: 'konsultasi-hukum', label: 'KONSULTASI HUKUM', icon: <ChatNavGridIcon /> },
  { id: 'e-lawyer', label: 'E-LAWYER', icon: <BriefcaseNavGridIcon /> },
  { id: 'e-court', label: 'E-COURT', icon: <ScaleNavGridIcon /> },
  { id: 'bantuan-hukum', label: 'BADAN BANTUAN HUKUM', icon: <BantuanHukumNavGridIcon /> },
  { id: 'penerang-pers', label: 'BADAN PENERANG & PERS', icon: <PenerangPersNavGridIcon /> },
  { id: 'jasa-hukum', label: 'JASA HUKUM', icon: <JasaHukumNavGridIcon /> },
  { id: 'tentang', label: 'TENTANG PEMBASMI', icon: <TentangPembasmiNavGridIcon /> },
  { id: 'pembasmi-law-institute', label: 'PEMBASMI LAW INSTITUTE', icon: <PembasmiLawInstituteNavGridIcon /> },
  { id: 'pembasmi-news', label: 'PEMBASMI NEWS', icon: <NewspaperNavGridIcon /> },
  { id: 'robot-pembasmi', label: 'ROBOT PEMBASMI', icon: <RobotNavGridIcon /> },
  { id: 'backend-office', label: 'BACKEND OFFICE', icon: <CogNavGridIcon /> },
];

export const ChevronRightIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const MenuIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Icon for DAFTAR button: [->
export const DaftarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h14M11 4v1a3 3 0 003 3h4a3 3 0 003-3V4M11 20v-1a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

// Icon for LOGIN button: ->]
export const LoginIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const BackIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

export const PaperPlaneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);