import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, GraduationCap, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('6-A sinf');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Kiritilgan parollar bir-biriga mos kelmadi.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Parol kamida 6 ta belgidan iborat bo‘lishi lozim.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        full_name: fullName,
        email,
        grade,
        password,
        confirm_password: confirmPassword
      });

      if (res.success) {
        navigate('/');
      } else {
        setErrorMessage(res.message || 'Ro‘yxatdan o‘tishda xatolik.');
      }
    } catch {
      setErrorMessage('Server bilan aloqa o‘rnatilmadi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
            Yangi hisob yaratish
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            6-sinf ingliz tili darslarini o‘rganishni bugunoq boshlang
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
              label="To‘liq ism va familiya"
              placeholder="Jasur Alimov"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email manzili"
              type="email"
              placeholder="jasur@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Sinf (masalan: 6-A sinf)"
              placeholder="6-A sinf"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              icon={<GraduationCap className="w-4 h-4" />}
              required
            />

            <Input
              label="Parol (kamida 6 ta belgi)"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Parolni tasdiqlash"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Ro‘yxatdan o‘tish
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Hisobingiz bormi?{' '}
          <Link
            to="/login"
            className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
          >
            Tizimga kiring
          </Link>
        </p>
      </div>
    </div>
  );
};
