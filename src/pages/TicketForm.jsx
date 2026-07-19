import { useState, useEffect } from "react";
import { createTicket, getUserContext, getUserOrders, uploadScreenshot } from "../utils/adapter";

const categories = [
  { label: "Payment Issue", value: "payment", icon: "💳", desc: "Refunds, failed payments, billing" },
  { label: "Technical Bug", value: "technical", icon: "🐛", desc: "App crashes, errors, glitches" },
  { label: "Freelancer Problem", value: "quality", icon: "👤", desc: "Unresponsive, quality issues" },
  { label: "Booking Issue", value: "delivery", icon: "📅", desc: "Time slots, scheduling problems" },
  { label: "Account Issue", value: "account", icon: "🔐", desc: "Login, signup, profile problems" },
  { label: "Other", value: "other", icon: "❓", desc: "Something else entirely" },
];

const smartSuggestions = [
  { keyword: "refund", tip: "Refunds usually take 5 to 7 business days to process." },
  { keyword: "payment", tip: "Check if your payment method is verified in account settings." },
  { keyword: "crash", tip: "Try closing and reopening the app. This fixes most crash issues." },
  { keyword: "freelancer", tip: "Try sending a direct message to the freelancer first." },
  { keyword: "login", tip: "Try the Forgot Password option on the login screen." },
  { keyword: "notification", tip: "Check that notifications are enabled in your phone settings." },
  { keyword: "booking", tip: "After booking, refresh the app to see updated time slots." },
];

