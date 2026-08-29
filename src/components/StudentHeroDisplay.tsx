import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ExternalLink,
  MapPin,
  Building,
  Calendar,
  Share2,
  Edit3,
  Check,
  Zap,
  Code2,
  Award,
  Terminal,
  Cpu,
  BookOpen,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { GitHubUser, ProfileCustomization, LanguageStat } from '../types';

interface StudentHeroDisplayProps {
  user: GitHubUser;
  totalStars: number;
  totalContributions: number;
  customization: ProfileCustomization;
  languages: LanguageStat[];
  onUpdateCustomization: (custom: Partial<ProfileCustomization>) => void;
  onOpenExportModal: () => void;
  onOpenPushDirectly?: () => void;
}

const DESIGNATION_PRESETS = [
  'Computer Science Student & Full Stack Architect',
  'AI & Deep Learning Research Scholar',
  'Software Engineering Undergrad // Systems Builder',
  'Cybersecurity & Distributed Cloud Specialist',
  'Open Source Fellow & Frontend Artisan',
  'Data Science & Machine Learning Student',
];

export const StudentHeroDisplay: React.FC<StudentHeroDisplayProps> = ({
  user,
  totalStars,
  totalContributions,
  customization,
  languages,
  onUpdateCustomization,
  onOpenExportModal,
  onOpenPushDirectly,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesignation, setIsEditingDesignation] = useState(false);
  const [nameInput, setNameInput] = useState(customization.studentName || user.name || user.login);
  const [designationInput, setDesignationInput] = useState(
    customization.studentDesignation || customization.customTitle || 'Computer Science Student & Full Stack Architect'
  );

  const displayName = customization.studentName || user.name || user.login;
  const displayDesignation =
    customization.studentDesignation ||
    customization.customTitle ||
    'Computer Science Student & Full Stack Architect';

  const memberSinceYear = new Date(user.created_at).getFullYear();

  const handleSaveName = () => {
    onUpdateCustomization({ studentName: nameInput.trim() || undefined });
    setIsEditingName(false);
  };

  const handleSaveDesignation = (value?: string) => {
    const nextVal = value !== undefined ? value : designationInput;
    onUpdateCustomization({
      studentDesignation: nextVal.trim() || undefined,
      customTitle: nextVal.trim() || undefined,
    });
    setDesignationInput(nextVal);
    setIsEditingDesignation(false);
  };

  // Top programming language highlight
  const topLanguage = languages[0]?.name || 'TypeScript';

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Primary Left Showcase Card */}
      <div className="rounded-3xl bg-[#0d111c]/95 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Ambient Cyber Mesh Backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
        <div className="absolute inset-0 scanline-overlay opacity-10 pointer-events-none" />

        {/* Top Status & Accreditation Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] font-bold tracking-wider">
              <GraduationCap size={14} className="text-cyan-400" />
              STUDENT PROFILE
            </span>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CAMPUS VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
              EST. {memberSinceYear} // COHORT 2026
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BIG MOVING STUDENT NAME DISPLAY */}
        {/* ========================================================================= */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              <Sparkles size={13} className="text-amber-400 animate-spin-slow" />
              <span>STUDENT DEVELOPER // LEAD ENGINEER</span>
            </div>

            {/* Quick Edit Name Button */}
            {!isEditingName ? (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[11px] font-mono transition-colors"
                title="Edit Student Name"
              >
                <Edit3 size={12} />
                <span>Edit Name</span>
              </button>
            ) : null}
          </div>

          {/* Student Name Display or Editor */}
          {isEditingName ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter Student Name"
                className="text-2xl sm:text-4xl font-black font-heading bg-zinc-900 border border-indigo-500 rounded-xl px-4 py-1.5 text-white w-full max-w-md focus:outline-none ring-2 ring-indigo-500/50"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md flex items-center justify-center"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div className="mt-1 flex items-baseline flex-wrap gap-x-4 gap-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 via-cyan-200 to-indigo-400 animate-text-gradient drop-shadow-sm">
                {displayName}
              </h1>
              <span className="text-sm sm:text-base font-mono text-indigo-400 font-semibold tracking-wide">
                @{user.login}
              </span>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BIG MOVING STUDENT DESIGNATION MODULE (KINETIC SLIDING TICKER) */}
        {/* ========================================================================= */}
        <div className="relative z-10 my-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider">
              <Zap size={13} className="text-yellow-400" />
              <span>CURRENT DESIGNATION & SPECIALIZATION</span>
            </div>

            <button
              onClick={() => setIsEditingDesignation(!isEditingDesignation)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-purple-300 text-[11px] font-mono transition-colors"
            >
              <Edit3 size={11} />
              <span>{isEditingDesignation ? 'Close Editor' : 'Customize Title'}</span>
            </button>
          </div>

          {/* Quick Designation Editor Panel */}
          {isEditingDesignation && (
            <div className="mb-4 p-4 rounded-2xl bg-zinc-950/80 border border-purple-500/30 font-mono text-xs space-y-3 animate-in fade-in duration-150">
              <div className="text-zinc-300 font-bold flex items-center gap-1">
                <span>Select or Type Your Student Designation:</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={designationInput}
                  onChange={(e) => setDesignationInput(e.target.value)}
                  placeholder="e.g. Computer Science Student & Cloud Architect"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleSaveDesignation()}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all flex items-center gap-1"
                >
                  <Check size={14} />
                  <span>Save</span>
                </button>
              </div>

              {/* Quick Pick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-zinc-500 w-full">Quick Presets:</span>
                {DESIGNATION_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleSaveDesignation(preset)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-950/50 hover:border-purple-500/40 border border-white/10 text-[11px] text-zinc-300 text-left transition-all"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Continuous Kinetic Moving Track for Student Designation */}
          <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-[#0d111c] border border-indigo-500/40 p-1 shadow-lg overflow-hidden group">
            {/* Illuminated glowing edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

            <div className="py-2.5 px-3 overflow-hidden flex items-center bg-black/40 rounded-xl">
              <div className="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
                {[1, 2, 3].map((cycle) => (
                  <div key={cycle} className="flex items-center gap-6">
                    {/* Main Designation Block */}
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-md bg-indigo-500/30 text-cyan-300 font-mono">
                        <Terminal size={14} />
                      </span>
                      <span className="text-sm sm:text-base font-black font-heading tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300">
                        {displayDesignation}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30 font-semibold">
                      PRIMARY TRACK // {topLanguage} CORE
                    </span>

                    {/* Secondary Moving Motto */}
                    <span className="text-xs font-mono text-zinc-300 font-medium flex items-center gap-1.5">
                      <Cpu size={13} className="text-rose-400" />
                      ALGORITHMIC THINKING & SYSTEMS ARCHITECTURE
                    </span>

                    <span className="text-indigo-400 font-bold text-xs">◆ ◆ ◆</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Description */}
        <p className="relative z-10 text-xs sm:text-sm text-zinc-300 my-4 leading-relaxed font-sans border-l-2 border-indigo-500/50 pl-3.5 bg-white/[0.02] py-1 rounded-r-lg">
          {user.bio ||
            'Enthusiastic computer science scholar and software developer passionate about building performant web architectures and open source solutions.'}
        </p>

        {/* Academic & Geographic Meta Tags */}
        <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-400 border-y border-white/5 py-3.5">
          {user.company && (
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Building size={14} className="text-purple-400 flex-shrink-0" />
              <span>{user.company.replace('@', '')}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin size={14} className="text-rose-400 flex-shrink-0" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-zinc-300">
            <BookOpen size={14} className="text-cyan-400 flex-shrink-0" />
            <span>Top Track: {topLanguage}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Calendar size={14} className="text-emerald-400 flex-shrink-0" />
            <span>GitHub Since {memberSinceYear}</span>
          </div>
        </div>

        {/* 4 Quantitative Student Stats Tiles */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 font-mono text-center">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 transition-colors">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">PROJECTS / REPOS</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">{user.public_repos}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 transition-colors">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">STARS EARNED</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">{totalStars.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">PEER NETWORK</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">{user.followers.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-rose-500/40 transition-colors">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">COMMITS LOGGED</div>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-0.5">
              {totalContributions.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenExportModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <UploadCloud size={14} className="text-cyan-300" />
              <span>Direct Push to GitHub</span>
            </button>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono text-xs transition-colors flex items-center gap-1.5"
            >
              <span>GitHub Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Award size={13} className="text-amber-400" />
              <span>ACADEMIC HONORS</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
