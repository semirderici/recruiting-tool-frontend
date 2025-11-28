"use client";

import React from "react";
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
} from "lucide-react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Kandidaten", icon: Users, href: "/candidates" },
  { name: "Jobs & Firmen", icon: Briefcase, href: "/jobs" },
  { name: "Research", icon: Search, href: "/research" },
  { name: "Erstellung", icon: FilePlus, href: "/erstellung" },
  { name: "Anonymisierung", icon: EyeOff, href: "/anonymisierung" },
  { name: "Exporte", icon: Download, href: "/exporte" },
  { name: "Einstellungen", icon: Settings, href: "/einstellungen" },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-64 flex-col border-r border-gray-200 bg-white flex">
        {/* Logo Area */}
        <div className="flex h-16 items-center border-b border-gray-100 px-6">
          <span className="text-xl font-bold tracking-tight text-blue-600">
            AITONOM Recruit
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Check for exact match or if it's a sub-route (except for root/hash links)
              const isActive = 
                item.href === pathname || 
                (item.href !== "#" && item.href !== "/" && pathname.startsWith(item.href));
                
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
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

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
