import React from 'react';
import { MENU_ITEMS, BackIcon, MenuIcon, DaftarIcon, LoginIcon } from '../constants';
import ELawyer from './ELawyer';
import Koperasi from './Koperasi';
import PembayaranOnline from './PembayaranOnline';
import ECommerce from './ECommerce';
import BackendOffice from './BackendOffice';
import { User } from '../App';
import KitabHukum from './KitabHukum';
import KonsultasiHukum from './KonsultasiHukum';
import RobotPembasmi from './RobotPembasmi';
import AlatHukum from './AlatHukum';
import ArsipPengadilan from './ArsipPengadilan';
import PembasmiNews from './PembasmiNews';
import PembasmiLawInstitute from './PembasmiLawInstitute';
import TentangPembasmi from './TentangPembasmi';
import BadanBantuanHukum from './BadanBantuanHukum';
import BadanPenerangPers from './BadanPenerangPers';
import JasaHukum from './JasaHukum';

interface MainContentProps {
  activeItem: string;
  onMenuClick: () => void;
  setActiveItem: (itemId: string) => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isAdminLoggedIn: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
}

const downloadLinks = [
    { url: 'https://www.kai.or.id/wp-content/uploads/2017/03/Download-Buku-Saku-Anti-Korupsi.pdf', title: 'Buku Saku Anti Korupsi' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2017/09/SKMA-NO.-73-2015-SUMPAH-ADVOKAT.pdf', title: 'SKMA NO. 73/2015 - Sumpah Advokat' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2017/09/Putusan-MK-Nomor-112-PUU-XII-2014.pdf', title: 'Putusan MK Nomor 112/PUU-XII/2014' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2017/09/95_PUU-XIV_2016.pdf', title: 'Putusan MK Nomor 95/PUU-XIV/2016' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2016/02/UU_2003_18_Undang-udang-Advokat.pdf', title: 'UU No. 18 Tahun 2003 - Undang-Undang Advokat' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2023/01/UU-No.-1-Tahun-2023-KUHP.pdf', title: 'UU No. 1 Tahun 2023 - KUHP' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2023/01/Perpu-No.-2-Tahun-2022-Cipta-Kerja.pdf', title: 'Perpu No. 2 Tahun 2022 - Cipta Kerja' },
    { url: 'https://www.kai.or.id/wp-content/uploads/2022/12/Perpres-132-Tahun-2022-Sistem-Pemerintahan-Berbasis-Elektronik.pdf', title: 'Perpres 132/2022 - Sistem Pemerintahan Berbasis Elektronik' },
];

