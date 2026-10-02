import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Shield,
  KeyRound,
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { profileApi } from '../api/profileApi.ts';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Avatar } from '../components/common/Avatar.tsx';
import { Badge } from '../components/ui/Badge.tsx';

export const ProfilePage: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [grade, setGrade] = useState(user?.grade || '6-A sinf');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await profileApi.updateProfile({
        full_name: fullName,
        grade
      });
      if (res.success) {
        setProfileMsg({ text: 'Profil ma’lumotlari muvaffaqiyatli saqlandi!' });
        await refreshUser();
      } else {
        setProfileMsg({ text: res.message || 'Saqlashda xatolik.', error: true });
      }
    } catch {
      setProfileMsg({ text: 'Server bilan aloqa uzildi.', error: true });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: 'Yangi parollar mos kelmadi.', error: true });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ text: 'Parol kamida 6 ta belgidan iborat bo‘lishi shart.', error: true });
      return;
    }

    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      const res = await profileApi.updateProfile({
        current_password: currentPassword,
        new_password: newPassword
      });
      if (res.success) {
        setPasswordMsg({ text: 'Parol muvaffaqiyatli o‘zgartirildi!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ text: res.message || 'Parolni o‘zgartirib bo‘lmadi.', error: true });
      }
    } catch {
      setPasswordMsg({ text: 'Xatolik yuz berdi.', error: true });
    } finally {
      setSavingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">Iltimos, avval tizimga kiring.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Overview Card */}
      <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <Avatar name={user.full_name} size="xl" />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100">
                  {user.full_name}
                </h2>
                <Badge variant={user.role === 'admin' ? 'red' : user.role === 'teacher' ? 'amber' : 'blue'}>
                  {user.role === 'admin' ? 'Admin' : user.role === 'teacher' ? 'O‘qituvchi' : 'O‘quvchi'}
                </Badge>
              </div>
              <p className="text-xs md:text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mb-2">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4" /> Sinf: {user.grade}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            icon={<LogOut className="w-4 h-4" />}
            className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Chiqish
          </Button>
        </div>

        {/* Stats Strip */}
        {user.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-neutral-800 text-center">
            <div>
              <p className="text-xs text-gray-400 font-medium">Tugatilgan darslar</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {user.stats.completed_lessons} / {user.stats.total_lessons}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Bajarilgan mashqlar</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {user.stats.completed_exercises}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">O‘rtacha ball</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {user.stats.average_test_score}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Yodlangan so‘zlar</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {user.stats.vocabulary_learned}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edit Info Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <UserIcon className="w-4 h-4" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Profilni tahrirlash
            </h3>
          </div>

          {profileMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 mb-4 ${
                profileMsg.error
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              {profileMsg.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input
              label="To‘liq ism va familiya"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
            <Input
              label="Sinf / Guruh (masalan: 6-A sinf)"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              required
            />
            <Input
              label="Email manzili (o‘zgarmas)"
              value={user.email}
              disabled
              className="bg-gray-50 dark:bg-neutral-800 text-gray-400 cursor-not-allowed"
            />
            <Button type="submit" loading={savingProfile} className="w-full">
              Ma’lumotlarni saqlash
            </Button>
          </form>
        </Card>

        {/* Change Password Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <KeyRound className="w-4 h-4" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Parolni yangilash
            </h3>
          </div>

          {passwordMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 mb-4 ${
                passwordMsg.error
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              }`}
            >
              {passwordMsg.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Joriy parol"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              label="Yangi parol (kamida 6 ta belgi)"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Yangi parolni tasdiqlash"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="secondary"
              loading={savingPassword}
              className="w-full"
            >
              Parolni almashtirish
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
