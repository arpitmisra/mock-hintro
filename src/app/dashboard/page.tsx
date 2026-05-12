"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile, getCallStats, getCallHistory } from "@/services/dashboard.service";
import { useUserId } from "@/hooks/use-user-id";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import StatCards from "@/components/dashboard/stat-cards";
import RecentCalls from "@/components/dashboard/recent-calls";
import UserSwitcher from "@/components/user-switcher";

export default function DashboardPage() {
  const { userId, mounted } = useUserId();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: getProfile,
    enabled: mounted,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats", userId],
    queryFn: getCallStats,
    enabled: mounted,
  });

  const { data: callHistory, isLoading: callsLoading } = useQuery({
    queryKey: ["calls", userId],
    queryFn: () => getCallHistory(10),
    enabled: mounted,
  });

  const userName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "User";
  const userEmail = profile?.email || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Navbar userName={userName} userEmail={userEmail} />

        <main className="p-4 lg:p-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Hi, {profileLoading ? "..." : profile?.firstName || "there"} 👋 Welcome to Hintro
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Ready to make your next call smarter ?
              </p>
            </div>
            <button className="self-start px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Start New Call
            </button>
          </div>

          <div className="mb-8">
            <StatCards stats={stats} isLoading={statsLoading} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
              Recent calls
            </h3>
            <RecentCalls
              sessions={callHistory?.callSessions}
              isLoading={callsLoading}
            />
          </div>
        </main>
      </div>

      <UserSwitcher />
    </div>
  );
}
