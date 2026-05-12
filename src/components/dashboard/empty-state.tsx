"use client";

import { MessageSquare } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <MessageSquare className="w-5 h-5 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">No Recent Calls</h3>
      <p className="text-xs text-gray-500 max-w-[240px] mb-4">
        Connect your Google Calendar, sync upcoming meetings, get reminders, and join calls directly from Hintro.
      </p>
      <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Start a call
      </button>
    </div>
  );
}
