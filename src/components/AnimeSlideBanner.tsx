import React from 'react';
import { Sparkles, Zap, Flame, Code2, ShieldAlert, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { GitHubUser, ProfileCustomization, Trophy } from '../types';

interface AnimeSlideBannerProps {
  user: GitHubUser;
  customization: ProfileCustomization;
  trophies: Trophy[];
  totalContributions: number;
}

export const AnimeSlideBanner: React.FC<AnimeSlideBannerProps> = ({
  user,
  customization,
  trophies,
  totalContributions,
}) => {
  const topTrophy = trophies.find((t) => t.rank === 'SSS' || t.rank === 'S') || trophies[0];

  const primaryRibbonItems = [
    { icon: <Zap className="text-yellow-400" size={15} />, text: 'HIGH-PERFORMANCE DEVELOPER', subText: 'VERIFIED ARCHITECT', highlight: true },
    { icon: <Terminal className="text-cyan-400" size={15} />, text: `@${user.login.toUpperCase()}`, subText: 'GITHUB PROFILE' },
    { icon: <Flame className="text-rose-500" size={15} />, text: `${totalContributions.toLocaleString()} COMMITS LOGGED`, subText: 'ANNUAL CONTRIBUTIONS', highlight: true },
    { icon: <Cpu className="text-purple-400" size={15} />, text: 'ZERO-LATENCY DISTRIBUTED SYSTEMS', subText: 'ENGINEERING EXCELLENCE' },
    { icon: <Sparkles className="text-amber-400" size={15} />, text: `${topTrophy?.name || 'TITAN RANK'} [${topTrophy?.rank || 'SSS'}]`, subText: 'PRESTIGE TIER', highlight: true },
    { icon: <Code2 className="text-emerald-400" size={15} />, text: `${user.public_repos} PUBLIC REPOSITORIES`, subText: 'OPEN SOURCE LAB' },
    { icon: <ShieldAlert className="text-indigo-400" size={15} />, text: 'OCTOCAT SECURITY PROTOCOL', subText: 'AUTHENTICATED' },
  ];

  const secondaryRibbonItems = [
    { text: 'FULL STACK ARCHITECTURE // 100% OPEN SOURCE', tag: 'CORE SYSTEM' },
    { text: `DEVELOPER REACH: ${user.followers.toLocaleString()} FOLLOWERS`, tag: 'COMMUNITY' },
    { text: 'CLEAN CODE & ASYNCHRONOUS DATA PIPELINES', tag: 'STANDARDS' },
    { text: `NODE ID: ${user.node_id.slice(0, 8)}...`, tag: 'NODE' },
    { text: 'CONTINUOUS INTEGRATION & CLOUD DEPLOYMENT', tag: 'DEVOPS' },
    { text: 'COMMITTED TO RELENTLESS SHIP CYCLES', tag: 'VELOCITY' },
  ];

  // Speed multiplier
  const speedClass1 =
    customization.animeBannerSpeed === 'fast'
      ? 'animate-marquee-fast'
      : customization.animeBannerSpeed === 'slow'
      ? 'duration-[45s]'
      : 'animate-marquee-left';

  const speedClass2 =
    customization.animeBannerSpeed === 'fast'
      ? 'animate-marquee-fast'
      : customization.animeBannerSpeed === 'slow'
      ? 'duration-[45s]'
      : 'animate-marquee-right';

  return (
    <div className="relative w-full overflow-hidden my-6 select-none group">
      {/* Background Anime Speedlines / Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950/60 pointer-events-none" />
      
      {/* Top Border Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 animate-pulse" />

      {/* Ribbon 1: Upper Moving Banner (Leftward) */}
      <div className="py-2.5 bg-[#0e121d]/90 border-y border-indigo-500/20 backdrop-blur-md overflow-hidden flex items-center">
        <div className={`flex items-center gap-6 ${speedClass1}`}>
          {[...primaryRibbonItems, ...primaryRibbonItems, ...primaryRibbonItems].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2.5 px-3 py-1 rounded-full whitespace-nowrap text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                item.highlight
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'bg-white/5 border border-white/10 text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="font-heading tracking-wide uppercase">{item.text}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-normal">
                {item.subText}
              </span>
              <span className="text-zinc-600 text-[10px] font-mono">///</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ribbon 2: Dark Cyber Sub-Banner (Rightward) */}
      <div className="py-1.5 bg-[#090b12]/95 border-b border-indigo-500/10 overflow-hidden flex items-center">
        <div className={`flex items-center gap-8 ${speedClass2}`}>
          {[...secondaryRibbonItems, ...secondaryRibbonItems, ...secondaryRibbonItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 whitespace-nowrap text-[11px] font-mono text-zinc-400 uppercase tracking-widest"
            >
              <span className="text-purple-400 font-bold">[{item.tag}]</span>
              <span className="text-zinc-300 font-medium">{item.text}</span>
              <span className="text-indigo-500/60 font-black text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-75 animate-pulse" />
    </div>
  );
};
