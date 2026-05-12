"use client";

import { Users, Clock, Sparkles, CalendarDays } from "lucide-react";
import { formatDuration, getRelativeTime } from "@/utils/format";
import type { CallStats } from "@/types";

const cardConfig = [
  {
    key: "totalSessions",
    label: "Total Sessions",
    icon: Users,
    color: "bg-red-100 text-red-600",
    format: (stats: CallStats) => String(stats.totalSessions),
  },
  {
    key: "averageDuration",
    label: "Average Duration",
    icon: Clock,
    color: "bg-green-100 text-green-600",
    format: (stats: CallStats) => formatDuration(stats.averageDuration),
  },
  {
    key: "aiUsed",
    label: "AI Used",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
    format: (stats: CallStats) =>
      stats.totalAIInteractions > 0
        ? `${stats.totalAIInteractions} times`
        : "0",
  },
  {
    key: "lastSession",
    label: "Last Session",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600",
    format: (stats: CallStats) =>
      stats.lastSession.length > 0
        ? getRelativeTime(stats.lastSession[0])
        : "-",
  },
];

interface StatCardsProps {
  stats: CallStats | undefined;
  isLoading: boolean;
}

export default function StatCards({ stats, isLoading }: StatCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const defaultStats: CallStats = {
    totalSessions: 0,
    averageDuration: 0,
    totalAIInteractions: 0,
    lastSession: [],
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {cardConfig.map((card) => (
        <div
          key={card.key}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${card.color}`}>
              <card.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className="text-base font-semibold text-gray-900 mt-0.5">
                {card.format(data)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
