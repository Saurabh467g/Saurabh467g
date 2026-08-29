import React, { useState, useEffect } from 'react';
import {
  Search,
  Github,
  Key,
  Sliders,
  Share2,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Code2,
  Trophy as TrophyIcon,
  Flame,
  Calendar,
  Layers,
  Sparkles,
  GitBranch,
  UploadCloud,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { fetchGitHubUserData, DEMO_PROFILES } from './services/github';
import { GitHubUser, ProfileCustomization, Trophy, LanguageStat, ContributionData, GitHubRepo, GitHubEvent } from './types';
import { HangingIdCard } from './components/HangingIdCard';
import { StudentHeroDisplay } from './components/StudentHeroDisplay';
import { AnimeSlideBanner } from './components/AnimeSlideBanner';
import { ContributionHeatmap } from './components/ContributionHeatmap';
import { TrophyHall } from './components/TrophyHall';
import { LanguageBreakdown } from './components/LanguageBreakdown';
import { RepoGrid } from './components/RepoGrid';
import { ActivityTimeline } from './components/ActivityTimeline';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { ExportModal } from './components/ExportModal';
import { TokenModal } from './components/TokenModal';

export const App: React.FC = () => {
  const [activeUsername, setActiveUsername] = useState<string>('torvalds');
  const [usernameInput, setUsernameInput] = useState<string>('torvalds');
  const [githubToken, setGithubToken] = useState<string>(() => localStorage.getItem('gh_pat_token') || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  // Core Data
  const [userData, setUserData] = useState<{
    user: GitHubUser;
    repos: GitHubRepo[];
    events: GitHubEvent[];
    contributions: ContributionData;
    trophies: Trophy[];
    languages: LanguageStat[];
  } | null>(null);

  // Customization State
  const [customization, setCustomization] = useState<ProfileCustomization>({
    theme: 'tokyo-night',
    lanyardColor: '#6366f1',
    lanyardPattern: 'grid',
    cardMaterial: 'cyber-matte',
    animeBannerSpeed: 'normal',
    customTitle: 'Computer Science Student & Full Stack Architect',
    customAffiliation: 'Campus Scholar',
    customSecurityLevel: 'LEVEL 08 ACCESS',
    studentName: 'Linus Torvalds',
    studentDesignation: 'Computer Science Student & Full Stack Architect',
  });

  // Fetch GitHub data with real-time stats
  const loadProfile = async (targetUsername: string, force = false) => {
    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    try {
      const data = await fetchGitHubUserData(targetUsername, githubToken || undefined, force);
      setUserData(data);
      setActiveUsername(targetUsername);
      setCustomization((prev) => ({
        ...prev,
        studentName: data.user.name || data.user.login,
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub profile. Please verify username.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProfile(activeUsername);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      loadProfile(usernameInput.trim(), true);
    }
  };

  const handleSelectPreset = (uname: string) => {
    setUsernameInput(uname);
    loadProfile(uname);
  };

  const handleSaveToken = (token: string) => {
    setGithubToken(token);
    if (token) {
      localStorage.setItem('gh_pat_token', token);
    } else {
      localStorage.removeItem('gh_pat_token');
    }
    loadProfile(activeUsername, true);
  };

  const updateCustomization = (updated: Partial<ProfileCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...updated }));
  };

  const totalStars = userData?.repos.reduce((acc, r) => acc + r.stargazers_count, 0) || 0;

  return (
    <div className={`min-h-screen text-[#f0f4fc] selection:bg-indigo-500 selection:text-white transition-colors duration-500 pb-20 ${
      customization.theme === 'matrix'
        ? 'bg-[#040d09]'
        : customization.theme === 'cyberpunk'
        ? 'bg-[#0b0c10]'
        : customization.theme === 'synthwave'
        ? 'bg-[#0f091a]'
        : customization.theme === 'sakura'
        ? 'bg-[#12080d]'
        : 'bg-[#090b10]'
    }`}>
      {/* Background ambient glow orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090b10]/80 border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
                <Github size={20} />
              </div>
              <div>
                <h1 className="text-base font-black font-heading tracking-tight text-white flex items-center gap-1.5">
                  GitShowcase <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono border border-indigo-500/30">STUDIO</span>
                </h1>
                <p className="text-[10px] font-mono text-zinc-400">Live GitHub Intelligence & Direct Push Pipeline</p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
                title="Customize Theme"
              >
                <Sliders size={16} />
              </button>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="p-2 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center gap-1"
                title="Direct Push to GitHub"
              >
                <UploadCloud size={16} />
              </button>
            </div>
          </div>

          {/* Real-time GitHub Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 text-zinc-400" size={15} />
              <input
                type="text"
                placeholder="Enter your GitHub username (e.g. your_account)..."
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full pl-10 pr-28 py-2 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono shadow-inner transition-colors"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => loadProfile(usernameInput.trim() || activeUsername, true)}
                  disabled={isLoading || isRefreshing}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs transition-all"
                  title="Force refresh live stats from GitHub API"
                >
                  <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-cyan-400' : ''} />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isRefreshing}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1"
                >
                  {isLoading ? <RefreshCw size={12} className="animate-spin" /> : 'Fetch'}
                </button>
              </div>
            </div>
          </form>

          {/* Desktop Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Live Sync Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400">Live API:</span>
              <span className="font-bold text-white">@{activeUsername}</span>
            </div>

            {/* Rate Limit Token Key */}
            <button
              onClick={() => setIsTokenModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
              title="Add GitHub Token for 5,000 req/hr rate limits & pushing"
            >
              <Key size={13} className={githubToken ? 'text-emerald-400' : 'text-zinc-400'} />
              <span>{githubToken ? 'Token Active' : 'API Token'}</span>
            </button>

            {/* Customizer Drawer Trigger */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 transition-colors"
              title="Customize Themes & Lanyard"
            >
              <Sliders size={13} className="text-cyan-400" />
              <span>Customize</span>
            </button>

            {/* Direct Push to GitHub Trigger */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              disabled={!userData}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-mono font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <UploadCloud size={14} className="text-cyan-300" />
              <span>Direct Push to GitHub</span>
            </button>
          </div>
        </div>

        {/* Quick-Pick Popular Profiles Bar */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-2 pb-1 text-[11px] font-mono text-zinc-400 no-scrollbar">
          <span className="text-zinc-500 flex-shrink-0">Quick Sample Profiles:</span>
          {DEMO_PROFILES.map((p) => (
            <button
              key={p.username}
              onClick={() => handleSelectPreset(p.username)}
              className={`px-2.5 py-0.5 rounded-full border transition-all flex-shrink-0 ${
                activeUsername.toLowerCase() === p.username.toLowerCase()
                  ? 'border-indigo-500 bg-indigo-950/60 text-indigo-200 font-bold'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main App Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadProfile(activeUsername, true)}
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex-shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && !userData && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <Github className="absolute inset-0 m-auto text-indigo-400" size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-white mt-4">
              Querying GitHub Live API Intelligence...
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Fetching commits, real-time activity, repositories, and computing trophies for @{activeUsername}
            </p>
          </div>
        )}

        {/* Main Content Area */}
        {userData && (
          <div className="space-y-8">
            {/* Upper Section: Split Layout (Left: Large Moving Student Name & Hero, Right: 3D Hanging ID Card) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Big Moving Student Name, Designation Marquee & Student Profile (span 7 or 8) */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                <StudentHeroDisplay
                  user={userData.user}
                  totalStars={totalStars}
                  totalContributions={userData.contributions.totalContributions}
                  customization={customization}
                  languages={userData.languages}
                  onUpdateCustomization={updateCustomization}
                  onOpenExportModal={() => setIsExportModalOpen(true)}
                />
              </div>

              {/* Right Column: Interactive 3D Physics Hanging Lanyard ID Badge (span 5 or 4) */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center bg-zinc-950/40 border border-white/5 rounded-3xl p-4 shadow-xl backdrop-blur-sm">
                  <div className="w-full flex items-center justify-between px-2 pb-2 mb-1 border-b border-white/5 text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Sparkles size={13} />
                      3D HANGING ID BADGE
                    </span>
                    <span className="text-zinc-500">Interactive Tilt</span>
                  </div>
                  <HangingIdCard
                    user={userData.user}
                    customization={customization}
                    onUpdateCustomization={updateCustomization}
                  />
                </div>
              </div>
            </div>

            {/* Kinetic Moving Marquee Banner Ribbon */}
            <AnimeSlideBanner
              user={userData.user}
              customization={customization}
              trophies={userData.trophies}
              totalContributions={userData.contributions.totalContributions}
            />

            {/* GitHub Real-time Contribution Matrix & Punchcard */}
            <ContributionHeatmap
              data={userData.contributions}
              username={userData.user.login}
              theme={customization.theme}
            />

            {/* Programming Languages Mastery Breakdown */}
            <LanguageBreakdown languages={userData.languages} />

            {/* GitHub Prestige Trophies Cabinet */}
            <TrophyHall trophies={userData.trophies} username={userData.user.login} />

            {/* Dual Grid: Repositories & Real-time Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <RepoGrid repos={userData.repos} username={userData.user.login} />
              </div>
              <div className="lg:col-span-1">
                <ActivityTimeline events={userData.events} username={userData.user.login} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Github size={16} className="text-indigo-400" />
            <span>GitShowcase Studio — Direct Push & Interactive GitHub Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Powered by GitHub REST v3 API</span>
            <span>•</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-bold"
            >
              Push to GitHub
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ThemeCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customization={customization}
        onChange={updateCustomization}
      />

      {userData && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          user={userData.user}
          customization={customization}
          trophies={userData.trophies}
          languages={userData.languages}
          contributions={userData.contributions}
          githubToken={githubToken}
          onSaveToken={handleSaveToken}
        />
      )}

      <TokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        token={githubToken}
        onSaveToken={handleSaveToken}
      />
    </div>
  );
};

export default App;
