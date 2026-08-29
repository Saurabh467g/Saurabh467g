import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onSaveToken: (token: string) => void;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  onClose,
  token,
  onSaveToken,
}) => {
  const [tokenInput, setTokenInput] = useState(token);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveToken(tokenInput.trim());
    onClose();
  };

  const handleClear = () => {
    setTokenInput('');
    onSaveToken('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0d111c] border border-indigo-500/30 shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
              <Key size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">GitHub API Token & Rate Limits</h3>
              <p className="text-xs text-zinc-400 font-mono">Unlock 5,000 requests/hr and direct repo push capability</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-zinc-300 space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <ShieldCheck size={16} />
              <span>Why add a Personal Access Token?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-300">
              Unauthenticated GitHub requests have a limit of 60 requests/hour per IP. Adding a Personal Access Token increases your limit to <strong>5,000 requests/hour</strong> and enables <strong>direct 1-click code pushing to your GitHub repositories</strong>.
            </p>
          </div>

          <div>
            <label className="text-zinc-300 font-bold block mb-1.5">
              GitHub Personal Access Token (PAT):
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=GitShowcase+Studio"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold"
            >
              <span>Generate token on GitHub (select "repo" scope)</span>
              <ExternalLink size={12} />
            </a>
            {token && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-400 hover:text-rose-300 underline"
              >
                Clear Token
              </button>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <Check size={14} />
              <span>Save & Connect</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
