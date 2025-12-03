import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyCompanies } from "@/data/companies";
import { CompanyDetailView } from "@/components/detail-views/CompanyDetailView";
import { ArrowLeft, Globe, ExternalLink, MoreHorizontal, Edit } from "lucide-react";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = dummyCompanies.find((c) => c.id === id);

  if (!company) {
    notFound();
  }

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/companies"
            className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Liste
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.name}
                </h1>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Partner
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>{company.location}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>{company.industry}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>{company.size}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Globe className="h-4 w-4" />
                Website öffnen
                <ExternalLink className="h-3 w-3" />
              </a>
              <button className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                <Edit className="h-4 w-4" />
                Bearbeiten
              </button>
              <button className="flex items-center justify-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:text-gray-600 hover:bg-gray-50">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Client View for Tabs */}
        <CompanyDetailView company={company} />
      </div>
    </SidebarLayout>
  );
}
