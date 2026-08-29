import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Copy,
  Check,
  FileCode,
  Download,
  Share2,
  Code,
  Sparkles,
  Terminal,
  ExternalLink,
  UploadCloud,
  Key,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { GitHubUser, ProfileCustomization, Trophy, LanguageStat, ContributionData } from '../types';
import { pushReadmeToGitHub, PushResult } from '../services/githubPush';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GitHubUser;
  customization: ProfileCustomization;
  trophies: Trophy[];
  languages: LanguageStat[];
  contributions: ContributionData;
  githubToken?: string;
  onSaveToken?: (token: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  user,
  customization,
  trophies,
  languages,
  contributions,
  githubToken = '',
  onSaveToken,
}) => {
  const [activeTab, setActiveTab] = useState<'push' | 'readme' | 'html' | 'json'>('push');
  const [copied, setCopied] = useState(false);

  // Direct push states
  const [tokenInput, setTokenInput] = useState(githubToken);
  const [targetRepo, setTargetRepo] = useState(user.login); // GitHub special profile repo default
  const [targetPath, setTargetPath] = useState('README.md');
  const [commitMsg, setCommitMsg] = useState(`Update profile README via GitShowcase Studio`);
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<PushResult | null>(null);
  const [pushError, setPushError] = useState<string | null>(null);

  if (!isOpen) return null;

  const topLanguages = languages.slice(0, 5).map((l) => l.name).join('%2C');
  const studentName = customization.studentName || user.name || user.login;
  const studentDesignation = customization.studentDesignation || customization.customTitle || user.bio || 'Computer Science Student & Full Stack Architect';

  // Generate Drop-In GitHub README.md markdown
  const readmeMarkdown = `# ⚡ Hi there, I'm ${studentName} 👋

<div align="center">

<!-- Moving Showcase Header -->
\`\`\`text
⚡ ${studentName.toUpperCase()} // ${studentDesignation.toUpperCase()} // ${contributions.totalContributions} COMMITS
\`\`\`

[![GitHub Profile Badge](https://img.shields.io/badge/Security_Clearance-${encodeURIComponent(
    customization.customSecurityLevel || 'LEVEL_08_ACCESS'
  )}-6366f1?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${user.login})
[![Followers](https://img.shields.io/badge/Followers-${user.followers}-06b6d4?style=for-the-badge&logo=github)](https://github.com/${user.login}?tab=followers)
[![Public Repos](https://img.shields.io/badge/Public_Repos-${user.public_repos}-10b981?style=for-the-badge&logo=git)](https://github.com/${user.login}?tab=repositories)

<br/>

### 🏆 GitHub Prestige Trophies
[![Trophies](https://github-profile-trophy.vercel.app/?username=${user.login}&theme=${customization.theme === 'matrix' ? 'matrix' : 'tokyonight'}&no-frame=false&margin-w=4)](https://github.com/${user.login})

</div>

---

### 🚀 About Me
- 🎓 **Designation**: ${studentDesignation}
- 📍 **Location**: ${user.location || 'Distributed'}
- 🏢 **Affiliation / Institution**: ${user.company || 'Open Source Contributor'}
- ⚡ **Annual Contributions**: **${contributions.totalContributions.toLocaleString()}** contributions across all repositories
- 🔥 **Commit Streak**: Current **${contributions.currentStreak} days** | Longest **${contributions.longestStreak} days**
${user.blog ? `- 🌐 **Portfolio / Website**: [${user.blog}](${user.blog.startsWith('http') ? user.blog : `https://${user.blog}`})` : ''}

---

### 📊 Real-Time GitHub Intelligence

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=tokyonight&count_private=true&hide_border=true&bg_color=0d111c&title_color=6366f1&icon_color=06b6d4&text_color=e2e8f0" alt="GitHub Stats" width="48%" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d111c&title_color=6366f1&text_color=e2e8f0" alt="Top Languages" width="48%" />

<br/>

<img src="https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=tokyonight&hide_border=true&background=0d111c&ring=6366f1&fire=f43f5e&currStreakLabel=06b6d4" alt="GitHub Streak" width="97%" />

</div>

---

### 🛠️ Top Technology Stack
<p align="center">
${languages
  .slice(0, 8)
  .map(
    (lang) =>
      `  <img src="https://img.shields.io/badge/${encodeURIComponent(lang.name)}-${lang.color.replace(
        '#',
        ''
      )}?style=for-the-badge&logo=${lang.name.toLowerCase()}&logoColor=white" />`
  )
  .join('\n')}
