import React from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, subtitle, children }: DashboardCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

