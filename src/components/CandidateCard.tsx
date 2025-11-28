import React from "react";
import { Candidate } from "@/types/candidate";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
}

const statusColors: Record<string, string> = {
  Neu: "bg-blue-100 text-blue-700",
  "In Kontakt": "bg-yellow-100 text-yellow-700",
  Vorgeschlagen: "bg-purple-100 text-purple-700",
  Platziert: "bg-green-100 text-green-700",
  Archiviert: "bg-gray-100 text-gray-700",
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600">
          {initials}
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[candidate.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {candidate.status}
        </span>
      </div>

      {/* Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
        <p className="text-sm text-gray-500">{candidate.role}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1.5 h-4 w-4 text-gray-400" />
          {candidate.location}
        </div>
      </div>

      {/* Contact */}
      <div className="mb-4 space-y-1.5 border-t border-gray-100 pt-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="mr-2 h-3.5 w-3.5 text-gray-400" />
          <span className="truncate">{candidate.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="mr-2 h-3.5 w-3.5 text-gray-400" />
          {candidate.phone}
        </div>
      </div>

      {/* Score */}
      {candidate.bestMatchScore && (
        <div className="mb-4 text-sm font-medium text-gray-900">
          Bester Match-Score:{" "}
          <span
            className={
              candidate.bestMatchScore >= 85
                ? "text-green-600"
                : candidate.bestMatchScore >= 50
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {candidate.bestMatchScore}
          </span>
        </div>
      )}

      {/* Skills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {candidate.topSkills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >
            {skill}
          </span>
        ))}
        {candidate.topSkills.length > 3 && (
          <span className="rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            +{candidate.topSkills.length - 3}
          </span>
        )}
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


