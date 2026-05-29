// BUSTLER ADAPTER
// This file converts backend data into the format your pages need.
// Think of it like a phone charger adapter — it connects two different formats.

// Converts a single ticket from backend format to your format
export function adaptTicket(backendTicket) {
  return {
    id: backendTicket.ticket_id || backendTicket.id || "TKT-0000",
    category: adaptCategory(backendTicket.issue_type || backendTicket.category || "other"),
    description: backendTicket.description || backendTicket.message || "No description provided",
    status: adaptStatus(backendTicket.ticket_status || backendTicket.status || "open"),
    date: backendTicket.created_at
      ? new Date(backendTicket.created_at).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric"
        })
      : backendTicket.date || "Unknown date",
    urgency: backendTicket.urgency_score || backendTicket.urgency || 1,
    aiSuggestion: backendTicket.ai_suggestion || backendTicket.suggestion || null,
    steps: adaptSteps(backendTicket.ticket_status || backendTicket.status || "open"),
  };
}

// Converts a list of tickets all at once
export function adaptTickets(backendTickets) {
  if (!backendTickets || !Array.isArray(backendTickets)) return [];
  return backendTickets.map(adaptTicket);
}

// Converts backend category names to your display names
function adaptCategory(rawCategory) {
  const categoryMap = {
    "payment": "Payment Issue",
    "payment_issue": "Payment Issue",
    "billing": "Payment Issue",
    "refund": "Refund Delay",
    "refund_delay": "Refund Delay",
    "freelancer": "Freelancer Problem",
    "freelancer_problem": "Freelancer Problem",
    "technical": "Technical Bug",
    "bug": "Technical Bug",
    "technical_bug": "Technical Bug",
    "account": "Account Issue",
    "account_issue": "Account Issue",
    "other": "Other",
  };
  return categoryMap[rawCategory.toLowerCase()] || rawCategory;
}

// Converts backend status names to your display names
function adaptStatus(rawStatus) {
  const statusMap = {
    "open": "Open",
    "in_progress": "In Progress",
    "inprogress": "In Progress",
    "escalated": "Escalated",
    "resolved": "Resolved",
    "closed": "Resolved",
  };
  return statusMap[rawStatus.toLowerCase()] || "Open";
}

// Creates the progress timeline steps based on ticket status
function adaptSteps(rawStatus) {
  const status = rawStatus.toLowerCase();
  return [
    { label: "Submitted", done: true },
    { label: "AI Triaged", done: status !== "open" },
    { label: "Agent Assigned", done: status === "escalated" || status === "resolved" || status === "closed" },
    { label: "Resolved", done: status === "resolved" || status === "closed" },
  ];
}

// Converts your form data into the format the backend expects
export function adaptTicketForBackend(formData) {
  return {
    issue_type: formData.category,
    description: formData.description,
    user_id: formData.userId || "guest",
  };
}

// Converts dispute form data for the backend
export function adaptDisputeForBackend(formData) {
  return {
    dispute_type: formData.disputeType,
    description: formData.description,
    user_id: formData.userId || "guest",
  };
}