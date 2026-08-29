import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy as TrophyIcon,
  Zap,
  Star,
  Flame,
  Code2,
  Users,
  ShieldCheck,
  GitPullRequest,
  FolderGit2,
  Sparkles,
  Info
} from 'lucide-react';
import { Trophy } from '../types';

interface TrophyHallProps {
  trophies: Trophy[];
  username: string;
}

export const TrophyHall: React.FC<TrophyHallProps> = ({ trophies, username }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedTrophy, setInspectedTrophy] = useState<Trophy | null>(null);

  const getRankBadgeStyle = (rank: string) => {
    switch (rank) {
      case 'SSS':
        return {
          badge: 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] border-amber-300',
          border: 'border-rose-500/50 hover:border-rose-400',
          glow: 'from-rose-500/20 via-purple-500/10 to-amber-500/10',
          iconColor: 'text-amber-300',
        };
      case 'S':
        return {
          badge: 'bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black shadow-[0_0_12px_rgba(245,158,11,0.5)] border-amber-300',
          border: 'border-amber-500/50 hover:border-amber-400',
          glow: 'from-amber-500/20 to-yellow-500/10',
          iconColor: 'text-amber-400',
        };
      case 'AAA':
        return {
          badge: 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] border-cyan-300',
          border: 'border-cyan-500/40 hover:border-cyan-400',
          glow: 'from-cyan-500/20 to-blue-500/10',
          iconColor: 'text-cyan-400',
        };
      case 'AA':
        return {
          badge: 'bg-gradient-to-r from-purple-400 to-indigo-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)] border-purple-300',
          border: 'border-purple-500/40 hover:border-purple-400',
          glow: 'from-purple-500/15 to-indigo-500/10',
          iconColor: 'text-purple-400',
        };
      case 'A':
      default:
        return {
          badge: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400',
          border: 'border-emerald-500/30 hover:border-emerald-400',
          glow: 'from-emerald-500/10 to-teal-500/10',
          iconColor: 'text-emerald-400',
        };
    }
  };

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className={className} size={22} />;
      case 'Star':
        return <Star className={className} size={22} />;
      case 'Flame':
        return <Flame className={className} size={22} />;
      case 'Code2':
        return <Code2 className={className} size={22} />;
      case 'Users':
        return <Users className={className} size={22} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} size={22} />;
      case 'GitPullRequest':
        return <GitPullRequest className={className} size={22} />;
      case 'FolderGit2':
      default:
        return <FolderGit2 className={className} size={22} />;
    }
  };

  const handleTrophyClick = (trophy: Trophy) => {
    setInspectedTrophy(trophy);
    // Trigger celebratory confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899'],
    });
  };

  const filteredTrophies =
    selectedCategory === 'all'
      ? trophies
      : trophies.filter((t) => t.category === selectedCategory);

  const totalScorePoints = trophies.reduce((acc, t) => {
    const multiplier = t.rank === 'SSS' ? 100 : t.rank === 'S' ? 50 : t.rank === 'AAA' ? 30 : t.rank === 'AA' ? 20 : 10;
    return acc + multiplier;
  }, 0);

  return (
    <div className="w-full rounded-2xl bg-[#0d111c]/90 border border-white/10 p-5 md:p-6 shadow-xl backdrop-blur-md">
      {/* Trophy Hall Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="text-amber-400" size={22} />
            <h3 className="text-lg font-bold font-heading text-white">
              GitHub Trophy & Achievement Cabinet
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              {totalScorePoints} PTS
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time algorithmic prestige ranks based on commits, star count, and open source impact
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {['all', 'commits', 'stars', 'languages', 'streak'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Trophies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTrophies.map((trophy) => {
          const style = getRankBadgeStyle(trophy.rank);
          const progressPct = Math.min(100, Math.round((trophy.score / trophy.maxScore) * 100));

          return (
            <div
              key={trophy.id}
              onClick={() => handleTrophyClick(trophy)}
              className={`group relative rounded-xl p-4 bg-gradient-to-b ${style.glow} bg-zinc-950/80 border ${style.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Row: Icon + Rank Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform ${style.iconColor}`}>
                    {renderIcon(trophy.badgeIcon, style.iconColor)}
                  </div>

                  {/* Rank Emblem */}
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black tracking-wider border shadow-md ${style.badge}`}>
                    RANK {trophy.rank}
                  </div>
                </div>

                {/* Trophy Titles */}
                <h4 className="text-sm font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {trophy.name}
                </h4>
                <div className="text-[10px] font-mono text-purple-400 mt-0.5 uppercase tracking-wide">
                  CATEGORY // {trophy.category}
                </div>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed line-clamp-2">
                  {trophy.description}
                </p>
              </div>

              {/* Progress & Current Score */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-zinc-400 truncate max-w-[140px]">{trophy.criteria}</span>
                  <span className="font-bold text-white">{progressPct}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspected Trophy Modal Details */}
      {inspectedTrophy && (
        <div className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-amber-300">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-heading">
                  {inspectedTrophy.name} [RANK {inspectedTrophy.rank}]
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-amber-400 text-black">
                  {inspectedTrophy.rank}
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-0.5">
                {inspectedTrophy.criteria} • {inspectedTrophy.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => setInspectedTrophy(null)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 self-end sm:self-auto transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
