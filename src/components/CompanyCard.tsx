import React from "react";
import Link from "next/link";
import { Company } from "@/types/company";
import { MapPin, Users, Globe, ExternalLink } from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {company.industry}
        </span>
      </div>

      {/* Info */}
      <div className="mb-4 space-y-1.5">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
          {company.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-2 h-4 w-4 text-gray-400" />
          {company.size}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Globe className="mr-2 h-4 w-4 text-gray-400" />
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Website
          </a>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="line-clamp-2 text-sm text-gray-500">
          {company.description}
        </p>
      </div>

      {/* Footer / Action */}
      <div className="mt-auto flex justify-end">
        <Link
          href={`/companies/${company.id}`}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Details <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}


