"use client";

import { MoreVertical } from "lucide-react";
import { formatCallTime } from "@/utils/format";
import type { CallSession } from "@/types";

const avatarColors = [
  "bg-red-500",
  "bg-purple-600",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-pink-500",
];

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

interface CallItemProps {
  session: CallSession;
}

export default function CallItem({ session }: CallItemProps) {
  const color = getAvatarColor(session._id);
  const participants = session.participants
    .map((p) => p.name)
    .join(", ");

  const initial = session.description?.[0]?.toUpperCase() || "C";

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}
      >
        <span className="text-xs font-bold text-white">{initial}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {session.description || session.client}
        </p>
        <p className="text-xs text-gray-500 truncate">{participants}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-gray-500">
          {formatCallTime(session.started_at)}
        </span>
        <button className="p-1 rounded hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
