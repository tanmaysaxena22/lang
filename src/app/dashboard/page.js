'use client';

import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-900 border-r border-white/5 hidden lg:flex flex-col p-6">
        <h1 className="text-2xl font-black italic mb-10">
          LANG<span className="text-orange-500">STER</span>
        </h1>
        
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 bg-orange-500 text-black px-4 py-3 rounded-xl font-bold transition-all">
            Dashboard
          </Link>
          <Link href="/stories" className="flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-all text-gray-400 hover:text-white">
            Video Stories
          </Link>
          <Link href="/vocabulary" className="flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-all text-gray-400 hover:text-white">
            Word Bank
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <SignOutButton>
            <button className="w-full text-left px-4 py-3 text-gray-500 hover:text-orange-500 transition-colors font-bold">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 p-6 md:p-10">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black">Willkommen, {user.firstName || 'Learner'}! 👋</h2>
            <p className="text-gray-500 font-medium">Ready to master some German today?</p>
          </div>
          <img src={user.imageUrl} className="w-12 h-12 rounded-full border-2 border-orange-500" alt="profile" />
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem]">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Current Streak</p>
            <h3 className="text-4xl font-black italic">12 <span className="text-orange-500 text-xl">Days</span></h3>
          </div>
          <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem]">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Words Mastered</p>
            <h3 className="text-4xl font-black italic">428</h3>
          </div>
          <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem]">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Fluency Level</p>
            <h3 className="text-4xl font-black italic text-orange-500">A2</h3>
          </div>
        </div>

        {/* "CONTINUE WATCHING" SECTION */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl font-bold italic uppercase tracking-tighter">Continue Watching</h3>
            <Link href="/stories" className="text-orange-500 text-sm font-bold hover:underline">View All</Link>
          </div>
          
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/10 aspect-video md:aspect-[21/9] flex items-center justify-center">
            {/* Placeholder for Video Thumbnail */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="relative z-10 text-center">
              <h4 className="text-2xl md:text-4xl font-black mb-4">Ein Tag in Berlin</h4>
              <Link href="/stories/berlin-1" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 transition-colors inline-block">
                Resume Lesson
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}