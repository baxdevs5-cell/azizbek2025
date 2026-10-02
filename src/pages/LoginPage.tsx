import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setErrorMessage(res.message || 'Kirishda xatolik yuz berdi.');
      }
    } catch {
      setErrorMessage('Server bilan bog‘lanib bo‘lmadi.');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick filler
  const handleQuickLogin = (role: 'student' | 'admin' | 'teacher') => {
    if (role === 'student') {
      setEmail('student@english6.uz');
      setPassword('student123');
    } else if (role === 'teacher') {
      setEmail('teacher@english6.uz');
      setPassword('teacher123');
    } else {
      setEmail('admin@english6.uz');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            English 6-sinf
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Platformaga xush kelibsiz! Hisobingizga kiring
          </p>
        </div>

        <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm">
          {errorMessage && (
            <div className="p-3 mb-5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email manzili"
              type="email"
              placeholder="talaba@english6.uz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Parol"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Tizimga kirish
            </Button>
          </form>

          {/* Quick Demo Credentials for Reviewers */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-neutral-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 text-center">
              Tezkor kirish (Sinov hisoblari)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="py-1.5 px-2 bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg text-[11px] font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer text-center"
              >
                O‘quvchi
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('teacher')}
                className="py-1.5 px-2 bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg text-[11px] font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer text-center"
              >
                O‘qituvchi
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-1.5 px-2 bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg text-[11px] font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer text-center"
              >
                Admin
              </button>
            </div>
          </div>
        </Card>

        {/* Link to Register */}
        <p className="text-center text-xs text-gray-500">
          Hisobingiz yo‘qmi?{' '}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
          >
            Ro‘yxatdan o‘ting
          </Link>
        </p>
      </div>
    </div>
  );
};