const LoggedInHome: React.FC<{ user: User | null; setActiveItem: (item: string) => void; }> = ({ user, setActiveItem }) => {
    
    const quickLinks = MENU_ITEMS.filter(item => ['kitab-hukum', 'konsultasi-hukum', 'robot-pembasmi', 'pembasmi-news', 'e-court', 'pembasmi-law-institute'].includes(item.id));

    return (
        <div className="bg-zinc-900 text-white font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-300">Akun Saya</h1>
                    <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1">Selamat Datang Kembali,</p>
                    <p className="text-indigo-400 text-4xl sm:text-5xl font-extrabold">{user?.name || 'Anggota'}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Alat Hukum CTA */}
                        <div className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 flex flex-col md:flex-row items-center gap-8 shadow-lg">
                            <div className="flex-shrink-0">
                                <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L12.125 6.125a3.375 3.375 0 00-4.773 0L3 10.5a3.375 3.375 0 000 4.773l2.472 2.472M11.42 15.17l-2.472 2.472a3.375 3.375 0 01-4.773 0L3 19.5a3.375 3.375 0 010-4.773l2.472-2.472" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-white">Alat Hukum Premium</h2>
                                <p className="text-zinc-400 mt-2">Tingkatkan produktivitas Anda dengan alat hukum berbasis Pembasmi Virtual, eksklusif untuk anggota.</p>
                                <button onClick={() => setActiveItem('alat-hukum')} className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors">
                                    Coba Sekarang
                                </button>
                            </div>
                        </div>
                        
                        {/* Quick Links Grid */}
                        <div>
                             <h3 className="text-xl font-bold text-zinc-300 mb-4">Akses Cepat</h3>
                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {quickLinks.map(item => (
                                     <button key={item.id} onClick={() => setActiveItem(item.id)} className="bg-zinc-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-zinc-700 transition-colors border border-zinc-700 aspect-square">
                                        <div className="w-8 h-8 text-indigo-400 mb-2">{item.icon}</div>
                                        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Side Column */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700 text-center">
                            <img src={user?.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover" />
                            <h3 className="text-xl font-bold text-white">{user?.fullName}</h3>
                            <p className="text-sm text-zinc-400">{user?.id}</p>
                            <button onClick={() => setActiveItem('e-lawyer')} className="mt-4 w-full bg-zinc-700 text-white font-semibold py-2 rounded-lg hover:bg-zinc-600 transition-colors">
                                Kelola Akun
                            </button>
                        </div>
                         {/* News */}
                        <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
                             <h3 className="text-xl font-bold text-zinc-300 mb-4">Berita Terbaru</h3>
                             <div className="space-y-4">
                                <a href="#" className="block hover:bg-zinc-700 p-2 rounded-md">
                                    <p className="font-semibold text-white">Putusan MK Terbaru Mengenai UU Cipta Kerja</p>
                                    <p className="text-xs text-zinc-400">1 jam yang lalu</p>
                                </a>
                                <a href="#" className="block hover:bg-zinc-700 p-2 rounded-md">
                                    <p className="font-semibold text-white">PEMBASMI Gelar PKPA Angkatan ke-V</p>
                                    <p className="text-xs text-zinc-400">1 hari yang lalu</p>
                                </a>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const MainContent: React.FC<MainContentProps> = (props) => {
  const { activeItem, onMenuClick, setActiveItem, isLoggedIn, user, onLogin, onLogout, isAdminLoggedIn, onAdminLogin, onAdminLogout } = props;

  const NavItem: React.FC<{
    item: typeof MENU_ITEMS[0];
    onClick: (id: string) => void;
  }> = ({ item, onClick }) => (
    <button
      onClick={() => onClick(item.id)}
      className="flex flex-col items-center justify-center text-center p-3 bg-zinc-800/80 backdrop-blur-sm rounded-xl aspect-square transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-zinc-700/90 border border-zinc-700 hover:border-indigo-500 shadow-lg"
    >
      <div className="w-1/2 h-1/2 text-indigo-400">{item.icon}</div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">{item.label}</span>
    </button>
  );

  const NavGrid: React.FC<{
    setActiveItem: (id: string) => void;
  }> = ({ setActiveItem }) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
      {MENU_ITEMS.filter(item => item.id !== 'backend-office').map((item) => (
        <NavItem key={item.id} item={item} onClick={setActiveItem} />
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeItem) {
      case 'home':
        return isLoggedIn ? <LoggedInHome user={user} setActiveItem={setActiveItem} /> : (
          <div className="text-white">
            <div className="mb-8">
                <img 
                    src="https://i.ibb.co/jkRFS01n/header-web-Pembasmi-2.jpg" 
                    alt="header web Pembasmi" 
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                />
            </div>
            <NavGrid setActiveItem={setActiveItem} />
            <div className="mt-12 pt-8 border-t border-zinc-700 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setActiveItem('e-lawyer')} className="flex-1 flex items-center justify-center gap-2 bg-zinc-700 hover:bg-zinc-600 font-bold py-3 px-4 rounded-lg transition-colors">
                    <DaftarIcon />
                    <span>DAFTAR</span>
                </button>
                <button onClick={onLogin} className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold py-3 px-4 rounded-lg transition-colors">
                    <LoginIcon />
                    <span>LOGIN</span>
                </button>
            </div>
          </div>
        );
      case 'e-lawyer':
        return <ELawyer onBack={() => setActiveItem('home')} isLoggedIn={isLoggedIn} onLoginSuccess={onLogin} onLogout={onLogout} user={user} />;
      case 'kitab-hukum':
        return <KitabHukum onBack={() => setActiveItem('home')} />;
      case 'konsultasi-hukum':
        return <KonsultasiHukum onBack={() => setActiveItem('home')} />;
      case 'robot-pembasmi':
        return <RobotPembasmi onBack={() => setActiveItem('home')} />;
      case 'alat-hukum':
        return <AlatHukum onBackToHome={() => setActiveItem('home')} />;
      case 'backend-office':
        return <BackendOffice isAdminLoggedIn={isAdminLoggedIn} onAdminLogin={onAdminLogin} onAdminLogout={onAdminLogout} />;
      case 'arsip-pengadilan':
        return <ArsipPengadilan />;
      case 'pembasmi-news':
        return <PembasmiNews onBack={() => setActiveItem('home')} />;
      case 'pembasmi-law-institute':
        return <PembasmiLawInstitute onBack={() => setActiveItem('home')} />;
      case 'bantuan-hukum':
        return <BadanBantuanHukum onBack={() => setActiveItem('home')} />;
      case 'penerang-pers':
        return <BadanPenerangPers onBack={() => setActiveItem('home')} />;
      case 'jasa-hukum':
        return <JasaHukum onBack={() => setActiveItem('home')} />;
      case 'e-court':
        return (
          <div className="w-full h-screen">
            <button
                onClick={() => setActiveItem('home')}
                className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                aria-label="Kembali ke menu utama"
            >
                <BackIcon />
            </button>
            <iframe
              src="https://ecourt.mahkamahagung.go.id/"
              title="E-Court Mahkamah Agung RI"
              className="w-full h-full border-0"
            />
          </div>
        );
       case 'tentang':
        return <TentangPembasmi onBack={() => setActiveItem('home')} />;
       case 'pkpa':
        return (
          <div className="w-full h-screen">
            <button
                onClick={() => setActiveItem('home')}
                className="fixed top-5 left-5 z-[100] bg-zinc-800 text-white p-3 rounded-full shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                aria-label="Kembali ke menu utama"
            >
                <BackIcon />
            </button>
            <iframe
              src="https://pembasmi.org/index.php/program-pkpa-upa-sumpah-advokat/"
              title="PKPA & UJIAN PEMBASMI"
              className="w-full h-full border-0"
            />
          </div>
        );
      default:
        const item = MENU_ITEMS.find(i => i.id === activeItem);
        return (
          <div className="text-white text-center p-16 bg-zinc-800 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">{item?.label}</h2>
            <p className="text-zinc-400">Halaman ini sedang dalam pengembangan.</p>
          </div>
        );
    }
  };
  
  const isFullScreenPage = ['e-lawyer', 'backend-office', 'robot-pembasmi', 'kitab-hukum', 'konsultasi-hukum', 'alat-hukum', 'e-court', 'tentang', 'pembasmi-news', 'pkpa', 'pembasmi-law-institute', 'bantuan-hukum', 'penerang-pers', 'jasa-hukum'].includes(activeItem);

  return (
    <main className="flex-1 transition-all duration-300">
      <div className={isFullScreenPage ? '' : 'p-4 sm:p-6 lg:p-8'}>
        {!isFullScreenPage && (
          <header className="flex justify-between items-center text-white mb-6">
            <button onClick={onMenuClick} className="p-2 -ml-2 rounded-full hover:bg-zinc-700 flex-shrink-0">
              <MenuIcon />
            </button>
            <div className="flex-grow text-center px-4">
              {activeItem === 'home' && !isLoggedIn && (
                <div>
                  <h1 className="text-lg sm:text-xl font-bold tracking-wider text-white">APLIKASI PEMBASMI</h1>
                  <p className="text-[10px] sm:text-xs text-indigo-400 font-semibold tracking-wide">PERKUMPULAN BADAN ADVOKAT SOLIDARITAS MERDEKA INDONESIA</p>
                </div>
              )}
            </div>
            {isLoggedIn ? (
                <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex-shrink-0">
                    Logout
                </button>
            ) : (
                <div className="w-10 h-10 flex-shrink-0"></div> 
            )}
          </header>
        )}
        
        {activeItem !== 'home' && !isFullScreenPage && (
             <button onClick={() => setActiveItem('home')} className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <BackIcon />
                <span>Kembali ke Home</span>
            </button>
        )}

        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;