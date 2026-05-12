"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
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

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0" showCloseButton={false}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4">
            <SheetTitle className="text-xl font-bold text-gray-900 tracking-tight">Hintro</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-0.5">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", active ? "text-indigo-600" : "text-gray-400")} />
                  <span className="flex-1">{item.label}</span>
                  {item.trailing && <item.trailing className="w-3.5 h-3.5 text-gray-400" />}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-5 space-y-0.5">
            {bottomNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-4 h-4 text-gray-400" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2">
              <button className="w-full py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
