import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { AlertOctagon } from "lucide-react";

export default function NotFound() {
  return (
    <SidebarLayout>
      <div className="flex h-[80vh] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertOctagon className="h-10 w-10" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          404 - Seite nicht gefunden
        </h1>
        <p className="mb-8 max-w-md text-gray-600">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
          Überprüfe die URL oder kehre zum Dashboard zurück.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Zurück zum Dashboard
        </Link>
      </div>
    </SidebarLayout>
  );
}

