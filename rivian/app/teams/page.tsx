"use client";

import { useState } from "react";
import Link from "next/link";

import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

type Team = {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  role: "Owner" | "Admin" | "Member";
  joinCode: string;
  sharedQuestionBanks: number;
  sharedFormats: number;
  createdDate: string;
};

const myTeams: Team[] = [
  {
    id: "team-1",
    name: "Biology Department",
    subject: "Biology",
    memberCount: 8,
    role: "Owner",
    joinCode: "BIO2024XY",
    sharedQuestionBanks: 3,
    sharedFormats: 12,
    createdDate: "Jan 15, 2026",
  },
  {
    id: "team-2",
    name: "Economics Faculty",
    subject: "Economics",
    memberCount: 5,
    role: "Admin",
    joinCode: "ECO2024AB",
    sharedQuestionBanks: 2,
    sharedFormats: 8,
    createdDate: "Feb 3, 2026",
  },
  {
    id: "team-3",
    name: "Science Educators Network",
    subject: "Multi-subject",
    memberCount: 15,
    role: "Member",
    joinCode: "SCI2024MN",
    sharedQuestionBanks: 5,
    sharedFormats: 20,
    createdDate: "Dec 10, 2025",
  },
];

export default function TeamsPage() {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="min-h-screen page-shell text-slate-900">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Collaboration</p>
            <h1 className="text-3xl font-semibold text-slate-900 font-display">My Teams</h1>
            <p className="mt-2 text-base text-slate-600">
              Collaborate with colleagues, share question banks, and build assessments together.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowJoinTeam(true)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Join team
            </button>
            <button
              onClick={() => setShowCreateTeam(true)}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Create team
            </button>
          </div>
        </header>

        {/* Teams Grid */}
        <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myTeams.map((team) => (
            <div
              key={team.id}
              className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900">{team.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{team.subject}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    team.role === "Owner"
                      ? "bg-slate-900 text-white"
                      : team.role === "Admin"
                      ? "bg-slate-700 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {team.role}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>{team.memberCount} members</span>
                </div>
              </div>

              <div className="flex gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  {team.sharedQuestionBanks} question banks
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  {team.sharedFormats} formats
                </span>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedTeam(team);
                    setShowInviteModal(true);
                  }}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Invite
                </button>
                <Link
                  href={`/teams/${team.id}`}
                  className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Manage
                </Link>
              </div>

              <p className="text-xs text-slate-400">Created {team.createdDate}</p>
            </div>
          ))}
        </section>

        {/* Create Team Modal */}
        {showCreateTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Create new team</h2>
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Team name</label>
                  <input
                    type="text"
                    placeholder="e.g., Biology Department 2026"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Subject area</label>
                  <input
                    type="text"
                    placeholder="e.g., Biology, Economics, Multi-subject"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Description (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the purpose of this team..."
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateTeam(false)}
                    className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Create team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Join Team Modal */}
        {showJoinTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Join a team</h2>
                <button
                  onClick={() => setShowJoinTeam(false)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                Enter the join code provided by your team administrator to request access.
              </p>

              <form className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Team join code</label>
                  <input
                    type="text"
                    placeholder="e.g., BIO2024XY"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-center text-lg font-semibold uppercase tracking-wider text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowJoinTeam(false)}
                    className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Request to join
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && selectedTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Invite to {selectedTeam.name}</h2>
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setSelectedTeam(null);
                  }}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Email Invite */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Invite via email</label>
                  <p className="mt-1 text-xs text-slate-500">Send an invitation link to colleagues</p>
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

                {/* Join Code */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Team join code</label>
                  <p className="mt-1 text-xs text-slate-500">Share this code with teachers you want to invite</p>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <code className="flex-1 text-center text-xl font-bold tracking-wider text-slate-900">
                      {selectedTeam.joinCode}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedTeam.joinCode);
                      }}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-700">Access permissions</p>
                  <p className="mt-1 text-xs text-slate-600">
                    New members will be able to view and use shared question banks and assessment formats. They can
                    also contribute their own resources to the team.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setSelectedTeam(null);
                  }}
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
