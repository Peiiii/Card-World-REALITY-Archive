
import React, { useState, useRef } from 'react';
import { CardData } from '../types';

interface CardFrameProps {
  card: CardData;
}

const CardFrame: React.FC<CardFrameProps> = ({ card }) => {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRot({ 
      x: (y / rect.height - 0.5) * 8, 
      y: (x / rect.width - 0.5) * -8 
    });
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const rarityTheme = {
    Constant: { accent: 'text-[#C5A059]', border: 'border-[#C5A059]/30', bg: 'bg-[#C5A059]' },
    Galactic: { accent: 'text-[#2B4162]', border: 'border-[#2B4162]/30', bg: 'bg-[#2B4162]' },
    Planetary: { accent: 'text-[#386641]', border: 'border-[#386641]/30', bg: 'bg-[#386641]' },
    Molecular: { accent: 'text-[#6A4C93]', border: 'border-[#6A4C93]/30', bg: 'bg-[#6A4C93]' },
    Subatomic: { accent: 'text-[#BC4749]', border: 'border-[#BC4749]/30', bg: 'bg-[#BC4749]' }
  }[card.rarity];

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => { setRot({ x: 0, y: 0 }); setShine({ x: 50, y: 50 }); }}
      className="relative group w-80 h-[34rem] transition-all duration-500 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
      }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-transparent via-black/5 to-black/10 rounded-sm blur-sm" />
      
      <div className="relative h-full w-full bg-white flex flex-col border border-black/10 shadow-2xl overflow-hidden">
        {/* 光影层 */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.8) 0%, transparent 70%)`,
          }}
        />

        {/* 顶部比例尺装饰 */}
        <div className="h-6 w-full border-b border-black/5 flex items-center px-4 justify-between bg-neutral-50">
           <div className="flex gap-1">
             {[...Array(8)].map((_, i) => <div key={i} className="w-px h-2 bg-black/20" />)}
           </div>
           <span className="text-[8px] font-sans font-bold tracking-widest text-black/40 uppercase">Specimen {card.id}</span>
        </div>

        {/* 主图区 */}
        <div className="relative h-[55%] w-full overflow-hidden bg-black">
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 border-[12px] border-white/5 pointer-events-none" />
          <div className="absolute top-4 left-4 flex flex-col">
             <span className="text-[10px] text-white/60 font-sans tracking-widest">OBSERVATION</span>
             <div className="w-12 h-px bg-white/40 mt-1" />
          </div>
        </div>

        {/* 信息区 */}
        <div className="flex-grow p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
             <div>
                <span className={`text-[9px] font-sans font-black tracking-[0.2em] uppercase ${rarityTheme.accent}`}>
                  [{card.rarity}]
                </span>
                <h3 className="text-3xl font-serif font-bold text-black mt-1 tracking-tight">
                  {card.name}
                </h3>
             </div>
             <div className="text-right">
                <span className="block text-[8px] font-sans font-bold text-black/40 uppercase">Domain</span>
                <span className="text-xs font-serif font-bold text-black">{card.type}</span>
             </div>
          </div>

          <p className="text-neutral-600 text-[12px] font-serif leading-relaxed line-clamp-3 mb-6">
            {card.description}
          </p>

          <div className="mt-auto pt-4 border-t border-black/5 grid grid-cols-3 gap-2">
             <div>
                <span className="block text-[8px] font-sans font-bold text-black/30 uppercase mb-1">能量 / ENG</span>
                <span className="text-sm font-sans font-bold text-black">10<sup>{card.stats.energy}</sup></span>
             </div>
             <div>
                <span className="block text-[8px] font-sans font-bold text-black/30 uppercase mb-1">复杂度 / CPX</span>
                <span className="text-sm font-sans font-bold text-black">ζ {card.stats.complexity}</span>
             </div>
             <div className="flex flex-col items-end">
                <div className={`w-8 h-8 rounded-full ${rarityTheme.bg} flex items-center justify-center`}>
                   <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-white font-sans">
                      {card.stats.legacy}
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* 底部条码装饰 */}
        <div className="h-4 w-full bg-neutral-900 flex items-center px-4">
           <div className="flex gap-0.5">
             {[4,2,6,1,8,3,5].map((h, i) => <div key={i} className="bg-white/20 w-[2px]" style={{height: `${h}px`}} />)}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardFrame;
