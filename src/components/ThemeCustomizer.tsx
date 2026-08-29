import React from 'react';
import {
  Palette,
  Sparkles,
  Sliders,
  Zap,
  Shield,
  Layers,
  X
} from 'lucide-react';
import { ProfileCustomization, ThemePreset } from '../types';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  customization: ProfileCustomization;
  onChange: (custom: Partial<ProfileCustomization>) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
  customization,
  onChange,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemePreset; name: string; colors: string[] }[] = [
    { id: 'tokyo-night', name: 'Tokyo Night', colors: ['#6366f1', '#06b6d4', '#0d111c'] },
    { id: 'cyberpunk', name: 'Cyberpunk 2077', colors: ['#eab308', '#06b6d4', '#090b10'] },
    { id: 'matrix', name: 'Matrix Hacker', colors: ['#10b981', '#059669', '#061a12'] },
    { id: 'synthwave', name: 'Synthwave 84', colors: ['#ec4899', '#8b5cf6', '#170c24'] },
    { id: 'sakura', name: 'Sakura Neo', colors: ['#f43f5e', '#fb7185', '#1a0d14'] },
    { id: 'github-dark', name: 'GitHub Slate', colors: ['#38bdf8', '#818cf8', '#0f172a'] },
  ];

  const lanyardColors = [
    { name: 'Indigo Hex', color: '#6366f1' },
    { name: 'Cyber Cyan', color: '#06b6d4' },
    { name: 'Crimson Ops', color: '#f43f5e' },
    { name: 'Emerald Code', color: '#10b981' },
    { name: 'Golden VIP', color: '#f59e0b' },
    { name: 'Dark Stealth', color: '#27272a' },
    { name: 'Purple Void', color: '#9333ea' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0d111c] border border-indigo-500/30 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">Visual Styling & Badge Engine</h3>
              <p className="text-xs text-zinc-400 font-mono">Personalize the hanging lanyard, color scheme, and kinetic text</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 font-mono text-xs max-h-[70vh] overflow-y-auto pr-1">
          {/* Theme Palette */}
          <div>
            <label className="text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
              <Palette size={14} className="text-indigo-400" />
              THEME ATMOSPHERE
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChange({ theme: t.id })}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    customization.theme === t.id
                      ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold shadow-md ring-1 ring-indigo-500'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{t.name}</span>
                  <div className="flex gap-1 flex-shrink-0">
                    {t.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Lanyard Strap Color */}
          <div>
            <label className="text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
              <Layers size={14} className="text-cyan-400" />
              LANYARD STRAP FABRIC COLOR
            </label>
            <div className="flex flex-wrap gap-2">
              {lanyardColors.map((lc) => (
                <button
                  key={lc.color}
                  onClick={() => onChange({ lanyardColor: lc.color })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    customization.lanyardColor === lc.color
                      ? 'border-white bg-white/15 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/50 shadow-sm"
                    style={{ backgroundColor: lc.color }}
                  />
                  <span>{lc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lanyard Texture Pattern */}
          <div>
            <label className="text-zinc-300 font-bold block mb-2">LANYARD STRAP WEAVE</label>
            <div className="grid grid-cols-4 gap-2">
              {(['grid', 'stripes', 'cyber', 'dots'] as const).map((pat) => (
                <button
                  key={pat}
                  onClick={() => onChange({ lanyardPattern: pat })}
                  className={`py-2 px-1 rounded-lg border text-center capitalize transition-all ${
                    customization.lanyardPattern === pat
                      ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  {pat}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Material */}
          <div>
            <label className="text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              ID BADGE FINISH & ACRYLIC MATERIAL
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['hologram', 'cyber-matte', 'glass', 'gold-vip'] as const).map((mat) => (
                <button
                  key={mat}
                  onClick={() => onChange({ cardMaterial: mat })}
                  className={`py-2 px-1 rounded-lg border text-center capitalize transition-all ${
                    customization.cardMaterial === mat
                      ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  {mat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Anime Banner Speed */}
          <div>
            <label className="text-zinc-300 font-bold block mb-2 flex items-center gap-1.5">
              <Zap size={14} className="text-rose-400" />
              ANIME KINETIC SLIDE SPEED
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['slow', 'normal', 'fast'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => onChange({ animeBannerSpeed: spd })}
                  className={`py-2 px-2 rounded-lg border text-center capitalize transition-all ${
                    customization.animeBannerSpeed === spd
                      ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Student Name */}
          <div>
            <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              STUDENT / DEVELOPER NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Chen"
              value={customization.studentName || ''}
              onChange={(e) => onChange({ studentName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Custom Student Designation */}
          <div>
            <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
              <Zap size={14} className="text-cyan-400" />
              STUDENT DESIGNATION & SPECIALIZATION
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science Student & Cloud Architect"
              value={customization.studentDesignation || ''}
              onChange={(e) => onChange({ studentDesignation: e.target.value, customTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Custom Clearance Label Input */}
          <div>
            <label className="text-zinc-300 font-bold block mb-1 flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" />
              CUSTOM BADGE CLEARANCE TITLE
            </label>
            <input
              type="text"
              placeholder="e.g. LEVEL 09 ARCHITECT // KERNEL ACCESS"
              value={customization.customSecurityLevel || ''}
              onChange={(e) => onChange({ customSecurityLevel: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono shadow-lg transition-all"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
