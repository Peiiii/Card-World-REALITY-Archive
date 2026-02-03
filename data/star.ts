
import { CardData } from '../types';

export const STAR_CARDS: CardData[] = [
  {
    id: 'U-001',
    name: '创生之柱',
    rarity: 'Galactic',
    type: '天体',
    description: '位于鹰星云内，巨大的星际气体和尘埃柱，是恒星孵化器的标志性景观，跨度约4-5光年。',
    stats: { energy: 38, complexity: 85, legacy: 9 },
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=800',
    createdAt: 100
  },
  {
    id: 'U-002',
    name: '事件视界',
    rarity: 'Constant',
    type: '天体',
    description: '黑洞周围的时空边界，在此之内引力强到连光也无法逃逸。它是已知宇宙物理法则的边界。',
    stats: { energy: 60, complexity: 99, legacy: 10 },
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    createdAt: 101
  }
];
