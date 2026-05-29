import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TicketForm from "./pages/TicketForm";
import TicketTracker from "./pages/TicketTracker";
import DisputeCenter from "./pages/DisputeCenter";
import ResolutionSurvey from "./pages/ResolutionSurvey";
import FAQPage from "./pages/FAQPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-purple-700 text-white p-4 flex gap-6">
        <Link to="/" className="hover:underline">Submit Ticket</Link>
        <Link to="/tracker" className="hover:underline">My Tickets</Link>
        <Link to="/dispute" className="hover:underline">Dispute Center</Link>
        <Link to="/faq" className="hover:underline">Help / FAQ</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TicketForm />} />
        <Route path="/tracker" element={<TicketTracker />} />
        <Route path="/dispute" element={<DisputeCenter />} />
        <Route path="/survey" element={<ResolutionSurvey />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;