</p>

<br/>

<div align="center">
  <sub>Generated with <a href="https://github.com/${user.login}">GitShowcase Studio</a> • Ready to import into your <code>README.md</code></sub>
</div>
`;

  // Direct Embed HTML
  const embedHtml = `<!-- GitShowcase Interactive ID Badge & Heatmap for @${user.login} -->
<div class="gitshowcase-badge" style="font-family: sans-serif; background: #0d111c; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 24px; color: #fff; max-width: 500px;">
  <div style="display: flex; align-items: center; gap: 16px;">
    <img src="${user.avatar_url}" style="width: 72px; height: 72px; border-radius: 50%; border: 2px solid #6366f1;" />
    <div>
      <h3 style="margin: 0; font-size: 20px;">${studentName}</h3>
      <p style="margin: 4px 0 0; color: #06b6d4; font-size: 13px;">@${user.login} • ${customization.customSecurityLevel || 'LEVEL 08 ACCESS'}</p>
      <p style="margin: 6px 0 0; color: #94a3b8; font-size: 12px;">${studentDesignation}</p>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 18px; text-align: center;">
    <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px;">
      <div style="font-size: 11px; color: #94a3b8;">COMMITS</div>
      <div style="font-size: 16px; font-weight: bold; color: #f59e0b;">${contributions.totalContributions}</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px;">
      <div style="font-size: 11px; color: #94a3b8;">STREAK</div>
      <div style="font-size: 16px; font-weight: bold; color: #f43f5e;">${contributions.currentStreak}d</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px;">
      <div style="font-size: 11px; color: #94a3b8;">REPOS</div>
      <div style="font-size: 16px; font-weight: bold; color: #10b981;">${user.public_repos}</div>
    </div>
  </div>
