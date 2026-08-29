import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  RotateCcw,
  Sparkles,
  QrCode,
  Shield,
  ExternalLink,
  MapPin,
  Building,
  Calendar,
  Layers,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { GitHubUser, ProfileCustomization } from '../types';

interface HangingIdCardProps {
  user: GitHubUser;
  customization: ProfileCustomization;
  onUpdateCustomization: (custom: Partial<ProfileCustomization>) => void;
}

export const HangingIdCard: React.FC<HangingIdCardProps> = ({
  user,
  customization,
  onUpdateCustomization,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-14deg', '14deg']);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.15, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(user.html_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const memberSinceYear = new Date(user.created_at).getFullYear();
  const clearanceLevel = customization.customSecurityLevel || `LEVEL 0${Math.min(9, Math.max(1, Math.floor(user.public_repos / 10) + 1))} ACCESS`;

  // Material style classes
  const getMaterialClasses = () => {
    switch (customization.cardMaterial) {
      case 'hologram':
        return 'border border-cyan-500/40 bg-gradient-to-b from-[#111928]/95 via-[#0e1626]/95 to-[#0b101c]/98 shadow-[0_20px_50px_rgba(8,145,178,0.25)]';
      case 'gold-vip':
        return 'border border-amber-400/50 bg-gradient-to-b from-[#1e170a]/95 via-[#141008]/95 to-[#0b0904]/98 shadow-[0_20px_50px_rgba(245,158,11,0.25)]';
      case 'glass':
        return 'border border-white/20 bg-slate-900/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]';
      case 'cyber-matte':
      default:
        return 'border border-indigo-500/40 bg-gradient-to-b from-[#121624]/95 via-[#0d101a]/95 to-[#090b12]/98 shadow-[0_20px_50px_rgba(99,102,241,0.25)]';
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-[380px] mx-auto py-2">
      {/* Top Hanging Lanyard Anchor & Ribbon */}
      <div className="w-full flex flex-col items-center relative z-20 pointer-events-none">
        {/* Lanyard Strap Top Coming from beyond screen */}
        <div className="relative w-14 h-24 overflow-hidden flex justify-center">
          <div
            className="w-10 h-full rounded-t-sm shadow-inner transition-colors duration-300"
            style={{
              backgroundColor: customization.lanyardColor || '#6366f1',
              backgroundImage:
                customization.lanyardPattern === 'grid'
                  ? 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)'
                  : customization.lanyardPattern === 'stripes'
                  ? 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)'
                  : customization.lanyardPattern === 'cyber'
                  ? 'linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)'
                  : 'none',
              backgroundSize: customization.lanyardPattern === 'grid' ? '6px 6px' : 'auto',
            }}
          >
            {/* Lanyard center text branding */}
            <div className="h-full flex flex-col justify-around items-center py-2 opacity-80">
              <span className="text-[7px] font-mono tracking-widest text-black/80 font-black uppercase rotate-90 whitespace-nowrap">
                GITHUB // AUTH
              </span>
            </div>
          </div>
        </div>

        {/* Metallic Clasp & Swivel Hook */}
        <div className="flex flex-col items-center -mt-2 z-30">
          {/* Metal Ring Buckle */}
          <div className="w-8 h-3 rounded-full bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 shadow-md border border-zinc-600" />
          {/* Swivel Clasp */}
          <div className="w-4 h-6 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 shadow-lg rounded-sm border border-zinc-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          </div>
          {/* Badge Hole Clip */}
          <div className="w-7 h-2.5 rounded-t-sm bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-600 -mt-0.5 border border-zinc-700 shadow-inner" />
        </div>
      </div>

      {/* 3D Hanging Physics Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateZ: [-1.2, 1.2, -1.2],
          y: [-2, 2, -2],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          transformStyle: 'preserve-3d',
        }}
        className="w-full perspective-1000 -mt-1 cursor-grab active:cursor-grabbing transition-shadow duration-300"
      >
        {/* The Badge Outer Slot */}
        <div className="relative w-full rounded-2xl p-1 bg-gradient-to-b from-zinc-400/40 via-zinc-700/20 to-zinc-900/60 backdrop-blur-md shadow-2xl border border-white/10">
          {/* Top slot punched hole */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-[#090b10] rounded-full border border-zinc-700/80 z-40 shadow-inner flex items-center justify-center">
            <div className="w-6 h-1 bg-zinc-800 rounded-full" />
          </div>

          {/* Flip Container */}
          <div
            className={`relative w-full min-h-[460px] rounded-xl overflow-hidden transition-transform duration-700 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } ${getMaterialClasses()}`}
          >
            {/* Holographic Overlay Layer */}
            {customization.cardMaterial === 'hologram' && (
              <div className="absolute inset-0 pointer-events-none hologram-effect opacity-30 mix-blend-color-dodge z-30" />
            )}

            {/* Subtle Grid / Scanline Background */}
            <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-20 z-10" />

            {/* ================= FRONT OF BADGE ================= */}
            <div className="absolute inset-0 p-5 pt-7 flex flex-col justify-between backface-hidden z-20">
              {/* Header: Clearance Badge & Security Code */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      VERIFIED DEV
                    </span>
                  </div>

                  <div className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider bg-white/10 text-zinc-300 border border-white/10">
                    {clearanceLevel}
                  </div>
                </div>

                {/* Cyber Subtitle / Organization */}
                <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-zinc-400">
                  <span>ID: GH-{user.id.toString().padStart(8, '0')}</span>
                  <span>EST. {memberSinceYear}</span>
                </div>
              </div>

              {/* Main Profile Info: Avatar & Tech Aura */}
              <div className="flex flex-col items-center text-center my-auto py-2">
                {/* Avatar with Tech Hex Frame */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-500 animate-spin-slow" />
                  
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-white/80 shadow-xl"
                  />

                  {/* Golden / EMV Chip Badge on avatar corner */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 rounded border border-amber-600 shadow-md flex items-center justify-center p-0.5">
                    <div className="w-full h-full border border-amber-700/60 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="bg-amber-600/30 rounded-2xs" />
                      <div className="bg-amber-600/30 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Name & Username */}
                <h2 className="text-xl font-bold font-heading text-white mt-3 tracking-tight flex items-center justify-center gap-1.5">
                  {customization.studentName || user.name || user.login}
                </h2>
                <div className="text-xs font-mono text-indigo-400 font-medium">
                  @{user.login}
                </div>

                {/* Role / Bio Custom or GitHub Bio */}
                <p className="text-[11px] text-zinc-300 line-clamp-2 mt-2 px-2 leading-relaxed font-mono">
                  {customization.studentDesignation || customization.customTitle || user.bio || 'Computer Science Student & Software Architect'}
                </p>

                {/* Quick Metadata chips */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[10px] text-zinc-400 font-mono">
                  {user.location && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                      <MapPin size={10} className="text-cyan-400" />
                      {user.location.split(',')[0]}
                    </span>
                  )}
                  {user.company && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                      <Building size={10} className="text-purple-400" />
                      {user.company.replace('@', '')}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Security Barcode & QR Stamp */}
              <div className="border-t border-white/10 pt-2.5">
                <div className="flex items-center justify-between">
                  {/* Faux Barcode Pattern */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-end gap-[1.5px] h-6">
                      {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1].map((w, i) => (
                        <div
                          key={i}
                          className="bg-white/80"
                          style={{ width: `${w}px`, height: `${16 + (w * 2)}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-zinc-400 tracking-wider">
                      AUTH // {user.login.toUpperCase()}
                    </span>
                  </div>

                  {/* QR Badge & Link */}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex items-center gap-1 text-[10px] text-zinc-300 font-mono"
                    title="Visit GitHub Profile"
                  >
                    <QrCode size={18} className="text-cyan-400" />
                    <span>VISIT</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ================= BACK OF BADGE ================= */}
            <div className="absolute inset-0 p-5 pt-7 flex flex-col justify-between backface-hidden rotate-y-180 z-20">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-[10px] font-bold">
                    <Shield size={12} className="text-indigo-400" />
                    DEVELOPER CREDENTIALS
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">ENCRYPTED</span>
                </div>

                {/* Magnetic Stripe */}
                <div className="w-full h-8 bg-zinc-950/90 my-3 rounded-sm border-y border-zinc-700/40 relative overflow-hidden flex items-center justify-end px-3">
                  <div className="text-[8px] font-mono tracking-widest text-zinc-600 uppercase">
                    MAGNETIC TRACK 01 // 256-BIT
                  </div>
                </div>

                {/* Detailed Stats Matrix */}
                <div className="grid grid-cols-2 gap-2 text-left my-2 font-mono">
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] text-zinc-400">PUBLIC REPOS</div>
                    <div className="text-sm font-bold text-white">{user.public_repos}</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] text-zinc-400">FOLLOWERS</div>
                    <div className="text-sm font-bold text-cyan-400">{user.followers.toLocaleString()}</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] text-zinc-400">FOLLOWING</div>
                    <div className="text-sm font-bold text-purple-400">{user.following.toLocaleString()}</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-[9px] text-zinc-400">PUBLIC GISTS</div>
                    <div className="text-sm font-bold text-amber-400">{user.public_gists}</div>
                  </div>
                </div>

                {/* Cryptographic signature hash */}
                <div className="mt-2 p-2 rounded bg-black/40 border border-white/5 font-mono text-[8px] text-zinc-400 break-all leading-tight">
                  <div className="text-zinc-500 mb-0.5">SHA256 SIGNATURE:</div>
                  f89c4a{user.id}e97b8120d{user.public_repos}012487ab6c
                </div>
              </div>

              {/* Back Card Footer */}
              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <div className="flex items-center gap-1">
                  <Calendar size={10} className="text-indigo-400" />
                  <span>JOINED {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="text-emerald-400 font-semibold">SECURITY CHIP OK</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card Interactive Action Toolbar */}
      <div className="flex items-center justify-center gap-2 mt-4 z-30">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Flip badge to see credentials back side"
        >
          <RotateCcw size={12} className={isFlipped ? 'text-indigo-400' : ''} />
          <span>{isFlipped ? 'Show Front' : 'Flip Badge'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Copy profile link"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>

        {/* Style switcher dropdown / pill */}
        <div className="relative group">
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-200 text-xs font-mono transition-all"
            title="Card Material Finish"
          >
            <Sparkles size={12} className="text-cyan-400" />
            <span className="capitalize">{customization.cardMaterial}</span>
          </button>

          {/* Quick Dropdown on hover */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col gap-1 p-1.5 rounded-xl bg-zinc-900/95 border border-zinc-700 shadow-2xl backdrop-blur-md z-50 min-w-[130px]">
            <div className="text-[9px] font-mono text-zinc-400 px-2 py-0.5">BADGE FINISH</div>
            {(['hologram', 'cyber-matte', 'glass', 'gold-vip'] as const).map((mat) => (
              <button
                key={mat}
                onClick={() => onUpdateCustomization({ cardMaterial: mat })}
                className={`text-left px-2 py-1 rounded text-xs font-mono capitalize transition-colors ${
                  customization.cardMaterial === mat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {mat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
