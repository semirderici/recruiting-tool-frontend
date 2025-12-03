import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyCandidates } from "@/data/candidates";
import { CandidateDetailView } from "@/components/detail-views/CandidateDetailView";
import { ArrowLeft, Edit, Download, MoreHorizontal } from "lucide-react";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = dummyCandidates.find((c) => c.id === id);

  if (!candidate) {
    notFound();
  }

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/candidates"
            className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Liste
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-600">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {candidate.name}
                </h1>
                <p className="text-gray-500">{candidate.role}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {candidate.status}
                  </span>
                  {candidate.bestMatchScore && (
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        candidate.bestMatchScore >= 85
                          ? "bg-green-100 text-green-800"
                          : candidate.bestMatchScore >= 50
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Match: {candidate.bestMatchScore}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Edit className="h-4 w-4" />
                Bearbeiten
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                <Download className="h-4 w-4" />
                CV Download
              </button>
              <button className="flex items-center justify-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:text-gray-600 hover:bg-gray-50">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Client View for Tabs */}
        <CandidateDetailView candidate={candidate} />
      </div>
    </SidebarLayout>
  );
}
