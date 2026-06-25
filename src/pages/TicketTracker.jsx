import { useState, useEffect } from "react";
import { adaptBustlerTickets, adaptPriority, getAllTickets } from "../utils/adapter";
import { bustlerRawTickets } from "../utils/bustlerData";

const allTickets = adaptBustlerTickets(bustlerRawTickets);

const statusStyles = {
  "Open": { backgroundColor: "#FFF3E0", color: "#E65100" },
  "In Progress": { backgroundColor: "#E3F2FD", color: "#1565C0" },
  "On Hold": { backgroundColor: "#FFF3E0", color: "#E65100" },
  "Resolved": { backgroundColor: "#E8F5E9", color: "#2E7D32" },
};

function parseDate(d) {
  if (!d) return 0;
  const parts = d.split("/");
  if (parts.length === 3) {
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
  }
  const t = new Date(d).getTime();
  return isNaN(t) ? 0 : t;
}

function TicketTracker() {
  const [tickets, setTickets] = useState(allTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(function() {
    getAllTickets().then(function(data) {
      if (data && data.length > 0) {
        const sorted = data.slice().sort(function(a, b) {
          const dateDiff = parseDate(b.date) - parseDate(a.date);
          if (dateDiff !== 0) return dateDiff;
          return parseInt(b.id) - parseInt(a.id);
        });
        setTickets(sorted);
      }
    });
  }, []);

  const filteredTickets = tickets.filter(function(t) {
    const matchesFilter = filter === "All" || t.status === filter;
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (selectedTicket) {
    const priority = adaptPriority(selectedTicket.priority);
    return (
      <div style={{ backgroundColor: "#F5F5F5" }} className="min-h-screen">
        <div style={{ background: "linear-gradient(135deg, #00897B 0%, #00695C 100%)" }} className="text-white px-8 py-6">
          <button
            onClick={function() { setSelectedTicket(null); }}
            className="text-sm font-medium mb-4 flex items-center gap-1"
            style={{ color: "#B2DFDB" }}
          >
            Back to all tickets
          </button>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h1 className="text-2xl font-bold">{selectedTicket.id}</h1>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white" style={{ color: "#00897B" }}>
                {selectedTicket.status}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={priority.color ? { backgroundColor: "rgba(255,255,255,0.2)", color: "white" } : {}}>
                {priority.label}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-8 py-6">
          <div className="bg-white rounded-xl p-4 mb-4 border-2" style={{ borderColor: "#EEEEEE" }}>
            <div className="space-y-1 text-sm" style={{ color: "#9E9E9E" }}>
              {selectedTicket.date && <p>Reported: {selectedTicket.date}</p>}
              {selectedTicket.reportedBy && <p>Reported by: {selectedTicket.reportedBy}</p>}
              {selectedTicket.platform && <p>Platform: {selectedTicket.platform} · {selectedTicket.device}</p>}
              <p>Category: {selectedTicket.category}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 border-2" style={{ borderColor: "#EEEEEE" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#616161" }}>Issue Description</p>
            <p style={{ color: "#212121" }}>{selectedTicket.description}</p>
          </div>

          <div className="rounded-xl p-4 mb-4 border" style={{ backgroundColor: "#E0F2F1", borderColor: "#80CBC4" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "#00695C" }}>AI Triage Result</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs" style={{ color: "#9E9E9E" }}>Category</p>
                <p className="font-semibold text-sm mt-0.5" style={{ color: "#212121" }}>{selectedTicket.category}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs" style={{ color: "#9E9E9E" }}>Priority</p>
                <p className="font-semibold text-sm mt-0.5" style={{ color: "#00897B" }}>{priority.label}</p>
              </div>
            </div>
          </div>

          {selectedTicket.priority === "P1" && selectedTicket.status !== "Resolved" && (
            <div className="rounded-xl p-4 mb-4 flex gap-3 border" style={{ backgroundColor: "#FFEBEE", borderColor: "#FFCDD2" }}>
              <span>⚠️</span>
              <p className="text-sm" style={{ color: "#B71C1C" }}>This is a critical P1 issue. It has been escalated for priority handling.</p>
            </div>
          )}

          {selectedTicket.status === "On Hold" && (
            <div className="rounded-xl p-4 mb-4 flex gap-3 border" style={{ backgroundColor: "#FFF3E0", borderColor: "#FFE082" }}>
              <span>⏸️</span>
              <p className="text-sm" style={{ color: "#E65100" }}>This ticket is currently on hold pending further investigation.</p>
            </div>
          )}

          <div className="bg-white rounded-xl p-5 mb-4 border-2" style={{ borderColor: "#EEEEEE" }}>
            <p className="font-semibold mb-4" style={{ color: "#212121" }}>Progress Timeline</p>
            {selectedTicket.steps.map(function(step, i) {
              return (
                <div key={i} className="flex items-center gap-4 mb-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: step.done ? "#00897B" : "#EEEEEE" }} />
                  <span className="text-sm" style={{ color: step.done ? "#212121" : "#BDBDBD", fontWeight: step.done ? "600" : "400" }}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {selectedTicket.status === "Resolved" && (
            <div className="rounded-xl p-5 text-center border-2" style={{ backgroundColor: "#E0F2F1", borderColor: "#80CBC4" }}>
              <div className="text-4xl mb-2">🏅</div>
              <p className="font-bold" style={{ color: "#00695C" }}>Supported by Bustler</p>
              <p className="text-sm mt-1" style={{ color: "#00897B" }}>
                This issue was successfully resolved by the Bustler support team.
              </p>
              
              <a  href="/survey"
                className="inline-block mt-4 text-white px-6 py-2 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: "#00897B" }}
              >
                Rate your experience
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F5F5F5" }} className="min-h-screen">
      <div style={{ background: "linear-gradient(135deg, #00897B 0%, #00695C 100%)" }} className="text-white px-8 py-10 text-center">
        <h1 className="text-3xl font-bold">Issue Tracker</h1>
        <p className="mt-2 text-sm" style={{ color: "#B2DFDB" }}>{tickets.length} real Bustler bug reports tracked</p>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-8">
        <input
          className="w-full border-2 rounded-xl py-3 px-4 mb-4 text-sm focus:outline-none bg-white"
          style={{ borderColor: "#EEEEEE", color: "#212121" }}
          placeholder="Search by description, ID, or category..."
          value={search}
          onChange={function(e) { setSearch(e.target.value); }}
          onFocus={function(e) { e.target.style.borderColor = "#00897B"; }}
          onBlur={function(e) { e.target.style.borderColor = "#EEEEEE"; }}
        />

        <div className="flex gap-2 flex-wrap mb-6">
          {["All", "Open", "In Progress", "On Hold", "Resolved"].map(function(f) {
            return (
              <button
                key={f}
                onClick={function() { setFilter(f); }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all border-2"
                style={filter === f
                  ? { backgroundColor: "#00897B", color: "white", borderColor: "#00897B" }
                  : { backgroundColor: "white", color: "#616161", borderColor: "#EEEEEE" }
                }
              >
                {f} ({f === "All" ? tickets.length : tickets.filter(function(t) { return t.status === f; }).length})
              </button>
            );
          })}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-8 bg-white rounded-xl border-2" style={{ borderColor: "#EEEEEE" }}>
            <p style={{ color: "#9E9E9E" }}>No tickets found</p>
            <p className="text-sm mt-1" style={{ color: "#BDBDBD" }}>Try a different search or filter</p>
          </div>
        )}

        <div className="space-y-4">
          {filteredTickets.map(function(ticket) {
            const priority = adaptPriority(ticket.priority);
            return (
              <div
                key={ticket.id}
                onClick={function() { setSelectedTicket(ticket); }}
                className="bg-white border-2 rounded-xl p-5 cursor-pointer transition-all"
                style={{ borderColor: "#EEEEEE" }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#00897B"; e.currentTarget.style.backgroundColor = "#E0F2F1"; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#EEEEEE"; e.currentTarget.style.backgroundColor = "white"; }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold" style={{ color: "#00897B" }}>{ticket.id}</p>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={priority.color ? { backgroundColor: "#E0F2F1", color: "#00897B" } : {}}>
                        {priority.label}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#9E9E9E" }}>
                      {ticket.category}
                      {ticket.device ? ` · ${ticket.device}` : ""}
                      {ticket.reportedBy ? ` · ${ticket.reportedBy}` : ""}
                    </p>
                    <p className="mt-2 text-sm" style={{ color: "#424242" }}>{ticket.description}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium flex-shrink-0" style={statusStyles[ticket.status] || { backgroundColor: "#EEEEEE", color: "#616161" }}>
                    {ticket.status}
                  </span>
                </div>
                {ticket.date && (
                  <p className="text-xs mt-3" style={{ color: "#BDBDBD" }}>{ticket.date}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TicketTracker;