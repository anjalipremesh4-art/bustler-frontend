import { useState } from "react";

const faqs = [
  { category: "Payments", q: "How long do refunds take?", a: "Refunds are processed within 5–7 business days after approval." },
  { category: "Payments", q: "Why was my payment declined?", a: "Check if your card details are correct and that your bank has not blocked the transaction." },
  { category: "Freelancers", q: "What if my freelancer stops responding?", a: "Wait 48 hours then raise a ticket. If unresolved after 72 hours, use the Dispute Center." },
  { category: "Freelancers", q: "Can I change my freelancer mid-project?", a: "Yes, contact support and we will help you transition to a new freelancer." },
  { category: "Account", q: "How do I reset my password?", a: "Click Forgot Password on the login screen. A reset link will be sent to your email." },
  { category: "Account", q: "How do I verify my account?", a: "Go to Profile Settings and click Verify Email. Check your inbox for the verification link." },
  { category: "Disputes", q: "How long does a dispute take to resolve?", a: "Most disputes are reviewed within 48 hours. Complex cases may take up to 5 business days." },
  { category: "Disputes", q: "What evidence should I upload for a dispute?", a: "Screenshots of your agreement, payment receipts, and any relevant conversation history." },
];

function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Help Center</h1>
      <p className="text-gray-500 mb-6">Find answers to common questions</p>

      <div className="relative mb-8">
        <span className="absolute left-4 top-3 text-gray-400">🔍</span>
        <input
          className="w-full border-2 border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500"
          placeholder="Search for answers... try typing refund or dispute"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found for "{search}"</p>
          <p className="text-sm text-gray-400 mt-2">
            Try different keywords or submit a ticket
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div key={i} className="border-2 border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <span className="text-xs text-purple-600 font-semibold">{faq.category}</span>
                  <p className="font-medium mt-0.5">{faq.q}</p>
                </div>
                <span className="text-gray-400 ml-4">{openIndex === i ? "▲" : "▼"}</span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 bg-purple-50 rounded-xl p-6 text-center">
        <p className="font-semibold text-purple-800">Still need help?</p>
        <p className="text-sm text-purple-600 mt-1">
          Our support team typically responds within 2–4 hours
        </p>
        <a
          href="/"
          className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
        >
          Submit a Ticket
        </a>
      </div>
    </div>
  );
}

export default FAQPage;