function TicketForm() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [context, setContext] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotName, setScreenshotName] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const userName = localStorage.getItem("bustler_user_name") || "User";

  useEffect(function() {
    getUserContext().then(function(data) {
      setContext(data);
    });
  }, []);

  useEffect(function() {
    getUserOrders().then(function(data) {
      setOrders(data);
      setLoadingOrders(false);
    });
  }, []);

  const match = smartSuggestions.find(function(s) {
    return description.toLowerCase().includes(s.keyword);
  });

  async function handleSubmit() {
    setIsSubmitting(true);
    let screenshotUrl = null;
    if (screenshotFile) {
      screenshotUrl = await uploadScreenshot(screenshotFile);
    }
    const result = await createTicket(
      selectedCategory.value,
      description,
      screenshotUrl,
      selectedOrder
    );
    setTicketId(result.ticketId);
    setIsSubmitting(false);
    setStep(5);
  }

  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen">

      <div style={{background:"linear-gradient(135deg, #00897B 0%, #00695C 100%)"}} className="text-white px-8 py-6">
        <h1 className="text-2xl font-bold">Submit a Support Ticket</h1>
        <p className="text-sm mt-1" style={{color:"#B2DFDB"}}>Hello {userName} — our AI will analyze your issue instantly</p>
      </div>

      {step > 0 && step < 5 && (
        <div className="bg-white border-b" style={{borderColor:"#EEEEEE"}}>
          <div className="max-w-2xl mx-auto px-8 py-3 flex items-center gap-3 flex-wrap">
            {["Order","Category","Describe","Review"].map(function(label, i) {
              const stepNum = i + 1;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: step > stepNum ? "#43A047" : step === stepNum ? "#00897B" : "#EEEEEE",
                      color: step >= stepNum ? "white" : "#9E9E9E"
                    }}
                  >
                    {step > stepNum ? "✓" : stepNum}
                  </div>
                  <span className="text-sm" style={{color: step === stepNum ? "#00897B" : "#9E9E9E", fontWeight: step === stepNum ? "600" : "400"}}>
                    {label}
                  </span>
                  {i < 3 && <div className="h-0.5 w-6" style={{backgroundColor: step > stepNum ? "#43A047" : "#EEEEEE"}} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-8">

        {step === 0 && (
          <div>
            <h2 className="text-lg font-bold mb-1" style={{color:"#212121"}}>Which order is this about?</h2>
            <p className="text-sm mb-4" style={{color:"#9E9E9E"}}>Select a recent order so we can attach its details automatically</p>

            {loadingOrders && (
              <div className="flex items-center gap-2 text-sm py-6" style={{color:"#9E9E9E"}}>
                <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{borderColor:"#00897B"}}></div>
                Loading your recent orders...
              </div>
            )}

            {!loadingOrders && orders.length === 0 && (
              <div className="rounded-xl p-4 mb-4 border" style={{backgroundColor:"#FFF3E0",borderColor:"#FFE082"}}>
                <p className="text-sm" style={{color:"#E65100"}}>No recent orders found. You can still continue without selecting one.</p>
              </div>
            )}

            {!loadingOrders && orders.map(function(order) {
              const isSelected = selectedOrder && selectedOrder.order_id === order.order_id;
              return (
                <button
                  key={order.order_id}
                  onClick={function() { setSelectedOrder(order); }}
                  className="w-full text-left p-4 border-2 rounded-xl mb-3 bg-white transition-all"
                  style={{borderColor: isSelected ? "#00897B" : "#EEEEEE", backgroundColor: isSelected ? "#E0F2F1" : "white"}}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm" style={{color:"#212121"}}>{order.project_name}</p>
                      <p className="text-xs mt-1" style={{color:"#9E9E9E"}}>
                        {order.order_id} · {order.freelancer_name} · ₹{order.amount}
                      </p>
                      <p className="text-xs mt-1" style={{color:"#BDBDBD"}}>{order.date}</p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                      style={{
                        backgroundColor: order.status === "completed" ? "#E8F5E9" : "#FFF3E0",
                        color: order.status === "completed" ? "#2E7D32" : "#E65100"
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  {isSelected && (
                    <p className="text-xs font-semibold mt-2" style={{color:"#00897B"}}>✓ Selected — will attach to your ticket</p>
                  )}
                </button>
              );
            })}

            <div className="flex gap-3 mt-4">
              <button
                onClick={function() { setSelectedOrder(null); setStep(1); }}
                className="flex-1 border-2 py-3 rounded-xl font-semibold text-sm"
                style={{borderColor:"#BDBDBD", color:"#616161"}}
              >
                Skip — not order related
              </button>
              <button
                onClick={function() { setStep(1); }}
                disabled={!selectedOrder && orders.length > 0 && !loadingOrders}
                className="flex-1 text-white py-3 rounded-xl font-semibold text-sm"
                style={{backgroundColor: selectedOrder ? "#00897B" : "#BDBDBD"}}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-1" style={{color:"#212121"}}>What do you need help with?</h2>
            <p className="text-sm mb-4" style={{color:"#9E9E9E"}}>Select the category that best describes your issue</p>

            {selectedOrder && (
              <div className="rounded-xl p-4 mb-4 border" style={{backgroundColor:"#E0F2F1", borderColor:"#80CBC4"}}>
                <p className="text-xs font-semibold mb-1" style={{color:"#00695C"}}>📎 Order Attached</p>
                <p className="text-sm font-semibold" style={{color:"#212121"}}>{selectedOrder.project_name}</p>
                <p className="text-xs mt-0.5" style={{color:"#00897B"}}>{selectedOrder.order_id} · {selectedOrder.freelancer_name} · ₹{selectedOrder.amount}</p>
              </div>
            )}

            {context && (
              <div className="rounded-xl p-4 mb-6 border" style={{backgroundColor:"#E0F2F1", borderColor:"#80CBC4"}}>
                <p className="text-xs font-semibold mb-2" style={{color:"#00695C"}}>📎 Context Auto-Attached</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs" style={{color:"#9E9E9E"}}>User ID</p>
                    <p className="font-semibold text-sm mt-0.5" style={{color:"#212121"}}>{context.userId}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs" style={{color:"#9E9E9E"}}>Payment Status</p>
                    <p className="font-semibold text-sm mt-0.5" style={{color:"#212121"}}>{context.paymentStatus}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs" style={{color:"#9E9E9E"}}>Last Category</p>
                    <p className="font-semibold text-sm mt-0.5" style={{color:"#212121"}}>{context.lastCategory || "None"}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map(function(cat) {
                return (
                  <button
                    key={cat.value}
                    onClick={function() { setSelectedCategory(cat); setStep(2); }}
                    className="bg-white border-2 rounded-xl p-4 text-left transition-all"
                    style={{borderColor: selectedCategory && selectedCategory.value === cat.value ? "#00897B" : "#EEEEEE"}}
                    onMouseEnter={function(e) { e.currentTarget.style.borderColor="#00897B"; e.currentTarget.style.backgroundColor="#E0F2F1"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.borderColor=selectedCategory&&selectedCategory.value===cat.value?"#00897B":"#EEEEEE"; e.currentTarget.style.backgroundColor="white"; }}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <p className="font-semibold text-sm" style={{color:"#212121"}}>{cat.label}</p>
                    <p className="text-xs mt-1" style={{color:"#9E9E9E"}}>{cat.desc}</p>
                  </button>
                );
              })}
            </div>

            <button onClick={function() { setStep(0); }} className="text-sm mt-4 font-medium" style={{color:"#00897B"}}>
              Back to order selection
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={function() { setStep(1); }} className="text-sm mb-4 font-medium" style={{color:"#00897B"}}>
              Back
            </button>
            <div className="rounded-xl p-3 mb-4 border" style={{backgroundColor:"#E0F2F1", borderColor:"#80CBC4"}}>
              <p className="text-xs font-semibold" style={{color:"#00695C"}}>Selected category</p>
              <p className="font-bold text-sm mt-0.5" style={{color:"#00897B"}}>{selectedCategory && selectedCategory.label}</p>
            </div>
            <h2 className="text-lg font-bold mb-1" style={{color:"#212121"}}>Describe your issue</h2>
            <p className="text-sm mb-4" style={{color:"#9E9E9E"}}>Be as specific as possible</p>
            <textarea
              className="w-full border-2 rounded-xl p-4 h-40 text-sm resize-none focus:outline-none"
              style={{borderColor:"#EEEEEE", color:"#212121"}}
              placeholder="Example: My refund was not received after 7 days..."
              value={description}
              onChange={function(e) { setDescription(e.target.value); }}
              onFocus={function(e) { e.target.style.borderColor="#00897B"; }}
              onBlur={function(e) { e.target.style.borderColor="#EEEEEE"; }}
            />

            {match && (
              <div className="rounded-xl p-4 mt-3 border" style={{backgroundColor:"#E8F5E9", borderColor:"#A5D6A7"}}>
                <p className="font-semibold text-sm" style={{color:"#2E7D32"}}>AI Quick Suggestion</p>
                <p className="text-sm mt-1" style={{color:"#388E3C"}}>{match.tip}</p>
              </div>
            )}

            <div className="mt-4">
              <p className="text-sm font-medium mb-2" style={{color:"#424242"}}>Attach Screenshot (optional)</p>
              <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer" style={{borderColor:"#EEEEEE",backgroundColor:"white"}}>
                <span className="text-2xl">📎</span>
                <div>
                  <p className="text-sm font-semibold" style={{color:"#00897B"}}>Click to upload screenshot</p>
                  <p className="text-xs mt-0.5" style={{color:"#9E9E9E"}}>PNG, JPG up to 5MB — saved to backend</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={function(e) {
                    const file = e.target.files[0];
                    if (file) {
                      setScreenshotName(file.name);
                      setScreenshotFile(file);
                      const reader = new FileReader();
                      reader.onload = function(ev) { setScreenshot(ev.target.result); };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              {screenshot && (
                <div className="mt-3 rounded-xl overflow-hidden border-2" style={{borderColor:"#80CBC4"}}>
                  <div className="flex items-center justify-between px-3 py-2" style={{backgroundColor:"#E0F2F1"}}>
                    <p className="text-xs font-semibold" style={{color:"#00695C"}}>📎 {screenshotName}</p>
                    <button onClick={function(){setScreenshot(null);setScreenshotName("");setScreenshotFile(null);}} className="text-xs font-semibold" style={{color:"#E53935"}}>Remove</button>
                  </div>
                  <img src={screenshot} alt="screenshot" className="w-full max-h-48 object-cover" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs" style={{color:"#9E9E9E"}}>{description.length} characters</span>
              <button
                onClick={function() { setStep(3); }}
                disabled={description.length < 10}
                className="text-white px-6 py-2 rounded-xl text-sm font-semibold"
                style={{backgroundColor: description.length < 10 ? "#BDBDBD" : "#00897B"}}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={function() { setStep(2); }} className="text-sm mb-4 font-medium" style={{color:"#00897B"}}>
              Back
            </button>
            <h2 className="text-lg font-bold mb-1" style={{color:"#212121"}}>Review your ticket</h2>
            <p className="text-sm mb-6" style={{color:"#9E9E9E"}}>Make sure everything looks correct</p>

            {selectedOrder && (
              <div className="bg-white border-2 rounded-xl p-4 mb-4" style={{borderColor:"#EEEEEE"}}>
                <p className="text-xs font-semibold" style={{color:"#9E9E9E"}}>ORDER ATTACHED</p>
                <p className="font-semibold mt-1" style={{color:"#212121"}}>{selectedOrder.project_name}</p>
                <p className="text-sm mt-0.5" style={{color:"#9E9E9E"}}>{selectedOrder.order_id} · {selectedOrder.freelancer_name} · ₹{selectedOrder.amount}</p>
              </div>
            )}

            <div className="bg-white border-2 rounded-xl overflow-hidden mb-6" style={{borderColor:"#EEEEEE"}}>
              <div className="p-4 border-b" style={{borderColor:"#EEEEEE"}}>
                <p className="text-xs font-semibold" style={{color:"#9E9E9E"}}>CATEGORY</p>
                <p className="font-semibold mt-1" style={{color:"#212121"}}>{selectedCategory && selectedCategory.label}</p>
              </div>
              <div className="p-4 border-b" style={{borderColor:"#EEEEEE"}}>
                <p className="text-xs font-semibold" style={{color:"#9E9E9E"}}>DESCRIPTION</p>
                <p className="text-sm mt-1" style={{color:"#212121"}}>{description}</p>
              </div>
              {screenshot && (
                <div className="p-4">
                  <p className="text-xs font-semibold mb-2" style={{color:"#9E9E9E"}}>SCREENSHOT</p>
                  <img src={screenshot} alt="screenshot" className="w-full max-h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div className="rounded-xl p-4 mb-6 border" style={{backgroundColor:"#E0F2F1", borderColor:"#80CBC4"}}>
              <p className="font-semibold text-sm" style={{color:"#00695C"}}>AI Triage Preview</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs" style={{color:"#9E9E9E"}}>Detected Category</p>
                  <p className="font-semibold text-sm mt-1" style={{color:"#212121"}}>{selectedCategory && selectedCategory.label}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs" style={{color:"#9E9E9E"}}>Estimated Response</p>
                  <p className="font-semibold text-sm mt-1" style={{color:"#212121"}}>2 to 4 hours</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full text-white py-4 rounded-xl font-bold"
              style={{backgroundColor: isSubmitting ? "#BDBDBD" : "#00897B"}}
            >
              {isSubmitting ? "Uploading and submitting..." : "Submit Ticket"}
            </button>
            {isSubmitting && (
              <div className="mt-4 space-y-2">
                {["Uploading screenshot to server...","Reading your issue...","Categorizing issue type...","Generating ticket ID..."].map(function(msg, i) {
                  return (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{color:"#9E9E9E"}}>
                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{borderColor:"#00897B"}}></div>
                      {msg}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor:"#E0F2F1"}}>
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold" style={{color:"#212121"}}>Ticket Submitted!</h2>
            <p className="mt-2" style={{color:"#9E9E9E"}}>Your issue has been received and analyzed</p>

            <div className="rounded-xl p-4 mt-4 border flex items-start gap-3" style={{backgroundColor:"#E3F2FD",borderColor:"#90CAF9"}}>
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <p className="font-semibold text-sm" style={{color:"#1565C0"}}>Confirmation email sent</p>
                <p className="text-xs mt-1" style={{color:"#1976D2"}}>A confirmation has been sent to your registered email address with your ticket details.</p>
              </div>
            </div>

            <div className="rounded-xl p-4 mt-4 border" style={{backgroundColor:"#E0F2F1", borderColor:"#80CBC4"}}>
              <p className="text-xs font-semibold" style={{color:"#00695C"}}>YOUR TICKET ID</p>
              <p className="text-3xl font-bold mt-1" style={{color:"#00897B"}}>{ticketId}</p>
            </div>

            <div className="bg-white border-2 rounded-xl mt-4 text-left overflow-hidden" style={{borderColor:"#EEEEEE"}}>
              <div className="p-4 border-b flex items-center gap-3" style={{borderColor:"#EEEEEE"}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{backgroundColor:"#E8F5E9", color:"#2E7D32"}}>1</div>
                <div>
                  <p className="font-semibold text-sm" style={{color:"#212121"}}>Ticket received</p>
                  <p className="text-xs" style={{color:"#9E9E9E"}}>Just now</p>
                </div>
              </div>
              <div className="p-4 border-b flex items-center gap-3" style={{borderColor:"#EEEEEE"}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{backgroundColor:"#E8F5E9", color:"#2E7D32"}}>2</div>
                <div>
                  <p className="font-semibold text-sm" style={{color:"#212121"}}>AI analysis complete</p>
                  <p className="text-xs" style={{color:"#9E9E9E"}}>Category: {selectedCategory && selectedCategory.label}</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{backgroundColor:"#E0F2F1", color:"#00897B"}}>3</div>
                <div>
                  <p className="font-semibold text-sm" style={{color:"#212121"}}>Agent will respond</p>
                  <p className="text-xs" style={{color:"#9E9E9E"}}>Expected within 2 to 4 hours</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={function() { setStep(0); setDescription(""); setSelectedCategory(null); setScreenshot(null); setScreenshotFile(null); setScreenshotName(""); setSelectedOrder(null); }}
                className="flex-1 border-2 py-3 rounded-xl font-semibold text-sm"
                style={{borderColor:"#00897B", color:"#00897B"}}
              >
                Submit Another
              </button>
              
              <a  href="/tracker"
                className="flex-1 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center"
                style={{backgroundColor:"#00897B"}}
              >
                Track My Ticket
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default TicketForm;