import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyJobs } from "@/data/jobs";
import { JobDetailView } from "@/components/detail-views/JobDetailView";
import { ArrowLeft, Building2, MapPin, Edit, Share2, MoreHorizontal } from "lucide-react";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = dummyJobs.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    Offen: "bg-green-100 text-green-700",
    "In Bearbeitung": "bg-blue-100 text-blue-700",
    Besetzt: "bg-gray-100 text-gray-700",
    "On Hold": "bg-orange-100 text-orange-700",
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Liste
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[job.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Edit className="h-4 w-4" />
                Bearbeiten
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                <Share2 className="h-4 w-4" />
                Teilen
              </button>
              <button className="flex items-center justify-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:text-gray-600 hover:bg-gray-50">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Client View for Tabs */}
        <JobDetailView job={job} />
      </div>
    </SidebarLayout>
  );
}
