
export interface CardData {
  id: string;
  name: string;
  rarity: 'Constant' | 'Galactic' | 'Planetary' | 'Molecular' | 'Subatomic';
  type: '天体' | '物理' | '生命' | '微观' | '文明';
  description: string;
  stats: {
    energy: number; // 能量级数 (Log Scale)
    complexity: number; // 复杂度 (Entropy inverse)
    legacy: number; // 认知影响力
  };
  imageUrl: string;
  createdAt: number;
}

export enum AppState {
  LOCKED = 'LOCKED',
  BROWSE = 'BROWSE',
  DETAILS = 'DETAILS'
}
