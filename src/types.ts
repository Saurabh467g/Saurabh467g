export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
  } | null;
  topics: string[];
  default_branch: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
  longestStreak: number;
  currentStreak: number;
  bestDay: {
    date: string;
    count: number;
  };
  hourlyPunchCard: number[][]; // 7 days x 24 hours
}

export interface Trophy {
  id: string;
  name: string;
  category: 'commits' | 'stars' | 'repos' | 'followers' | 'prs' | 'experience' | 'languages' | 'streak';
  rank: 'SSS' | 'S' | 'AAA' | 'AA' | 'A' | 'B' | 'C';
  score: number;
  maxScore: number;
  description: string;
  criteria: string;
  unlocked: boolean;
  badgeIcon: string;
}

export interface LanguageStat {
  name: string;
  color: string;
  repoCount: number;
  percentage: number;
  starsCount: number;
}

export type ThemePreset = 'tokyo-night' | 'cyberpunk' | 'matrix' | 'synthwave' | 'github-dark' | 'sakura';

export interface ProfileCustomization {
  theme: ThemePreset;
  lanyardColor: string;
  lanyardPattern: 'grid' | 'stripes' | 'cyber' | 'dots';
  cardMaterial: 'hologram' | 'cyber-matte' | 'glass' | 'gold-vip';
  animeBannerSpeed: 'slow' | 'normal' | 'fast';
  customTitle?: string;
  customAffiliation?: string;
  customSecurityLevel?: string;
  studentName?: string;
  studentDesignation?: string;
  studentBatchYear?: string;
  studentInstitution?: string;
  movingTextStyle?: 'kinetic-flow' | 'glitch-marquee' | 'neon-pulse';
}
