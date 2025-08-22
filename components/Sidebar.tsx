import React from 'react';
import { MENU_ITEMS, ChevronRightIcon, CloseIcon } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, setActiveItem }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Sidebar Panel */}
      <aside className={`fixed top-0 left-0 w-72 h-full bg-[#282828] text-gray-300 flex flex-col pt-8 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 flex justify-between items-start">
            <div>
                <h1 className="text-white text-xl font-bold mb-2">Aplikasi</h1>
                <h2 className="text-indigo-400 text-2xl font-extrabold tracking-wider mb-8">Pembasmi</h2>
            </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white mt-1"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1">
          <ul>
            {MENU_ITEMS.map((item) => (
              <li key={item.id} className="px-6">
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left py-4 text-sm uppercase tracking-widest border-b border-zinc-700 transition-all duration-200 flex justify-between items-center focus:outline-none ${
                    activeItem === item.id 
                      ? 'text-white font-bold' 
                      : 'text-gray-400 font-medium hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRightIcon />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PEMBASMI</p>
          <p>All rights reserved.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;