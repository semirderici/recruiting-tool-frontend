"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Search,
  FilePlus,
  EyeOff,
  Download,
  Settings,
  User,
  Building2,
  Menu,
  X,
  CheckSquare,
  CalendarClock,
  Activity,
} from "lucide-react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Kandidaten", icon: Users, href: "/candidates" },
  { name: "Jobs", icon: Briefcase, href: "/jobs" },
  { name: "Firmen", icon: Building2, href: "/companies" },
  { name: "Research", icon: Search, href: "/research" },
  { name: "Erstellung", icon: FilePlus, href: "/erstellung" },
  { name: "Anonymisierung", icon: EyeOff, href: "/anonymisierung" },
  { name: "Exporte", icon: Download, href: "/exporte" },
  { name: "Aufgaben", icon: CheckSquare, href: "/crm/tasks" },
  { name: "Interviews", icon: CalendarClock, href: "/crm/interviews" },
  { name: "Aktivitäten", icon: Activity, href: "/crm/activities" },
  { name: "Einstellungen", icon: Settings, href: "/einstellungen" },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 lg:hidden transition-opacity ${
          isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-gray-200 bg-white flex transition-transform duration-300 lg:translate-x-0 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
          <span className="text-xl font-bold tracking-tight text-blue-600">
            AITONOM Recruit
          </span>
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Check for exact match or if it's a sub-route (except for root/hash links)
              const isActive =
                item.href === pathname ||
                (item.href !== "#" &&
                  item.href !== "/" &&
                  pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                Semir Derici
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <header className="fixed top-0 left-0 right-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50"
          aria-label="Navigation öffnen"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-gray-900">
          AITONOM Recruit
        </span>
        <div className="w-8" /> {/* Placeholder for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 lg:ml-64 w-full pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
