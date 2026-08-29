import React, { useState } from 'react';
import {
  FolderGit2,
  Star,
  GitFork,
  ExternalLink,
  Search,
  Copy,
  Check,
  Globe,
  Tag,
  CircleDot
} from 'lucide-react';
import { GitHubRepo } from '../types';

interface RepoGridProps {
  repos: GitHubRepo[];
  username: string;
}

export const RepoGrid: React.FC<RepoGridProps> = ({ repos, username }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  // Extract unique languages
  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ) as string[];

  // Filter repos
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage =
      selectedLanguage === 'all' || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const handleCopyClone = (cloneUrl: string, name: string) => {
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopiedRepo(name);
    setTimeout(() => setCopiedRepo(null), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0d111c]/90 border border-white/10 p-5 md:p-6 shadow-xl backdrop-blur-md">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-cyan-400" size={22} />
            <h3 className="text-lg font-bold font-heading text-white">
              Public Repositories & Artifacts
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              {repos.length} TOTAL
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Explore and clone open source projects by @{username}
          </p>
        </div>

        {/* Search & Language Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Language selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Repository Cards */}
      {filteredRepos.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-xs">
          No repositories found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.slice(0, 18).map((repo) => (
            <div
              key={repo.id}
              className="group rounded-xl p-4 bg-zinc-950/80 hover:bg-zinc-900/90 border border-white/5 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5"
            >
              <div>
                {/* Repo Top Bar */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 truncate"
                  >
                    <span className="truncate">{repo.name}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-cyan-400" />
                  </a>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 flex-shrink-0">
                    {repo.private ? 'Private' : 'Public'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {repo.description || 'No description provided for this repository.'}
                </p>

                {/* Topics / Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        #{topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-[9px] font-mono text-zinc-500">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Meta Bar & Clone Button */}
              <div className="border-t border-white/5 pt-3 mt-1 flex items-center justify-between text-xs font-mono">
                {/* Language & Stats */}
                <div className="flex items-center gap-3 text-zinc-400">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-[11px] text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px]">
                    <Star size={11} className="text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <GitFork size={11} className="text-zinc-400" />
                    {repo.forks_count}
                  </span>
                </div>

                {/* Copy Clone Button */}
                <button
                  onClick={() => handleCopyClone(repo.html_url, repo.name)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  title="Copy git clone command"
                >
                  {copiedRepo === repo.name ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
