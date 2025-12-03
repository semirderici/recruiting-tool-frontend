"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { CompanyCard } from "@/components/CompanyCard";
import { dummyCompanies } from "@/data/companies";
import { Search, Plus } from "lucide-react";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = dummyCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Firmen</h1>
            <p className="mt-1 text-sm text-gray-500">
              Verwalte Partnerunternehmen und Mandanten.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Firma hinzufügen
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Firma suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}

          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              Keine Firmen gefunden.
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

