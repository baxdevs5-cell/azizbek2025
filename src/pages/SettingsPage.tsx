import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Laptop,
  Languages,
  Bell,
  Lock,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [language, setLanguage] = useState<'uz' | 'en'>('uz');
  const [notifications, setNotifications] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Platforma sozlamalari
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Tizim ko‘rinishi, til va bildirishnomalarni moslashtiring
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Sozlamalar muvaffaqiyatli saqlandi!
        </div>
      )}

      {/* Appearance Section */}
      <Card className="p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          Tizim ko‘rinishi (Appearance)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          O‘zingizga qulay rejimni tanlang: Kunduzgi yoki Tungi
        </p>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 font-bold ring-1 ring-blue-600'
                : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="text-xs">Yorug‘ (Light)</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 font-bold ring-1 ring-blue-600'
                : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Moon className="w-5 h-5 text-blue-400" />
            <span className="text-xs">Tungi (Dark)</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme('system')}
            className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
              theme === 'system'
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 font-bold ring-1 ring-blue-600'
                : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Laptop className="w-5 h-5 text-gray-400" />
            <span className="text-xs">Tizim (System)</span>
          </button>
        </div>
      </Card>

      {/* Language Section */}
      <Card className="p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
          <Languages className="w-4 h-4" /> Interfeys tili
        </h3>
        <div className="grid grid-cols-2 gap-3 max-w-sm">
          <button
            type="button"
            onClick={() => {
              setLanguage('uz');
              handleSaveSettings();
            }}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              language === 'uz'
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 ring-1 ring-blue-600'
                : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300'
            }`}
          >
            <span>O‘zbek tili</span>
            {language === 'uz' && <CheckCircle2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setLanguage('en');
              handleSaveSettings();
            }}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
              language === 'en'
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 ring-1 ring-blue-600'
                : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300'
            }`}
          >
            <span>English (US)</span>
            {language === 'en' && <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              Eslatmalar va Bildirishnomalar
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Dars o‘tish vaqti kelganda brauzerda eslatma ko‘rsatish
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setNotifications(prev => !prev);
              handleSaveSettings();
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              notifications ? 'bg-blue-600 justify-end' : 'bg-gray-200 dark:bg-neutral-800 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>
      </Card>

      {/* Account Section */}
      <Card className="p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          Hisob xavfsizligi
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/profile')}
            icon={<Lock className="w-4 h-4" />}
          >
            Parolni yangilash
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            icon={<LogOut className="w-4 h-4" />}
            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Tizimdan chiqish
          </Button>
        </div>
      </Card>
    </div>
  );
};
