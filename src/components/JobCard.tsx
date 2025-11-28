import React from "react";
import { Job } from "@/types/job";
import { MapPin, Building2, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: Job;
}

const statusColors: Record<string, string> = {
  Offen: "bg-green-100 text-green-700",
  "In Bearbeitung": "bg-blue-100 text-blue-700",
  Besetzt: "bg-gray-100 text-gray-700",
  "On Hold": "bg-orange-100 text-orange-700",
};

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[job.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      {/* Company & Location */}
      <div className="mb-4 space-y-1.5">
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="mr-2 h-4 w-4 text-gray-400" />
          <span className="font-medium">{job.company}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4 text-gray-400" />
          {job.location}
        </div>
      </div>

      {/* Match Score */}
      <div className="mb-4 text-sm font-medium text-gray-900">
        Bester Match-Score:{" "}
        <span
          className={
            job.bestMatchScore > 85
              ? "text-green-600"
              : job.bestMatchScore >= 50
              ? "text-yellow-600"
              : "text-red-600"
          }
        >
          {job.bestMatchScore}
        </span>
      </div>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Action */}
      <div className="mt-auto flex justify-end">
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
          Details <ExternalLink className="ml-1 h-3 w-3" />
        </button>
      </div>
    </div>
  );
}


