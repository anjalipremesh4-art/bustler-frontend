import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TicketForm from "./pages/TicketForm";
import TicketTracker from "./pages/TicketTracker";
import DisputeCenter from "./pages/DisputeCenter";
import ResolutionSurvey from "./pages/ResolutionSurvey";
import FAQPage from "./pages/FAQPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-purple-700 text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <div className="font-bold text-xl">Bustler Pulse</div>
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-purple-200 transition-colors">Home</Link>
          <Link to="/ticket" className="hover:text-purple-200 transition-colors">Submit Ticket</Link>
          <Link to="/tracker" className="hover:text-purple-200 transition-colors">My Tickets</Link>
          <Link to="/dispute" className="hover:text-purple-200 transition-colors">Dispute Center</Link>
          <Link to="/faq" className="hover:text-purple-200 transition-colors">Help / FAQ</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticket" element={<TicketForm />} />
        <Route path="/tracker" element={<TicketTracker />} />
        <Route path="/dispute" element={<DisputeCenter />} />
        <Route path="/survey" element={<ResolutionSurvey />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;