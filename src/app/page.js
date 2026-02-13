import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen">
      {/* --- HERO SECTION: The Cinematic Experience --- */}
      <section className="relative h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background Video Overlay / Placeholder */}
        <div className="absolute inset-0 z-0 opacity-40">
           {/* You would replace this with a real <video> tag later */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505]" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1467226632440-65f0b495746d?q=80&w=2000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
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
            Master German through high-definition video stories. 
            Interactive subtitles. Real-world context. Zero fluff.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <button className="group relative px-12 py-5 bg-orange-500 text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10">START WATCHING FREE</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-12 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              BROWSE CATALOG
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION: The Video-to-Quiz Loop --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: The Video Player Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-neutral-900 rounded-2xl aspect-video border border-white/10 flex items-center justify-center overflow-hidden">
               <div className="text-orange-500 text-6xl">▶</div>
               {/* Decorative Subtitles Overlay */}
               <div className="absolute bottom-6 left-0 right-0 px-10 text-center">
                  <div className="bg-black/80 backdrop-blur-sm p-2 rounded inline-block text-lg">
                    "Ich möchte einen <span className="text-orange-500 border-b-2 border-orange-500 cursor-pointer">Kaffee</span> bestellen."
                  </div>
               </div>
            </div>
          </div>

          {/* Right: The Explanation */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Interactive Subtitles <br />
              <span className="text-gray-500">Meet Instant Quizzes.</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                </div>
                <p className="text-gray-400"><strong className="text-white">Smart Pause:</strong> Click any word in the video to pause and save it to your deck.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                </div>
                <p className="text-gray-400"><strong className="text-white">Scene Quizzes:</strong> Every 5 minutes, we test your comprehension with a fast-paced challenge.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CATEGORY SECTION --- */}
      <section className="pb-32 px-6">
        <h3 className="text-2xl font-bold mb-12 text-center text-gray-500 tracking-widest uppercase">Select Your Genre</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {['Berlin Crime', 'Daily Life', 'History', 'Business'].map((genre) => (
            <div key={genre} className="aspect-[3/4] bg-neutral-900 rounded-xl border border-white/5 hover:border-orange-500/50 transition-all cursor-pointer flex flex-col justify-end p-6 group">
              <span className="text-orange-500 font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Explore &rarr;</span>
              <h4 className="text-xl font-black">{genre}</h4>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}