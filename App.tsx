
import React, { useState, useEffect, useMemo } from 'react';
import { CardData } from './types';
import CardFrame from './components/CardFrame';
import { CARD_LIBRARY } from './constants';

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('全部领域');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const categories = useMemo(() => {
    const types = CARD_LIBRARY.map(c => c.type);
    return ['全部领域', ...Array.from(new Set(types))];
  }, []);

  const filteredCards = useMemo(() => {
    if (filter === '全部领域') return CARD_LIBRARY;
    return CARD_LIBRARY.filter(c => c.type === filter);
  }, [filter]);

  return (
    <div className="min-h-screen selection:bg-[#C5A059]/30 relative z-10">
      <div 
        className="cursor-dot hidden md:block"
        style={{ 
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />

      <header className="sticky top-0 z-[100] px-10 md:px-24 py-8 flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="w-10 h-10 border-2 border-[#C5A059] flex items-center justify-center rotate-45">
            <div className="w-1 h-1 bg-[#C5A059] -rotate-45" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black tracking-tighter text-black">REALITY <span className="text-[#C5A059]">ARCHIVE</span></h1>
            <p className="text-[10px] font-sans font-bold tracking-[0.4em] text-black/40 uppercase">实存：宇宙万物百科全书</p>
          </div>
        </div>

        <nav className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[11px] font-sans font-black tracking-widest uppercase px-5 py-2 transition-all ${
                filter === cat 
                ? 'text-white bg-black' 
                : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      <section className="px-10 md:px-24 py-24 flex flex-col items-center text-center">
        <div className="max-w-5xl animate-reveal">
           <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-[#C5A059] font-sans font-black text-[10px] tracking-[0.6em] uppercase">Foundations of Existence</span>
           </div>
           <h2 className="text-7xl md:text-9xl font-serif font-bold text-black leading-none mb-10">
            从微末<span className="italic font-light">至</span>宏大
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl font-serif max-w-2xl mx-auto leading-relaxed">
            “我们并非在观察宇宙，我们是宇宙观察自身的方式。在这里，每一张卡片都是一个物理实体的切片，揭示客观现实的底层逻辑。”
          </p>
        </div>
      </section>

      <main className="px-10 md:px-24 pb-48">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredCards.map((card, idx) => (
              <div 
                key={card.id} 
                className="animate-reveal flex justify-center"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardFrame card={card} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-black/5 py-32 px-10 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-sm">
            <h3 className="font-serif text-3xl font-bold mb-6">Archive.Reality</h3>
            <p className="text-neutral-400 text-sm font-serif leading-relaxed">
              致力于记录物理宇宙的所有已知状态。基于实证主义，我们将数据转化为可感知的艺术。
            </p>
          </div>
          <div className="flex gap-20">
             <div>
                <h4 className="text-[10px] font-sans font-black tracking-widest text-[#C5A059] uppercase mb-6">Data Source</h4>
                <ul className="space-y-3 text-xs font-bold text-black/60">
                  <li className="hover:text-black cursor-pointer">NASA Deep Space Network</li>
                  <li className="hover:text-black cursor-pointer">CERN Open Data</li>
                  <li className="hover:text-black cursor-pointer">Nature Archive</li>
                </ul>
             </div>
             <div>
                <h4 className="text-[10px] font-sans font-black tracking-widest text-[#C5A059] uppercase mb-6">Connect</h4>
                <p className="text-xs font-bold">registry@universe.log</p>
             </div>
          </div>
        </div>
        <div className="mt-32 pt-10 border-t border-black/5 text-center">
           <p className="text-[9px] tracking-[0.5em] text-black/30 font-bold uppercase italic">Entropy is the only constant. Observe while it lasts.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
