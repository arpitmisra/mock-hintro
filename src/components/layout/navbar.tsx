"use client";

import { useState } from "react";
import { Menu, Play } from "lucide-react";
import UserMenu from "./user-menu";
import MobileSidebar from "./mobile-sidebar";
import LogoutModal from "./logout-modal";

interface NavbarProps {
  userName: string;
  userEmail: string;
}

export default function Navbar({ userName, userEmail }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Tutorial
            </button>
            <UserMenu
              name={userName}
              email={userEmail}
              onLogout={() => setLogoutOpen(true)}
            />
          </div>
        </div>
      </header>

      <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <LogoutModal open={logoutOpen} onOpenChange={setLogoutOpen} />
    </>
  );
}