</div>`;

  const jsonConfig = JSON.stringify(
    {
      user: {
        username: user.login,
        name: studentName,
        avatar: user.avatar_url,
        bio: user.bio,
        repos: user.public_repos,
        followers: user.followers,
      },
      stats: {
        totalContributions: contributions.totalContributions,
        currentStreak: contributions.currentStreak,
        longestStreak: contributions.longestStreak,
      },
      customization,
      trophies: trophies.map((t) => ({ name: t.name, rank: t.rank, score: t.score })),
      languages: languages.slice(0, 6),
    },
    null,
    2
  );

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDirectPush = async () => {
    if (!tokenInput.trim()) {
      setPushError('Please enter your GitHub Personal Access Token with repo scope.');
      return;
    }

    setIsPushing(true);
    setPushError(null);
    setPushStatus(null);

    try {
      if (onSaveToken) {
        onSaveToken(tokenInput.trim());
      }

      const result = await pushReadmeToGitHub({
        token: tokenInput.trim(),
        username: user.login,
        repoName: targetRepo.trim() || user.login,
        filePath: targetPath.trim() || 'README.md',
        content: readmeMarkdown,
        commitMessage: commitMsg.trim(),
      });

      setPushStatus(result);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err: any) {
      setPushError(err.message || 'Failed to push directly to GitHub.');
    } finally {
      setIsPushing(false);
    }
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case 'readme':
        return readmeMarkdown;
      case 'html':
        return embedHtml;
      case 'json':
        return jsonConfig;
      default:
        return readmeMarkdown;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0d111c] border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                Push Directly to GitHub & Export Center
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Directly commit live showcase to your GitHub repository <code>{user.login}/{targetRepo}</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 pt-4 bg-zinc-950/40 border-b border-white/5 font-mono text-xs overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('push')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl border-t border-x transition-colors whitespace-nowrap ${
                activeTab === 'push'
                  ? 'bg-[#121726] border-white/10 text-cyan-300 font-bold shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UploadCloud size={14} className="text-cyan-400" />
              <span>Direct Push to GitHub</span>
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl border-t border-x transition-colors whitespace-nowrap ${
                activeTab === 'readme'
                  ? 'bg-[#121726] border-white/10 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode size={14} className="text-indigo-400" />
              <span>README.md Code</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl border-t border-x transition-colors whitespace-nowrap ${
                activeTab === 'html'
                  ? 'bg-[#121726] border-white/10 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code size={14} className="text-purple-400" />
              <span>HTML Embed</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl border-t border-x transition-colors whitespace-nowrap ${
                activeTab === 'json'
                  ? 'bg-[#121726] border-white/10 text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Terminal size={14} className="text-amber-400" />
              <span>JSON Config</span>
            </button>
          </div>

          {activeTab !== 'push' && (
            <button
              onClick={() => handleCopy(getActiveCode())}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 mb-2 whitespace-nowrap flex-shrink-0"
            >
              {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#090b10]">
          {activeTab === 'push' ? (
            <div className="space-y-4 font-mono text-xs">
              {/* Push Status Banner */}
              {pushStatus && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 flex flex-col gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>{pushStatus.message}</span>
                  </div>
                  {pushStatus.repoUrl && (
                    <div className="flex items-center gap-3 mt-1">
                      <a
                        href={pushStatus.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span>View Repository on GitHub</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Push Error Alert */}
              {pushError && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Push Encountered an Error:</div>
                    <div className="text-xs text-rose-300 mt-0.5">{pushError}</div>
                  </div>
                </div>
              )}

              {/* Form settings */}
              <div className="p-5 rounded-2xl bg-[#0e1320] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Key size={16} className="text-cyan-400" />
                    <span className="font-bold text-white text-sm">GitHub Authentication & Destination</span>
                  </div>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=GitShowcase+Studio"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Create Token with "repo" Scope</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div>
                  <label className="text-zinc-300 font-bold block mb-1.5">
                    GitHub Personal Access Token (Classic or Fine-Grained):
                  </label>
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner font-mono"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Your token is stored only in your browser session memory and sent directly to <code>api.github.com</code>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-300 font-bold block mb-1.5">
                      Target Repository Name:
                    </label>
                    <input
                      type="text"
                      value={targetRepo}
                      onChange={(e) => setTargetRepo(e.target.value)}
                      placeholder={user.login}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Tip: A repo named <strong>{user.login}</strong> renders your profile README on your GitHub landing page!
                    </p>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-bold block mb-1.5">
                      File Path in Repository:
                    </label>
                    <input
                      type="text"
                      value={targetPath}
                      onChange={(e) => setTargetPath(e.target.value)}
                      placeholder="README.md"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-300 font-bold block mb-1.5">
                    Commit Message:
                  </label>
                  <input
                    type="text"
                    value={commitMsg}
                    onChange={(e) => setCommitMsg(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                {/* Direct Push Execution Action */}
                <div className="pt-2">
                  <button
                    onClick={handleDirectPush}
                    disabled={isPushing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isPushing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Pushing directly to github.com/{user.login}/{targetRepo}...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={18} />
                        <span>Direct Push to GitHub ({user.login}/{targetRepo})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview Box */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5">
                <div className="text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-wider">
                  Live README Output Preview:
                </div>
                <pre className="p-3 rounded-lg bg-black/50 text-[11px] text-zinc-300 max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {readmeMarkdown.slice(0, 450)}...
                </pre>
              </div>
            </div>
          ) : (
            <pre className="p-4 rounded-xl bg-zinc-950/90 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-indigo-600 selection:text-white">
              {getActiveCode()}
            </pre>
          )}
        </div>

        {/* Footer Instructions */}
        <div className="p-4 bg-zinc-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Target repository: <strong>{user.login}/{targetRepo}</strong> • Branch: <strong>main</strong></span>
          </div>

          <a
            href={`https://github.com/${user.login}/${targetRepo}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
          >
            <span>Open GitHub Repo</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
