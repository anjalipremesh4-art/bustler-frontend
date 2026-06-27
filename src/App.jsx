import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TicketForm from "./pages/TicketForm";
import TicketTracker from "./pages/TicketTracker";
import DisputeCenter from "./pages/DisputeCenter";
import ResolutionSurvey from "./pages/ResolutionSurvey";
import FAQPage from "./pages/FAQPage";

function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  function isActive(path) {
    return location.pathname === path;
  }
  const links = [
    { path: "/", label: "Home" },
    { path: "/ticket", label: "Submit Ticket" },
    { path: "/tracker", label: "My Tickets" },
    { path: "/dispute", label: "Dispute Center" },
    { path: "/faq", label: "Help" },
  ];
  return (
    <nav style={{ backgroundColor: "#00897B" }} className="text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      <a href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span style={{ color: "#00897B" }} className="font-black text-sm">B</span>
        </div>
        <span className="font-bold text-lg">Bustler Pulse</span>
      </a>

      <div className="hidden md:flex items-center gap-1">
        {links.map(function(item) {
          return (
            <a key={item.path}
              href={item.path}
              style={isActive(item.path) ? { backgroundColor: "rgba(255,255,255,0.2)" } : {}}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white hover:bg-opacity-20"
            >
              {item.label}
            </a>
          );
        })}
      </div>

      <button
        onClick={function(){ setMenuOpen(true); }}
        className="md:hidden flex items-center justify-center w-9 h-9"
        aria-label="Open menu"
      >
        <span style={{ fontSize: "24px" }}>☰</span>
      </button>

      {menuOpen && (
        <div
          onClick={function(){ setMenuOpen(false); }}
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            onClick={function(e){ e.stopPropagation(); }}
            className="fixed top-0 right-0 h-full w-64 flex flex-col p-6"
            style={{ backgroundColor: "#00897B" }}
          >
            <div className="flex justify-end mb-6">
              <button
                onClick={function(){ setMenuOpen(false); }}
                className="text-white text-2xl"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            {links.map(function(item) {
              return (
                <a key={item.path}
                  href={item.path}
                  style={isActive(item.path) ? { backgroundColor: "rgba(255,255,255,0.2)" } : {}}
                  className="px-4 py-3 rounded-lg text-base font-medium text-white transition-all mb-2"
                  onClick={function(){ setMenuOpen(false); }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#212121" }} className="text-white mt-16 py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00897B" }}>
                <span className="font-black text-white text-sm">B</span>
              </div>
              <p className="font-bold text-lg">Bustler Pulse</p>
            </div>
            <p style={{ color: "#9E9E9E" }} className="text-sm">
              AI-powered support ecosystem that makes Bustler's help experience faster, smarter, and transparent.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{ color: "#BDBDBD" }}>Quick Links</p>
            <div className="space-y-2">
              {[
                { path: "/ticket", label: "Submit a Ticket" },
                { path: "/tracker", label: "Track My Issue" },
                { path: "/dispute", label: "Dispute Center" },
                { path: "/faq", label: "Help Center" },
              ].map(function(item) {
                return (
                  <a key={item.path} href={item.path} style={{ color: "#9E9E9E" }} className="block text-sm hover:text-white">
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            
            <div className="mt-4">
              <p style={{ color: "#9E9E9E" }} className="text-xs mt-0.5">Bustler Summer Internship 2026</p>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 flex justify-between items-center" style={{ borderColor: "#424242" }}>
          <p style={{ color: "#616161" }} className="text-sm">Bustler Pulse — Support Ecosystem</p>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#00897B", color: "white" }}>Seeker</span>
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#E53935", color: "white" }}>Bustler</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticket" element={<TicketForm />} />
        <Route path="/tracker" element={<TicketTracker />} />
        <Route path="/dispute" element={<DisputeCenter />} />
        <Route path="/survey/:ticketId" element={<ResolutionSurvey />} />
        <Route path="/faq" element={<FAQPage />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
