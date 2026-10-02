import React, { useState } from 'react';
import { Volume2, Star } from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { VocabularyItem } from '@/shared/types/index.ts';
import { playPronunciation } from '../../utils/speech.ts';

interface VocabularyCardProps {
  item: VocabularyItem;
  onToggleFavorite?: (id: string, isFav: boolean) => void;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  onToggleFavorite
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item.is_favorite || false);

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playPronunciation(item.word);
    setTimeout(() => setIsPlaying(false), 1200);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isFavorite;
    setIsFavorite(next);
    if (onToggleFavorite) {
      onToggleFavorite(item.id, next);
    }
  };

  return (
    <Card hoverable className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="blue" size="sm">
            {item.category}
          </Badge>
          <div className="flex items-center gap-1">
            <button
              onClick={handleAudio}
              className={`p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                isPlaying ? 'text-blue-600 dark:text-blue-400 animate-pulse' : ''
              }`}
              title="Talaffuzni tinglash"
              aria-label="Talaffuz"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'text-amber-500 hover:text-amber-600 dark:text-amber-400'
                  : 'text-gray-300 hover:text-amber-500 dark:text-neutral-600 dark:hover:text-amber-400'
              }`}
              title={isFavorite ? 'Saralanganlardan chiqarish' : 'Saralanganga qo‘shish'}
              aria-label="Saralash"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            {item.word}
          </h4>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {item.translation}
          </p>
        </div>

        {item.example && (
          <div className="mt-3 p-2.5 bg-gray-50 dark:bg-neutral-800/60 rounded-xl border border-gray-100 dark:border-neutral-800">
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "{item.example}"
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
