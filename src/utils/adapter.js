const BASE_URL = "https://bustler-pulse.onrender.com";

export async function getUserContext() {
  const userId = localStorage.getItem("bustler_user_id") || "user-001";
  try {
    const response = await fetch(BASE_URL + "/tickets/context/" + userId);
    const data = await response.json();
    return {
      userId: userId,
      projectId: data.project_id || "proj-001",
      paymentStatus: data.payment_status || "pending",
      lastCategory: data.last_category || "",
    };
  } catch (error) {
    return {
      userId: userId,
      projectId: "proj-001",
      paymentStatus: "pending",
      lastCategory: "",
    };
  }
}

export async function uploadScreenshot(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(BASE_URL + "/tickets/upload-screenshot", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.screenshot_url || null;
  } catch (error) {
    return null;
  }
}

export async function createTicket(category, description, screenshotUrl) {
  const userId = localStorage.getItem("bustler_user_id") || "user-001";
  try {
    const body = {
      user_id: userId,
      project_id: "proj-001",
      payment_status: "pending",
      category: category,
      description: description,
    };
    if (screenshotUrl) {
      body.screenshot_url = screenshotUrl;
    }
    const response = await fetch(BASE_URL + "/tickets/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { success: true, ticketId: data.id || data.ticket_id };
  } catch (error) {
    const fakeId = "TKT-" + Math.floor(Math.random() * 9000 + 1000);
    return { success: false, ticketId: fakeId };
  }
}

export async function getAllTickets() {
  try {
    const response = await fetch(BASE_URL + "/tickets/");
    const data = await response.json();
    return adaptTickets(data);
  } catch (error) {
    return null;
  }
}

export async function getTicket(ticketId) {
  try {
    const response = await fetch(BASE_URL + "/tickets/" + ticketId);
    const data = await response.json();
    return adaptTicket(data);
  } catch (error) {
    return null;
  }
}

export async function getAutoReply(ticketId) {
  try {
    const response = await fetch(BASE_URL + "/tickets/" + ticketId + "/autoreply");
    const data = await response.json();
    return data.reply || data.message || null;
  } catch (error) {
    return null;
  }
}

export async function createDispute(disputeType, description, screenshotUrl) {
  const userId = localStorage.getItem("bustler_user_id") || "user-001";
  try {
    const body = {
      dispute_type: disputeType,
      description: description,
      user_id: userId,
    };
    if (screenshotUrl) {
      body.screenshot_url = screenshotUrl;
    }
    const response = await fetch(BASE_URL + "/disputes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { success: true, disputeId: data.id || data.dispute_id };
  } catch (error) {
    return { success: false, disputeId: "DSP-" + Math.floor(Math.random() * 900 + 100) };
  }
}

export function adaptTicket(backendTicket, index) {
  return {
    id: backendTicket.id || backendTicket.ticket_id || "TKT-" + index,
    category: adaptCategory(backendTicket.category || "other"),
    description: backendTicket.description || "No description",
    status: adaptStatus(backendTicket.status || "open"),
    date: backendTicket.created_at
      ? new Date(backendTicket.created_at).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric"
        })
      : "Unknown date",
    urgency: backendTicket.urgency_score || 1,
    isAngry: backendTicket.anger_flag || false,
    autoReply: backendTicket.auto_reply || null,
    priority: urgencyToPriority(backendTicket.urgency_score),
    steps: adaptSteps(backendTicket.status || "open"),
    screenshotUrl: backendTicket.screenshot_url || null,
  };
}

export function adaptTickets(backendTickets) {
  if (!backendTickets || !Array.isArray(backendTickets)) return [];
  return backendTickets.map(function(ticket, index) {
    return adaptTicket(ticket, index);
  });
}

function adaptCategory(raw) {
  const map = {
    "payment": "Payment Issue",
    "Payment Issue": "Payment Issue",
    "technical": "Technical Bug",
    "Technical Bug": "Technical Bug",
    "bug": "Technical Bug",
    "freelancer": "Freelancer Problem",
    "Freelancer Problem": "Freelancer Problem",
    "account": "Account Issue",
    "Account Issue": "Account Issue",
    "booking": "Booking Issue",
    "other": "Other",
  };
  return map[raw] || raw;
}

function adaptStatus(raw) {
  const map = {
    "open": "Open",
    "in_progress": "In Progress",
    "escalated": "Escalated",
    "resolved": "Resolved",
    "closed": "Resolved",
    "hold": "On Hold",
  };
  return map[raw] || "Open";
}

function urgencyToPriority(score) {
  if (score >= 4) return "P1";
  if (score >= 3) return "P2";
  if (score >= 2) return "P3";
  return "P4";
}

function adaptSteps(status) {
  const s = status.toLowerCase();
  return [
    { label: "Submitted", done: true },
    { label: "AI Triaged", done: true },
    { label: "Agent Assigned", done: s === "in_progress" || s === "escalated" || s === "resolved" },
    { label: "Resolved", done: s === "resolved" || s === "closed" },
  ];
}

export function adaptPriority(priority) {
  const map = {
    "P1": { label: "Critical", color: "bg-red-100 text-red-700" },
    "P2": { label: "High", color: "bg-orange-100 text-orange-700" },
    "P3": { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    "P4": { label: "Low", color: "bg-green-100 text-green-700" },
  };
  return map[priority] || { label: priority, color: "bg-gray-100 text-gray-700" };
}

export function adaptBustlerTicket(bustlerTicket, index) {
  return {
    id: "TKT-" + String(1000 + index).padStart(4, "0"),
    category: adaptCategory(bustlerTicket.bug),
    description: bustlerTicket.bug,
    status: bustlerTicket.resolvedOrNot === "Resolved" ? "Resolved" :
            bustlerTicket.status === "Hold" ? "On Hold" :
            bustlerTicket.status === "Open" ? "Open" : "In Progress",
    date: bustlerTicket.date,
    priority: bustlerTicket.priority || "P2",
    reportedBy: bustlerTicket.reportedBy,
    platform: bustlerTicket.platform,
    device: bustlerTicket.device,
    steps: adaptSteps(
      bustlerTicket.resolvedOrNot === "Resolved" ? "resolved" :
      bustlerTicket.status === "Open" ? "open" : "in_progress"
    ),
  };
}

export function adaptBustlerTickets(bustlerTickets) {
  if (!bustlerTickets || !Array.isArray(bustlerTickets)) return [];
  return bustlerTickets.map(function(ticket, index) {
    return adaptBustlerTicket(ticket, index);
  });
}