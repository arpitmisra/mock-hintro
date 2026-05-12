"use client";

import { formatDateLabel } from "@/utils/format";
import CallItem from "./call-item";
import EmptyState from "./empty-state";
import type { CallSession } from "@/types";

interface RecentCallsProps {
  sessions: CallSession[] | undefined;
  isLoading: boolean;
}

function groupByDate(sessions: CallSession[]): Record<string, CallSession[]> {
  const groups: Record<string, CallSession[]> = {};
  for (const session of sessions) {
    const dateKey = new Date(session.started_at).toDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(session);
  }
  return groups;
}

export default function RecentCalls({ sessions, isLoading }: RecentCallsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-9 h-9 rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded w-28" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-14" />
          </div>
        ))}
      </div>
    );
  }

  if (!sessions || sessions.length === 0) {
    return <EmptyState />;
  }

  const grouped = groupByDate(sessions);

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([dateKey, calls]) => (
        <div key={dateKey}>
          <p className="text-xs font-medium text-amber-600 mb-1.5">
            {formatDateLabel(calls[0].started_at)}
          </p>
          <div className="divide-y divide-gray-100">
            {calls.map((session) => (
              <CallItem key={session._id} session={session} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
