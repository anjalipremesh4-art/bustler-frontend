// BUSTLER ADAPTER
// This reads Bustler's bug report format and converts it into
// the format your pages understand — like a phone charger adapter.

// This is Bustler's real data format from their spreadsheet:
// { date, platform, device, bug, attachment, reportedBy, status, priority, resolvedOrNot }
// Your pages need:
// { id, category, description, status, date, priority, reportedBy, device, steps }

export function adaptBustlerTicket(bustlerTicket, index) {
  return {
    id: "TKT-" + String(1000 + index).padStart(4, "0"),
    category: adaptCategory(bustlerTicket.bug),
    description: bustlerTicket.bug,
    status: adaptStatus(bustlerTicket.status, bustlerTicket.resolvedOrNot),
    date: bustlerTicket.date,
    priority: bustlerTicket.priority || "P2",
    reportedBy: bustlerTicket.reportedBy,
    platform: bustlerTicket.platform,
    device: bustlerTicket.device,
    attachment: bustlerTicket.attachment,
    steps: adaptSteps(bustlerTicket.status, bustlerTicket.resolvedOrNot),
  };
}

export function adaptBustlerTickets(bustlerTickets) {
  if (!bustlerTickets || !Array.isArray(bustlerTickets)) return [];
  return bustlerTickets.map((ticket, index) => adaptBustlerTicket(ticket, index));
}

// Reads the bug description and guesses the category
function adaptCategory(bugDescription) {
  const desc = bugDescription.toLowerCase();
  if (desc.includes("payment") || desc.includes("advance payment")) return "Payment Issue";
  if (desc.includes("crash") || desc.includes("crashed")) return "Technical Bug";
  if (desc.includes("notification")) return "Technical Bug";
  if (desc.includes("login") || desc.includes("sign-up") || desc.includes("last name")) return "Account Issue";
  if (desc.includes("booking") || desc.includes("time slot")) return "Booking Issue";
  if (desc.includes("refresh") || desc.includes("page")) return "Technical Bug";
  if (desc.includes("favourite") || desc.includes("category")) return "Technical Bug";
  return "Technical Bug";
}

// Converts Bustler's status words to your status badges
function adaptStatus(status, resolvedOrNot) {
  if (resolvedOrNot === "Resolved") return "Resolved";
  if (status === "Completed" && resolvedOrNot === "Not") return "In Progress";
  if (status === "Hold") return "On Hold";
  if (status === "Open") return "Open";
  if (status === "Completed") return "Resolved";
  return "Open";
}

// Creates the progress timeline based on status
function adaptSteps(status, resolvedOrNot) {
  const isResolved = resolvedOrNot === "Resolved";
  const isCompleted = status === "Completed";
  const isOpen = status === "Open";
  const isHold = status === "Hold";

  return [
    { label: "Reported", done: true },
    { label: "AI Triaged", done: true },
    { label: "Agent Assigned", done: !isOpen },
    { label: "Resolved", done: isResolved },
  ];
}

// Converts priority codes to readable labels with colors
export function adaptPriority(priority) {
  const priorityMap = {
    "P1": { label: "Critical", color: "bg-red-100 text-red-700" },
    "P2": { label: "High", color: "bg-orange-100 text-orange-700" },
    "P3": { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    "P4": { label: "Low", color: "bg-green-100 text-green-700" },
  };
  return priorityMap[priority] || { label: priority, color: "bg-gray-100 text-gray-700" };
}