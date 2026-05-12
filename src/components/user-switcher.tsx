"use client";

import { useUserId } from "@/hooks/use-user-id";
import { useQueryClient } from "@tanstack/react-query";

export default function UserSwitcher() {
  const { userId, setUserId, mounted } = useUserId();
  const queryClient = useQueryClient();

  if (!mounted) return null;

  function toggle() {
    const next = userId === "u1" ? "u2" : "u1";
    setUserId(next);
    setTimeout(() => {
      queryClient.invalidateQueries();
    }, 50);
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-mono rounded-full shadow-lg hover:bg-gray-900 transition-colors backdrop-blur-sm"
      title="Switch test user"
    >
      {userId === "u1" ? "u1 (empty)" : "u2 (data)"}
    </button>
  );
}
