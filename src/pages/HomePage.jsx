import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-8">

      {/* Hero section */}
      <div className="text-center mt-10">
        <div className="text-6xl mb-4">🛡️</div>
        <h1 className="text-4xl font-bold text-gray-800">
          Bustler Support Center
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Get instant help, track your issues, and resolve disputes — all in one place.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button
          onClick={() => navigate("/ticket")}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-all"
        >
          Submit a Ticket
        </button>
        <button
          onClick={() => navigate("/tracker")}
          className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all"
        >
          Track My Issue
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mt-12 text-center">
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-3xl font-bold text-purple-700">9</p>
          <p className="text-sm text-gray-500 mt-1">Issues Tracked</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-3xl font-bold text-green-700">3</p>
          <p className="text-sm text-gray-500 mt-1">Resolved</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-3xl font-bold text-red-700">4</p>
          <p className="text-sm text-gray-500 mt-1">Critical P1 Issues</p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-bold text-gray-800">AI Powered Triage</h3>
          <p className="text-gray-500 text-sm mt-2">
            Your issue is instantly analyzed and routed to the right team automatically.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="text-3xl mb-3">👁️</div>
          <h3 className="font-bold text-gray-800">Full Visibility</h3>
          <p className="text-gray-500 text-sm mt-2">
            Track every step of your ticket from submission to resolution.
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-6">
          <div className="text-3xl mb-3">⚖️</div>
          <h3 className="font-bold text-gray-800">Dispute Resolution</h3>
          <p className="text-gray-500 text-sm mt-2">
            Structured process to resolve freelancer and client conflicts fairly.
          </p>
        </div>
      </div>

      {/* System status banner */}
      <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p className="text-green-700 text-sm font-medium">All systems operational — Support team is active</p>
      </div>

    </div>
  );
}

export default HomePage;