import { useState } from "react";

const dummyTickets = [
  {
    id: "TKT-1042",
    category: "Payment Issue",
    description: "My refund was not received after 7 days.",
    status: "Resolved",
    date: "May 27, 2026",
    steps: [
      { label: "Submitted", done: true },
      { label: "AI Triaged", done: true },
      { label: "Agent Assigned", done: true },
      { label: "Resolved", done: true },
    ]
  },
  {
    id: "TKT-1038",
    category: "Freelancer Problem",
    description: "Freelancer has not responded in 3 days.",
    status: "Escalated",
    date: "May 25, 2026",
    steps: [
      { label: "Submitted", done: true },
      { label: "AI Triaged", done: true },
      { label: "Agent Assigned", done: true },
      { label: "Resolved", done: false },
    ]
  },
  {
    id: "TKT-1031",
    category: "Technical Bug",
    description: "Cannot upload files to my project.",
    status: "In Progress",
    date: "May 24, 2026",
    steps: [
      { label: "Submitted", done: true },
      { label: "AI Triaged", done: true },
      { label: "Agent Assigned", done: false },
      { label: "Resolved", done: false },
    ]
  },
];

const statusColors = {
  "Open": "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Escalated": "bg-red-100 text-red-700",
  "Resolved": "bg-green-100 text-green-700",
};

function TicketTracker() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (selectedTicket) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <button
          onClick={() => setSelectedTicket(null)}
          className="text-purple-600 mb-6"
        >
          ← Back to all tickets
        </button>

        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{selectedTicket.id}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedTicket.status]}`}>
            {selectedTicket.status}
          </span>
        </div>

        <p className="text-gray-500 mt-1">
          {selectedTicket.category} · {selectedTicket.date}
        </p>
        <p className="mt-4 text-gray-800 bg-gray-50 p-4 rounded-xl">
          {selectedTicket.description}
        </p>

        {selectedTicket.status === "Escalated" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 flex gap-3">
            <span>⚠️</span>
            <p className="text-red-700 text-sm">
              Your issue has been escalated for priority handling by a senior agent.
            </p>
          </div>
        )}

        <div className="mt-6">
          <p className="font-semibold mb-4">Progress</p>
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
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
      <div className="space-y-4">
        {dummyTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className="border-2 border-gray-100 rounded-xl p-5 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-purple-700">{ticket.id}</p>
                <p className="text-sm text-gray-500 mt-1">{ticket.category}</p>
                <p className="text-gray-700 mt-2 text-sm">{ticket.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ml-4 flex-shrink-0 ${statusColors[ticket.status]}`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-3">{ticket.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketTracker;