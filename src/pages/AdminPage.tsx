import React, { useEffect, useState } from 'react';
import {
  Users,
  BookOpen,
  Languages,
  PenTool,
  CheckSquare,
  Trash2,
  Plus,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { adminApi, AdminStats } from '../api/adminApi.ts';
import { lessonApi } from '../api/lessonApi.ts';
import { vocabularyApi } from '../api/vocabularyApi.ts';
import { User, Lesson, VocabularyItem } from '../../shared/types/index.ts';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { Modal } from '../components/ui/Modal.tsx';
import { LoadingState } from '../components/common/StateComponents.tsx';

export const AdminPage: React.FC = () => {
  const { isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'lessons' | 'vocabulary'>('stats');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isAddVocabOpen, setIsAddVocabOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonDiff, setNewLessonDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  const [newVocabWord, setNewVocabWord] = useState('');
  const [newVocabTrans, setNewVocabTrans] = useState('');
  const [newVocabExample, setNewVocabExample] = useState('');
  const [newVocabCategory, setNewVocabCategory] = useState('School');

  const [notification, setNotification] = useState<{ text: string; error?: boolean } | null>(null);

  const showNotification = (text: string, error = false) => {
    setNotification({ text, error });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, lessonsRes, vocabRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers(),
        lessonApi.getAll(),
        vocabularyApi.getAll()
      ]);

      if (statsRes.success && statsRes.data) setStats(statsRes.data);
      if (usersRes.success && usersRes.data) setUsers(usersRes.data);
      if (lessonsRes.success && lessonsRes.data) setLessons(lessonsRes.data);
      if (vocabRes.success && vocabRes.data) setVocabulary(vocabRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <Shield className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Ruxsat berilmagan
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Ushbu sahifaga faqat Administrator kirish huquqiga ega.
        </p>
      </div>
    );
  }

  // Handle User Role Change
  const handleChangeRole = async (userId: string, newRole: 'student' | 'teacher' | 'admin') => {
    try {
      const res = await adminApi.updateUserRole(userId, newRole);
      if (res.success) {
        setUsers(prev => prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
        showNotification('Foydalanuvchi roli muvaffaqiyatli yangilandi!');
      } else {
        showNotification(res.message || 'Xatolik', true);
      }
    } catch {
      showNotification('Server bilan bog‘lanishda xatolik', true);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Haqiqatan ham bu foydalanuvchini o‘chirmoqchimisiz?')) return;
    try {
      const res = await adminApi.deleteUser(userId);
      if (res.success) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        showNotification('Foydalanuvchi o‘chirildi!');
      } else {
        showNotification(res.message || 'O‘chirib bo‘lmadi', true);
      }
    } catch {
      showNotification('Server xatosi', true);
    }
  };

  // Handle Add Lesson
  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await lessonApi.create({
        title: newLessonTitle,
        description: newLessonDesc,
        difficulty: newLessonDiff,
        order_index: lessons.length + 1
      });
      if (res.success && res.data) {
        setLessons(prev => [...prev, res.data!]);
        setIsAddLessonOpen(false);
        setNewLessonTitle('');
        setNewLessonDesc('');
        showNotification('Yangi dars qo‘shildi!');
      }
    } catch {
      showNotification('Dars yaratishda xatolik', true);
    }
  };

  // Handle Delete Lesson
  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Darsni o‘chirishni tasdiqlaysizmi?')) return;
    try {
      const res = await lessonApi.delete(lessonId);
      if (res.success) {
        setLessons(prev => prev.filter(l => l.id !== lessonId));
        showNotification('Dars o‘chirildi!');
      }
    } catch {
      showNotification('O‘chirishda xatolik', true);
    }
  };

  // Handle Add Vocabulary
  const handleAddVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await vocabularyApi.create({
        word: newVocabWord,
        translation: newVocabTrans,
        example: newVocabExample,
        category: newVocabCategory
      });
      if (res.success && res.data) {
        setVocabulary(prev => [res.data!, ...prev]);
        setIsAddVocabOpen(false);
        setNewVocabWord('');
        setNewVocabTrans('');
        setNewVocabExample('');
        showNotification('Yangi lug‘at so‘zi qo‘shildi!');
      }
    } catch {
      showNotification('So‘z qo‘shishda xatolik', true);
    }
  };

  // Handle Delete Vocabulary
  const handleDeleteVocab = async (vocId: string) => {
    if (!confirm('So‘zni o‘chirishni tasdiqlaysizmi?')) return;
    try {
      const res = await vocabularyApi.delete(vocId);
      if (res.success) {
        setVocabulary(prev => prev.filter(v => v.id !== vocId));
        showNotification('So‘z muvaffaqiyatli o‘chirildi!');
      }
    } catch {
      showNotification('O‘chirishda xatolik', true);
    }
  };

  if (loading) {
    return <LoadingState message="Administrator ma’lumotlari yuklanmoqda..." />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Administrator boshqaruvi
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-500">
            Foydalanuvchilar, darslar, lug‘atlar va test tizimini boshqarish
          </p>
        </div>

        {notification && (
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              notification.error
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
            }`}
          >
            {notification.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>{notification.text}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-neutral-800 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Tizim statistikasi
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Foydalanuvchilar ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Darslar ({lessons.length})
        </button>
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'vocabulary'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Languages className="w-4 h-4" />
          Lug‘at ({vocabulary.length})
        </button>
      </div>

      {/* TAB: STATS */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase">Jami foydalanuvchilar</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.total_users}
            </h4>
            <p className="text-[11px] text-gray-500 mt-1">
              {stats.total_students} o‘quvchi, {stats.total_teachers} o‘qituvchi
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase">Darslar soni</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.total_lessons}
            </h4>
            <p className="text-[11px] text-gray-500 mt-1">Standart 6-sinf units</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase">So‘zlar bazasi</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.total_vocabulary}
            </h4>
            <p className="text-[11px] text-gray-500 mt-1">Audio talaffuz bilan</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase">Mashq va Testlar</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {stats.total_exercises + stats.total_tests}
            </h4>
            <p className="text-[11px] text-gray-500 mt-1">
              {stats.total_exercises} mashq, {stats.total_tests} nazorat testi
            </p>
          </Card>
        </div>
      )}

      {/* TAB: USERS */}
      {activeTab === 'users' && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-gray-50 dark:bg-neutral-800/60 text-gray-500 uppercase font-semibold text-[11px] border-b border-gray-100 dark:border-neutral-800">
                <tr>
                  <th className="p-4">Foydalanuvchi</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Sinf</th>
                  <th className="p-4">Rol</th>
                  <th className="p-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30">
                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100">
                      {u.full_name}
                    </td>
                    <td className="p-4 text-gray-500">{u.email}</td>
                    <td className="p-4 font-medium">{u.grade}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={e =>
                          handleChangeRole(
                            u.id,
                            e.target.value as 'student' | 'teacher' | 'admin'
                          )
                        }
                        className="text-xs bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 font-semibold outline-none cursor-pointer"
                      >
                        <option value="student">student (o‘quvchi)</option>
                        <option value="teacher">teacher (o‘qituvchi)</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Foydalanuvchini o‘chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB: LESSONS */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddLessonOpen(true)}
            >
              Yangi dars qo‘shish
            </Button>
          </div>

          <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {lessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-600">#{lesson.order_index}</span>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">
                      {lesson.title}
                    </h4>
                    <Badge variant="blue" size="sm">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-xs">{lesson.description}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Darsni o‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* TAB: VOCABULARY */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddVocabOpen(true)}
            >
              Yangi so‘z qo‘shish
            </Button>
          </div>

          <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {vocabulary.slice(0, 30).map(v => (
              <div
                key={v.id}
                className="p-4 flex items-center justify-between gap-3 text-xs md:text-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{v.word}</span>
                    <span className="text-gray-400">-</span>
                    <span className="font-semibold text-blue-600">{v.translation}</span>
                    <Badge variant="gray" size="sm">{v.category}</Badge>
                  </div>
                  {v.example && (
                    <p className="text-xs text-gray-500 italic mt-0.5">"{v.example}"</p>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteVocab(v.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* MODAL: ADD LESSON */}
      <Modal
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        title="Yangi dars qo‘shish"
      >
        <form onSubmit={handleAddLesson} className="space-y-4">
          <Input
            label="Dars sarlavhasi (Title)"
            placeholder="Masalan: Present Perfect"
            value={newLessonTitle}
            onChange={e => setNewLessonTitle(e.target.value)}
            required
          />
          <Input
            label="Qisqa tavsif (Description)"
            placeholder="Mavzu haqida qisqacha ma’lumot..."
            value={newLessonDesc}
            onChange={e => setNewLessonDesc(e.target.value)}
            required
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Qiyinlik darajasi
            </label>
            <select
              value={newLessonDiff}
              onChange={e => setNewLessonDiff(e.target.value as any)}
              className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="Easy">Easy (Oson)</option>
              <option value="Medium">Medium (O‘rta)</option>
              <option value="Hard">Hard (Murakkab)</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsAddLessonOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit">Qo‘shish</Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD VOCABULARY */}
      <Modal
        isOpen={isAddVocabOpen}
        onClose={() => setIsAddVocabOpen(false)}
        title="Yangi lug‘at so‘zi qo‘shish"
      >
        <form onSubmit={handleAddVocab} className="space-y-4">
          <Input
            label="Inglizcha so‘z"
            placeholder="Masalan: challenge"
            value={newVocabWord}
            onChange={e => setNewVocabWord(e.target.value)}
            required
          />
          <Input
            label="O‘zbekcha tarjimasi"
            placeholder="Masalan: qiyinchilik, sinov"
            value={newVocabTrans}
            onChange={e => setNewVocabTrans(e.target.value)}
            required
          />
          <Input
            label="Misol jumla (Example sentence)"
            placeholder="Masalan: This test is a big challenge."
            value={newVocabExample}
            onChange={e => setNewVocabExample(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Kategoriya
            </label>
            <select
              value={newVocabCategory}
              onChange={e => setNewVocabCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="School">School</option>
              <option value="Daily Life">Daily Life</option>
              <option value="Family">Family</option>
              <option value="Food">Food</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Home">Home</option>
              <option value="Weather">Weather</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsAddVocabOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit">Saqlash</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
