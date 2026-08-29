import React, { useState } from 'react';
import { Calendar, Flame, Zap, Award, BarChart3, Clock } from 'lucide-react';
import { ContributionData, ThemePreset } from '../types';

interface ContributionHeatmapProps {
  data?: ContributionData;
  contributions?: ContributionData;
  theme: ThemePreset;
  username: string;
}

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  data,
  contributions: propContributions,
  theme,
  username,
}) => {
  const contributions = data || propContributions || {
    totalContributions: 0,
    weeks: [],
    longestStreak: 0,
    currentStreak: 0,
    bestDay: { date: '', count: 0 },
    hourlyPunchCard: Array.from({ length: 7 }, () => Array(24).fill(0)),
  };
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'punchcard'>('calendar');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  // Color mapping based on level & theme
  const getCellColor = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (theme) {
      case 'matrix':
        return [
          'bg-zinc-900/80 border-zinc-800/60',
          'bg-emerald-950/80 border-emerald-800 text-emerald-300',
          'bg-emerald-800 border-emerald-600 text-white',
          'bg-emerald-600 border-emerald-400 text-white',
          'bg-emerald-400 border-emerald-200 text-black shadow-[0_0_8px_rgba(52,211,153,0.8)]',
        ][level];
      case 'cyberpunk':
        return [
          'bg-zinc-900/80 border-zinc-800/60',
          'bg-yellow-950/70 border-yellow-800/80',
          'bg-yellow-700/80 border-yellow-500',
          'bg-cyan-600 border-cyan-400 text-black',
          'bg-cyan-300 border-white text-black shadow-[0_0_10px_rgba(6,182,212,0.9)]',
        ][level];
      case 'synthwave':
        return [
          'bg-zinc-900/80 border-zinc-800/60',
          'bg-fuchsia-950/80 border-fuchsia-900',
          'bg-fuchsia-800 border-fuchsia-600',
          'bg-pink-600 border-pink-400',
          'bg-cyan-400 border-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.9)]',
        ][level];
      case 'sakura':
        return [
          'bg-zinc-900/80 border-zinc-800/60',
          'bg-rose-950/70 border-rose-900',
          'bg-rose-800 border-rose-600',
          'bg-rose-500 border-rose-300',
          'bg-rose-300 border-white shadow-[0_0_8px_rgba(253,164,175,0.9)]',
        ][level];
      case 'tokyo-night':
      case 'github-dark':
      default:
        return [
          'bg-zinc-900/80 border-zinc-800/60',
          'bg-indigo-950 border-indigo-900/80',
          'bg-indigo-800 border-indigo-600',
          'bg-indigo-600 border-indigo-400',
          'bg-indigo-400 border-indigo-200 shadow-[0_0_8px_rgba(129,140,248,0.8)]',
        ][level];
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full rounded-2xl bg-[#0d111c]/90 border border-white/10 p-5 md:p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="text-indigo-400" size={20} />
            <h3 className="text-lg font-bold font-heading text-white">Contribution Heatmap & Commit Matrix</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              365 DAYS
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time GitHub activity graph & streak calculation for @{username}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'calendar'
                ? 'bg-indigo-600 text-white font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart3 size={13} />
            <span>Heatmap</span>
          </button>
          <button
            onClick={() => setActiveTab('punchcard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'punchcard'
                ? 'bg-indigo-600 text-white font-bold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Clock size={13} />
            <span>Hourly Punch Card</span>
          </button>
        </div>
      </div>

      {/* 4 Key Milestone Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>YEAR TOTAL</span>
            <Zap size={14} className="text-amber-400" />
          </div>
          <div className="text-xl font-bold font-heading text-white mt-1">
            {contributions.totalContributions.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">commits / PRs / issues</div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>CURRENT STREAK</span>
            <Flame size={14} className="text-rose-500 animate-pulse" />
          </div>
          <div className="text-xl font-bold font-heading text-rose-400 mt-1">
            {contributions.currentStreak} <span className="text-xs text-zinc-400 font-normal">days</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Active daily coder</div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>LONGEST STREAK</span>
            <Award size={14} className="text-purple-400" />
          </div>
          <div className="text-xl font-bold font-heading text-purple-400 mt-1">
            {contributions.longestStreak} <span className="text-xs text-zinc-400 font-normal">days</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Personal record</div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>RECORD DAY</span>
            <Calendar size={14} className="text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-heading text-cyan-400 mt-1">
            {contributions.bestDay.count} <span className="text-xs text-zinc-400 font-normal">commits</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">{contributions.bestDay.date}</div>
        </div>
      </div>

      {/* Main Heatmap Grid View */}
      {activeTab === 'calendar' ? (
        <div className="w-full overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            {/* Months Header Labels */}
            <div className="flex ml-8 mb-2 text-[10px] font-mono text-zinc-400">
              {months.map((m, i) => (
                <div key={i} className="flex-1">
                  {m}
                </div>
              ))}
            </div>

            {/* Heatmap Grid & Day of Week Labels */}
            <div className="flex gap-2">
              {/* Day Labels Column */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-500 pr-1 py-0.5 select-none">
                {dayLabels.map((lbl, idx) => (
                  <div key={idx} className="h-3 flex items-center">
                    {lbl}
                  </div>
                ))}
              </div>

              {/* 52 Weeks Columns */}
              <div className="flex gap-1 flex-1">
                {contributions.weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-1 flex-1">
                    {week.days.map((day, dIndex) => (
                      <div
                        key={dIndex}
                        onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-full aspect-square rounded-[3px] border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getCellColor(
                          day.level
                        )}`}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Legend & Tooltip readout */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs font-mono">
              <div className="text-zinc-300 min-h-[20px]">
                {hoveredDay ? (
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{hoveredDay.count} contributions</span>
                    <span className="text-zinc-400">on {hoveredDay.date}</span>
                  </span>
                ) : (
                  <span className="text-zinc-500">Hover over any square for commit details</span>
                )}
              </div>

              {/* Intensity scale indicators */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  {([0, 1, 2, 3, 4] as const).map((lvl) => (
                    <div
                      key={lvl}
                      className={`w-3 h-3 rounded-[2px] border ${getCellColor(lvl)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Hourly Punch Card Matrix */
        <div className="w-full overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
              <span>COMMIT INTENSITY BY HOUR (00:00 - 23:00)</span>
              <span className="text-indigo-400 font-bold">PEAK ACTIVITY: 14:00 - 22:00</span>
            </div>

            {/* 24 hour headers */}
            <div className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 text-[9px] font-mono text-zinc-500 mb-1.5 text-center">
              <div>DAY</div>
              {Array.from({ length: 24 }).map((_, h) => (
                <div key={h}>{h % 3 === 0 ? `${h}h` : ''}</div>
              ))}
            </div>

            {/* 7 Days of the Week Rows */}
            <div className="flex flex-col gap-1.5">
              {daysOfWeek.map((dayName, dIdx) => (
                <div key={dIdx} className="grid grid-cols-[50px_repeat(24,1fr)] gap-1 items-center">
                  <div className="text-[10px] font-mono font-bold text-zinc-400">{dayName}</div>
                  {Array.from({ length: 24 }).map((_, hIdx) => {
                    const count = contributions.hourlyPunchCard[dIdx]?.[hIdx] || 0;
                    const radius = Math.min(100, count * 15);
                    return (
                      <div
                        key={hIdx}
                        className="h-6 rounded bg-white/5 flex items-center justify-center relative group"
                        title={`${dayName} at ${hIdx}:00 - ${count} commits`}
                      >
                        {count > 0 && (
                          <div
                            className="rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 transition-all group-hover:scale-125"
                            style={{
                              width: `${Math.max(4, Math.min(18, count * 2 + 4))}px`,
                              height: `${Math.max(4, Math.min(18, count * 2 + 4))}px`,
                              opacity: Math.min(1, 0.3 + count * 0.1),
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
