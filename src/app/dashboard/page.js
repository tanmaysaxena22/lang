export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { Star } from "lucide-react";
import { SCROLL_DATA } from "@/data/scroll-data";
import LevelButton from "@/components/LevelButton";

export default async function DashboardPage() {
  // 1. Single Server-Side Database Call
  const { userId } = await auth();
  const user = await getUserById(userId);

  // 2. Parse Progress (Ensuring Numbers for correct unlocking)
  const progress = user?.currentProgress || "1-1-1";
  const [activeSec, activeUnit, activeLevel] = progress.split("-").map(Number);

  const isFreeUser = user?.role === "free";
  const hasCompletedLevelToday = user?.lastLevelCompletedAt &&
    new Date(user.lastLevelCompletedAt).toDateString() === new Date().toDateString();
 
  const isDailyLimitReached = isFreeUser && hasCompletedLevelToday;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black italic tracking-tighter text-[#ff6600]">LANGSTER</h1>
          <div className="flex gap-4 items-center">
            {isFreeUser && (
              <span className="bg-orange-500/10 text-[#ff6600] px-3 py-1 rounded-md text-[10px] font-black uppercase border border-orange-500/20">
                Free Tier
              </span>
            )}
            <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="font-black">{user?.xp || 0} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        {SCROLL_DATA.map((section) => {
          const sectionIdNum = Number(section.sectionId);

          return (
            <section key={section.sectionId} className="mb-24">
              <div className="mb-10 text-left">
                <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-2">
                  {section.sectionTitle}
                </h2>
                <div className="h-2 w-32 bg-[#ff6600] rounded-full shadow-[0_0_15px_rgba(255,102,0,0.5)]" />
              </div>

              <div className="flex flex-col gap-12">
                {section.units.map((unit) => {
                  const unitIdNum = Number(unit.unitId);

                  return (
                    <div key={unit.unitId} className="bg-white/[0.03] border-2 border-white/5 rounded-[3rem] p-10">
                      <div className="mb-10">
                        <p className="text-[#ff6600] font-black uppercase tracking-[0.3em] text-xs mb-2">Unit {unit.unitId}</p>
                        <h3 className="text-4xl font-black uppercase italic leading-none">{unit.unitTitle}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {unit.levels.map((level, idx) => {
                          const levelIdNum = Number(level.levelId);
                         
                          // HIERARCHICAL UNLOCK LOGIC (Mathematical Numbers)
                          const isUnlockedByProgress =
                            sectionIdNum < activeSec ||
                            (sectionIdNum === activeSec && (unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum <= activeLevel)));

                          const isCompleted =
                            sectionIdNum < activeSec ||
                            (sectionIdNum === activeSec && (unitIdNum < activeUnit || (unitIdNum === activeUnit && levelIdNum < activeLevel)));

                          const isActive = sectionIdNum === activeSec && unitIdNum === activeUnit && levelIdNum === activeLevel;
                          const showTimeLock = isActive && isDailyLimitReached;

                          return (
                            <div key={level.levelId} className="flex flex-col items-center">
                              <LevelButton
                                  level={level}
                                  idx={idx}
                                  isUnlockedByProgress={isUnlockedByProgress}
                                  showTimeLock={showTimeLock}
                                  isActive={isActive}
                                  isCompleted={isCompleted}
                                  unitId={unit.unitId}
                                  levelIdNum={levelIdNum}
                              />

                              <p className={`mt-3 text-[9px] font-black uppercase text-center tracking-tighter leading-tight
                                ${!isUnlockedByProgress || showTimeLock ? "text-white/10" : "text-white/60"}
                              `}>
                                {level.title}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}