import React from 'react';
import { Code2, PieChart } from 'lucide-react';
import { LanguageStat } from '../types';

interface LanguageBreakdownProps {
  languages: LanguageStat[];
}

export const LanguageBreakdown: React.FC<LanguageBreakdownProps> = ({ languages }) => {
  return (
    <div className="w-full rounded-2xl bg-[#0d111c]/90 border border-white/10 p-5 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="text-purple-400" size={20} />
          <h3 className="text-md font-bold font-heading text-white">Language Mastery Matrix</h3>
        </div>
        <span className="text-xs font-mono text-zinc-400">{languages.length} detected</span>
      </div>

      {/* Multi-segmented Colored Progress Bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-800/80 mb-5 p-0.5 border border-white/5">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${Math.max(2, lang.percentage)}%`,
              backgroundColor: lang.color,
            }}
            className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-80"
            title={`${lang.name}: ${lang.percentage}% (${lang.repoCount} repos)`}
          />
        ))}
      </div>

      {/* Language Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
        {languages.slice(0, 9).map((lang) => (
          <div
            key={lang.name}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs text-zinc-200 truncate">{lang.name}</span>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <span className="text-xs font-bold text-white">{lang.percentage}%</span>
              <span className="text-[10px] text-zinc-500 block">{lang.repoCount} repos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
