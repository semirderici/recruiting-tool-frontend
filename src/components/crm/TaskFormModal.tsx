"use client";

import React, { useState, useEffect } from "react";
import { CrmTaskType, CrmTaskRelationType, CrmTaskPriority } from "@/types/crm";
import { X, AlertCircle } from "lucide-react";

export interface TaskFormValues {
  title: string;
  description?: string;
  type: CrmTaskType;
  relatedToType: CrmTaskRelationType;
  relatedToName: string;
  dueDate: string;
  priority: CrmTaskPriority;
  owner: string;
  notes?: string;
}

interface TaskFormModalProps {
  open: boolean;
  initialType?: CrmTaskType;
  onClose: () => void;
  onSave: (values: TaskFormValues) => void;
}

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  type: "general",
  relatedToType: "candidate",
  relatedToName: "",
  dueDate: new Date().toISOString().split("T")[0],
  priority: "medium",
  owner: "Semir Derici",
  notes: "",
};

export function TaskFormModal({
  open,
  initialType,
  onClose,
  onSave,
}: TaskFormModalProps) {
  const [values, setValues] = useState<TaskFormValues>(defaultValues);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setValues({
        ...defaultValues,
        type: initialType || "general",
      });
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialType]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!values.title.trim() || !values.relatedToName.trim() || !values.dueDate || !values.owner.trim()) {
      setError("Bitte fülle alle Pflichtfelder aus.");
      return;
    }

    onSave(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialType === "interview"
              ? "Neues Interview planen"
              : "Neue Aufgabe erstellen"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Titel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="z. B. Erstgespräch führen"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Beschreibung
              </label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                rows={2}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Details zur Aufgabe..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Typ
                </label>
                <select
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  disabled={!!initialType}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="general">Allgemein</option>
                  <option value="interview">Interview</option>
                  <option value="follow_up">Follow-up</option>
                  <option value="client_call">Kunden-Call</option>
                  <option value="offer">Angebot</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Fällig am <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={values.dueDate}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Related To Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Zugehörig zu
                </label>
                <select
                  name="relatedToType"
                  value={values.relatedToType}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="candidate">Kandidat</option>
                  <option value="job">Job</option>
                  <option value="company">Firma</option>
                </select>
              </div>

              {/* Related To Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name des Bezugs <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="relatedToName"
                  value={values.relatedToName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="z. B. Max Mustermann"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Priority */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Priorität
                </label>
                <select
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="low">Niedrig</option>
                  <option value="medium">Mittel</option>
                  <option value="high">Hoch</option>
                </select>
              </div>

              {/* Owner */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Owner <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="owner"
                  value={values.owner}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Notizen
              </label>
              <textarea
                name="notes"
                value={values.notes}
                onChange={handleChange}
                rows={2}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Interne Notizen..."
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            form="task-form"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}

