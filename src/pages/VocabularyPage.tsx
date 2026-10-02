import React, { useEffect, useState, useMemo } from 'react';
import { Search, Star, Languages, Filter } from 'lucide-react';
import { vocabularyApi } from '../api/vocabularyApi.ts';
import { VocabularyItem } from '../../shared/types/index.ts';
import { VocabularyCard } from '../components/common/VocabularyCard.tsx';
import { Input } from '../components/ui/Input.tsx';
import { LoadingState, EmptyState, ErrorState } from '../components/common/StateComponents.tsx';

const CATEGORIES = [
  'All',
  'Personal Info',
  'Family',
  'Daily Life',
  'School',
  'Food',
  'Hobbies',
  'Home',
  'Weather',
  'Travel'
];

export const VocabularyPage: React.FC = () => {
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const fetchVocabulary = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await vocabularyApi.getAll();
      if (res.success && res.data) {
        setItems(res.data);
      } else {
        setError(res.message || 'Lug‘atni yuklab bo‘lmadi.');
      }
    } catch (e) {
      setError('Lug‘at ma’lumotlarini olishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabulary();
  }, []);

  const handleToggleFavorite = async (id: string, isFav: boolean) => {
    try {
      if (isFav) {
        await vocabularyApi.addFavorite(id);
      } else {
        await vocabularyApi.removeFavorite(id);
      }
      setItems(prev =>
        prev.map(item => (item.id === id ? { ...item, is_favorite: isFav } : item))
      );
    } catch (err) {
      console.error('Favorite update failed:', err);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.example.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesFavorite = showOnlyFavorites ? item.is_favorite : true;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [items, searchQuery, selectedCategory, showOnlyFavorites]);

  const favoritesCount = items.filter(i => i.is_favorite).length;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            6-sinf Ingliz tili lug‘ati
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Mavzulashtirilgan so‘zlar, audio talaffuz va saralanganlar
          </p>
        </div>

        {/* Favorite toggle switch button */}
        <button
          onClick={() => setShowOnlyFavorites(prev => !prev)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showOnlyFavorites
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
          }`}
        >
          <Star className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
          <span>Saralangan so‘zlar ({favoritesCount})</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search vocabulary... (so‘z yoki tarjimani qidiring)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Categories chips horizontal scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mr-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Kategoriya:
        </span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-gray-100 dark:border-neutral-800'
            }`}
          >
            {cat === 'All' ? 'Barcha so‘zlar' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      {loading ? (
        <LoadingState message="Lug‘at yuklanmoqda..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchVocabulary} />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="So‘zlar topilmadi"
          description="Qidiruv yoki filtr mezonlariga mos keluvchi so‘z mavjud emas."
          icon={<Languages className="w-6 h-6" />}
          actionText="Barcha so‘zlarni ko‘rish"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setShowOnlyFavorites(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <VocabularyCard
              key={item.id}
              item={item}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
