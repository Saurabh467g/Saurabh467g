import React from 'react';
import {
  Activity,
  GitCommit,
  GitPullRequest,
  Star,
  GitFork,
  FolderPlus,
  MessageSquare,
  Clock
} from 'lucide-react';
import { GitHubEvent } from '../types';

interface ActivityTimelineProps {
  events: GitHubEvent[];
  username: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events, username }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="text-indigo-400" size={14} />;
      case 'PullRequestEvent':
        return <GitPullRequest className="text-emerald-400" size={14} />;
      case 'WatchEvent':
        return <Star className="text-amber-400" size={14} />;
      case 'ForkEvent':
        return <GitFork className="text-cyan-400" size={14} />;
      case 'CreateEvent':
        return <FolderPlus className="text-purple-400" size={14} />;
      case 'IssueCommentEvent':
      case 'IssuesEvent':
        return <MessageSquare className="text-rose-400" size={14} />;
      default:
        return <Activity className="text-zinc-400" size={14} />;
    }
  };

  const formatEventText = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent': {
        const commitCount = event.payload?.commits?.length || 1;
        const msg = event.payload?.commits?.[0]?.message || 'Pushed commits to branch';
        return {
          title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${event.repo.name}`,
          desc: msg.split('\n')[0],
        };
      }
      case 'PullRequestEvent':
        return {
          title: `${event.payload?.action || 'Opened'} pull request in ${event.repo.name}`,
          desc: event.payload?.pull_request?.title || 'Pull request contribution',
        };
      case 'WatchEvent':
        return {
          title: `Starred repository ${event.repo.name}`,
          desc: 'Added to public starred list',
        };
      case 'ForkEvent':
        return {
          title: `Forked ${event.repo.name}`,
          desc: `Created fork ${event.payload?.forkee?.full_name || ''}`,
        };
      case 'CreateEvent':
        return {
          title: `Created ${event.payload?.ref_type || 'repository'} ${event.payload?.ref || event.repo.name}`,
          desc: event.payload?.description || 'New branch/repository initiated',
        };
      default:
        return {
          title: `Action on ${event.repo.name}`,
          desc: event.type.replace('Event', ''),
        };
    }
  };

  const timeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="w-full rounded-2xl bg-[#0d111c]/90 border border-white/10 p-5 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="text-emerald-400" size={20} />
          <h3 className="text-md font-bold font-heading text-white">Live Event Stream</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>REAL-TIME</span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-xs font-mono text-zinc-500 py-6 text-center">
          No recent public events found for @{username}
        </div>
      ) : (
        <div className="flex flex-col gap-3 font-mono">
          {events.slice(0, 7).map((ev) => {
            const { title, desc } = formatEventText(ev);
            return (
              <div
                key={ev.id}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-white/10 flex-shrink-0 mt-0.5">
                  {getEventIcon(ev.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-white font-bold truncate">{title}</span>
                    <span className="text-[10px] text-zinc-500 flex-shrink-0 flex items-center gap-1">
                      <Clock size={10} />
                      {timeAgo(ev.created_at)}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
