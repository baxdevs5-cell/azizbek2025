import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { ThemeToggle } from '../common/ThemeToggle.tsx';
import { Avatar } from '../common/Avatar.tsx';
import { Button } from '../ui/Button.tsx';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, title }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Menyu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
            English 6
          </span>
        </div>

        {title && (
          <h2 className="hidden lg:block text-base font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {isAuthenticated && user ? (
          <Link
            to="/profile"
            className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="hidden sm:block text-xs font-semibold text-gray-800 dark:text-gray-200">
              {user.full_name.split(' ')[0]}
            </span>
            <Avatar name={user.full_name} size="sm" />
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Kirish
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Ro‘yxatdan o‘tish</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
