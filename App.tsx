import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { MENU_ITEMS } from './constants';

export interface User {
  name: string;
  id: string;
  email: string;
  avatar: string;
  fullName: string;
}

function App() {
  const [activeItem, setActiveItem] = useState<string>(MENU_ITEMS[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
        name: 'Dr. C.M. Firdaus O.',
        id: 'PEM-001',
        email: 'teguh.advokat@pembasmi.org',
        avatar: 'https://i.ibb.co/DfP7Knw3/IMG-20250822-WA0013.jpg',
        fullName: 'Dr.C.M.Firdaus Oiwobo SH SHi MH SH Pid SH Pdt CFLS CLA ALC CMK',
    });
    setActiveItem('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveItem('home');
    setIsMenuOpen(false);
  };
  
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setActiveItem('backend-office');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveItem('home');
  };

  const handleMenuItemClick = (itemId: string) => {
    // The protected items are now inside e-lawyer, which has its own login guard.
    // This function is only called from the main sidebar, which no longer contains those links.
    setActiveItem(itemId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans bg-zinc-900">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeItem={activeItem}
        setActiveItem={handleMenuItemClick}
      />
      <MainContent 
        activeItem={activeItem} 
        onMenuClick={() => setIsMenuOpen(true)}
        setActiveItem={handleMenuItemClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogin={handleAdminLogin}
        onAdminLogout={handleAdminLogout}
      />
    </div>
  );
}

export default App;