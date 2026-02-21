"use client";

import { useState } from "react";
import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

type Member = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  joinedDate: string;
  status: "Active" | "Pending";
};

type SharedResource = {
  id: string;
  name: string;
  type: "Question Bank" | "Format";
  subject: string;
  owner: string;
  sharedDate: string;
};

const teamMembers: Member[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "Owner",
    joinedDate: "Jan 15, 2026",
    status: "Active",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "m.chen@university.edu",
    role: "Admin",
    joinedDate: "Jan 16, 2026",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.r@university.edu",
    role: "Member",
    joinedDate: "Jan 20, 2026",
    status: "Active",
  },
  {
    id: "4",
    name: "Prof. James Williams",
    email: "j.williams@university.edu",
    role: "Member",
    joinedDate: "Jan 25, 2026",
    status: "Active",
  },
  {
    id: "5",
    name: "Dr. Lisa Park",
    email: "lisa.park@university.edu",
    role: "Member",
    joinedDate: "Feb 1, 2026",
    status: "Active",
  },
  {
    id: "6",
    name: "Prof. David Brown",
    email: "d.brown@university.edu",
    role: "Member",
    joinedDate: "Feb 5, 2026",
    status: "Pending",
  },
];

const sharedResources: SharedResource[] = [
  {
    id: "1",
    name: "Biology Question Bank",
    type: "Question Bank",
    subject: "Biology",
    owner: "Dr. Sarah Johnson",
    sharedDate: "Jan 20, 2026",
  },
  {
    id: "2",
    name: "Genetics Quiz Format",
    type: "Format",
    subject: "Biology",
    owner: "Prof. Michael Chen",
    sharedDate: "Jan 22, 2026",
  },
  {
    id: "3",
    name: "Cell Biology Questions",
    type: "Question Bank",
    subject: "Biology",
    owner: "Dr. Emily Rodriguez",
    sharedDate: "Jan 28, 2026",
  },
  {
    id: "4",
    name: "Midterm Exam Template",
    type: "Format",
    subject: "Biology",
    owner: "Dr. Sarah Johnson",
    sharedDate: "Feb 2, 2026",
  },
  {
    id: "5",
    name: "Ecology Assessment Bank",
    type: "Question Bank",
    subject: "Biology",
    owner: "Prof. James Williams",
    sharedDate: "Feb 8, 2026",
  },
];

export default function TeamManagementPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"members" | "resources" | "settings">("members");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamName = "Biology Department";
  const joinCode = "BIO2024XY";

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/teams" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600">
              ← Back to teams
            </Link>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 font-display">{teamName}</h1>
            <p className="mt-2 text-base text-slate-600">
              Manage team members, shared resources, and collaboration settings
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Invite members
          </button>
        </header>

        {/* Tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === "members"
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Members ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === "resources"
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Shared Resources ({sharedResources.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === "settings"
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <section className="mt-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{member.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{member.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              member.role === "Owner"
                                ? "bg-slate-900 text-white"
                                : member.role === "Admin"
                                ? "bg-slate-700 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              member.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{member.joinedDate}</td>
                        <td className="px-6 py-4">
                          {member.role !== "Owner" && (
                            <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                              Manage
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <section className="mt-6 space-y-8">
            {/* Question Banks Section */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Question Banks</h3>
                  <p className="text-sm text-slate-600">
                    Shared question collections ({sharedResources.filter((r) => r.type === "Question Bank").length})
                  </p>
                </div>
                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                  Share question bank
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {sharedResources
                  .filter((resource) => resource.type === "Question Bank")
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className="group flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{resource.name}</h3>
                          <p className="mt-1 text-xs text-slate-500">by {resource.owner}</p>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Question Bank
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          {resource.subject}
                        </span>
                        <span className="text-xs text-slate-400">Shared {resource.sharedDate}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                          View
                        </button>
                        <button className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Built Formats Section */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Built Formats</h3>
                  <p className="text-sm text-slate-600">
                    Shared assessment templates ({sharedResources.filter((r) => r.type === "Format").length})
                  </p>
                </div>
                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                  Share format
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {sharedResources
                  .filter((resource) => resource.type === "Format")
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className="group flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{resource.name}</h3>
                          <p className="mt-1 text-xs text-slate-500">by {resource.owner}</p>
                        </div>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                          Format
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          {resource.subject}
                        </span>
                        <span className="text-xs text-slate-400">Shared {resource.sharedDate}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                          View
                        </button>
                        <button className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <section className="mt-6 space-y-6">
            {/* Team Info */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Team Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Team Name</label>
                  <input
                    type="text"
                    defaultValue={teamName}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Subject Area</label>
                  <input
                    type="text"
                    defaultValue="Biology"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    rows={3}
                    defaultValue="Collaborative space for Biology faculty to share resources and assessments."
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Save changes
                </button>
              </div>
            </div>

            {/* Join Code */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Join Code</h3>
              <p className="mt-2 text-sm text-slate-600">Share this code with colleagues to invite them to the team</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <code className="flex-1 text-center text-xl font-bold tracking-wider text-slate-900">{joinCode}</code>
                <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
                  Copy
                </button>
                <button className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400">
                  Regenerate
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Team Permissions</h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Members can share question banks</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Members can share assessment formats</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Require admin approval for new members</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Allow members to invite others</span>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
              <p className="mt-2 text-sm text-red-700">These actions are irreversible</p>
              <div className="mt-4 flex gap-3">
                <button className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                  Leave team
                </button>
                <button className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                  Delete team
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Invite to {teamName}</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Invite via email</label>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="email"
                      placeholder="colleague@university.edu"
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                    />
                    <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                      Send
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-slate-500">Or share code</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Team join code</label>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <code className="flex-1 text-center text-xl font-bold tracking-wider text-slate-900">{joinCode}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(joinCode)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
