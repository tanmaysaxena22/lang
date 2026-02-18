import Link from 'next/link';
// We use the icons but ensure the rest of the page is static
import { Zap, Globe, BarChart3, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505]" />
          {/* OPTIMIZATION: Removed Unsplash URL. Using a CSS gradient instead of a heavy image */}
          <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-orange-900/20" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <div className="flex justify-center">
            <span className="bg-orange-600 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
              Live Cinema
            </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
            WATCH. LEARN. <br />
            <span className="text-orange-500">DOMINATE.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-medium">
            Master German through high-definition precision. 
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            {/* OPTIMIZATION: prefetch={false} prevents background requests */}
            <Link href="/dashboard" prefetch={false}>
              <button className="group relative px-12 py-5 bg-orange-500 text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 uppercase">Enter the Gauntlet</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- PREMIUM BENEFITS --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                THE <span className="text-orange-500">PREMIUM</span><br />ADVANTAGE.
              </h2>
              {/* OPTIMIZATION: prefetch={false} */}
              <Link href="/pricing" prefetch={false}>
                <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase italic hover:bg-orange-500 hover:text-white transition-all">
                  Upgrade to Pro
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Feature icon={<Globe size={32}/>} title="10,000+ Words" desc="Entire German lexicon." />
              <Feature icon={<Zap size={32}/>} title="Flawless Flow" desc="Zero ads. Instant loading." />
              <Feature icon={<BarChart3 size={32}/>} title="Word Tracker" desc="Real-time tracking." />
              <Feature icon={<ShieldCheck size={32}/>} title="Elite Rank" desc="Priority support." />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center">
         <Link href="/dashboard" prefetch={false} className="text-4xl font-black italic uppercase text-white/20 hover:text-orange-500 transition-colors tracking-tighter">
            Begin the Journey &rarr;
         </Link>
      </footer>
    </main>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 group">
      <div className="text-orange-500 mb-4">{icon}</div>
      <h4 className="text-xl font-black uppercase italic mb-2">{title}</h4>
      <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">{desc}</p>
    </div>
  );
}