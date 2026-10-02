import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Languages,
  PenTool,
  CheckSquare,
  TrendingUp,
  User,
  Settings,
  ShieldAlert,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { ThemeToggle } from '../common/ThemeToggle.tsx';

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { to: '/', label: 'Bosh sahifa', icon: LayoutDashboard },
    { to: '/lessons', label: 'Darslar', icon: BookOpen },
    { to: '/vocabulary', label: 'Lug‘at', icon: Languages },
    { to: '/exercises', label: 'Mashqlar', icon: PenTool },
    { to: '/tests', label: 'Testlar', icon: CheckSquare },
    { to: '/progress', label: 'Natijalarim', icon: TrendingUp },
    { to: '/profile', label: 'Profil', icon: User },
    { to: '/settings', label: 'Sozlamalar', icon: Settings }
  ];

  if (isAdmin) {
    navItems.push({ to: '/admin', label: 'Admin Panel', icon: ShieldAlert });
  }

  return (
    <aside className="h-full w-64 flex flex-col justify-between bg-white dark:bg-neutral-900 border-r border-gray-100 dark:border-neutral-800 p-4 select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-3 py-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              English 6-sinf
            </h1>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
              O‘quv platformasi
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-neutral-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Controls */}
      <div className="pt-4 border-t border-gray-100 dark:border-neutral-800/80 space-y-3">
        {user && (
          <div className="flex items-center justify-between px-3 py-1">
            <div className="truncate">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                {user.full_name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {user.grade}
              </p>
            </div>
            <ThemeToggle />
          </div>
        )}

        {user ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Tizimdan chiqish</span>
          </button>
        ) : (
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-gray-400">Tungi/Yorug‘ rejim</span>
            <ThemeToggle />
          </div>
        )}
      </div>
    </aside>
  );
};
