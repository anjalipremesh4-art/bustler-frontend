import { useState } from "react";
import { adaptBustlerTickets, adaptPriority } from "../utils/adapter";
import { bustlerRawTickets } from "../utils/bustlerData";

// Run real Bustler data through the adapter
const tickets = adaptBustlerTickets(bustlerRawTickets);

const statusColors = {
  "Open": "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "On Hold": "bg-orange-100 text-orange-700",
  "Resolved": "bg-green-100 text-green-700",
};

function TicketTracker() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredTickets = filter === "All"
    ? tickets
    : tickets.filter(t => t.status === filter);

  if (selectedTicket) {
    const priority = adaptPriority(selectedTicket.priority);
    return (
      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => setSelectedTicket(null)}
          className="text-purple-600 mb-6"
        >
          ← Back to all tickets
        </button>

        {/* Ticket header */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h1 className="text-2xl font-bold">{selectedTicket.id}</h1>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedTicket.status]}`}>
              {selectedTicket.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}>
              {priority.label}
            </span>
          </div>
        </div>

        {/* Ticket details */}
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p>📅 Reported: {selectedTicket.date}</p>
          <p>👤 Reported by: {selectedTicket.reportedBy}</p>
          <p>📱 Platform: {selectedTicket.platform} · {selectedTicket.device}</p>
          <p>🏷️ Category: {selectedTicket.category}</p>
        </div>

        {/* Bug description */}
        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-600 mb-1">Issue Description</p>
          <p className="text-gray-800">{selectedTicket.description}</p>
        </div>

        {/* AI triage panel */}
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-purple-800 mb-1">⚡ AI Triage Result</p>
          <p className="text-sm text-purple-700">Category detected: <strong>{selectedTicket.category}</strong></p>
          <p className="text-sm text-purple-700 mt-1">Priority: <strong>{priority.label}</strong></p>
          <p className="text-sm text-purple-700 mt-1">
            {selectedTicket.priority === "P1"
              ? "🔴 Critical issue — escalated automatically for immediate attention"
              : "🟡 Standard issue — added to the ops queue"}
          </p>
        </div>

        {/* Escalation banner for P1 unresolved */}
        {selectedTicket.priority === "P1" && selectedTicket.status !== "Resolved" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 flex gap-3">
            <span>⚠️</span>
            <p className="text-red-700 text-sm">
              This is a critical P1 issue. It has been escalated for priority handling.
            </p>
          </div>
        )}

        {/* On Hold banner */}
        {selectedTicket.status === "On Hold" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4 flex gap-3">
            <span>⏸️</span>
            <p className="text-orange-700 text-sm">
              This ticket is currently on hold pending further investigation.
            </p>
          </div>
        )}

        {/* Progress timeline */}
        <div className="mt-6">
          <p className="font-semibold mb-4">Progress Timeline</p>
          {selectedTicket.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 mb-3">
              <div className={`w-4 h-4 rounded-full flex-shrink-0 ${step.done ? "bg-purple-600" : "bg-gray-200"}`} />
              <span className={step.done ? "text-gray-800 font-medium" : "text-gray-400"}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Issue Tracker</h1>
      <p className="text-gray-500 mb-6">Real Bustler bug reports — {tickets.length} issues tracked</p>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["All", "Open", "In Progress", "On Hold", "Resolved"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-purple-100"
            }`}
          >
            {f} {f === "All" ? `(${tickets.length})` : `(${tickets.filter(t => t.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Ticket list */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const priority = adaptPriority(ticket.priority);
          return (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="border-2 border-gray-100 rounded-xl p-5 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-purple-700">{ticket.id}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priority.color}`}>
                      {priority.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{ticket.category} · {ticket.device} · Reported by {ticket.reportedBy}</p>
                  <p className="text-gray-700 mt-2 text-sm line-clamp-2">{ticket.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-3">📅 {ticket.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TicketTracker;