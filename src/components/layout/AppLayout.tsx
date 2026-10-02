import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import { X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    if (pathname === '/') return 'Boshqaruv paneli';
    if (pathname.startsWith('/lessons/')) return 'Dars tafsilotlari';
    if (pathname.startsWith('/lessons')) return '6-sinf Ingliz tili darslari';
    if (pathname.startsWith('/vocabulary')) return 'Interaktiv Lug‘at (Vocabulary)';
    if (pathname.startsWith('/exercises')) return 'Amaliy mashqlar';
    if (pathname.startsWith('/tests/')) return 'Test topshirish';
    if (pathname.startsWith('/tests')) return 'Nazorat testlari';
    if (pathname.startsWith('/progress')) return 'O‘quv natijalari va statistika';
    if (pathname.startsWith('/profile')) return 'Mening profilim';
    if (pathname.startsWith('/settings')) return 'Platforma sozlamalari';
    if (pathname.startsWith('/admin')) return 'Administrator boshqaruvi';
    return 'English 6-sinf';
  };

  const currentTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-white dark:bg-neutral-900 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          title={currentTitle}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
