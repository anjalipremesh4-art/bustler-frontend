import { useState } from "react";

const faqs = [
  {
    category: "Payments",
    q: "I made a payment but the app crashed. What should I do?",
    a: "Do not make the payment again. Check your email for a confirmation from Lily Happiness. If you received a confirmation, the payment was successful. Raise a ticket and we will sync your payment status in the app.",
  },
  {
    category: "Payments",
    q: "I am unable to make a payment in the app.",
    a: "This is a known issue we are currently investigating. Please try again after some time or use a different payment method. If the problem persists, raise a support ticket.",
  },
  {
    category: "Bookings",
    q: "I booked a time slot but it is still showing as available.",
    a: "This is a known bug that has been fixed. After booking, the time slot should be removed automatically. If you still see it available, please refresh the app.",
  },
  {
    category: "Technical",
    q: "The app crashes when I tap the plus menu.",
    a: "This issue has been reported and our team is working on a fix. Try closing and reopening the app. If the crash continues, please raise a ticket with your device model.",
  },
  {
    category: "Technical",
    q: "My favourites categories are not updating immediately.",
    a: "After adding favourite categories, close and reopen the app once. The categories will then update immediately.",
  },
  {
    category: "Technical",
    q: "Message notifications are not working.",
    a: "Check that notifications are enabled for Bustler in your phone settings. Go to Settings then Apps then Bustler then Notifications and make sure they are turned on.",
  },
  {
    category: "Account",
    q: "I am getting an error when entering my last name during sign up.",
    a: "If your last name is a single letter, please add a dot after it. This has been reported and a fix is being implemented.",
  },
  {
    category: "Bustles",
    q: "I edited my job category after it was verified but it did not go for review again.",
    a: "Any change to a verified Bustle category should trigger a re-review. Please raise a ticket so we can manually send your Bustle for review.",
  },
  {
    category: "Technical",
    q: "The My Bustles page is opening order details when I refresh.",
    a: "This is a known navigation bug. Avoid refreshing on the My Bustles page for now. Go back to the home screen and navigate back in instead.",
  },
];

function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Payments", "Bookings", "Technical", "Account", "Bustles"];

  const filtered = faqs.filter(function(f) {
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Help Center</h1>
      <p className="text-gray-500 mb-6">Answers to the most common Bustler issues</p>

      <input
        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 mb-4 focus:outline-none focus:border-purple-500"
        placeholder="Search... try typing payment or crash"
        value={search}
        onChange={function(e) {
          setSearch(e.target.value);
          setOpenIndex(null);
        }}
      />

      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(function(cat) {
          return (
            <button
              key={cat}
              onClick={function() {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={
                activeCategory === cat
                  ? "px-3 py-1 rounded-full text-sm font-medium bg-purple-600 text-white"
                  : "px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found</p>
          <p className="text-sm text-gray-400 mt-2">Try different keywords or submit a ticket</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(function(faq, i) {
          return (
            <div key={i} className="border-2 border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={function() {
                  setOpenIndex(openIndex === i ? null : i);
                }}
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
          );
        })}
      </div>

      <div className="mt-10 bg-purple-50 rounded-xl p-6 text-center">
        <p className="font-semibold text-purple-800">Still need help?</p>
        <p className="text-sm text-purple-600 mt-1">Our support team responds within 2 to 4 hours</p>
       <a href="/ticket" className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700">Submit a Ticket</a>
      </div>
    </div>
  );
}

export default FAQPage;