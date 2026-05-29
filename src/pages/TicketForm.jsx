import { useState } from "react";

const categories = [
  { label: "Payment Issue", icon: "💳" },
  { label: "Refund Delay", icon: "⏳" },
  { label: "Freelancer Problem", icon: "👤" },
  { label: "Technical Bug", icon: "🐛" },
  { label: "Account Issue", icon: "🔐" },
  { label: "Other", icon: "❓" },
];

const smartSuggestions = [
  { keyword: "refund", tip: "Refunds usually take 5–7 business days to process." },
  { keyword: "payment", tip: "Check if your payment method is verified in account settings." },
  { keyword: "freelancer", tip: "Try sending a direct message to the freelancer first." },
  { keyword: "bug", tip: "Try clearing your browser cache and reloading the page." },
  { keyword: "login", tip: "Try the Forgot Password option on the login page." },
  { keyword: "account", tip: "Make sure your email is verified in your profile settings." },
];

function TicketForm() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ticketId, setTicketId] = useState("");

  const matchedSuggestion = smartSuggestions.find(s =>
    description.toLowerCase().includes(s.keyword)
  );

  function handleSubmit() {
    const fakeId = "TKT-" + Math.floor(Math.random() * 9000 + 1000);
    setTicketId(fakeId);
    setStep(4);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">

      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">What do you need help with?</h1>
          <p className="text-gray-500 mb-6">Select the category that best describes your issue</p>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setSelectedCategory(cat.label);
                  setStep(2);
                }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm font-medium">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <button onClick={() => setStep(1)} className="text-purple-600 mb-4">← Back</button>
          <h1 className="text-2xl font-bold mb-2">Describe your issue</h1>
          <p className="text-gray-500 mb-2">
            Category: <span className="font-semibold text-purple-700">{selectedCategory}</span>
          </p>
          <textarea
            className="w-full border-2 border-gray-200 rounded-xl p-4 h-40 mt-4 focus:outline-none focus:border-purple-500"
            placeholder="Describe your issue... try typing refund or payment"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {matchedSuggestion && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-3 flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-semibold text-blue-800 text-sm">Quick suggestion</p>
                <p className="text-blue-700 text-sm mt-1">{matchedSuggestion.tip}</p>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <span className="text-sm text-gray-400">{description.length} characters</span>
            <button
              onClick={() => setStep(3)}
              disabled={description.length < 10}
              className="bg-purple-600 text-white px-8 py-3 rounded-xl disabled:opacity-40 hover:bg-purple-700"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <button onClick={() => setStep(2)} className="text-purple-600 mb-4">← Back</button>
          <h1 className="text-2xl font-bold mb-6">Review your ticket</h1>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{selectedCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-gray-800">{description}</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700"
          >
            Submit Ticket
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold">Ticket Submitted!</h1>
          <p className="text-gray-500 mt-2">Your ticket ID is</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{ticketId}</p>
          <div className="bg-purple-50 rounded-xl p-4 mt-6 text-left">
            <p className="text-sm font-semibold text-purple-800">What happens next?</p>
            <p className="text-sm text-purple-700 mt-1">Our AI has analyzed your issue. An agent will respond within 2–4 hours.</p>
          </div>
          <button
            onClick={() => { setStep(1); setDescription(""); setSelectedCategory(""); }}
            className="mt-6 text-purple-600 underline"
          >
            Submit another ticket
          </button>
        </div>
      )}

    </div>
  );
}

export default TicketForm;