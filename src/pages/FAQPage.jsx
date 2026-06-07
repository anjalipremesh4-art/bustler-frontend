import { useState } from "react";

const faqs = [
  { category: "Payments", q: "I made a payment but the app crashed. What should I do?", a: "Do not make the payment again. Check your email for a confirmation from Lily Happiness. If you received a confirmation, the payment was successful. Raise a ticket and we will sync your payment status in the app." },
  { category: "Payments", q: "I am unable to make a payment in the app.", a: "This is a known issue we are currently investigating. Please try again after some time or use a different payment method. If the problem persists, raise a support ticket." },
  { category: "Bookings", q: "I booked a time slot but it is still showing as available.", a: "This is a known bug that has been fixed. After booking, the time slot should be removed automatically. If you still see it available, please refresh the app." },
  { category: "Technical", q: "The app crashes when I tap the plus menu.", a: "This issue has been reported and our team is working on a fix. Try closing and reopening the app. If the crash continues, please raise a ticket with your device model." },
  { category: "Technical", q: "My favourites categories are not updating immediately.", a: "After adding favourite categories, close and reopen the app once. The categories will then update immediately." },
  { category: "Technical", q: "Message notifications are not working.", a: "Check that notifications are enabled for Bustler in your phone settings. Go to Settings then Apps then Bustler then Notifications and make sure they are turned on." },
  { category: "Account", q: "I am getting an error when entering my last name during sign up.", a: "If your last name is a single letter, please add a dot after it. This has been reported and a fix is being implemented." },
  { category: "Bustles", q: "I edited my job category after it was verified but it did not go for review again.", a: "Any change to a verified Bustle category should trigger a re-review. Please raise a ticket so we can manually send your Bustle for review." },
  { category: "Technical", q: "The My Bustles page is opening order details when I refresh.", a: "This is a known navigation bug. Avoid refreshing on the My Bustles page for now. Go back to the home screen and navigate back in instead." },
];

function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Payments", "Bookings", "Technical", "Account", "Bustles"];

  const filtered = faqs.filter(function(f) {
    const matchesSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{backgroundColor:"#F5F5F5"}} className="min-h-screen">
      <div style={{background:"linear-gradient(135deg, #00897B 0%, #00695C 100%)"}} className="text-white px-8 py-10 text-center">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="mt-2 text-sm" style={{color:"#B2DFDB"}}>Find answers to common Bustler questions</p>
        <div className="max-w-xl mx-auto mt-6">
          <input
            className="w-full rounded-xl py-3 px-5 text-sm focus:outline-none"
            style={{color:"#212121"}}
            placeholder="Search for answers... try typing payment or crash"
            value={search}
            onChange={function(e){setSearch(e.target.value);setOpenIndex(null);}}
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-8 py-8">
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(function(cat){
            return (
              <button
                key={cat}
                onClick={function(){setActiveCategory(cat);setOpenIndex(null);}}
                className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
                style={activeCategory===cat ? {backgroundColor:"#00897B",color:"white",borderColor:"#00897B"} : {backgroundColor:"white",color:"#616161",borderColor:"#EEEEEE"}}
              >
                {cat}
              </button>
            );
          })}
        </div>
        {filtered.length===0 ? (
          <div className="text-center py-8 bg-white rounded-xl border-2" style={{borderColor:"#EEEEEE"}}>
            <p style={{color:"#9E9E9E"}}>No results found for "{search}"</p>
            <p className="text-sm mt-2" style={{color:"#BDBDBD"}}>Try different keywords or submit a ticket</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(function(faq,i){
              return (
                <div key={i} className="bg-white border-2 rounded-xl overflow-hidden" style={{borderColor:"#EEEEEE"}}>
                  <button
                    onClick={function(){setOpenIndex(openIndex===i?null:i);}}
                    className="w-full text-left p-4 flex justify-between items-center"
                    style={{backgroundColor:openIndex===i?"#E0F2F1":"white"}}
                  >
                    <div>
                      <span className="text-xs font-semibold" style={{color:"#00897B"}}>{faq.category}</span>
                      <p className="font-medium mt-0.5" style={{color:"#212121"}}>{faq.q}</p>
                    </div>
                    <span className="ml-4 font-bold text-xl" style={{color:"#00897B"}}>{openIndex===i?"−":"+"}</span>
                  </button>
                  {openIndex===i && (
                    <div className="px-4 pb-4 text-sm border-t pt-3" style={{color:"#616161",borderColor:"#EEEEEE"}}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-10 rounded-xl p-6 text-center border-2" style={{backgroundColor:"#E0F2F1",borderColor:"#80CBC4"}}>
          <p className="font-semibold" style={{color:"#00695C"}}>Still need help?</p>
          <p className="text-sm mt-1" style={{color:"#00897B"}}>Our support team typically responds within 2 to 4 hours</p>
          <a href="/ticket" className="inline-block mt-4 text-white px-6 py-2 rounded-xl font-semibold" style={{backgroundColor:"#00897B"}}>
            Submit a Ticket
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;