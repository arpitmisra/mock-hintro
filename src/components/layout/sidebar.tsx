"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PhoneCall,
  BookOpen,
  MessageSquareText,
  Box,
  History,
  MessageCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Call Insights", href: "#", icon: PhoneCall },
  { label: "Knowledge Base", href: "#", icon: BookOpen, trailing: Info },
  { label: "Prompts", href: "#", icon: MessageSquareText, trailing: ChevronRight },
  { label: "Boxy Controls", href: "#", icon: Box, trailing: ChevronRight },
];

const bottomNav = [
  { label: "Feedback History", href: "#", icon: History },
  { label: "Feedback", href: "#", icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[220px] lg:fixed lg:inset-y-0 lg:left-0 border-r border-gray-200 bg-white z-30">
      <div className="px-5 py-5">
        <span className="text-xl font-bold text-gray-900 tracking-tight">Hintro</span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {mainNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-4 h-4", active ? "text-indigo-600" : "text-gray-400")} />
              <span className="flex-1">{item.label}</span>
              {item.trailing && (
                <item.trailing className="w-3.5 h-3.5 text-gray-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-0.5">
        {bottomNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <item.icon className="w-4 h-4 text-gray-400" />
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="pt-2">
          <button className="w-full py-2 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
